import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';
import footerData from '../../data/footer.json';

const Footer = () => {
  const { contactInformation, socialLinks } = footerData;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <h3>Contact Information</h3>
          <p>Email: {contactInformation.email}</p>
        </div>
        <div className={styles.footerRight}>
          <h3>Follow Me</h3>
          <div className={styles.socialIcons}>
            {socialLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" className={styles.icon}>
                {link.platform === "LinkedIn" && <FaLinkedin />}
                {link.platform === "GitHub" && <FaGithub />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
