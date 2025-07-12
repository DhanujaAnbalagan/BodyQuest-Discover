
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home, Eye, Ear, Hand, Nose, Utensils } from 'lucide-react';

const SenseSimulator: React.FC = () => {
  const navigate = useNavigate();
  const { playNarration } = useAudio();

  useEffect(() => {
    playNarration("Welcome to the Five Senses Fun! Here you can explore how you see, hear, touch, taste, and smell the world around you. Each sense is like a superpower!");
  }, [playNarration]);

  const senses = [
    { name: 'Sight', icon: Eye, color: 'bg-soft-blue', description: 'See colors and shapes!' },
    { name: 'Hearing', icon: Ear, color: 'bg-soft-green', description: 'Listen to sounds!' },
    { name: 'Touch', icon: Hand, color: 'bg-soft-pink', description: 'Feel different textures!' },
    { name: 'Smell', icon: Nose, color: 'bg-soft-yellow', description: 'Smell wonderful scents!' },
    { name: 'Taste', icon: Utensils, color: 'bg-soft-purple', description: 'Taste yummy flavors!' }
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
              <Card key={sense.name} className={`child-friendly ${sense.color} cursor-pointer hover:scale-105 transition-all`}>
                <CardContent className="p-8 text-center">
                  <Icon size={64} className="mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-bold text-white mb-2">{sense.name}</h3>
                  <p className="text-white text-lg">{sense.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="child-friendly bg-white/80 mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-soft-purple mb-4">Coming Soon! 🚀</h2>
            <p className="text-lg text-gray-700">
              We're building amazing games and activities for each of your five senses. 
              Check back soon for interactive adventures!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SenseSimulator;
