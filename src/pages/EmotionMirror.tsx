
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home } from 'lucide-react';

const EmotionMirror: React.FC = () => {
  const navigate = useNavigate();
  const { playNarration } = useAudio();

  useEffect(() => {
    playNarration("Welcome to the Emotion Mirror! Here you can learn about different feelings and emotions. It's okay to have all kinds of feelings - they make you human!");
  }, [playNarration]);

  const emotions = [
    { name: 'Happy', emoji: '😊', color: 'bg-soft-yellow', description: 'Feeling joyful and cheerful!' },
    { name: 'Sad', emoji: '😢', color: 'bg-soft-blue', description: 'Feeling down, and that\'s okay!' },
    { name: 'Excited', emoji: '🤩', color: 'bg-soft-pink', description: 'Full of energy and enthusiasm!' },
    { name: 'Calm', emoji: '😌', color: 'bg-soft-green', description: 'Peaceful and relaxed!' },
    { name: 'Surprised', emoji: '😮', color: 'bg-soft-purple', description: 'Something unexpected happened!' },
    { name: 'Tired', emoji: '😴', color: 'bg-gray-200', description: 'Need some rest and sleep!' }
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
          <h1 className="text-4xl md:text-5xl font-bold text-soft-purple mb-4">
            🪞 Emotion Mirror 🪞
          </h1>
          <p className="text-xl text-soft-blue font-semibold">
            Discover and understand your feelings!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emotions.map((emotion) => (
            <Card key={emotion.name} className={`child-friendly ${emotion.color} cursor-pointer hover:scale-105 transition-all`}>
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">{emotion.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">{emotion.name}</h3>
                <p className="text-gray-600 text-lg">{emotion.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="child-friendly bg-white/80 mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-soft-purple mb-4">Remember! 💝</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              All emotions are normal and okay to have. It's important to recognize how you feel 
              and know that feelings can change throughout the day. You're doing great!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmotionMirror;
