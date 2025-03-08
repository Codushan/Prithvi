
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/CompetitionCards.module.css';
import competitions from '../Data/competitions'
import Link from 'next/link';


const CompetitionCards = () => {
  const sectionRef = useRef(null);
  
  
  
  useEffect(() => {
    const section = sectionRef.current;
    
    const handleScroll = () => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add(styles.visible);
        
        const cards = section.querySelectorAll(`.${styles.competitionCard}`);
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
    <section id="competitions" className={styles.competitionsSection} ref={sectionRef}>
      <div className={styles.heading}>
        <h2>ENGINEERING <span>COMPETITIONS</span></h2>
        <div className={styles.underline}></div>
      </div>
      
      <div className={styles.description}>
        <p>Put your civil engineering skills to the test in our exciting competitions. Solve real-world challenges, showcase your creativity, and win exciting prizes!</p>
      </div>
      
      <div className={styles.cardsContainer}>
        {competitions.map((competition) => (
          <div key={competition.id} className={styles.competitionCard}>
            <Image src={competition.img} alt={competition.title} width={320} height={300} />
            <div className={styles.structuralElements}>
              <div className={styles.beam}></div>
              <div className={styles.column}></div>
              <div className={styles.girder}></div>
            </div>
            <div className={styles.cardIcon}>{competition.icon}</div>
            <h3>{competition.title}</h3>
            <p>{competition.description}</p>
            <div className={styles.prize}>
              <span>Prize Pool:</span>
              <span className={styles.prizeAmount}>{competition.prize}</span>
            </div>

            <Link href={`/RegistrationForm?topic=${encodeURIComponent(competition.title)}&event=Competition`}><button className={styles.exploreButton}>Register</button></Link>
      

          </div>
        ))}
      </div>
      
      {/* <div className={styles.viewAllContainer}>
        <button className={styles.viewAllButton}>
          View All Competitions
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor" />
          </svg>
          </button>
      </div> */}
    </section>
  );
};

export default CompetitionCards;