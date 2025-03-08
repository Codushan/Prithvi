// components/About.js
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/About.module.css';

const About = () => {
  const sectionRef = useRef(null);


  useEffect(() => {
    const section = sectionRef.current;

    const handleScroll = () => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add(styles.visible);
      }
    };


    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <section id="about" className={styles.aboutSection} ref={sectionRef}>
      <div className={styles.blueprint}></div>


      <div className={styles.content}>
        <div className={styles.heading}>
          <h2>ABOUT <span>PRITHVI'25</span></h2>
          <div className={styles.underline}></div>
        </div>


        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image
              src="/prithviw.png" // Add the correct extension (e.g., .png, .jpg)
              width={500}
              height={500}
              className={styles.image}
              alt="Prithvi Logo"
            />

            {/* <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#3498db" strokeWidth="2" />
              <circle cx="60" cy="60" r="40" fill="none" stroke="#2ecc71" strokeWidth="2" />
              <polygon points="60,25 85,70 35,70" fill="none" stroke="#e74c3c" strokeWidth="3" />
              <rect x="45" y="70" width="30" height="25" fill="none" stroke="#f39c12" strokeWidth="3" />
            </svg> */}
          </div>

          <div className={styles.logoDescription}>
            <h3>The Earth, Our Foundation</h3>
            <p>Named after the Sanskrit word for Earth, Prithvi represents the foundation upon which we build. Just as Earth provides stability for our structures, civil engineering provides the foundation for modern civilization.</p>
          </div>
        </div>

        <div className={styles.description}>
          <p>Prithvi'25 is the annual national-level technical festival organized by the Department of Civil Engineering. The festival brings together students, academics, and industry professionals to celebrate innovation and excellence in civil engineering.</p>
          <p>Through competitions, workshops, and lectures by distinguished speakers, Prithvi aims to bridge the gap between theoretical knowledge and practical applications, inspiring the next generation of civil engineers to build a sustainable future.</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.number}>15+</span>
            <span className={styles.label}>Events</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>20+</span>
            <span className={styles.label}>Colleges</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>1000+</span>
            <span className={styles.label}>Participants</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>50+</span>
            <span className={styles.label}>Speakers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;