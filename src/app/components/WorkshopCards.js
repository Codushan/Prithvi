
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/WorkshopCards.module.css';
import workshops from '../Data/workshops'
import Link from "next/link";


const WorkshopCards = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    
    const handleScroll = () => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add(styles.visible);
        
        const cards = section.querySelectorAll(`.${styles.workshopCard}`);
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add(styles.show);
          }, 200 * index);
        });
      }
    };
   
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="workshops" className={styles.workshopsSection} ref={sectionRef}>
      <div className={styles.blueprint}></div>
      
      <div className={styles.heading}>
        <h2>TECHNICAL <span>WORKSHOPS</span></h2>
        <div className={styles.underline}></div>
      </div>
      
      <div className={styles.description}>
        <p>Enhance your skills with our hands-on workshops led by industry experts. Learn practical applications of theoretical concepts and stay ahead in your civil engineering career.</p>
      </div>
      
      <div className={styles.cardsContainer}>
        {workshops.map((workshop) => (
          <div key={workshop.id} className={styles.workshopCard}>
            
            <div className={styles.imagine}>
            <Image src={workshop.img} alt={workshop.title} width={320} height={320} />
            </div>
            
            <div className={styles.cardHeader}>
              <div className={styles.structuralElements}>
                <div className={styles.truss}></div>
                <div className={styles.support}></div>
              </div>
              <h3>{workshop.title}</h3>
            </div>
            
            <div className={styles.cardBody}>
              <p>{workshop.description}</p>
              
              <div className={styles.workshopDetails}>
                <div className={styles.detail}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" fill="currentColor" />
                  </svg>
                  <span>{workshop.date}</span>
                </div>
                
                <div className={styles.detail}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor" />
                  </svg>
                  <span>{workshop.duration}</span>
                </div>
                
                <div className={styles.detail}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
                  </svg>
                  <span>{workshop.instructor}</span>
                </div>
                
                <div className={styles.detail}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z" fill="currentColor" />
                  </svg>
                  <span>{workshop.seats} Seats</span>
                </div>
              </div>
            </div>
            
            <div className={styles.cardFooter}>
              

            <Link className={styles.registerButton} href={`/RegistrationForm/workshop/${workshop.id}`}>Register</Link>

              

            </div>
          </div>
        ))}
      </div>
      
      {/* <div className={styles.viewAllContainer}>
        <button className={styles.viewAllButton}>
          View All Workshops
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor" />
          </svg>
        </button>
      </div> */}
    </section>
  );
};

export default WorkshopCards;