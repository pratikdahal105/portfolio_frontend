import React, { useState } from 'react';
import { FaLink, FaGithub } from 'react-icons/fa';
import { getImageUrl } from '../../utils';
import styles from './ProjectCard.module.css';
import ProjectModal from './ProjectModal';

export const ProjectCard = ({ project }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleContainerClick = (event) => {
    if (!event.target.closest('button')) {
      openModal();
    }
  };

  // Function to truncate the description to two lines
  const truncateDescription = (description) => {
    const maxLength = 50; // Adjust as needed
    if (description.length > maxLength) {
      return description.substr(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <img src={getImageUrl(project.imageSrc)} alt={`Image of ${project.title}`} className={styles.image} />
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description} dangerouslySetInnerHTML={{ __html: truncateDescription(project.description) }} />
      <ul className={styles.skills}>{project.skills.map((skill, id) => <li className={styles.skill} key={id}>{skill}</li>)}</ul>
      <div className={styles.links}>
        {project.demo && (
          <button>
            <a href={project.demo} target='_blank' rel="noopener noreferrer">
              <FaLink /> Demo
            </a>
          </button>
        )}
        {project.source && (
          <button>
            <a href={project.source} target='_blank' rel="noopener noreferrer">
              <FaGithub /> Source
            </a>
          </button>
        )}
      </div>
      {showModal && <ProjectModal project={project} closeModal={closeModal} />}
    </div>
  );
};
