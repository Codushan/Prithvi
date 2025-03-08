"use client"
import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import teamData from '../Data/teamData';
const OurTeam = () => {
  const [activeTab, setActiveTab] = useState(`tech`);
  const canvasRef = useRef(null);
  

  
  // Canvas animation for structural elements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext(`2d`);
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener(`resize`, resizeCanvas);
    resizeCanvas();
    
    let animationFrameId;
    
    const drawStructuralElements = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = `rgba(52, 152, 219, 0.1)`;
      ctx.lineWidth = 0.5;
      
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Animation time
      const time = Date.now() / 1000;
      
      // Draw bridge-like structures for tech team when active
      if (activeTab === `tech`) {
        // Bridge cables
        ctx.strokeStyle = `rgba(52, 201, 235, 0.3)`;
        ctx.lineWidth = 2;
        
        // Main bridge arch
        const archHeight = 150 + Math.sin(time * 0.5) * 10;
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.6);
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const normalizedX = x / canvas.width;
          const y = canvas.height * 0.6 - Math.sin(normalizedX * Math.PI) * archHeight;
          ctx.lineTo(x, y);
        }
        
        ctx.stroke();
        
        // Bridge cables/supports
        ctx.strokeStyle = `rgba(52, 235, 140, 0.3)`;
        ctx.lineWidth = 1;
        
        const cableCount = 12;
        const cableSpacing = canvas.width / cableCount;
        
        for (let i = 0; i <= cableCount; i++) {
          const x = i * cableSpacing;
          const normalizedX = x / canvas.width;
          const topY = canvas.height * 0.6 - Math.sin(normalizedX * Math.PI) * archHeight;
          
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, canvas.height * 0.6 + 100);
          ctx.stroke();
        }
        
        // Draw vibration wave for tech team (data flow)
        ctx.strokeStyle = `rgba(52, 235, 200, 0.4)`;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.3);
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = canvas.height * 0.3 + Math.sin(x * 0.02 + time * 2) * 20;
          ctx.lineTo(x, y);
        }
        
        ctx.stroke();
      } else {
        // Simpler structures for non-tech teams
        ctx.strokeStyle = `rgba(52, 152, 219, 0.2)`;
        ctx.lineWidth = 1.5;
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.5);
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = canvas.height * 0.5 + Math.sin(x * 0.01 + time) * 10;
          ctx.lineTo(x, y);
        }
        
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(drawStructuralElements);
    };
    
    drawStructuralElements();
    
    return () => {
      window.removeEventListener(`resize`, resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]);
  
  return (
    <>
    <section id="team" className={styles.teamSection}>
    <Navbar/>
      <canvas ref={canvasRef} className={styles.structuralCanvas}></canvas>
      
      <div className={styles.teamContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.sectionDesc}>
            Meet the brilliant minds behind Prithvi`25 who are building the future of civil engineering.
          </p>
        </div>
        
        <div className={styles.teamTabs}>
          <div 
            className={`${styles.teamTab} ${activeTab === `tech` ? styles.activeTab : ``}`}
            onClick={() => setActiveTab(`tech`)}
          >
            <span>Tech Team</span>
            <div className={styles.tabIndicator}></div>
          </div>
          
          <div 
            className={`${styles.teamTab} ${activeTab === `events` ? styles.activeTab : ``}`}
            onClick={() => setActiveTab(`events`)}
          >
            <span>Events Team</span>
            <div className={styles.tabIndicator}></div>
          </div>
          
          <div 
            className={`${styles.teamTab} ${activeTab === `marketing` ? styles.activeTab : ``}`}
            onClick={() => setActiveTab(`marketing`)}
          >
            <span>Marketing Team</span>
            <div className={styles.tabIndicator}></div>
          </div>
          
          <div 
            className={`${styles.teamTab} ${activeTab === `sponsors` ? styles.activeTab : ``}`}
            onClick={() => setActiveTab(`sponsors`)}
          >
            <span>Sponsors Team</span>
            <div className={styles.tabIndicator}></div>
          </div>
        </div>
        
        <div className={styles.teamGrid}>
          {teamData[activeTab].map((member, index) => (
            <div 
              key={index} 
              className={`${styles.teamCard} ${activeTab === `tech` ? styles.techCard : ``}`}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                transform: activeTab === `tech` ? `translateY(${Math.sin(index) * 10}px)` : `none`
              }}
            >
              <div className={styles.memberAvatar}>
                <div className={styles.avatarStructure}>
                  {/* Bridge-like element in avatar */}
                  <div className={styles.bridgeElement}></div>
                  <div className={styles.bridgeElement}></div>
                  <div className={styles.bridgeElement}></div>
                  
                  {/* Placeholder for member`s initials */}
                  <div className={styles.memberInitials}>
                    {member.name.split(` `).map(n => n[0]).join(``)}
                  </div>
                </div>
              </div>
              
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberDesc}>{member.description}</p>
                
                {activeTab === `tech` && (
                  <div className={styles.techDetails}>
                    <div className={styles.techSkills}>
                      <div className={styles.techSkill}></div>
                      <div className={styles.techSkill}></div>
                      <div className={styles.techSkill}></div>
                    </div>
                  </div>
                )}
              </div>
              
              {activeTab === `tech` && (
                <div className={styles.cornerStructure}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    
    <div><Footer/></div>
    </>
  );
};

export default OurTeam;