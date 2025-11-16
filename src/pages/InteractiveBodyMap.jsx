
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { useFocus } from '@/contexts/FocusContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home } from 'lucide-react';


import headImage from '@/assets/body-parts/head.jpg';
import eyesImage from '@/assets/body-parts/eyes.jpg';
import noseImage from '@/assets/body-parts/nose.jpg';
import mouthImage from '@/assets/body-parts/mouth.jpg';
import heartImage from '@/assets/body-parts/heart.jpg';
import armsImage from '@/assets/body-parts/arms.jpg';
import handsImage from '@/assets/body-parts/hands.jpg';
import stomachImage from '@/assets/body-parts/stomach.jpg';
import legsImage from '@/assets/body-parts/legs.jpg';
import feetImage from '@/assets/body-parts/feet.jpg';
import earsImage from '@/assets/body-parts/ears.jpg';
import lungsImage from '@/assets/body-parts/lungs.jpg';
import brainImage from '@/assets/body-parts/brain.jpg';
import teethImage from '@/assets/body-parts/teeth.jpg';
import spineImage from '@/assets/body-parts/spine.jpg';

interface BodyPart {
  id;
  name;
  description;
  funFact;
  narration;
  image;
  bgColor;
}

const InteractiveBodyMap = () => {
  const navigate = useNavigate();
  const { playNarration, playSound } = useAudio();
  const { isFocusMode, focusedElement, setFocusedElement } = useFocus();
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);

  const bodyParts = [
    {
      id: 'head',
      name: 'Head',
      description: 'Your head holds your amazing brain!',
      funFact: 'Your brain has about 86 billion neurons - that\'s more than there are stars you can see in the sky!',
      narration: 'This is your head! It protects your wonderful brain, which helps you think, learn, and remember everything.',
      image,
      bgColor: 'bg-orange-100'
    },
    {
      id: 'eyes',
      name: 'Eyes',
      description: 'Your eyes help you see the world!',
      funFact: 'Your eyes can see millions of different colors, and they work like amazing cameras!',
      narration: 'These are your eyes! They help you see beautiful colors, read books, and watch your favorite shows.',
      image,
      bgColor: 'bg-blue-100'
    },
    {
      id: 'nose',
      name: 'Nose',
      description: 'Your nose helps you smell and breathe!',
      funFact: 'You can smell over 1 trillion different scents! Your nose is like a super detector.',
      narration: 'This is your nose! It helps you smell yummy food and beautiful flowers, and it helps you breathe too.',
      image,
      bgColor: 'bg-pink-100'
    },
    {
      id: 'mouth',
      name: 'Mouth',
      description: 'Your mouth helps you eat, drink, and talk!',
      funFact: 'Your tongue has about 10,000 taste buds that help you taste sweet, salty, sour, and bitter flavors!',
      narration: 'This is your mouth! It helps you eat delicious food, drink water, and say wonderful words.',
      image,
      bgColor: 'bg-red-100'
    },
    {
      id: 'heart',
      name: 'Heart',
      description: 'Your heart pumps blood through your body!',
      funFact: 'Your heart beats about 100,000 times every day! It never takes a break.',
      narration: 'This is your heart! It works like a strong pump, sending blood to every part of your body to keep you healthy.',
      image,
      bgColor: 'bg-red-200'
    },
    {
      id: 'arms',
      name: 'Arms',
      description: 'Your arms help you reach and carry things!',
      funFact: 'Your arms have 30 bones each and can lift things that weigh as much as you do!',
      narration: 'These are your arms! They help you reach high places, carry your backpack, and hug your family.',
      image,
      bgColor: 'bg-green-100'
    },
    {
      id: 'hands',
      name: 'Hands',
      description: 'Your hands help you touch and hold things!',
      funFact: 'Each hand has 27 bones and can make thousands of different movements!',
      narration: 'These are your hands! They help you touch, hold, draw, play, and give hugs to people you love.',
      image,
      bgColor: 'bg-yellow-100'
    },
    {
      id: 'stomach',
      name: 'Stomach',
      description: 'Your stomach helps digest the food you eat!',
      funFact: 'Your stomach can stretch to hold about as much food as a large soup bowl!',
      narration: 'This is your stomach! It helps break down your food so your body can use it to grow big and strong.',
      image,
      bgColor: 'bg-purple-100'
    },
    {
      id: 'legs',
      name: 'Legs',
      description: 'Your legs help you walk, run, and jump!',
      funFact: 'Your leg bones are the strongest bones in your body - stronger than concrete!',
      narration: 'These are your legs! They help you walk to school, run and play, and jump high like a kangaroo.',
      image,
      bgColor: 'bg-indigo-100'
    },
    {
      id: 'feet',
      name: 'Feet',
      description: 'Your feet help you balance and move around!',
      funFact: 'Each foot has 26 bones and over 7,000 nerve endings that help you feel the ground!',
      narration: 'These are your feet! They help you balance, walk, dance, and feel different textures on the ground.',
      image,
      bgColor: 'bg-teal-100'
    },
    {
      id: 'ears',
      name: 'Ears',
      description: 'Your ears help you hear sounds around you!',
      funFact: 'Your ears can hear sounds from 20 Hz to 20,000 Hz and help you balance too!',
      narration: 'These are your ears! They help you hear music, voices, and all the sounds around you.',
      image,
      bgColor: 'bg-cyan-100'
    },
    {
      id: 'lungs',
      name: 'Lungs',
      description: 'Your lungs help you breathe air!',
      funFact: 'You breathe about 20,000 times every day, and your lungs clean the air you breathe!',
      narration: 'These are your lungs! They help you breathe in fresh air and breathe out what your body doesn\'t need.',
      image,
      bgColor: 'bg-sky-100'
    },
    {
      id: 'brain',
      name: 'Brain',
      description: 'Your brain controls everything you do!',
      funFact: 'Your brain uses 20% of your body\'s energy and never stops working, even when you sleep!',
      narration: 'This is your brain! It controls your thoughts, memories, movements, and everything you do.',
      image,
      bgColor: 'bg-violet-100'
    },
    {
      id: 'teeth',
      name: 'Teeth',
      description: 'Your teeth help you chew food!',
      funFact: 'You have different types of teeth - sharp ones to cut and flat ones to grind food!',
      narration: 'These are your teeth! They help you bite and chew your food so you can swallow it safely.',
      image,
      bgColor: 'bg-slate-100'
    },
    {
      id: 'spine',
      name: 'Spine',
      description: 'Your spine supports your whole body!',
      funFact: 'Your spine has 33 bones called vertebrae that protect your spinal cord!',
      narration: 'This is your spine! It keeps you upright and protects the nerves that connect your brain to your body.',
      image,
      bgColor: 'bg-emerald-100'
    }
  ];

  useEffect(() => {
    playNarration("Welcome to the Body Map Adventure! Click on any body part to learn amazing facts about how your body works. Each part has its own special job!");
  }, [playNarration]);

  const handleBodyPartClick = (bodyPart) => {
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
          <h1 className="text-4xl md-5xl font-bold text-soft-blue mb-4">
            🧍 Body Map Adventure 🧍
          </h1>
          <p className="text-xl text-soft-purple font-semibold">
            Click on the glowing body parts to learn amazing facts!
          </p>
        </div>

        <div className="grid grid-cols-1 lg-cols-3 gap-6">
          {}
          <div className="lg-span-2">
            <Card className="child-friendly bg-gradient-to-b from-sky-50 to-blue-50 border-4 border-white shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-soft-purple mb-6 text-center">
                  🫁 Click on a Body Part to Learn! 🫁
                </h3>
                
                <div className="grid grid-cols-2 md-cols-3 gap-4">
                  {bodyParts.map((part) => {
                    const isHighlighted = isFocusMode && focusedElement === part.id;
                    const isSelected = selectedPart?.id === part.id;
                    
                    return (
                      <div
                        key={part.id}
                        onClick={() => handleBodyPartClick(part)}
                        className={`
                          ${part.bgColor} rounded-3xl p-4 cursor-pointer transition-all duration-300 border-4
                          ${isSelected ? 
                            'border-yellow-400 scale-105 shadow-2xl shadow-yellow-400/30' : 
                            'border-white hover-purple-300 hover-102 shadow-lg'
                          }
                          ${isHighlighted ? 'focus-highlight z-10' : ''}
                          ${isFocusMode && !isHighlighted ? 'opacity-30' : 'opacity-100'}
                        `}
                      >
                        <div className="text-center">
                          <div className="relative mb-3">
                            <img 
                              src={part.image} 
                              alt={part.name}
                              className="w-full h-24 object-cover rounded-2xl shadow-md"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-yellow-400/20 rounded-2xl animate-pulse"></div>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-800 text-lg">{part.name}</h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {}
          <div>
            {selectedPart ? (
              <Card className="child-friendly bg-gradient-to-br from-yellow-50 to-orange-50 min-h-[500px] border-4 border-yellow-200 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
                      <span className="text-4xl">✨</span>
                      {selectedPart.name}
                    </h2>
                    <Button
                      onClick={handleClose}
                      variant="outline"
                      size="sm"
                      className="bodyquest-button text-sm bg-white/80 hover-white"
                      aria-label="Close information"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="mb-6">
                    <img 
                      src={selectedPart.image} 
                      alt={selectedPart.name}
                      className="w-full h-40 object-cover rounded-3xl shadow-lg border-4 border-white"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/80 rounded-3xl p-4 border-2 border-purple-200">
                      <p className="text-lg text-gray-700 leading-relaxed font-medium">
                        {selectedPart.description}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-4 border-2 border-blue-200">
                      <h3 className="text-lg font-bold text-blue-600 mb-2 flex items-center gap-2">
                        <span className="text-xl">🌟</span>
                        Amazing Fact!
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-medium text-sm">
                        {selectedPart.funFact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="child-friendly bg-gradient-to-br from-blue-50 to-purple-50 min-h-[500px] border-4 border-blue-200 shadow-2xl">
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">👆</div>
                    <h2 className="text-2xl font-bold text-blue-600 mb-3">
                      Click on a body part!
                    </h2>
                    <p className="text-lg text-gray-600 font-medium mb-4">
                      Discover amazing facts about how your body works
                    </p>
                    <div className="flex justify-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
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
