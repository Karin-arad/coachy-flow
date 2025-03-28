
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import confetti from 'canvas-confetti';

type EffectType = 'confetti' | 'fireworks' | 'stars' | 'emoji' | 'colorful-fireworks' | '';

interface CelebrationEffectsProps {
  effectType: EffectType;
  active: boolean;
  duration?: number;
}

const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({ effectType, active, duration = 3000 }) => {
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
        break;
        
      case 'fireworks':
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        break;
        
      case 'stars':
        confetti({
          particleCount: 50,
          spread: 360,
          shapes: ['star'],
          colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
        });
        break;
        
      case 'emoji':
        createEmojiRain();
        break;
        
      case 'colorful-fireworks':
        shootFireworks();
        break;
        
      default:
        break;
    }
  };
  
  // Create emoji rain effect
  const createEmojiRain = () => {
    const emojis = ['🎉', '🎊', '🎈', '🏆', '⭐', '✨', '💖', '🌟'];
    for (let i = 0; i < 20; i++) {
      const emoji = document.createElement('div');
      emoji.className = 'emoji-rain';
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = `${Math.random() * 100}vw`;
      emoji.style.fontSize = `${Math.random() * 20 + 20}px`;
      emoji.style.animationDuration = `${Math.random() * 2 + 1}s`;
      document.body.appendChild(emoji);
      
      setTimeout(() => {
        emoji.remove();
      }, 3000);
    }
  };
  
  // Create fireworks effect
  const shootFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Shoot fireworks from random positions
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
      }));
    }, 250);
  };
  
  return (
    <>
      {showEffect && effectType === 'confetti' && (
        <Confetti
          recycle={false}
          numberOfPieces={200}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
      
      <style>
        {`
        .emoji-rain {
          position: fixed;
          top: -30px;
          z-index: 1000;
          animation: fall linear forwards;
        }
        
        @keyframes fall {
          to {
            transform: translateY(calc(100vh + 30px));
          }
        }
        `}
      </style>
    </>
  );
};

export default CelebrationEffects;
