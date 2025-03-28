
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
        // Launch multiple fireworks for a more impressive effect
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6, x: 0.3 + (i * 0.2) },
              colors: ['#FF8DC7', '#5B9BD5', '#4ECDC4', '#FFD166']
            });
          }, i * 300);
        }
        break;
        
      case 'stars':
        // Launch multiple star bursts
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            confetti({
              particleCount: 60,
              spread: 360,
              shapes: ['star'],
              colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
              origin: { y: 0.3 + (i * 0.2), x: 0.3 + (i * 0.2) }
            });
          }, i * 200);
        }
        break;
        
      case 'emoji':
        createEmojiRain(35); // Increased number of emojis
        break;
        
      case 'colorful-fireworks':
        shootFireworks();
        break;
        
      default:
        // Default to a simple confetti burst if no type specified
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        break;
    }
  };
  
  // Create emoji rain effect
  const createEmojiRain = (count: number = 20) => {
    const emojis = ['🎉', '🎊', '🎈', '🏆', '⭐', '✨', '💖', '🌟', '👏', '🥳', '🎯', '🔥'];
    for (let i = 0; i < count; i++) {
      const emoji = document.createElement('div');
      emoji.className = 'emoji-rain';
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = `${Math.random() * 100}vw`;
      emoji.style.fontSize = `${Math.random() * 20 + 20}px`;
      emoji.style.animationDuration = `${Math.random() * 2 + 1}s`;
      emoji.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
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
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#FC9E4F', '#A0CED9', '#FFC09F']
      }));
    }, 200); // Increased frequency
  };
  
  return (
    <>
      {showEffect && effectType === 'confetti' && (
        <Confetti
          recycle={false}
          numberOfPieces={300} // Increased from 200
          gravity={0.3} // Slower falling
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#FF8DC7', '#5B9BD5', '#4ECDC4', '#FFD166', '#FC9E4F', '#A0CED9', '#FFC09F']} // More colors
        />
      )}
      
      <style>
        {`
        .emoji-rain {
          position: fixed;
          top: -30px;
          z-index: 1000;
          animation: fall linear forwards;
          text-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
        
        @keyframes fall {
          to {
            transform: translateY(calc(100vh + 30px)) rotate(360deg);
          }
        }
        `}
      </style>
    </>
  );
};

export default CelebrationEffects;
