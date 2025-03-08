// components/Landing.js
import { useEffect, useRef } from 'react';
import styles from '../styles/Landing.module.css';

const Landing = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    
    // Parallax effect
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const bridges = container.querySelectorAll(`.${styles.bridge}`);
      const buildings = container.querySelectorAll(`.${styles.building}`);
      const title = container.querySelector(`.${styles.title}`);
      
      bridges.forEach((bridge, index) => {
        const speed = 0.02 + (index * 0.01);
        bridge.style.transform = `translateX(${x * 50 * (index + 1)}px) translateY(${y * 30 * (index + 1)}px)`;
      });
      
      buildings.forEach((building, index) => {
        const speed = 0.01 + (index * 0.005);
        building.style.transform = `translateX(${-x * 40 * (index + 1)}px) translateY(${y * 20 * (index + 1)}px)`;
      });
      
      if (title) {
        title.style.transform = `translateX(${-x * 20}px) translateY(${-y * 20}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section className={styles.landingContainer} ref={containerRef}>
      <div className={styles.overlay}></div>
      
      <div className={styles.bridge}></div>
      <div className={styles.bridge}></div>
      <div className={styles.bridge}></div>
      
      <div className={styles.building}></div>
      <div className={styles.building}></div>
      <div className={styles.building}></div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>PRITHVI'25</h1>
        <h2 className={styles.subtitle}>Building Tomorrow's Foundation</h2>
        <p className={styles.date}>March 22, 2025</p>
        
        <div className={styles.ctaButtons}>

        <a href="#competitions">
                <button className={styles.primaryBtn}>Register Now</button>
            </a>
        <a href="#about"> 
          <button className={styles.secondaryBtn}>Explore Events</button>
          </a> 

        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <span>Scroll Down</span>
        <div className={styles.arrow}></div>
      </div>
    </section>
  );
};

export default Landing;