import React, { useEffect } from 'react';
// Hook for side effects (playing narration on load)

import { useNavigate } from 'react-router-dom';
// Routing hook for navigation

import { Button } from '@/components/ui/button';
// Component Button component

import { Card, CardContent } from '@/components/ui/card';
// Component layout for achievements display

import { useAudio } from '@/contexts/AudioContext';
// Custom Hook global audio/narration functionality

import { AudioControls } from '@/components/AudioControls';
// Component control buttons (play/pause narration)

import { FocusToggle } from '@/components/FocusToggle';
// Component focus mode

import { Home, Star, Trophy, Heart } from 'lucide-react';
// External Icons to represent achievements visually

// Main component earned and unearned achievements
const ProgressTracker = () => {
  const navigate = useNavigate(); // Hook
  const { playNarration } = useAudio(); // Hook narration

  // Effect welcome narration when page loads
  useEffect(() => {
    playNarration("Welcome to your progress tracker! Here you can see all the amazing things you've learned about your body and senses. Keep exploring to earn more stars!");
  }, [playNarration]);

  // Data of achievements to display (Lists & Keys concept will be used in rendering)
  const achievements = [
    { name: 'Body Explorer', icon, earned, description: 'Discovered body parts!' },
    { name: 'Sense Detective', icon, earned, description: 'Explored all five senses' },
    { name: 'Emotion Expert', icon, earned, description: 'Learned about feelings' },
    { name: 'Quiz Master', icon, earned, description: 'Completed all quizzes' }
  ];

  return (
    <div className="min-h-screen bg-warm-white p-4">
      {/* Navigation Button (Routing) */}
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

      {/* Audio & Focus Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <AudioControls />
        <FocusToggle />
      </div>

      {/* Page Header */}
      <div className="max-w-4xl mx-auto pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md-5xl font-bold text-soft-purple mb-4">
            🌟 My Progress Journey 🌟
          </h1>
          <p className="text-xl text-soft-blue font-semibold">
            Look at all the amazing things you're learning!
          </p>
        </div>

        {/* Lists & Keys achievements dynamically */}
        <div className="grid grid-cols-1 md-cols-2 gap-6 mb-8">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <Card
                key={achievement.name} // Key identifier
                className={`child-friendly ${
                  achievement.earned 
                    ? 'bg-soft-yellow border-4 border-yellow-300 sparkle' // Conditional Rendering changes if earned
                    : 'bg-gray-100 opacity-60'
                }`}
              >
                <CardContent className="p-6 text-center">
                  {/* Icon Component */}
                  <Icon 
                    size={48} 
                    className={`mx-auto mb-4 ${
                      achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                    }`} 
                  />
                  {/* Achievement Title */}
                  <h3 className="text-xl font-bold mb-2">
                    {achievement.name}
                  </h3>
                  {/* Achievement Description */}
                  <p className="text-gray-600">
                    {achievement.description}
                  </p>
                  {/* Conditional Rendering EARNED badge if achieved */}
                  {achievement.earned && (
                    <div className="mt-2 text-yellow-600 font-bold">
                      ⭐ EARNED! ⭐
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Motivational Message Card */}
        <Card className="child-friendly bg-soft-green/50 text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-soft-purple mb-4">
              Keep Learning! 🚀
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              You're doing such a great job learning about your amazing body! 
              Keep exploring to unlock more achievements and discover new things.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracker;
