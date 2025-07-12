
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home, Brain, Heart, Eye, Star } from 'lucide-react';
import { BodyPartsQuiz } from '@/components/quizzes/BodyPartsQuiz';
import { SensesQuiz } from '@/components/quizzes/SensesQuiz';

type ActiveQuiz = 'body-parts' | 'senses' | 'emotions' | 'super' | null;

const MiniQuizzes: React.FC = () => {
  const navigate = useNavigate();
  const { playNarration } = useAudio();
  const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz>(null);

  useEffect(() => {
    if (activeQuiz === null) {
      playNarration("Welcome to Fun Quizzes! Here you can test what you've learned about your amazing body and senses. Click on any quiz to start!");
    }
  }, [playNarration, activeQuiz]);

  const quizzes = [
    { 
      id: 'body-parts' as const, 
      name: 'Body Parts Quiz', 
      icon: Heart, 
      color: 'bg-soft-pink', 
      questions: '5 questions', 
      description: 'Test your body knowledge!',
      available: true
    },
    { 
      id: 'senses' as const, 
      name: 'Senses Challenge', 
      icon: Eye, 
      color: 'bg-soft-blue', 
      questions: '5 questions', 
      description: 'How well do you know your senses?',
      available: true
    },
    { 
      id: 'emotions' as const, 
      name: 'Emotion Match', 
      icon: Brain, 
      color: 'bg-soft-green', 
      questions: '4 questions', 
      description: 'Match feelings with faces!',
      available: false
    },
    { 
      id: 'super' as const, 
      name: 'Super Quiz', 
      icon: Star, 
      color: 'bg-soft-yellow', 
      questions: '10 questions', 
      description: 'The ultimate body challenge!',
      available: false
    }
  ];

  const handleQuizSelect = (quizId: ActiveQuiz) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz?.available) {
      setActiveQuiz(quizId);
      playNarration(`Starting ${quiz.name}! Get ready to test your knowledge.`);
    } else {
      playNarration("This quiz is coming soon! Try the other available quizzes first.");
    }
  };

  const handleQuizComplete = () => {
    setActiveQuiz(null);
    playNarration("Great job completing the quiz! You can try another one or go back to exploring.");
  };

  if (activeQuiz === 'body-parts') {
    return (
      <div className="min-h-screen bg-warm-white p-4">
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={() => setActiveQuiz(null)} variant="outline" className="bodyquest-button">
            <Home size={20} className="mr-2" />
            Back to Quizzes
          </Button>
        </div>

        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <AudioControls />
          <FocusToggle />
        </div>

        <div className="max-w-4xl mx-auto pt-20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-soft-pink mb-4">
              💗 Body Parts Quiz 💗
            </h1>
          </div>
          <BodyPartsQuiz onComplete={handleQuizComplete} />
        </div>
      </div>
    );
  }

  if (activeQuiz === 'senses') {
    return (
      <div className="min-h-screen bg-warm-white p-4">
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={() => setActiveQuiz(null)} variant="outline" className="bodyquest-button">
            <Home size={20} className="mr-2" />
            Back to Quizzes
          </Button>
        </div>

        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <AudioControls />
          <FocusToggle />
        </div>

        <div className="max-w-4xl mx-auto pt-20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-soft-blue mb-4">
              👁️ Senses Challenge 👁️
            </h1>
          </div>
          <SensesQuiz onComplete={handleQuizComplete} />
        </div>
      </div>
    );
  }

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
              <Card 
                key={quiz.id} 
                className={`child-friendly ${quiz.color} cursor-pointer hover:scale-105 transition-all ${
                  !quiz.available ? 'opacity-60' : ''
                }`}
                onClick={() => handleQuizSelect(quiz.id)}
              >
                <CardContent className="p-8 text-center">
                  <Icon size={64} className="mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-bold text-white mb-2">{quiz.name}</h3>
                  <p className="text-white text-lg mb-2">{quiz.description}</p>
                  <p className="text-white/80 text-sm">{quiz.questions}</p>
                  {!quiz.available && (
                    <p className="text-white/90 text-sm mt-2 font-semibold">Coming Soon!</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Available vs Coming Soon Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="child-friendly bg-soft-green/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-soft-purple mb-2">✅ Ready to Play!</h3>
              <p className="text-gray-700">Body Parts Quiz and Senses Challenge are ready for you to enjoy!</p>
            </CardContent>
          </Card>
          
          <Card className="child-friendly bg-soft-yellow/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-soft-purple mb-2">🚧 Coming Soon!</h3>
              <p className="text-gray-700">More exciting quizzes are being created just for you!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MiniQuizzes;
