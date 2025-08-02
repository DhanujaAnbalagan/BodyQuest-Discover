
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home, Eye, Ear, Hand, Smile, Utensils } from 'lucide-react';


import sightImage from '@/assets/senses/sight.jpg';
import hearingImage from '@/assets/senses/hearing.jpg';
import touchImage from '@/assets/senses/touch.jpg';
import smellImage from '@/assets/senses/smell.jpg';
import tasteImage from '@/assets/senses/taste.jpg';

const SenseSimulator: React.FC = () => {
  const navigate = useNavigate();
  const { playNarration } = useAudio();

  useEffect(() => {
    playNarration("Welcome to the Five Senses Fun! Here you can explore how you see, hear, touch, taste, and smell the world around you. Each sense is like a superpower!");
  }, [playNarration]);

  const senses = [
    { name: 'Sight', icon: Eye, color: 'bg-soft-blue', description: 'See colors and shapes!', image: sightImage },
    { name: 'Hearing', icon: Ear, color: 'bg-soft-green', description: 'Listen to sounds!', image: hearingImage },
    { name: 'Touch', icon: Hand, color: 'bg-soft-pink', description: 'Feel different textures!', image: touchImage },
    { name: 'Smell', icon: Smile, color: 'bg-soft-yellow', description: 'Smell wonderful scents!', image: smellImage },
    { name: 'Taste', icon: Utensils, color: 'bg-soft-purple', description: 'Taste yummy flavors!', image: tasteImage }
  ];

  return (
    <div className="min-h-screen bg-warm-white p-4">
      <div className="fixed top-4 left-4 z-50">
        <Button onClick={() => navigate('/')} variant="outline" className="bodyquest-button">
          <Home size={20} className="mr-2" />
          Home
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <AudioControls />
        <FocusToggle />
      </div>

      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-soft-green mb-4">
            👁️ Five Senses Fun 👂
          </h1>
          <p className="text-xl text-soft-blue font-semibold">
            Explore your amazing superpowers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {senses.map((sense) => {
            const Icon = sense.icon;
            return (
              <Card key={sense.name} className={`child-friendly ${sense.color} cursor-pointer hover:scale-105 transition-all border-4 border-white shadow-2xl`}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <img 
                      src={sense.image} 
                      alt={sense.name}
                      className="w-24 h-24 mx-auto rounded-2xl shadow-lg object-cover border-2 border-white"
                    />
                  </div>
                  <Icon size={48} className="mx-auto mb-3 text-gray-800" strokeWidth={2.5} />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{sense.name}</h3>
                  <p className="text-gray-700 text-lg font-medium">{sense.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="child-friendly bg-gradient-to-r from-purple-100 to-blue-100 mt-8 border-4 border-purple-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-soft-purple mb-4">🌈 Explore Your Amazing Senses! 🌈</h2>
            <p className="text-lg text-gray-700">
              Each of your five senses is like a superpower that helps you discover the world around you! 
              Click on each sense to learn how they work together to keep you safe and help you enjoy life.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SenseSimulator;
