"use client"
import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const canvasRef = useRef(null);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you for your message! We will get back to you soon.');
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    }, 2000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Blueprint grid animation
    const drawBlueprintGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(52, 152, 219, 0.15)';
      ctx.lineWidth = 0.5;
      const gridSize = 20;
      
      const offset = (Date.now() / 100) % gridSize;
      
      // Vertical lines
      for (let x = offset; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = offset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw structural elements - bridge-like arches
      ctx.strokeStyle = 'rgba(52, 201, 235, 0.3)';
      ctx.lineWidth = 2;
      
      const time = Date.now() / 2000;
      const amplitude = 50 + Math.sin(time) * 20;
      
      for (let i = 0; i < 3; i++) {
        const yPos = canvas.height * 0.4 + i * 60;
        
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = yPos + Math.sin(x * 0.02 + time + i) * amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.stroke();
      }
      
      requestAnimationFrame(drawBlueprintGrid);
    };
    
    drawBlueprintGrid();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
    <div id="contact" className={styles.contactSection}>
      <Navbar/>
      <canvas ref={canvasRef} className={styles.blueprintCanvas}></canvas>
      
      <div className={styles.contactContainer}>
        <div className={styles.contactHeader}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDesc}>
            Have questions about Prithvi'25? Reach out to us and our team will get back to you.
          </p>
        </div>
        
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <div className={styles.iconCircle}>
                  <span className={styles.iconInner}>📍</span>
                </div>
              </div>
              <div className={styles.infoText}>
                <h3>Our Location</h3>
                <p>Civil Engineering Department<br />University Campus<br />New Delhi, India</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <div className={styles.iconCircle}>
                  <span className={styles.iconInner}>📧</span>
                </div>
              </div>
              <div className={styles.infoText}>
                <h3>Email Us</h3>
                <p>info@prithvi25.org<br />support@prithvi25.org</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <div className={styles.iconCircle}>
                  <span className={styles.iconInner}>📱</span>
                </div>
              </div>
              <div className={styles.infoText}>
                <h3>Call Us</h3>
                <p>+91 98765 43210<br />+91 12345 67890</p>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              <h3>Connect With Us</h3>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}>
                  <div className={styles.socialCircle}>FB</div>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <div className={styles.socialCircle}>IG</div>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <div className={styles.socialCircle}>TW</div>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <div className={styles.socialCircle}>LI</div>
                </a>
              </div>
            </div>
          </div>
          
          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className={styles.formControl}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className={styles.formControl}
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className={styles.formControl}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className={styles.formControl}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <div className={styles.btnStructure}></div>
              </button>
              
              {submitMessage && (
                <div className={styles.messageSuccess}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
    <div><Footer/></div>
    
    </>
  );
};

export default Contact;