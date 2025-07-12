
import React, { createContext, useContext, useState, useRef } from 'react';

interface AudioContextType {
  isAudioEnabled: boolean;
  volume: number;
  isMusicEnabled: boolean;
  toggleAudio: () => void;
  setVolume: (volume: number) => void;
  toggleMusic: () => void;
  playNarration: (text: string) => void;
  playSound: (soundType: 'success' | 'error' | 'click' | 'celebration') => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [volume, setVolumeState] = useState(0.7);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (!isAudioEnabled) {
      window.speechSynthesis.cancel();
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const toggleMusic = () => {
    setIsMusicEnabled(!isMusicEnabled);
  };

  const playNarration = (text: string) => {
    if (!isAudioEnabled) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.volume = volume;
    
    // Try to use a child-friendly voice
    const voices = window.speechSynthesis.getVoices();
    const childVoice = voices.find(voice => 
      voice.name.includes('Google UK English Female') || 
      voice.name.includes('Microsoft Zira') ||
      voice.name.includes('Samantha')
    );
    
    if (childVoice) {
      utterance.voice = childVoice;
    }
    
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const playSound = (soundType: 'success' | 'error' | 'click' | 'celebration') => {
    if (!isAudioEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const frequencies = {
      success: [523, 659, 784], // C, E, G
      error: [220, 196], // A, G
      click: [800], // High click
      celebration: [523, 659, 784, 1047] // C, E, G, C
    };
    
    const freqs = frequencies[soundType];
    const duration = soundType === 'celebration' ? 0.2 : 0.1;
    
    freqs.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      }, index * 100);
    });
  };

  return (
    <AudioContext.Provider
      value={{
        isAudioEnabled,
        volume,
        isMusicEnabled,
        toggleAudio,
        setVolume,
        toggleMusic,
        playNarration,
        playSound,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
