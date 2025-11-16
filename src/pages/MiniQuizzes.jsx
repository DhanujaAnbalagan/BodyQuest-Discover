import React, { useEffect, useState } from 'react';
// Hooks (side effects) and useState (managing quiz state)

import { useNavigate } from 'react-router-dom';
// Routing hook for navigation between pages

import { Button } from '@/components/ui/button';
// Component Button

import { Card, CardContent } from '@/components/ui/card';
// Component Card UI

import { useAudio } from '@/contexts/AudioContext';
// Custom Hook shared audio/narration context

import { AudioControls } from '@/components/AudioControls';
// Component control buttons

import { FocusToggle } from '@/components/FocusToggle';
// Component mode toggle

import { Home, Brain, Heart, Eye, Star } from 'lucide-react';
// Icons icon components

// Components imported for conditional rendering
import { BodyPartsQuiz } from '@/components/quizzes/BodyPartsQuiz';
import { SensesQuiz } from '@/components/quizzes/SensesQuiz';
import { EmotionQuiz } from '@/components/quizzes/EmotionQuiz';
import { SuperQuiz } from '@/components/quizzes/SuperQuiz';

// Type alias allowed quiz IDs
type ActiveQuiz = 'body-parts' | 'senses' | 'emotions' | 'super' | null;

// Main Component
const MiniQuizzes = () => {
  const navigate = useNavigate(); // Hook
  const { playNarration } = useAudio(); // Hook context
  const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz>(null); // State quiz is active

  // Effect narration when entering quizzes page
  useEffect(() => {
    if (activeQuiz === null) {
      playNarration("Welcome to Fun Quizzes! Here you can test what you've learned about your amazing body and senses. Click on any quiz to start!");
    }
  }, [playNarration, activeQuiz]);

  // Data list with details for rendering
  const quizzes = [
    { id: 'body-parts' as const, name: 'Body Parts Quiz', icon, color: 'bg-soft-pink', questions: '5 questions', description: 'Test your body knowledge!', available, emoji: '💗' },
    { id: 'senses' as const, name: 'Senses Challenge', icon, color: 'bg-soft-blue', questions: '5 questions', description: 'How well do you know your senses?', available, emoji: '👁️' },
    { id: 'emotions' as const, name: 'Emotion Match', icon, color: 'bg-soft-green', questions: '4 questions', description: 'Match feelings with faces!', available, emoji: '😊' },
    { id: 'super' as const, name: 'Super Quiz', icon, color: 'bg-soft-yellow', questions: '10 questions', description: 'The ultimate body challenge!', available, emoji: '🌟' }
  ];

  // Event Handler selected quiz
  const handleQuizSelect = (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz?.available) {
      setActiveQuiz(quizId);
      playNarration(`Starting ${quiz.name}! Get ready to test your knowledge.`);
    }
  };

  // Event Handler quiz is completed
  const handleQuizComplete = () => {
    setActiveQuiz(null);
    playNarration("Great job completing the quiz! You can try another one or go back to exploring.");
  };

  // Conditional Rendering specific quiz page if active
  if (activeQuiz === 'emotions') {
    return (
      <div className="min-h-screen bg-warm-white p-4">
        {/* Navigation Button */}
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={() => setActiveQuiz(null)} variant="outline" className="bodyquest-button">
            <Home size={20} className="mr-2" />
            Back to Quizzes
          </Button>
        </div>

        {/* Audio & Focus Controls */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <AudioControls />
          <FocusToggle />
        </div>

        {/* Quiz Component */}
        <div className="max-w-4xl mx-auto pt-20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-soft-green mb-4">😊 Emotion Match 😊</h1>
          </div>
          <EmotionQuiz onComplete={handleQuizComplete} />
        </div>
      </div>
    );
  }

  // Repeat similar conditional rendering for 'super', 'body-parts', 'senses'
  // ...

  // Default quizzes menu
  return (
    <div className="min-h-screen bg-warm-white p-4">
      {/* Home Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Button onClick={() => navigate('/')} variant="outline" className="bodyquest-button">
          <Home size={20} className="mr-2" />
          Home
        </Button>
      </div>

      {/* Audio & Focus Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <AudioControls />
        <FocusToggle />
      </div>

      {/* Page Heading */}
      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md-5xl font-bold text-soft-green mb-4">🧩 Fun Quizzes 🧩</h1>
          <p className="text-xl text-soft-blue font-semibold">Test what you've learned in a fun way!</p>
        </div>

        {/* List Rendering quizzes */}
        <div className="grid grid-cols-1 md-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const Icon = quiz.icon;
            return (
              <Card key={quiz.id} className={`child-friendly ${quiz.color} cursor-pointer hover-105 transition-all`} onClick={() => handleQuizSelect(quiz.id)}>
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{quiz.emoji}</div>
                  <Icon size={48} className="mx-auto mb-4 text-gray-700" strokeWidth={2.5} />
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">{quiz.name}</h3>
                  <p className="text-gray-600 text-lg mb-2">{quiz.description}</p>
                  <p className="text-gray-500 text-sm">{quiz.questions}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Extra Info Card */}
        <div className="mt-8">
          <Card className="child-friendly bg-soft-green/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-soft-purple mb-2">🚀 Test Your Super Knowledge! 🚀</h3>
              <p className="text-gray-700">Show off what you've learned and discover how much you really know about your amazing body!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MiniQuizzes;
