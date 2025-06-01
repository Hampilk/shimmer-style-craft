
import React, { useState, useEffect } from 'react';

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    left: string; 
    top: string; 
    animationDelay: string; 
    animationDuration: string 
  }>>([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 8 + 's',
        animationDuration: (Math.random() * 8 + 4) + 's',
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-0.5 h-0.5 bg-indigo-400/40 rounded-full animate-float"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
