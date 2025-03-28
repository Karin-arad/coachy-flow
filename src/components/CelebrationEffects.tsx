
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import confetti from 'canvas-confetti';

type EffectType = 'confetti' | 'fireworks' | 'stars' | 'emoji' | 'colorful-fireworks' | '';

interface CelebrationEffectsProps {
  effectType: EffectType;
  active: boolean;
  duration?: number;
}

const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({ effectType, active, duration = 1500 }) => {
  const [showEffect, setShowEffect] = useState(false);
  
  useEffect(() => {
    if (active) {
      triggerEffect();
      
      // Auto-disable the effect after duration
      const timer = setTimeout(() => {
        setShowEffect(false);
      }, duration);
      
      return () => clearTimeout(timer);
    } else {
      setShowEffect(false);
    }
  }, [active, effectType, duration]);
  
  const triggerEffect = () => {
    switch (effectType) {
      case 'confetti':
        setShowEffect(true);
        
        // Simplified confetti burst
        confetti({
          particleCount: 80, // Reduced from 150
          spread: 60, // Reduced from 100
          origin: { y: 0.5, x: 0.5 },
          colors: ['#FF8DC7', '#5B9BD5', '#4ECDC4', '#FFD166']
        });
        break;
        
      case 'fireworks':
        // Simplified fireworks
        confetti({
          particleCount: 100, // Reduced from 200
          spread: 70, // Reduced from 100
          origin: { y: 0.6, x: 0.5 },
          colors: ['#FF8DC7', '#5B9BD5', '#4ECDC4', '#FFD166']
        });
        break;
        
      case 'stars':
        // Simplified star bursts
        confetti({
          particleCount: 40, // Reduced from 80
          spread: 180, // Reduced from 360
          shapes: ['star'],
          colors: ['#FFE400', '#FFBD00', '#E89400'],
          origin: { y: 0.5, x: 0.5 }
        });
        break;
        
      case 'emoji':
        createEmojiRain(20); // Reduced from 60
        break;
        
      case 'colorful-fireworks':
        shootFireworks();
        break;
        
      default:
        // Default to a simple confetti burst if no type specified
        confetti({
          particleCount: 50, // Reduced from 150
          spread: 60, // Reduced from 100
          origin: { y: 0.6 }
        });
        break;
    }
  };
  
  // Create emoji rain effect - simplified
  const createEmojiRain = (count: number = 10) => {
    const emojis = ['🎉', '🎊', '🎈', '⭐', '✨', '💖', '🌟'];
    for (let i = 0; i < count; i++) {
      const emoji = document.createElement('div');
      emoji.className = 'emoji-rain';
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = `${Math.random() * 100}vw`;
      emoji.style.fontSize = `${Math.random() * 20 + 20}px`; // Reduced size
      emoji.style.animationDuration = `${Math.random() * 2 + 1}s`; // Reduced duration
      emoji.style.transform = `rotate(${Math.random() * 30 - 15}deg)`; // Reduced rotation
      document.body.appendChild(emoji);
      
      setTimeout(() => {
        emoji.remove();
      }, 3000); // Reduced from 4000
    }
  };
  
  // Create fireworks effect - simplified
  const shootFireworks = () => {
    const duration = 2 * 1000; // Reduced from 5 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 180, ticks: 50, zIndex: 0 }; // Reduced values

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration); // Reduced from 80
      
      // Shoot fireworks from random positions
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
      }));
    }, 250); // Reduced frequency
  };
  
  return (
    <>
      {showEffect && effectType === 'confetti' && (
        <Confetti
          recycle={false}
          numberOfPieces={200} // Reduced from 500
          gravity={0.3} // Increased for faster falling
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#FF8DC7', '#5B9BD5', '#4ECDC4', '#FFD166', '#FC9E4F']} // Fewer colors
          confettiSource={{
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: 0
          }}
        />
      )}
      
      <style>
        {`
        .emoji-rain {
          position: fixed;
          top: -30px;
          z-index: 1000;
          animation: fall linear forwards;
          text-shadow: 0 0 5px rgba(255,255,255,0.5);
        }
        
        @keyframes fall {
          to {
            transform: translateY(calc(100vh + 30px)) rotate(180deg);
          }
        }
        `}
      </style>
    </>
  );
};

export default CelebrationEffects;
