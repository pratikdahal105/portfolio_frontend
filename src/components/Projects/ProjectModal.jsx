import React from 'react';
import styles from './ProjectModal.module.css';

const Modal = ({ project, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{project.title}</h2>

        <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
        
        <button className={styles.closeButton} onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
