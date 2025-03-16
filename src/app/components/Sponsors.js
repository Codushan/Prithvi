// components/Sponsors.js
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Sponsors.module.css';
import Image from 'next/image';

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
          <p>We are proud to collaborate with our esteemed marketing partners, whose support and expertise help us reach new heights. Together, we create impactful experiences and drive innovation. Thank you for being a part of our journey!</p>
        </div>

        <div className={styles.sponsorTiers}>
          <div className={styles.tier}>
             <h3>Our Valued Marketing Partners</h3> 
            <div className={styles.sponsorGrid}>
              {[1].map((i) => (
                <div key={`platinum-${i}`} className={styles.sponsorCard}>
                  <div className={styles.blueprint}>
                    <div className={styles.blueprintLines}></div>
                  </div>
                  <div className={styles.logoPlaceholder}>
                  <Image src="/Sponsor1.png" alt="Sponsor 1" width={300} height={200} />
                  </div>
                   <h4>VAJRA</h4> 
                   <h5>Printing Partner</h5>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tier}>
            <h3>Our Valued Event Partners</h3>
            <div className={styles.sponsorGrid}>
              {[1].map((i) => (
                <div key={`gold-${i}`} className={styles.sponsorCard}>
                  <div className={styles.blueprint}>
                    <div className={styles.blueprintLines}></div>
                  </div>
                  <div className={styles.logoPlaceholder}>
                  <Image src="/Sponsor2.png" alt="Sponsor 2" width={300} height={150} />
                  </div>
                  <h4>CIVILIANZ</h4>
                  <h5>presents INFRANOVA</h5>
                </div>
              ))}
            </div>
          </div>

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