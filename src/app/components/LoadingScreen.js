// components/LoadingScreen.js
import { useEffect, useRef } from 'react';
import styles from '../styles/LoadingScreen.module.css';

const LoadingScreen = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Blueprint drawing animation
    let progress = 0;
    const blueprintLines = [];
    
    for (let i = 0; i < 50; i++) {
      blueprintLines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        width: Math.random() * 2 + 0.5,
        progress: 0,
        speed: Math.random() * 0.02 + 0.005,
        color: `rgba(0, ${100 + Math.floor(Math.random() * 155)}, ${150 + Math.floor(Math.random() * 105)}, 0.7)`
      });
    }
    
    const drawBlueprint = () => {
      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(52, 152, 219, 0.2)';
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
      
      // Draw blueprint lines
      blueprintLines.forEach(line => {
        if (line.progress < 1) {
          line.progress += line.speed;
        }
        
        const currentX = line.x1 + (line.x2 - line.x1) * line.progress;
        const currentY = line.y1 + (line.y2 - line.y1) * line.progress;
        
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
      });
      
      // Draw text
      progress += 0.01;
      const textOpacity = Math.min(1, progress);
      ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity})`;
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('PRITHVI\'25', canvas.width / 2, canvas.height / 2 - 20);
      
      ctx.font = '18px Arial';
      ctx.fillStyle = `rgba(52, 152, 219, ${textOpacity})`;
      ctx.fillText('BUILDING THE FUTURE', canvas.width / 2, canvas.height / 2 + 20);
      
      // Progress bar
      ctx.fillStyle = `rgba(52, 152, 219, 0.8)`;
      const progressWidth = (canvas.width / 2) * Math.min(1, progress * 1.5);
      ctx.fillRect(canvas.width / 4, canvas.height / 2 + 50, progressWidth, 4);
      
      if (progress < 1) {
        requestAnimationFrame(drawBlueprint);
      }
    };
    
    drawBlueprint();
    
    return () => {
      // Cleanup
    };
  }, []);
  
  return (
    <div className={styles.loadingContainer}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  );
};

export default LoadingScreen;
