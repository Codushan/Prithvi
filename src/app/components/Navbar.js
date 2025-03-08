// src/app/components/Navbar.jsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();



  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Handle navigation to sections
  const handleSectionNavigation = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);

    // If we're already on the homepage, just scroll to the section
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage with the hash
      window.location.href = `/#${sectionId}`;
    }
  };
  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarContainer}>
        <div className={styles.navLogo}>
          <Link href="/">
            <div className={styles.logoContainer}>

              <Image
                src="/prithviw.png" // Add the correct extension (e.g., .png, .jpg)
                width={70}
                height={70}
                className={styles.image}
                alt="Prithvi Logo"
              />

              <span className={styles.logo}>P</span>
              <span className={styles.logoText}>RITHVI'25</span>
            </div>
          </Link>
        </div>

        <div className={styles.mobileIcon} onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`}></div>
          <div className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`}></div>
          <div className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`}></div>
        </div>

        <ul className={`${styles.navMenu} ${menuOpen ? styles.active : ''}`}>
          <li className={styles.navItem}>
            <a href="#about" onClick={(e) => handleSectionNavigation(e, 'about')} className={styles.navLink}>
              About
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#events" onClick={(e) => handleSectionNavigation(e, 'events')} className={styles.navLink}>
              Events
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#competitions" onClick={(e) => handleSectionNavigation(e, 'competitions')} className={styles.navLink}>
              Competitions
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#workshops" onClick={(e) => handleSectionNavigation(e, 'workshops')} className={styles.navLink}>
              Workshops
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#lectures" onClick={(e) => handleSectionNavigation(e, 'lectures')} className={styles.navLink}>
              Lectures
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#sponsors" onClick={(e) => handleSectionNavigation(e, 'sponsors')} className={styles.navLink}>
              Sponsors
            </a>
          </li>

          <li className={styles.navItem}>
            <Link href="/Team" className={styles.navLink}>
              Our Team
            </Link>
          </li>

        </ul>

        <div className={styles.navBtn}>
          <Link href='/Contact'>
            <button className={styles.registerBtn}>Contact Us</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;