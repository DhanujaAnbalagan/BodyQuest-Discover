
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { Star, Trophy } from 'lucide-react';

interface Question {
  id;
  question;
  options;
  correct;
  explanation;
  category;
}

const questions = [
  {
    id,
    question: "What does your heart do?",
    options"Helps you think", "Pumps blood", "Helps you see", "Helps you hear"],
    correct,
    explanation: "Your heart pumps blood all around your body to keep you healthy!",
    category: "Body Parts"
  },
  {
    id,
    question: "Which sense helps you see colors?",
    options"Hearing", "Sight", "Smell", "Touch"],
    correct,
    explanation: "Your eyes help you see all the beautiful colors around you!",
    category: "Senses"
  },
  {
    id,
    question: "How do you feel when you get a present?",
    options"Sad", "Happy", "Angry", "Sleepy"],
    correct,
    explanation: "When we get presents, we usually feel happy and excited!",
    category: "Emotions"
  },
  {
    id,
    question: "How many fingers do you have on one hand?",
    options"Four", "Five", "Six", "Three"],
    correct,
    explanation: "You have five fingers on each hand - they help you grab and hold things!",
    category: "Body Parts"
  },
  {
    id,
    question: "What sense helps you hear music?",
    options"Hearing", "Taste", "Smell", "Sight"],
    correct,
    explanation: "Your ears help you hear wonderful sounds and music!",
    category: "Senses"
  },
  {
    id,
    question: "Which body part helps you walk?",
    options"Your arms", "Your head", "Your legs", "Your stomach"],
    correct,
    explanation: "Your legs are strong and help you walk, run, and jump!",
    category: "Body Parts"
  },
  {
    id,
    question: "What emotion is this? 😢",
    options"Happy", "Sad", "Surprised", "Angry"],
    correct,
    explanation: "That's a sad face! Sometimes we feel sad, and that's okay.",
    category: "Emotions"
  },
  {
    id,
    question: "Which sense tells you if food tastes sweet?",
    options"Touch", "Hearing", "Taste", "Sight"],
    correct,
    explanation: "Your tongue has taste buds that help you taste sweet, salty, and other flavors!",
    category: "Senses"
  },
  {
    id,
    question: "What helps you smell flowers?",
    options"Your ears", "Your nose", "Your mouth", "Your hands"],
    correct,
    explanation: "Your nose has special sensors that help you smell all kinds of scents!",
    category: "Senses"
  },
  {
    id,
    question: "How might you feel before bedtime?",
    options"Excited", "Tired", "Scared", "Angry"],
    correct,
    explanation: "Before bedtime, we usually feel tired and ready to sleep!",
    category: "Emotions"
  }
];

interface SuperQuizProps {
  onComplete: () => void;
}

export const SuperQuiz<SuperQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { playNarration, playSound } = useAudio();

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
      playSound('success');
      playNarration("Excellent! " + questions[currentQuestion].explanation);
    } else {
      playSound('error');
      playNarration("Good try! " + questions[currentQuestion].explanation);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      playNarration(questions[currentQuestion + 1].question);
    } else {
      setQuizCompleted(true);
      playSound('celebration');
      const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 );
      playNarration(`Amazing! You completed the Super Quiz and got ${finalScore} out of ${questions.length} questions right! You're a BodyQuest champion!`);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    playNarration(questions[0].question);
  };

  if (quizCompleted) {
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 );
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    return (
      <Card className="child-friendly bg-gradient-to-br from-yellow-200 to-orange-200">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <Trophy size={64} className="mx-auto mb-4 text-yellow-600" />
          <h2 className="text-3xl font-bold text-soft-purple mb-4">
            Super Quiz Champion! 🎉
          </h2>
          <p className="text-xl mb-2">
            You got {finalScore} out of {questions.length} questions right!
          </p>
          <p className="text-lg mb-4 text-gray-600">
            That's {percentage}% - You're amazing!
          </p>
          {percentage === 100 && (
            <p className="text-lg font-bold text-yellow-600 mb-4">
              🌟 Perfect Score! You're a true BodyQuest Master! 🌟
            </p>
          )}
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart} className="bodyquest-button bg-soft-blue">
              Try Again
            </Button>
            <Button onClick={onComplete} className="bodyquest-button bg-soft-green">
              Finish
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="child-friendly bg-white/90">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-soft-yellow px-2 py-1 rounded-full text-gray-600">
                {question.category}
              </span>
              <div className="flex gap-1">
                {Array.from({ length.length }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < currentQuestion ? 'bg-soft-green' :
                      i === currentQuestion ? 'bg-soft-blue' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-soft-purple mb-6">
            {question.question}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`
                bodyquest-button p-6 text-left h-auto ${
                selectedAnswer === null ? 'bg-soft-blue hover-soft-blue/80' :
                index === question.correct ? 'bg-soft-green' :
                index === selectedAnswer ? 'bg-soft-pink' : 'bg-gray-300'
              }
              `}
              disabled={selectedAnswer !== null}
            >
              <span className="text-lg">{option}</span>
            </Button>
          ))}
        </div>

        {showExplanation && (
          <div className="mb-6 p-4 bg-soft-yellow/50 rounded-2xl">
            <p className="text-lg text-gray-700">{question.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <div className="text-center">
            <Button onClick={handleNext} className="bodyquest-button bg-soft-purple">
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          </div>
        )}

        {}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-soft-green h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Progress: {currentQuestion + 1}/{questions.length}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
