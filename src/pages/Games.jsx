
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home, Gamepad2, Puzzle, Target, Shuffle } from 'lucide-react';

const Games = () => {
  const navigate = useNavigate();
  const { playNarration } = useAudio();

  useEffect(() => {
    playNarration("Welcome to Fun Games! Here you can play exciting educational games while learning about your body and senses. Choose a game to start playing!");
  }, [playNarration]);

  const games = [
    { 
      name: 'Body Part Puzzle', 
      icon, 
      color: 'bg-soft-pink', 
      description: 'Put body parts in the right place!',
      emoji: '🧩',
      comingSoon,
      route: '/games/body-puzzle'
    },
    { 
      name: 'Sense Target', 
      icon, 
      color: 'bg-soft-blue', 
      description: 'Match senses with objects!',
      emoji: '🎯',
      comingSoon,
      route: '/games/sense-target'
    },
    { 
      name: 'Memory Match', 
      icon, 
      color: 'bg-soft-green', 
      description: 'Remember and match pairs!',
      emoji: '🔄',
      comingSoon,
      route: '/games/memory-match'
    },
    { 
      name: 'Emotion Detective', 
      icon, 
      color: 'bg-soft-yellow', 
      description: 'Find the matching emotions!',
      emoji: '🕵️',
      comingSoon,
      route: '/games/emotion-detective'
    }
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
          <h1 className="text-4xl md-5xl font-bold text-soft-purple mb-4">
            🎮 Fun Games 🎮
          </h1>
          <p className="text-xl text-soft-blue font-semibold">
            Play and learn at the same time!
          </p>
        </div>

        <div className="grid grid-cols-1 md-cols-2 gap-6">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <Card 
                key={game.name} 
                className={`child-friendly ${game.color} ${game.comingSoon ? 'opacity-70' : 'cursor-pointer hover-105'} transition-all`}
                onClick={() => !game.comingSoon && game.route && navigate(game.route)}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{game.emoji}</div>
                  <Icon size={48} className="mx-auto mb-4 text-gray-800" strokeWidth={3} />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{game.name}</h3>
                  <p className="text-gray-700 text-lg mb-2">{game.description}</p>
                  {game.comingSoon && (
                    <p className="text-gray-500 text-sm font-semibold">Coming Soon!</p>
                  )}
                  {!game.comingSoon && (
                    <p className="text-gray-800 text-sm font-semibold mt-2">▶ Click to Play!</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {}
        <div className="mt-8">
          <Card className="child-friendly bg-gradient-to-r from-green-100 to-blue-100 border-4 border-green-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-soft-purple mb-2">🌟 Adventure Awaits You! 🌟</h3>
              <p className="text-gray-700">
                Dive into amazing challenges, solve puzzles, and become a body expert while having tons of fun!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Games;
