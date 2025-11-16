// src/pages/Index.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { useFocus } from '@/contexts/FocusContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Heart, Eye, Ear, Hand, Brain, Star, Users, Volume2, Gamepad2, Lightbulb } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { playNarration, playSound } = useAudio();
  const { isFocusMode, focusedElement } = useFocus();

  useEffect(() => {
    setTimeout(() => {
      playNarration(
        "Welcome to BodyQuest! Let's discover your amazing body and senses together. Click on any activity to start your adventure!"
      );
    }, 1000);
  }, [playNarration]);

  const activities = [
    {
      id: 'body-map',
      title: 'Body Map Adventure',
      description: 'Explore your body parts!',
      icon,
      color: 'bg-soft-pink',
      route: '/body-map',
      narration:
        "Let's explore your amazing body! Click on different body parts to learn what they do.",
      emoji: '🧍',
    },
    {
      id: 'senses',
      title: 'Five Senses Fun',
      description: 'See, hear, touch, taste, smell!',
      icon,
      color: 'bg-soft-blue',
      route: '/senses',
      narration:
        'Time to explore your five super senses! You can see, hear, touch, taste, and smell the world around you.',
      emoji: '👁️',
    },
    {
      id: 'emotions',
      title: 'Emotion Mirror',
      description: 'Learn about feelings!',
      icon,
      color: 'bg-soft-yellow',
      route: '/emotions',
      narration:
        "Let's learn about emotions and feelings! Happy, sad, excited - we all have different feelings.",
      emoji: '😊',
    },
    {
      id: 'games',
      title: 'Fun Games',
      description: 'Play educational games!',
      icon,
      color: 'bg-soft-purple',
      route: '/games',
      narration:
        'Time to play fun games! Learn while you play with exciting challenges.',
      emoji: '🎮',
    },
    {
      id: 'quizzes',
      title: 'Fun Quizzes',
      description: 'Test what you learned!',
      icon,
      color: 'bg-soft-green',
      route: '/quizzes',
      narration:
        "Ready for some fun quizzes? Let's see what you've learned about your body!",
      emoji: '⭐',
    },
    {
      id: 'progress',
      title: 'My Progress',
      description: 'See your achievements!',
      icon,
      color: 'bg-gradient-to-br from-purple-400 to-pink-400',
      route: '/progress',
      narration:
        "Look at all the amazing things you've learned! Check out your progress and collect stars.",
      emoji: '🏆',
    },
    // ✅ NEW GOOD HABITS CARD
    {
      id: 'good-habits',
      title: 'Good Habits',
      description: 'Turn off lights & fans after use!',
      icon, // using Lightbulb icon
      color: 'bg-soft-orange',
      route: '/good-habits',
      narration:
        "Let's learn a good habit! Always switch off the fan and light before leaving the room to save energy.",
      emoji: '💡',
    },
  ];

  const handleActivityClick = (activity) => {
    playSound('click');
    playNarration(activity.narration);
    setTimeout(() => {
      navigate(activity.route);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-warm-white p-4 relative">
      {/* Top right controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <AudioControls />
        <FocusToggle />
        <Button
          onClick={() => navigate('/parent-login')}
          variant="outline"
          size="sm"
          className="bodyquest-button text-sm min-h-10 min-w-20"
          aria-label="Parent login"
        >
          Parent
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl md-6xl font-bold text-soft-purple mb-4 gentle-bounce">
            🌟 BodyQuest 🌟
          </h1>
          <p className="text-2xl text-soft-blue mb-2 font-semibold">
            Discover Your Body and Senses
          </p>
          <p className="text-lg text-muted-foreground">
            A fun and safe place to learn about yourself!
          </p>
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 md-cols-2 lg-cols-3 gap-6 mb-8">
          {activities.map((activity) => {
            const Icon = activity.icon;
            const isHighlighted = isFocusMode && focusedElement === activity.id;

            return (
              <Card
                key={activity.id}
                className={`
                  child-friendly cursor-pointer transition-all duration-300 hover-105 
                  ${activity.color} border-2 border-white hover-xl
                  ${isHighlighted ? 'focus-highlight' : ''}
                  ${isFocusMode && !isHighlighted ? 'opacity-30' : ''}
                `}
                onClick={() => handleActivityClick(activity)}
                role="button"
                tabIndex={0}
                aria-label={`${activity.title}: ${activity.description}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleActivityClick(activity);
                  }
                }}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-4 relative">
                    <div className="text-4xl mb-2">{activity.emoji}</div>
                    <Icon
                      size={48}
                      className="mx-auto text-gray-700 sparkle"
                      strokeWidth={2.5}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-lg font-medium">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Narration Hint */}
        <div className="text-center">
          <Card className="child-friendly bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Volume2 className="text-soft-blue mr-2" size={24} />
                <span className="text-lg font-semibold text-soft-blue">
                  Listen for helpful narration!
                </span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to your learning adventure! Each activity is designed to
                be fun, safe, and easy to understand. Take your time and enjoy
                exploring!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
