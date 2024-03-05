import React, { useContext, useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import styles from './Sidebar.module.css';
import { IconContext } from 'react-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/Axios';
import AuthContext from '../../context/AuthProvider';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const navigateTo = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigateTo('/login');
    }
  }, [auth.isAuthenticated, navigateTo]);

  const showSidebar = () => setSidebar(!sidebar);

  const SidebarItem = ({ href, icon, title }) => {
    const isActive = location.pathname === href;
    return (
      <li className={`${styles['nav-text']} ${isActive ? styles.active : ''}`}>
        <Link to={href} onClick={() => setActiveItem(href)}>
          {icon}
          <span>{title}</span>
        </Link>
      </li>
    );
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

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={styles.navbar}>
          <div className={styles['menu-bars']}>
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
        </div>
        <nav className={sidebar ? `${styles['nav-menu']} ${styles.active}` : styles['nav-menu']}>
          <ul className={styles['nav-menu-items']} onClick={showSidebar}>
            <li className={styles['navbar-toggle']}>
              <div className={styles['menu-bars']}>
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </div>
            </li>
            <SidebarItem href='profile/dashboard' icon={<AiIcons.AiFillHome />} title='Dashboard' />
            <SidebarItem href='profile/education' icon={<FaIcons.FaGraduationCap />} title='Education' />
            <SidebarItem href='profile/experience' icon={<FaIcons.FaBriefcase />} title='Experience' />
            <SidebarItem href='profile/projects' icon={<FaIcons.FaProjectDiagram />} title='Projects' />
            <SidebarItem href='profile/skills' icon={<FaIcons.FaTools />} title='Skills' />
            <SidebarItem href='profile/contact' icon={<FaIcons.FaEnvelope />} title='Contact' />
            <div className={styles.bottomSection}>
              <div className={styles.userProfile}>
                <FaIcons.FaUserCircle className={styles.userIcon} />
                <span>{auth.username}</span>
              </div>
              <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
