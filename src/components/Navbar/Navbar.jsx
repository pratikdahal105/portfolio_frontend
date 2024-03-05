import React, { useContext, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';
import AuthContext from '../../context/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/Axios';
import SideBar from './SideBar';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigateTo = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);

        if (element) {
            scroll.scrollTo(element.offsetTop, {
                duration: 1000,
                smooth: 'easeInOutQuart',
            });
        }
    };
    
    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            setAuth({ isAuthenticated: false, user: null });
            navigateTo('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // const isUsernamePath = location.pathname.includes('/username');
    const isUsernamePath = true;
    const isUserPath = location.pathname.includes('/profile');

    if(isUserPath){
        return <SideBar />
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.title} onClick={scrollToTop}>
                <Link to="/username">Portfolio</Link>
            </div>
            <div className={styles.menu}>
                <img
                    className={styles.menuBtn}
                    src={menuOpen ? getImageUrl('general/close.png') : getImageUrl('general/menu.png')}
                    alt="menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
                <ul
                    className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
                    onClick={() => setMenuOpen(false)}
                >
                    {isUsernamePath && <li onClick={() => scrollToSection('about')}>About</li>}
                    {isUsernamePath && <li onClick={() => scrollToSection('education')}>Education</li>}
                    {isUsernamePath && <li onClick={() => scrollToSection('experience')}>Experience</li>}
                    {isUsernamePath && <li onClick={() => scrollToSection('projects')}>Projects</li>}
                    {isUsernamePath && <li onClick={() => scrollToSection('contact')}>Contact</li>}
                    {!isUsernamePath && (
                        <>
                            <Links to="/">Home</Links>
                            {auth.isAuthenticated && (
                                <Links to="/profile/dashboard">Dashboard</Links>
                            )}
                            {auth.isAuthenticated ? (
                                <li><a onClick={handleLogout}>Logout</a></li>
                            ) : (
                                <Links to="/login">Login</Links>
                            )}
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

function Links({ to, children, ...props}){
    const path = window.location.pathname;
    return (
        <li className={path === to ? styles.active : ''}>
            <Link to={to}>{children}</Link>
        </li>
    )
}
