
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home, Brain, Heart, Eye, Star } from 'lucide-react';

const MiniQuizzes: React.FC = () => {
  const navigate = useNavigate();
  const { playNarration } = useAudio();

  useEffect(() => {
    playNarration("Welcome to Fun Quizzes! Here you can test what you've learned about your amazing body and senses. Don't worry - these are just for fun!");
  }, [playNarration]);

  const quizzes = [
    { name: 'Body Parts Quiz', icon: Heart, color: 'bg-soft-pink', questions: '5 questions', description: 'Test your body knowledge!' },
    { name: 'Senses Challenge', icon: Eye, color: 'bg-soft-blue', questions: '5 questions', description: 'How well do you know your senses?' },
    { name: 'Emotion Match', icon: Brain, color: 'bg-soft-green', questions: '4 questions', description: 'Match feelings with faces!' },
    { name: 'Super Quiz', icon: Star, color: 'bg-soft-yellow', questions: '10 questions', description: 'The ultimate body challenge!' }
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
            🧩 Fun Quizzes 🧩
          </h1>
          <p className="text-xl text-soft-blue font-semibold">
            Test what you've learned in a fun way!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const Icon = quiz.icon;
            return (
              <Card key={quiz.name} className={`child-friendly ${quiz.color} cursor-pointer hover:scale-105 transition-all`}>
                <CardContent className="p-8 text-center">
                  <Icon size={64} className="mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-bold text-white mb-2">{quiz.name}</h3>
                  <p className="text-white text-lg mb-2">{quiz.description}</p>
                  <p className="text-white/80 text-sm">{quiz.questions}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="child-friendly bg-white/80 mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-soft-purple mb-4">Coming Soon! 🎮</h2>
            <p className="text-lg text-gray-700">
              We're creating fun and interactive quizzes for you! 
              Soon you'll be able to test your knowledge and earn rewards.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MiniQuizzes;
