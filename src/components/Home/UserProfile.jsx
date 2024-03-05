// UserProfile.jsx
import React from 'react';
import { Hero } from '../Hero/Hero';
import { Skill } from '../Skill/Skill';
import { Education } from '../Education/Education';
import { Experience } from '../Experience/Experience';
import { Projects } from '../Projects/Projects';
import { ScrollToTopButton } from '../ScrollToTopButton/ScrollToTopButton';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';

export const UserProfile = () => {
  return (
    <>
      <Hero />
      <Skill />
      <Education />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};
