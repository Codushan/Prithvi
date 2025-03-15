
import { useRef, useEffect } from 'react';
import styles from '../styles/LectureCards.module.css';
import Image from 'next/image';
import lectures from '../Data/lectures'
import Link from 'next/link';


const LectureCards = () => {
  const sectionRef = useRef(null);
  
  
  
  useEffect(() => {
    const section = sectionRef.current;
    
    const handleScroll = () => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add(styles.visible);
        
        const cards = section.querySelectorAll(`.${styles.lectureCard}`);
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
    <section id="lectures" className={styles.lecturesSection} ref={sectionRef}>
      <div className={styles.heading}>
        <h2>EXPERT <span>LECTURES</span></h2>
        <div className={styles.underline}></div>
      </div>
      
      <div className={styles.description}>
        <p>Gain insights from renowned experts in the field of civil engineering. Our distinguished speakers will share their knowledge on cutting-edge technologies and innovations.</p>
      </div>
      
      <div className={styles.cardsContainer}>
        {lectures.map((lecture) => (
          <div key={lecture.id} className={styles.lectureCard}>
            
            <div className={styles.imagine}>
            <Image src={lecture.img} alt="Lecture Image" width={320} height={320} />
            </div>
            
            <div className={styles.structuralElements}>
              <div className={styles.column}></div>
              <div className={styles.arch}></div>
            </div>
            
            <div className={styles.cardContent}>
              <h3>{lecture.title}</h3>
              
              <div className={styles.speakerInfo}>
                <div className={styles.speakerAvatar}>
                  <div className={styles.avatarPlaceholder}></div>
                </div>
                <div className={styles.speakerDetails}>
                  <h4>{lecture.speaker}</h4>
                  <p>{lecture.organization}</p>
                </div>
              </div>
              
              <div className={styles.lectureDetails}>
                <div className={styles.detail}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" fill="currentColor" />
                  </svg>
                  <span>{lecture.date}</span>
                </div>
                
                <div className={styles.detail}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor" />
                  </svg>
                  <span>{lecture.time}</span>
                </div>
                
                <div className={styles.detail}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                  </svg>
                  <span>{lecture.venue}</span>
                </div>
              </div>
              
              <div className={styles.cardActions}>
                {/* <button className={styles.moreButton}>More Info</button> */}

              <Link className={styles.attendButton} href={`/RegistrationForm/lecture/${lecture.id}`}>Attend</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* <div className={styles.viewAllContainer}>
        <button className={styles.viewAllButton}>
          View All Lectures
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor" />
          </svg>
        </button>
      </div> */}
    </section>
  );
};

export default LectureCards;