
import React, { createContext, useContext, useState, useRef } from 'react';

interface AudioContextType {
  isAudioEnabled;
  volume;
  isMusicEnabled;
  toggleAudio: () => void;
  setVolume: (volume) => void;
  toggleMusic: () => void;
  playNarration: (text) => void;
  playSound: (soundType: 'success' | 'error' | 'click' | 'celebration') => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider<{ children.ReactNode }> = ({ children }) => {
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

  const setVolume = (newVolume) => {
    setVolumeState(newVolume);
  };

  const toggleMusic = () => {
    setIsMusicEnabled(!isMusicEnabled);
  };

  const playNarration = (text) => {
    if (!isAudioEnabled) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = volume;
    

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 

      voice.name.includes('Google UK English Female') || 
      voice.name.includes('Microsoft Zira') ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Google US English Female') ||
      voice.name.includes('Microsoft Hazel') ||
      voice.name.includes('Karen') ||
      voice.name.includes('Victoria') ||
      voice.name.includes('Kate') ||
      voice.name.includes('Fiona') ||

      (voice.name.toLowerCase().includes('female') && voice.lang.startsWith('en')) ||

      voice.name.toLowerCase().includes('susan') ||
      voice.name.toLowerCase().includes('mary') ||
      voice.name.toLowerCase().includes('sarah') ||
      voice.name.toLowerCase().includes('alice')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
      console.log('Using female voice:', femaleVoice.name);
    } else {

      const anyFemaleVoice = voices.find(voice => 
        voice.lang.startsWith('en') && !voice.name.toLowerCase().includes('male')
      );
      if (anyFemaleVoice) {
        utterance.voice = anyFemaleVoice;
        console.log('Using fallback female voice:', anyFemaleVoice.name);
      }
    }
    
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const playSound = (soundType: 'success' | 'error' | 'click' | 'celebration') => {
    if (!isAudioEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const frequencies = {
      success, 659, 784], // C, E, G
      error, 196], // A, G
      click, // High click
      celebration, 659, 784, 1047] // C, E, G, C
    };
    
    const freqs = frequencies[soundType];
    const duration = soundType === 'celebration' ? 0.2 .1;
    
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
