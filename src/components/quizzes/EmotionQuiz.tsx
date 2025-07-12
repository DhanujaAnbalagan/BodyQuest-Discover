
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { Heart, Star } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: { text: string; emoji: string }[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "How do you feel when you get a present?",
    options: [
      { text: "Happy", emoji: "😊" },
      { text: "Sad", emoji: "😢" },
      { text: "Angry", emoji: "😠" },
      { text: "Sleepy", emoji: "😴" }
    ],
    correct: 0,
    explanation: "When we get presents, we usually feel happy and excited!"
  },
  {
    id: 2,
    question: "What feeling matches this face? 😢",
    options: [
      { text: "Happy", emoji: "😊" },
      { text: "Sad", emoji: "😢" },
      { text: "Surprised", emoji: "😮" },
      { text: "Angry", emoji: "😠" }
    ],
    correct: 1,
    explanation: "That's a sad face! Sometimes we feel sad, and that's okay."
  },
  {
    id: 3,
    question: "How might you feel before bedtime?",
    options: [
      { text: "Excited", emoji: "🤩" },
      { text: "Tired", emoji: "😴" },
      { text: "Scared", emoji: "😨" },
      { text: "Angry", emoji: "😠" }
    ],
    correct: 1,
    explanation: "Before bedtime, we usually feel tired and ready to sleep!"
  },
  {
    id: 4,
    question: "What emotion is this? 😮",
    options: [
      { text: "Surprised", emoji: "😮" },
      { text: "Happy", emoji: "😊" },
      { text: "Sad", emoji: "😢" },
      { text: "Calm", emoji: "😌" }
    ],
    correct: 0,
    explanation: "That's surprise! We feel surprised when something unexpected happens."
  }
];

interface EmotionQuizProps {
  onComplete: () => void;
}

export const EmotionQuiz: React.FC<EmotionQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { playNarration, playSound } = useAudio();

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
      playSound('success');
      playNarration("Great job! " + questions[currentQuestion].explanation);
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
      playNarration(`Wonderful! You got ${score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0)} out of ${questions.length} questions right!`);
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
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0);
    return (
      <Card className="child-friendly bg-soft-green/80">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">😊</div>
          <Star size={64} className="mx-auto mb-4 text-green-600" />
          <h2 className="text-3xl font-bold text-soft-purple mb-4">
            Emotion Quiz Complete! 🎉
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
              {Array.from({ length: questions.length }).map((_, i) => (
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

        <div className="grid grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`
                bodyquest-button p-6 h-auto flex flex-col items-center gap-2 ${
                selectedAnswer === null ? 'bg-soft-blue hover:bg-soft-blue/80' :
                index === question.correct ? 'bg-soft-green' :
                index === selectedAnswer ? 'bg-soft-pink' : 'bg-gray-300'
              }
              `}
              disabled={selectedAnswer !== null}
            >
              <span className="text-3xl">{option.emoji}</span>
              <span className="text-lg">{option.text}</span>
            </Button>
          ))}
        </div>

        {showExplanation && (
          <div className="mb-6 p-4 bg-soft-green/50 rounded-2xl">
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
