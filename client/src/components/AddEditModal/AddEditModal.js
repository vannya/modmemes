import React from 'react';
import Button from '../common/Button';
import styles from './AddEditModal.module.css';

const AddEditModal = ({
  meme,
  tags,
  modalType,
  toggleModal,
  deleteMeme,
  handleOnSubmit,
  handleOnChange
}) => {
  function renderHeader() {
    if (modalType === 'add') {
      return 'Add Your Favorite Memes!';
    } else {
      return 'Edit Your Meme!';
    }
  }

  function renderLinkInput() {
    if (modalType === 'add') {
      return (
        <input
          type="url"
          name="link"
          placeholder="Link to Image"
          onChange={handleOnChange}
        />
      );
    } else if (modalType === 'edit') {
      return <p className="modal-link-display">{meme.link}</p>;
    }
  }

  function renderButtons() {
    if (modalType === 'add') {
      return (
        <Button type="submit" className="meme-display-btn" text="Submit" />
      );
    } else if (modalType === 'edit') {
      return (
        <div className={styles.modalEditButtons}>
          <Button
            type="button"
            className="red-btn"
            text="Delete"
            onClick={deleteMeme}
          />
          <Button type="submit" className="meme-display-btn" text="Submit" />
        </div>
      );
    }
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.overlay} onClick={toggleModal} />
      <div className={styles.addImageModal}>
        <h2>{renderHeader()}</h2>
        <form onSubmit={handleOnSubmit}>
          {renderLinkInput()}
          <input
            type="text"
            name="tags"
            placeholder="Keywords separated by commas"
            onChange={handleOnChange}
            value={tags}
          />
          {renderButtons()}
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;