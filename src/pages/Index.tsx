
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { useFocus } from '@/contexts/FocusContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Heart, Eye, Ear, Hand, Brain, Star, Users, Volume2, Gamepad2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { playNarration, playSound } = useAudio();
  const { isFocusMode, focusedElement } = useFocus();

  useEffect(() => {

    setTimeout(() => {
      playNarration("Welcome to BodyQuest! Let's discover your amazing body and senses together. Click on any activity to start your adventure!");
    }, 1000);
  }, [playNarration]);

  const activities = [
    {
      id: 'body-map',
      title: 'Body Map Adventure',
      description: 'Explore your body parts!',
      icon: Heart,
      color: 'bg-soft-pink',
      route: '/body-map',
      narration: 'Let\'s explore your amazing body! Click on different body parts to learn what they do.',
      emoji: '🧍'
    },
    {
      id: 'senses',
      title: 'Five Senses Fun',
      description: 'See, hear, touch, taste, smell!',
      icon: Eye,
      color: 'bg-soft-blue',
      route: '/senses',
      narration: 'Time to explore your five super senses! You can see, hear, touch, taste, and smell the world around you.',
      emoji: '👁️'
    },
    {
      id: 'emotions',
      title: 'Emotion Mirror',
      description: 'Learn about feelings!',
      icon: Brain,
      color: 'bg-soft-yellow',
      route: '/emotions',
      narration: 'Let\'s learn about emotions and feelings! Happy, sad, excited - we all have different feelings.',
      emoji: '😊'
    },
    {
      id: 'games',
      title: 'Fun Games',
      description: 'Play educational games!',
      icon: Gamepad2,
      color: 'bg-soft-purple',
      route: '/games',
      narration: 'Time to play fun games! Learn while you play with exciting challenges.',
      emoji: '🎮'
    },
    {
      id: 'quizzes',
      title: 'Fun Quizzes',
      description: 'Test what you learned!',
      icon: Star,
      color: 'bg-soft-green',
      route: '/quizzes',
      narration: 'Ready for some fun quizzes? Let\'s see what you\'ve learned about your body!',
      emoji: '⭐'
    },
    {
      id: 'progress',
      title: 'My Progress',
      description: 'See your achievements!',
      icon: Users,
      color: 'bg-gradient-to-br from-purple-400 to-pink-400',
      route: '/progress',
      narration: 'Look at all the amazing things you\'ve learned! Check out your progress and collect stars.',
      emoji: '🏆'
    }
  ];

  const handleActivityClick = (activity: any) => {
    playSound('click');
    playNarration(activity.narration);
    setTimeout(() => {
      navigate(activity.route);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-warm-white p-4 relative">
      {}
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
        {}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl md:text-6xl font-bold text-soft-purple mb-4 gentle-bounce">
            🌟 BodyQuest 🌟
          </h1>
          <p className="text-2xl text-soft-blue mb-2 font-semibold">
            Discover Your Body and Senses
          </p>
          <p className="text-lg text-muted-foreground">
            A fun and safe place to learn about yourself!
          </p>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {activities.map((activity) => {
            const Icon = activity.icon;
            const isHighlighted = isFocusMode && focusedElement === activity.id;
            
            return (
              <Card
                key={activity.id}
                className={`
                  child-friendly cursor-pointer transition-all duration-300 hover:scale-105 
                  ${activity.color} border-2 border-white hover:shadow-xl
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
                    <Icon size={48} className="mx-auto text-gray-700 sparkle" strokeWidth={2.5} />
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

        {}
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
                Welcome to your learning adventure! Each activity is designed to be fun, 
                safe, and easy to understand. Take your time and enjoy exploring!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
