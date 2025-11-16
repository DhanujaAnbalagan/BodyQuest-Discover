
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { Eye, Star } from 'lucide-react';

interface Question {
  id;
  question;
  options;
  correct;
  explanation;
}

const questions = [
  {
    id,
    question: "Which sense helps you see colors?",
    options"Hearing", "Sight", "Smell", "Touch"],
    correct,
    explanation: "Your eyes help you see all the beautiful colors around you!"
  },
  {
    id,
    question: "What sense do you use to hear music?",
    options"Hearing", "Taste", "Smell", "Sight"],
    correct,
    explanation: "Your ears help you hear wonderful sounds and music!"
  },
  {
    id,
    question: "Which sense tells you if food tastes sweet?",
    options"Touch", "Hearing", "Taste", "Sight"],
    correct,
    explanation: "Your tongue has taste buds that help you taste sweet, salty, and other flavors!"
  },
  {
    id,
    question: "What sense helps you feel if something is soft?",
    options"Touch", "Smell", "Hearing", "Taste"],
    correct,
    explanation: "Your skin and fingers help you feel textures like soft, rough, or smooth!"
  },
  {
    id,
    question: "Which sense helps you smell cookies baking?",
    options"Sight", "Hearing", "Smell", "Touch"],
    correct,
    explanation: "Your nose can smell delicious scents like fresh cookies!"
  }
];

interface SensesQuizProps {
  onComplete: () => void;
}

export const SensesQuiz<SensesQuizProps> = ({ onComplete }) => {
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
      playNarration("Nice try! " + questions[currentQuestion].explanation);
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
      playNarration(`Fantastic! You got ${score + (selectedAnswer === questions[currentQuestion].correct ? 1 )} out of ${questions.length} questions right!`);
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
    return (
      <Card className="child-friendly bg-soft-blue/80">
        <CardContent className="p-8 text-center">
          <Eye size={64} className="mx-auto mb-4 text-blue-600" />
          <h2 className="text-3xl font-bold text-soft-purple mb-4">
            Senses Quiz Complete! 🎉
          </h2>
          <p className="text-xl mb-4">
            You got {finalScore} out of {questions.length} questions right!
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart} className="bodyquest-button bg-soft-yellow">
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
            <div className="flex gap-1">
              {Array.from({ length.length }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < currentQuestion ? 'bg-soft-green' :
                    i === currentQuestion ? 'bg-soft-blue' : 'bg-gray-300'
                  }`}
                />
              ))}
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
          <div className="mb-6 p-4 bg-soft-blue/50 rounded-2xl">
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
      </CardContent>
    </Card>
  );
};
