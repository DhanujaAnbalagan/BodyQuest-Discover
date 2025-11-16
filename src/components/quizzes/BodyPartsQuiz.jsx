
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { Heart, Star } from 'lucide-react';

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
    question: "What does your heart do?",
    options"Helps you think", "Pumps blood", "Helps you see", "Helps you hear"],
    correct,
    explanation: "Your heart pumps blood all around your body to keep you healthy!"
  },
  {
    id,
    question: "How many eyes do you have?",
    options"One", "Two", "Three", "Four"],
    correct,
    explanation: "You have two eyes that work together to help you see the world!"
  },
  {
    id,
    question: "What helps you smell flowers?",
    options"Your ears", "Your nose", "Your mouth", "Your hands"],
    correct,
    explanation: "Your nose has special sensors that help you smell all kinds of scents!"
  },
  {
    id,
    question: "Which body part helps you walk?",
    options"Your arms", "Your head", "Your legs", "Your stomach"],
    correct,
    explanation: "Your legs are strong and help you walk, run, and jump!"
  },
  {
    id,
    question: "What do you use to pick up toys?",
    options"Your feet", "Your hands", "Your nose", "Your ears"],
    correct,
    explanation: "Your hands have fingers that can grab and hold things!"
  }
];

interface BodyPartsQuizProps {
  onComplete: () => void;
}

export const BodyPartsQuiz<BodyPartsQuizProps> = ({ onComplete }) => {
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
      playNarration("Correct! " + questions[currentQuestion].explanation);
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
      playNarration(`Great job! You got ${score + (selectedAnswer === questions[currentQuestion].correct ? 1 )} out of ${questions.length} questions right!`);
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
      <Card className="child-friendly bg-soft-yellow/80">
        <CardContent className="p-8 text-center">
          <Star size={64} className="mx-auto mb-4 text-yellow-600" />
          <h2 className="text-3xl font-bold text-soft-purple mb-4">
            Quiz Complete! 🎉
          </h2>
          <p className="text-xl mb-4">
            You got {finalScore} out of {questions.length} questions right!
          </p>
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
      </CardContent>
    </Card>
  );
};
