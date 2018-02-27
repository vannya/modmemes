import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "./actions";
import AddMemeModal from "./components/AddMemeModal";
import MemeDisplay from "./components/MemeDisplay";
import FilterBar from "./components/FilterBar";
import placeholder from "./stylesheets/assets/website.png";
import logo from "./stylesheets/assets/logo.png";
import logoXs from "./stylesheets/assets/logo-xs.png";

class App extends Component {
  state = {
    modalShowing: false
  };

  componentDidMount() {
    this.props.actions.fetchUser(); // Fetches to determine auth status
  }

  // Shows a Filter Bar
  renderFilterBar() {
    switch (this.props.oauth) {
      case null:
        return <div className="filter-bar">Loading</div>;
      case false:
        // Returns if user is not logged in
        return (
          <div className="filter-bar">
            <div className="filter-bar-left">
              <button className="meme-btn" onClick={() => this.loginTestUser()}>
                TestUser
              </button>
            </div>
            <div className="filter-bar-center">
              <img src={logoXs} alt="logo" />
            </div>
            <div className="filter-bar-right">
              <a className="log-btn" href="/api/googleLogin">
                SignUp
              </a>
              <a className="log-btn" href="/api/googleLogin">
                Login
              </a>
            </div>
            <div className="mobile-filter-bar">
              <div className="mobile-filter-bar-top">
                <a className="log-btn" href="/api/googleLogin">
                  Sign Up
                </a>
                <button className="meme-btn" onClick={() => this.loginTestUser()}>
                  TestUser
                </button>
                <a className="log-btn" href="/api/googleLogin">
                  Login
                </a>
              </div>
            </div>
          </div>
        );
      default:
        // Returns if user is logged in
        return (
          <div className="filter-bar">
            <div className="filter-bar-left">
              <h3>Filters: </h3>
              <FilterBar />
            </div>
            <div className="filter-bar-center">
              <img src={logoXs} alt="logo" />
            </div>
            <div className="filter-bar-right">
              <button className="meme-btn" onClick={() => this.toggleModal()}>
                Add Memes!
              </button>
              <a className="log-btn" href="/api/logout">
                Logout
              </a>
            </div>
            <div className="mobile-filter-bar">
              <div className="mobile-filter-bar-row">
                <button className="meme-btn" onClick={() => this.toggleModal()}>
                  Add Memes!
                </button>
                <a className="log-btn" href="/api/logout">
                  Logout
                </a>
              </div>
              <div className="mobile-filter-bar-row">
                <h3>Filters: </h3>
                <FilterBar />
              </div>
            </div>
          </div>
        );
    }
  }

  // Logs in the Test User
  loginTestUser() {
    this.props.actions.loginDemo();
    this.props.actions.fetchMemes();
    
  }

  // Verifies that link is an image, else will render a placeholder image.
  isImage(link) {
    const linkArr = link.split(".");
    const linkEnding = linkArr[linkArr.length - 1];
    if (
      linkEnding === "jpg" ||
      linkEnding === "jpeg" ||
      linkEnding === "png" ||
      linkEnding === "gif"
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Toggles the AddImageModal
  toggleModal() {
    this.setState({
      modalShowing: !this.state.modalShowing
    });
  }

  // Deletes an Image
  deleteImage = async imageId => {
    await this.props.actions.deleteMeme(imageId);
    this.props.actions.fetchMemes();
    this.props.actions.fetchTags();
  };

  render() {
    return (
      <div className="App">
        {this.renderFilterBar()}
        <div className="app-body">
          {!!this.props.memes ? (
            <div className="memes-list">
              {this.props.memes.map((meme, i) => {
                return (
                  <MemeDisplay
                    key={i}
                    imgSrc={this.isImage(meme.link) ? meme.link : placeholder}
                    link={meme.link}
                    linkId={meme._id}
                    deleteImage={this.deleteImage}
                    tags={meme.tags}
                  />
                );
              })}
            </div>
          ) : (
            <div className="basic-landing">
              <img className="large-logo" src={logo} alt="logo" />
              <h2>Memes for your teams!</h2>
              <p>
                When you can only express yourself via meme, have your favorites
                at your fingertips.
              </p>
            </div>
          )}
        </div>
        {!!this.state.modalShowing ? (
          <AddMemeModal
            toggleModal={() => this.toggleModal()}
            addMeme={this.props.actions.addMeme}
            fetchMemes={() => this.props.actions.fetchMemes()}
            fetchTags={() => this.props.actions.fetchTags()}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ oauth, memes, tags }) {
  return { oauth, memes, tags };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
