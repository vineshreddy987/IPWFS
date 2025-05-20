import React, { useEffect } from 'react';
import './HolographicCubes.css';

const HolographicCubes = ({ className }) => {
  useEffect(() => {
    // Animation logic for the cubes
    const cubes = document.querySelectorAll('.holographic-cube');
    
    cubes.forEach(cube => {
      // Add subtle floating animation
      setInterval(() => {
        cube.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px) rotateY(${Date.now() / 100 % 360}deg)`;
      }, 50);
    });
  }, []);

  return (
    <div className={`holographic-container ${className || ''}`}>
      <div className="grid-background"></div>
      <div className="cubes-container">
        {/* Left side cubes */}
        <div className="holographic-cube cube-left-1"></div>
        <div className="holographic-cube cube-left-2"></div>
        
        {/* Website name in the middle */}
        <div className="website-name">IPWFS</div>
        
        {/* Right side cubes */}
        <div className="holographic-cube cube-right-1"></div>
        <div className="holographic-cube cube-right-2"></div>
      </div>
    </div>
  );
};

export default HolographicCubes; 