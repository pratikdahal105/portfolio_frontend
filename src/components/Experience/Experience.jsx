import React from 'react';
import styles from './Experience.module.css';
import experienceData from '../../data/experience.json';

export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Experience</h2>
      <div className={styles.content}>
        <ul className={styles.experienceItems}>
          {experienceData.map((experienceItem, id) => (
            <li key={id} className={styles.experienceItem}>
              <div className={styles.experienceItemText}>
                <span className={styles.date}>{experienceItem.date}</span>
                <h3>{experienceItem.title}</h3>
                <p><strong>Organization:</strong> {experienceItem.organisation}</p>
                <p><strong>Location:</strong> {experienceItem.location}</p>
                <i>{experienceItem.description}</i>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
