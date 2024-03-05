import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import styles from './ScrollToTopButton.module.css';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            setIsVisible(scrollTop > 200);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    return (
        <div
            className={`${styles.scrollToTopButton} ${isVisible ? styles.visible : ''}`}
            onClick={scrollToTop}
        >
            <span className={styles.arrow}></span>
        </div>
    );
};
