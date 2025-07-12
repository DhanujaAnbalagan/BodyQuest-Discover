
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { useFocus } from '@/contexts/FocusContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home } from 'lucide-react';

interface BodyPart {
  id: string;
  name: string;
  description: string;
  funFact: string;
  position: { x: number; y: number };
  narration: string;
}

const InteractiveBodyMap: React.FC = () => {
  const navigate = useNavigate();
  const { playNarration, playSound } = useAudio();
  const { isFocusMode, focusedElement, setFocusedElement } = useFocus();
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);

  const bodyParts: BodyPart[] = [
    {
      id: 'head',
      name: 'Head',
      description: 'Your head holds your amazing brain!',
      funFact: 'Your brain has about 86 billion neurons - that\'s more than there are stars you can see in the sky!',
      position: { x: 50, y: 15 },
      narration: 'This is your head! It protects your wonderful brain, which helps you think, learn, and remember everything.'
    },
    {
      id: 'eyes',
      name: 'Eyes',
      description: 'Your eyes help you see the world!',
      funFact: 'Your eyes can see millions of different colors, and they work like amazing cameras!',
      position: { x: 47, y: 18 },
      narration: 'These are your eyes! They help you see beautiful colors, read books, and watch your favorite shows.'
    },
    {
      id: 'nose',
      name: 'Nose',
      description: 'Your nose helps you smell and breathe!',
      funFact: 'You can smell over 1 trillion different scents! Your nose is like a super detector.',
      position: { x: 50, y: 20 },
      narration: 'This is your nose! It helps you smell yummy food and beautiful flowers, and it helps you breathe too.'
    },
    {
      id: 'mouth',
      name: 'Mouth',
      description: 'Your mouth helps you eat, drink, and talk!',
      funFact: 'Your tongue has about 10,000 taste buds that help you taste sweet, salty, sour, and bitter flavors!',
      position: { x: 50, y: 22 },
      narration: 'This is your mouth! It helps you eat delicious food, drink water, and say wonderful words.'
    },
    {
      id: 'chest',
      name: 'Chest',
      description: 'Your chest protects your heart and lungs!',
      funFact: 'Your ribcage has 24 ribs that work like a protective cage for your important organs!',
      position: { x: 50, y: 40 },
      narration: 'This is your chest! It protects your heart and lungs, helping you breathe and stay alive.'
    },
    {
      id: 'heart',
      name: 'Heart',
      description: 'Your heart pumps blood through your body!',
      funFact: 'Your heart beats about 100,000 times every day! It never takes a break.',
      position: { x: 45, y: 38 },
      narration: 'This is your heart! It works like a strong pump, sending blood to every part of your body to keep you healthy.'
    },
    {
      id: 'arms',
      name: 'Arms',
      description: 'Your arms help you reach and carry things!',
      funFact: 'Your arms have 30 bones each and can lift things that weigh as much as you do!',
      position: { x: 30, y: 45 },
      narration: 'These are your arms! They help you reach high places, carry your backpack, and hug your family.'
    },
    {
      id: 'hands',
      name: 'Hands',
      description: 'Your hands help you touch and hold things!',
      funFact: 'Each hand has 27 bones and can make thousands of different movements!',
      position: { x: 20, y: 60 },
      narration: 'These are your hands! They help you touch, hold, draw, play, and give hugs to people you love.'
    },
    {
      id: 'stomach',
      name: 'Stomach',
      description: 'Your stomach helps digest the food you eat!',
      funFact: 'Your stomach can stretch to hold about as much food as a large soup bowl!',
      position: { x: 50, y: 50 },
      narration: 'This is your stomach! It helps break down your food so your body can use it to grow big and strong.'
    },
    {
      id: 'legs',
      name: 'Legs',
      description: 'Your legs help you walk, run, and jump!',
      funFact: 'Your leg bones are the strongest bones in your body - stronger than concrete!',
      position: { x: 50, y: 70 },
      narration: 'These are your legs! They help you walk to school, run and play, and jump high like a kangaroo.'
    },
    {
      id: 'feet',
      name: 'Feet',
      description: 'Your feet help you balance and move around!',
      funFact: 'Each foot has 26 bones and over 7,000 nerve endings that help you feel the ground!',
      position: { x: 50, y: 85 },
      narration: 'These are your feet! They help you balance, walk, dance, and feel different textures on the ground.'
    }
  ];

  useEffect(() => {
    playNarration("Welcome to the Body Map Adventure! Click on any glowing part of the body to learn amazing facts about how your body works.");
  }, [playNarration]);

  const handleBodyPartClick = (bodyPart: BodyPart) => {
    playSound('click');
    setSelectedPart(bodyPart);
    setFocusedElement(bodyPart.id);
    playNarration(bodyPart.narration);
    
    setTimeout(() => {
      playNarration(`Here's a fun fact: ${bodyPart.funFact}`);
    }, 4000);
  };

  const handleClose = () => {
    setSelectedPart(null);
    setFocusedElement(null);
    playSound('click');
  };

  return (
    <div className="min-h-screen bg-warm-white p-4">
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="bodyquest-button"
          aria-label="Go back to home"
        >
          <Home size={20} className="mr-2" />
          Home
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <AudioControls />
        <FocusToggle />
      </div>

      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-soft-blue mb-4">
            🧍 Body Map Adventure 🧍
          </h1>
          <p className="text-xl text-soft-purple font-semibold">
            Click on the glowing body parts to learn amazing facts!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <Card className="child-friendly bg-gradient-to-b from-sky-50 to-blue-50 min-h-[700px] border-4 border-white shadow-2xl">
              <CardContent className="p-8">
                <div className="relative w-full h-[600px] mx-auto flex items-center justify-center">
                  
                  {/* Professional Human Figure */}
                  <div className="relative">
                    {/* Head */}
                    <div className="w-24 h-28 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full mx-auto relative border-2 border-orange-400 shadow-lg">
                      <div className="absolute -top-3 left-3 right-3 h-8 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-full border border-amber-900"></div>
                      <div className="absolute top-8 left-5 w-3 h-3 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full shadow-inner"></div>
                      <div className="absolute top-8 right-5 w-3 h-3 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full shadow-inner"></div>
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gradient-to-b from-pink-300 to-pink-500 rounded-sm"></div>
                      <div className="absolute top-17 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gradient-to-b from-red-400 to-red-600 rounded-full"></div>
                    </div>
                    
                    {/* Neck */}
                    <div className="w-10 h-6 bg-gradient-to-b from-orange-200 to-orange-300 mx-auto border-x-2 border-orange-400"></div>
                    
                    {/* Torso */}
                    <div className="w-40 h-56 bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-500 rounded-t-3xl mx-auto relative border-4 border-indigo-600 shadow-xl">
                      {/* Left Arm */}
                      <div className="absolute -left-10 top-6 w-8 h-36 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full transform -rotate-12 border-2 border-orange-400 shadow-lg"></div>
                      {/* Right Arm */}
                      <div className="absolute -right-10 top-6 w-8 h-36 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full transform rotate-12 border-2 border-orange-400 shadow-lg"></div>
                      
                      {/* Left Hand */}
                      <div className="absolute -left-16 top-36 w-6 h-8 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full border border-orange-500 shadow-md"></div>
                      {/* Right Hand */}
                      <div className="absolute -right-16 top-36 w-6 h-8 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full border border-orange-500 shadow-md"></div>
                      
                      {/* Heart indicator */}
                      <div className="absolute left-8 top-12 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Legs */}
                    <div className="flex justify-center gap-3">
                      <div className="w-8 h-44 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-lg border-2 border-gray-700 shadow-lg"></div>
                      <div className="w-8 h-44 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-lg border-2 border-gray-700 shadow-lg"></div>
                    </div>
                    
                    {/* Feet */}
                    <div className="flex justify-center gap-3 mt-2">
                      <div className="w-10 h-6 bg-gradient-to-b from-gray-800 to-black rounded-full border border-gray-900 shadow-md"></div>
                      <div className="w-10 h-6 bg-gradient-to-b from-gray-800 to-black rounded-full border border-gray-900 shadow-md"></div>
                    </div>

                    {/* Interactive body part buttons with glow effect */}
                    {bodyParts.map((part) => {
                      const isHighlighted = isFocusMode && focusedElement === part.id;
                      const isSelected = selectedPart?.id === part.id;
                      
                      return (
                        <button
                          key={part.id}
                          className={`
                            absolute w-8 h-8 rounded-full transition-all duration-500 cursor-pointer
                            border-3 border-white shadow-lg backdrop-blur-sm
                            ${isSelected ? 
                              'bg-yellow-400 scale-150 animate-pulse shadow-yellow-400/50 shadow-2xl' : 
                              'bg-green-400 hover:bg-green-300 hover:scale-125 shadow-green-400/30'
                            }
                            ${isHighlighted ? 'focus-highlight z-50' : ''}
                            ${isFocusMode && !isHighlighted ? 'opacity-20' : 'opacity-90 hover:opacity-100'}
                            ${!isSelected && !isFocusMode ? 'animate-pulse' : ''}
                          `}
                          style={{
                            left: `${part.position.x}%`,
                            top: `${part.position.y}%`,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: isSelected ? 
                              '0 0 30px rgba(251, 191, 36, 0.8), inset 0 2px 4px rgba(255,255,255,0.3)' : 
                              '0 0 15px rgba(34, 197, 94, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)'
                          }}
                          onClick={() => handleBodyPartClick(part)}
                          aria-label={`Learn about ${part.name}`}
                        >
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {selectedPart ? (
              <Card className="child-friendly bg-gradient-to-br from-yellow-50 to-orange-50 min-h-[400px] border-4 border-yellow-200 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-4xl font-bold text-purple-600 flex items-center gap-3">
                      <span className="text-5xl">✨</span>
                      {selectedPart.name}
                    </h2>
                    <Button
                      onClick={handleClose}
                      variant="outline"
                      size="sm"
                      className="bodyquest-button text-sm bg-white/80 hover:bg-white"
                      aria-label="Close information"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white/80 rounded-3xl p-6 border-2 border-purple-200">
                      <p className="text-xl text-gray-700 leading-relaxed font-medium">
                        {selectedPart.description}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-6 border-2 border-blue-200">
                      <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                        <span className="text-2xl">🌟</span>
                        Amazing Fact!
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-medium">
                        {selectedPart.funFact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="child-friendly bg-gradient-to-br from-blue-50 to-purple-50 min-h-[400px] border-4 border-blue-200 shadow-2xl">
                <CardContent className="p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-6 animate-bounce">👆</div>
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">
                      Click on a glowing body part!
                    </h2>
                    <p className="text-xl text-gray-600 font-medium">
                      Discover amazing facts about how your body works
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveBodyMap;
