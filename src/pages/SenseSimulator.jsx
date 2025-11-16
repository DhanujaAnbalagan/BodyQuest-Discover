// Components functional component
import React, { useEffect } from 'react'; // Hook for lifecycle behavior
import { useNavigate } from 'react-router-dom'; // Router between pages
import { Button } from '@/components/ui/button'; // Reusable UI Component
import { Card, CardContent } from '@/components/ui/card'; // Reusable UI Component
import { useAudio } from '@/contexts/AudioContext'; // Custom Hook usage
import { AudioControls } from '@/components/AudioControls'; // Component player controls
import { FocusToggle } from '@/components/FocusToggle'; // Component toggle
import { Home, Eye, Ear, Hand, Smile, Utensils } from 'lucide-react'; // Icon components

// Static assets for images (JSX in UI)
import sightImage from '@/assets/senses/sight.jpg';
import hearingImage from '@/assets/senses/hearing.jpg';
import touchImage from '@/assets/senses/touch.jpg';
import smellImage from '@/assets/senses/smell.jpg';
import tasteImage from '@/assets/senses/taste.jpg';

// Components is a main screen component
const SenseSimulator = () => {
  const navigate = useNavigate(); // Router navigation hook
  const { playNarration } = useAudio(); // Custom Hook for audio narration

  // Hook runs once on component mount
  useEffect(() => {
    playNarration(
      "Welcome to the Five Senses Fun! Here you can explore how you see, hear, touch, taste, and smell the world around you. Each sense is like a superpower!"
    );
  }, [playNarration]);

  // Data of senses (Lists & Keys will be used in map)
  const senses = [
    { name: 'Sight', icon, color: 'bg-soft-blue', description: 'See colors and shapes!', image },
    { name: 'Hearing', icon, color: 'bg-soft-green', description: 'Listen to sounds!', image },
    { name: 'Touch', icon, color: 'bg-soft-pink', description: 'Feel different textures!', image },
    { name: 'Smell', icon, color: 'bg-soft-yellow', description: 'Smell wonderful scents!', image },
    { name: 'Taste', icon, color: 'bg-soft-purple', description: 'Taste yummy flavors!', image }
  ];

  // JSX UI Rendering
  return (
    <div className="min-h-screen bg-warm-white p-4">
      {/* Router Navigation button */}
      <div className="fixed top-4 left-4 z-50">
        <Button onClick={() => navigate('/')} variant="outline" className="bodyquest-button">
          <Home size={20} className="mr-2" />
          Home
        </Button>
      </div>

      {/* Components controls and accessibility toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <AudioControls />
        <FocusToggle />
      </div>

      <div className="max-w-6xl mx-auto pt-20">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md-5xl font-bold text-soft-green mb-4">
            👁️ Five Senses Fun 👂
          </h1>
          <p className="text-xl text-soft-blue font-semibold">
            Explore your amazing superpowers!
          </p>
        </div>

        {/* Lists & Keys sense cards dynamically */}
        <div className="grid grid-cols-1 md-cols-2 lg-cols-3 gap-6">
          {senses.map((sense) => {
            const Icon = sense.icon;
            return (
              <Card
                key={sense.name} // Keys key for each card
                className={`child-friendly ${sense.color} cursor-pointer hover-105 transition-all border-4 border-white shadow-2xl`}
              >
                <CardContent className="p-6 text-center">
                  {/* Image */}
                  <div className="mb-4">
                    <img
                      src={sense.image}
                      alt={sense.name}
                      className="w-24 h-24 mx-auto rounded-2xl shadow-lg object-cover border-2 border-white"
                    />
                  </div>
                  {/* Icon and Text */}
                  <Icon size={48} className="mx-auto mb-3 text-gray-800" strokeWidth={2.5} />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{sense.name}</h3>
                  <p className="text-gray-700 text-lg font-medium">{sense.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Extra Info Card */}
        <Card className="child-friendly bg-gradient-to-r from-purple-100 to-blue-100 mt-8 border-4 border-purple-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-soft-purple mb-4">
              🌈 Explore Your Amazing Senses! 🌈
            </h2>
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
