import React from 'react';
import styles from './Education.module.css';
import education from '../../data/education.json';
import { getImageUrl } from '../../utils';

export const Education = () => {
  return (
    <section className={styles.container} id='education'>
      <h2 className={styles.title}>Education</h2>
      <div className={styles.content}>
        <ul className={styles.education}>
          {education.map((educationItem, id) => {
            return (
              <li key={id} className={styles.educationItem}>
                <img src={getImageUrl(educationItem.imageSrc)} alt={educationItem.title} />
                <div className={styles.educationItemDetails}>
                  <h3>{educationItem.organisation}</h3>
                  <p>{educationItem.startDate} - {educationItem.endDate}</p>
                  <p>{educationItem.experiences}</p>
                  {educationItem.description && (
                    <p className={styles.description}>
                     {educationItem.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
