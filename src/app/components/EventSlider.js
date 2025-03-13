// components/EventSlider.js
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/EventSlider.module.css';

const EventSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const events = [
    {
      id: 1,
      title: "Starting Soon",
      image: "/images/bridge.jpg",
      time: "22 March, 9:00 AM",
      venue: "NIT Calicut",
      status: "Not Live"
    },
    // {
    //   id: 2,
    //   title: "Surveying Challenge",
    //   image: "/images/survey.jpg",
    //   time: "15 March, 2:00 PM",
    //   venue: "Engineering Ground",
    //   status: "Upcoming"
    // },
    // {
    //   id: 3,
    //   title: "Concrete Canoe Race",
    //   image: "/images/canoe.jpg",
    //   time: "16 March, 9:00 AM",
    //   venue: "University Lake",
    //   status: "Upcoming"
    // },
    // {
    //   id: 4,
    //   title: "Earthquake Resistant Building",
    //   image: "/images/earthquake.jpg",
    //   time: "16 March, 3:00 PM",
    //   venue: "Structures Lab",
    //   status: "Upcoming"
    // },
    // {
    //   id: 5,
    //   title: "Structural Engineering Hackathon",
    //   image: "/images/hackathon.jpg",
    //   time: "17 March, 10:00 AM",
    //   venue: "Innovation Center",
    //   status: "Upcoming"
    // }
  ];
  
  useEffect(() => {
    const slider = sliderRef.current;
    
    const handleScroll = () => {
      const sliderTop = slider.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sliderTop < windowHeight * 0.75) {
        slider.classList.add(styles.visible);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    // Auto slide
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [events.length]);
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };
  
  return (
    <section id="events" className={styles.eventsSection} ref={sliderRef}>
      <div className={styles.heading}>
        <h2>LIVE <span>EVENTS</span></h2>
        <div className={styles.underline}></div>
      </div>
      
      <div className={styles.sliderContainer}>
        <div className={styles.sliderControls}>
          <button className={styles.sliderButton} onClick={handlePrev}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
            </svg>
          </button>
          <button className={styles.sliderButton} onClick={handleNext}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" />
            </svg>
          </button>
        </div>
        
        <div className={styles.slider}>
          <div className={styles.sliderTrack} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {events.map((event, index) => (
              <div key={event.id} className={styles.slide}>
                <div className={styles.eventCard}>
                  <div className={styles.structuralElements}>
                    <div className={styles.beam}></div>
                    <div className={styles.column}></div>
                    <div className={styles.support}></div>
                  </div>
                  <div className={styles.eventImage}>
                    <div className={styles.imagePlaceholder}></div>
                    {event.status === "Live" && <div className={styles.liveTag}>LIVE</div>}
                  </div>
                  <div className={styles.eventInfo}>
                    <h3>{event.title}</h3>
                    <div className={styles.eventDetails}>
                      <div className={styles.eventTime}>
                        <svg width="16" height="16" viewBox="0 0 24 24">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" fill="currentColor" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      <div className={styles.eventVenue}>
                        <svg width="16" height="16" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                        </svg>
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    <button className={styles.eventButton}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.indicators}>
          {events.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSlider;