
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home, Star, Trophy, Heart } from 'lucide-react';

const ProgressTracker: React.FC = () => {
  const navigate = useNavigate();
  const { playNarration } = useAudio();

  useEffect(() => {
    playNarration("Welcome to your progress tracker! Here you can see all the amazing things you've learned about your body and senses. Keep exploring to earn more stars!");
  }, [playNarration]);

  const achievements = [
    { name: 'Body Explorer', icon: Heart, earned: true, description: 'Discovered body parts!' },
    { name: 'Sense Detective', icon: Star, earned: false, description: 'Explored all five senses' },
    { name: 'Emotion Expert', icon: Trophy, earned: false, description: 'Learned about feelings' },
    { name: 'Quiz Master', icon: Star, earned: false, description: 'Completed all quizzes' }
  ];

  return (
    <div className="min-h-screen bg-warm-white p-4">
      {/* Navigation */}
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

      {/* Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <AudioControls />
        <FocusToggle />
      </div>

      <div className="max-w-4xl mx-auto pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-soft-purple mb-4">
            🌟 My Progress Journey 🌟
          </h1>
          <p className="text-xl text-soft-blue font-semibold">
            Look at all the amazing things you're learning!
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card
                key={achievement.name}
                className={`child-friendly ${
                  achievement.earned 
                    ? 'bg-soft-yellow border-4 border-yellow-300 sparkle' 
                    : 'bg-gray-100 opacity-60'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <Icon 
                    size={48} 
                    className={`mx-auto mb-4 ${
                      achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                    }`} 
                  />
                  <h3 className="text-xl font-bold mb-2">
                    {achievement.name}
                  </h3>
                  <p className="text-gray-600">
                    {achievement.description}
                  </p>
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

        {/* Encouragement */}
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
