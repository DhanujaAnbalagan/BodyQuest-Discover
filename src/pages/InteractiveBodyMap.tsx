
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { useFocus } from '@/contexts/FocusContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { ArrowLeft, Home } from 'lucide-react';

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
      position: { x: 50, y: 8 },
      narration: 'This is your head! It protects your wonderful brain, which helps you think, learn, and remember everything.'
    },
    {
      id: 'eyes',
      name: 'Eyes',
      description: 'Your eyes help you see the world!',
      funFact: 'Your eyes can see millions of different colors, and they work like amazing cameras!',
      position: { x: 47, y: 12 },
      narration: 'These are your eyes! They help you see beautiful colors, read books, and watch your favorite shows.'
    },
    {
      id: 'ears',
      name: 'Ears',
      description: 'Your ears let you hear sounds!',
      funFact: 'Your ears help you balance too - not just hear! They have tiny crystals inside that help you stay upright.',
      position: { x: 40, y: 12 },
      narration: 'These are your ears! They help you hear music, voices, and all the wonderful sounds around you.'
    },
    {
      id: 'nose',
      name: 'Nose',
      description: 'Your nose helps you smell and breathe!',
      funFact: 'You can smell over 1 trillion different scents! Your nose is like a super detector.',
      position: { x: 50, y: 15 },
      narration: 'This is your nose! It helps you smell yummy food and beautiful flowers, and it helps you breathe too.'
    },
    {
      id: 'mouth',
      name: 'Mouth',
      description: 'Your mouth helps you eat, drink, and talk!',
      funFact: 'Your tongue has about 10,000 taste buds that help you taste sweet, salty, sour, and bitter flavors!',
      position: { x: 50, y: 18 },
      narration: 'This is your mouth! It helps you eat delicious food, drink water, and say wonderful words.'
    },
    {
      id: 'neck',
      name: 'Neck',
      description: 'Your neck connects your head to your body!',
      funFact: 'Your neck has 7 vertebrae that help you turn your head in many directions!',
      position: { x: 50, y: 23 },
      narration: 'This is your neck! It helps you turn your head and connects your brain to the rest of your body.'
    },
    {
      id: 'shoulders',
      name: 'Shoulders',
      description: 'Your shoulders help you move your arms!',
      funFact: 'Your shoulder is one of the most flexible joints in your body!',
      position: { x: 35, y: 28 },
      narration: 'These are your shoulders! They help you lift your arms, carry things, and give big hugs.'
    },
    {
      id: 'chest',
      name: 'Chest',
      description: 'Your chest protects your heart and lungs!',
      funFact: 'Your ribcage has 24 ribs that work like a protective cage for your important organs!',
      position: { x: 50, y: 35 },
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
      position: { x: 25, y: 45 },
      narration: 'These are your arms! They help you reach high places, carry your backpack, and hug your family.'
    },
    {
      id: 'hands',
      name: 'Hands',
      description: 'Your hands help you touch and hold things!',
      funFact: 'Each hand has 27 bones and can make thousands of different movements!',
      position: { x: 15, y: 55 },
      narration: 'These are your hands! They help you touch, hold, draw, play, and give hugs to people you love.'
    },
    {
      id: 'stomach',
      name: 'Stomach',
      description: 'Your stomach helps digest the food you eat!',
      funFact: 'Your stomach can stretch to hold about as much food as a large soup bowl!',
      position: { x: 50, y: 48 },
      narration: 'This is your stomach! It helps break down your food so your body can use it to grow big and strong.'
    },
    {
      id: 'legs',
      name: 'Legs',
      description: 'Your legs help you walk, run, and jump!',
      funFact: 'Your leg bones are the strongest bones in your body - stronger than concrete!',
      position: { x: 50, y: 68 },
      narration: 'These are your legs! They help you walk to school, run and play, and jump high like a kangaroo.'
    },
    {
      id: 'knees',
      name: 'Knees',
      description: 'Your knees help you bend your legs!',
      funFact: 'Your kneecap is actually a bone that protects the joint where your leg bones meet!',
      position: { x: 50, y: 75 },
      narration: 'These are your knees! They help you bend your legs to sit, jump, and run around.'
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
    playNarration("Welcome to the Body Map Adventure! Click on any part of the body to learn amazing facts about how your body works.");
  }, [playNarration]);

  const handleBodyPartClick = (bodyPart: BodyPart) => {
    playSound('click');
    setSelectedPart(bodyPart);
    setFocusedElement(bodyPart.id);
    playNarration(bodyPart.narration);
    
    // After narration, read the fun fact
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
      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="bodyquest-button mr-2"
          aria-label="Go back to home"
        >
          <Home size={20} className="mr-2" />
          Home
        </Button>
      </div>

      {/* Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <AudioControls />
        <FocusToggle />
      </div>

      <div className="max-w-6xl mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-soft-blue mb-4">
            🧍 Body Map Adventure 🧍
          </h1>
          <p className="text-xl text-soft-purple font-semibold">
            Click on body parts to learn amazing facts!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interactive Body Diagram */}
          <div className="relative">
            <Card className="child-friendly bg-soft-blue/20 min-h-[700px]">
              <CardContent className="p-8">
                <div className="relative w-full h-[600px] mx-auto">
                  {/* Human body figure using CSS shapes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Head */}
                      <div className="w-20 h-24 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full mx-auto relative">
                        {/* Hair */}
                        <div className="absolute -top-2 left-2 right-2 h-6 bg-amber-800 rounded-t-full"></div>
                        {/* Face features */}
                        <div className="absolute top-6 left-4 w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="absolute top-6 right-4 w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-pink-400"></div>
                        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-red-400 rounded-full"></div>
                      </div>
                      
                      {/* Neck */}
                      <div className="w-8 h-8 bg-gradient-to-b from-orange-200 to-orange-300 mx-auto"></div>
                      
                      {/* Torso */}
                      <div className="w-32 h-48 bg-gradient-to-b from-blue-200 to-blue-300 rounded-t-3xl mx-auto relative">
                        {/* Arms */}
                        <div className="absolute -left-8 top-4 w-6 h-32 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full transform -rotate-12"></div>
                        <div className="absolute -right-8 top-4 w-6 h-32 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full transform rotate-12"></div>
                        
                        {/* Hands */}
                        <div className="absolute -left-12 top-32 w-4 h-6 bg-orange-300 rounded-full"></div>
                        <div className="absolute -right-12 top-32 w-4 h-6 bg-orange-300 rounded-full"></div>
                      </div>
                      
                      {/* Legs */}
                      <div className="flex justify-center gap-2">
                        <div className="w-6 h-40 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-lg"></div>
                        <div className="w-6 h-40 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-lg"></div>
                      </div>
                      
                      {/* Feet */}
                      <div className="flex justify-center gap-2 mt-1">
                        <div className="w-8 h-4 bg-gray-800 rounded-full"></div>
                        <div className="w-8 h-4 bg-gray-800 rounded-full"></div>
                      </div>

                      {/* Interactive body part buttons */}
                      {bodyParts.map((part) => {
                        const isHighlighted = isFocusMode && focusedElement === part.id;
                        const isSelected = selectedPart?.id === part.id;
                        
                        return (
                          <button
                            key={part.id}
                            className={`
                              absolute w-6 h-6 rounded-full transition-all duration-300
                              hover:scale-125 cursor-pointer border-2 border-white
                              ${isSelected ? 'bg-soft-yellow scale-125 sparkle' : 'bg-soft-green'}
                              ${isHighlighted ? 'focus-highlight' : ''}
                              ${isFocusMode && !isHighlighted ? 'opacity-30' : ''}
                            `}
                            style={{
                              left: `${part.position.x}%`,
                              top: `${part.position.y}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                            onClick={() => handleBodyPartClick(part)}
                            aria-label={`Learn about ${part.name}`}
                          >
                            <span className="sr-only">{part.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Information Panel */}
          <div>
            {selectedPart ? (
              <Card className="child-friendly bg-soft-yellow/80 min-h-[300px]">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-bold text-soft-purple">
                      {selectedPart.name}
                    </h2>
                    <Button
                      onClick={handleClose}
                      variant="outline"
                      size="sm"
                      className="bodyquest-button text-sm"
                      aria-label="Close information"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-xl text-gray-700 leading-relaxed">
                      {selectedPart.description}
                    </p>
                    
                    <div className="bg-white/70 rounded-2xl p-4">
                      <h3 className="text-lg font-bold text-soft-blue mb-2">
                        🌟 Fun Fact!
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedPart.funFact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="child-friendly bg-white/80 min-h-[300px]">
                <CardContent className="p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👆</div>
                    <h2 className="text-2xl font-bold text-soft-blue mb-2">
                      Click on a body part!
                    </h2>
                    <p className="text-lg text-gray-600">
                      Discover amazing facts about how your body works
                    </p>
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
