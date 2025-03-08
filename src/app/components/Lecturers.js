// components/Lecturers.js
import { useRef, useEffect } from 'react';
import styles from '../styles/Lecturers.module.css';

const Lecturers = () => {
  const sectionRef = useRef(null);
  
  const lecturers = [
    {
      id: 1,
      name: "Dr. Amita Patel",
      title: "Professor of Smart Infrastructure",
      organization: "Massachusetts Institute of Technology",
      image: "/images/lecturer1.jpg",
      specialization: "Smart Cities & Infrastructure"
    },
    {
      id: 2,
      name: "Prof. James Chen",
      title: "Chair of Materials Engineering",
      organization: "Stanford University",
      image: "/images/lecturer2.jpg",
      specialization: "Advanced Construction Materials"
    },
    {
      id: 3,
      name: "Dr. Hiroshi Tanaka",
      title: "Professor of Structural Engineering",
      organization: "Tokyo Institute of Technology",
      image: "/images/lecturer3.jpg",
      specialization: "Earthquake Resistant Structures"
    },
    {
      id: 4,
      name: "Dr. Sarah Johnson",
      title: "Associate Professor of Sustainability",
      organization: "ETH Zurich",
      image: "/images/lecturer4.jpg",
      specialization: "Sustainable Urban Development"
    }
  ];
  
  useEffect(() => {
    const section = sectionRef.current;
    
    const handleScroll = () => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add(styles.visible);
        
        const profiles = section.querySelectorAll(`.${styles.lecturerProfile}`);
        profiles.forEach((profile, index) => {
          setTimeout(() => {
            profile.classList.add(styles.show);
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
    <section className={styles.lecturersSection} ref={sectionRef}>
      <div className={styles.structuralBg}>
        <div className={styles.pillar}></div>
        <div className={styles.pillar}></div>
        <div className={styles.beam}></div>
      </div>
      
      <div className={styles.heading}>
        <h2>DISTINGUISHED <span>SPEAKERS</span></h2>
        <div className={styles.underline}></div>
      </div>
      
      <div className={styles.description}>
        <p>Meet our distinguished speakers from renowned institutions around the world who will be sharing their expertise and insights during Prithvi'25.</p>
      </div>
      
      <div className={styles.lecturersGrid}>
        {lecturers.map((lecturer) => (
          <div key={lecturer.id} className={styles.lecturerProfile}>
            <div className={styles.structuralElement}>
              <div className={styles.beam}></div>
              <div className={styles.column}></div>
            </div>
            
            <div className={styles.imageContainer}>
              <div className={styles.imagePlaceholder}></div>
            </div>
            
            <div className={styles.profileInfo}>
              <h3>{lecturer.name}</h3>
              <h4>{lecturer.title}</h4>
              <p className={styles.organization}>{lecturer.organization}</p>
              <div className={styles.specialization}>
                <span>Specialization:</span>
                <span>{lecturer.specialization}</span>
              </div>
              {/* <button className={styles.viewProfileButton}>Full Profile</button> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Lecturers;