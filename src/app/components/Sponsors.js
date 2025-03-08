// components/Sponsors.js
import { useRef, useEffect } from 'react';
import styles from '../styles/Sponsors.module.css';

const Sponsors = () => {
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
    <section id="sponsors" className={styles.sponsorsSection} ref={sectionRef}>
      <div className={styles.bgElements}>
        <div className={styles.bridge}></div>
        <div className={styles.pillar}></div>
        <div className={styles.pillar}></div>
        <div className={styles.girder}></div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2>OUR <span>SPONSORS</span></h2>
          <div className={styles.underline}></div>
        </div>
        
        <div className={styles.description}>
          <p>Prithvi 2025: Building the Future of Civil Engineering! F 
Join us at NIT Calicut for InfraNova 2025, where innovation meets excellence! Featuring expert talks, cutting-edge project exhibitions, and a special collaboration with Larsen & Toubro (L&T), this is your chance to shape the future of infrastructure. 
Exciting awards, expert panels, and groundbreaking ideas await! Don't miss out!</p>
        </div>
        
        <div className={styles.sponsorTiers}>
          <div className={styles.tier}>
            {/* <h3>Foundation Partners</h3> */}
            <div className={styles.sponsorGrid}>
              {[1].map((i) => (
                <div key={`platinum-${i}`} className={styles.sponsorCard}>
                  <div className={styles.blueprint}>
                    <div className={styles.blueprintLines}></div>
                  </div>
                  <div className={styles.logoPlaceholder}>
                    <div className={styles.beam}></div>
                    <div className={styles.column}></div>
                  </div>
                  <h4>Sponsor {i}</h4>
                </div>
              ))}
            </div>
          </div>
          
          {/* <div className={styles.tier}>
            <h3>Structural Supporters</h3>
            <div className={styles.sponsorGrid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={`gold-${i}`} className={styles.sponsorCard}>
                  <div className={styles.blueprint}>
                    <div className={styles.blueprintLines}></div>
                  </div>
                  <div className={styles.logoPlaceholder}>
                    <div className={styles.beam}></div>
                    <div className={styles.column}></div>
                  </div>
                  <h4>Sponsor {i}</h4>
                </div>
              ))}
            </div>
          </div> */}
          
          {/* <div className={styles.tier}>
            <h3>Technical Associates</h3>
            <div className={styles.sponsorGrid}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={`silver-${i}`} className={styles.sponsorCard}>
                  <div className={styles.blueprint}>
                    <div className={styles.blueprintLines}></div>
                  </div>
                  <div className={styles.logoPlaceholder}>
                    <div className={styles.beam}></div>
                    <div className={styles.column}></div>
                  </div>
                  <h4>Sponsor {i}</h4>
                </div>
              ))}
            </div>
          </div> */}
        </div>
        
        {/* <div className={styles.sponsorCTA}>
          <h3>Become a Sponsor</h3>
          <p>Join leading organizations in supporting innovation in civil engineering. Contact us for partnership opportunities.</p>
          <button className={styles.ctaButton}>Sponsorship Brochure</button>
        </div> */}
      </div>
    </section>
  );
};

export default Sponsors;