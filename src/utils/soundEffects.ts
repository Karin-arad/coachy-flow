
// Small utility to play sound effects in the app
const sounds = {
  ding: new Audio('/sounds/ding.mp3'),
  success: new Audio('/sounds/success.mp3'),
  click: new Audio('/sounds/click.mp3'),
};

export const playSound = (soundName: keyof typeof sounds) => {
  try {
    const sound = sounds[soundName];
    if (sound) {
      sound.currentTime = 0; // Reset to start
      sound.play().catch(err => {
        console.warn('Failed to play sound. This is likely due to browser autoplay policy.', err);
      });
    }
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

// Pre-load sounds to reduce latency when playing
export const preloadSounds = () => {
  Object.values(sounds).forEach(sound => {
    sound.load();
  });
};
