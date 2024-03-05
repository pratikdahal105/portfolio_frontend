import React from 'react';
import { getImageUrl } from '../../utils';
import styles from './Hero.module.css';
import { animateScroll as scroll } from 'react-scroll';
import heroData from '../../data/hero.json';

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
        scroll.scrollTo(element.offsetTop, {
            duration: 1000,
            smooth: 'easeInOutQuart',
        });
    }
};

export const Hero = () => {
  const { title, description, profileImageSrc } = heroData;

  return (
    <section className={styles.container} id='about'>
        <div className={styles.content}>
            <h1 className={styles.title}>
                {title}
            </h1>
            <p className={styles.description}>
                {description}
            </p>
            <button onClick={() => scrollToSection('contact')} className={styles.contactBtn}>Contact Me</button>
        </div>
        <div className={styles.heroImgContainer}>
            <img src={getImageUrl(profileImageSrc)} alt="Hero image of profile" className={styles.heroImg}/>
        </div>
        <div className={styles.topBlur}></div>
        <div className={styles.bottomBlur}></div>
    </section>
  );
};
