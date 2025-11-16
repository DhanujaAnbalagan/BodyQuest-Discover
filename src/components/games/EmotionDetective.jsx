import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home, RotateCcw } from 'lucide-react';

interface Emotion {
  id;
  name;
  emoji;
  description;
  color;
}

interface EmotionPair {
  emotion;
  situations;
}

const EmotionDetective = () => {
  const navigate = useNavigate();
  const { playSound, playNarration } = useAudio();
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const emotions = [
    { id, name: 'Happy', emoji: '😊', description: 'feeling joyful and pleased', color: 'bg-yellow-200' },
    { id, name: 'Sad', emoji: '😢', description: 'feeling down or upset', color: 'bg-blue-200' },
    { id, name: 'Angry', emoji: '😠', description: 'feeling mad or frustrated', color: 'bg-red-200' },
    { id, name: 'Surprised', emoji: '😮', description: 'feeling shocked or amazed', color: 'bg-purple-200' },
    { id, name: 'Scared', emoji: '😨', description: 'feeling afraid or worried', color: 'bg-gray-200' },
    { id, name: 'Excited', emoji: '🤩', description: 'feeling thrilled and energetic', color: 'bg-orange-200' }
  ];

  const emotionPairs = [
    {
      emotion, // Happy
      situations
        "Getting a new toy for your birthday",
        "Playing with your best friend",
        "Eating your favorite ice cream"
      ]
    },
    {
      emotion, // Sad
      situations
        "Losing your favorite toy",
        "When a friend moves away",
        "Not being able to go to the park"
      ]
    },
    {
      emotion, // Angry
      situations
        "Someone takes your toy without asking",
        "When someone is not being fair",
        "Having to stop playing your favorite game"
      ]
    },
    {
      emotion, // Surprised
      situations
        "Finding a surprise gift",
        "Seeing a rainbow after rain",
        "Learning something amazing new"
      ]
    },
    {
      emotion, // Scared
      situations
        "Watching a scary movie",
        "Hearing thunder during a storm",
        "Being alone in the dark"
      ]
    },
    {
      emotion, // Excited
      situations
        "Going to an amusement park",
        "Starting a new adventure",
        "Getting ready for a fun trip"
      ]
    }
  ];

  useEffect(() => {
    playNarration("Welcome to Emotion Detective! I'll describe situations and you need to guess which emotion someone might feel. Let's explore feelings together!");
  }, [playNarration]);

  const currentPair = emotionPairs[currentRound];
  const currentSituation = currentPair?.situations[Math.floor(Math.random() * currentPair.situations.length)];

  const handleEmotionSelect = (emotionId) => {
    if (showResult) return;
    
    setSelectedEmotion(emotionId);
    setShowResult(true);
    playSound('click');

    if (emotionId === currentPair.emotion.id) {
      setScore(prev => prev + 10);
      playSound('success');
      playNarration(`Excellent! ${currentPair.emotion.name} is the right emotion for this situation.`);
    } else {
      playSound('error');
      const correctEmotion = emotions.find(e => e.id === currentPair.emotion.id);
      playNarration(`Good try! The correct emotion was ${correctEmotion?.name}. ${correctEmotion?.description}.`);
    }

    setTimeout(() => {
      if (currentRound + 1 >= emotionPairs.length) {
        setGameComplete(true);
        playSound('celebration');
        playNarration(`Congratulations Detective! You completed all the emotion challenges with a score of ${score + (emotionId === currentPair.emotion.id ? 10 )}!`);
      } else {
        setCurrentRound(prev => prev + 1);
        setSelectedEmotion(null);
        setShowResult(false);
      }
    }, 3000);
  };

  const resetGame = () => {
    playSound('click');
    setCurrentRound(0);
    setScore(0);
    setSelectedEmotion(null);
    setGameComplete(false);
    setShowResult(false);
    playNarration("New emotion detective case started! Let's solve these emotion mysteries together.");
  };

  return (
    <div className="min-h-screen bg-warm-white p-4">
      <div className="fixed top-4 left-4 z-50">
        <Button onClick={() => navigate('/games')} variant="outline" className="bodyquest-button">
          <Home size={20} className="mr-2" />
          Back to Games
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <AudioControls />
        <FocusToggle />
      </div>

      <div className="max-w-4xl mx-auto pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md-5xl font-bold text-soft-yellow mb-4">
            🕵️ Emotion Detective 🕵️
          </h1>
          <p className="text-xl text-soft-blue font-semibold mb-4">
            Solve the emotion mysteries!
          </p>
          
          <div className="flex justify-center gap-6 mb-6">
            <div className="bg-white/80 rounded-2xl p-4 border-2 border-soft-blue">
              <p className="text-2xl font-bold text-soft-purple">Score: {score}</p>
            </div>
            <div className="bg-white/80 rounded-2xl p-4 border-2 border-soft-purple">
              <p className="text-2xl font-bold text-soft-blue">Round: {currentRound + 1}/6</p>
            </div>
            <Button onClick={resetGame} className="bodyquest-button">
              <RotateCcw size={20} className="mr-2" />
              New Case
            </Button>
          </div>
        </div>

        {gameComplete ? (
          <Card className="child-friendly bg-gradient-to-r from-green-100 to-blue-100 border-4 border-green-300">
            <CardContent className="p-8 text-center">
              <h2 className="text-4xl font-bold text-green-600 mb-4">🎉 Case Closed! 🎉</h2>
              <p className="text-2xl text-gray-700 mb-4">
                Great detective work! You solved all the emotion mysteries!
              </p>
              <p className="text-xl text-gray-600 mb-6">Final Score: {score}/60 points</p>
              <Button onClick={resetGame} className="bodyquest-button text-lg">
                <RotateCcw size={24} className="mr-2" />
                Start New Investigation
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {}
            <Card className="child-friendly bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-200 shadow-2xl mb-6">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">🔍 Detective Case #{currentRound + 1}</h2>
                <div className="bg-white/80 rounded-3xl p-6 border-2 border-purple-200">
                  <p className="text-xl text-gray-700 leading-relaxed font-medium">
                    "{currentSituation}"
                  </p>
                </div>
                <p className="text-lg text-purple-600 mt-4 font-semibold">
                  How would someone feel in this situation?
                </p>
              </CardContent>
            </Card>

            {}
            <Card className="child-friendly bg-gradient-to-b from-yellow-50 to-orange-50 border-4 border-yellow-200 shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-orange-600 text-center mb-6">
                  Choose the Emotion:
                </h3>
                
                <div className="grid grid-cols-2 md-cols-3 gap-4">
                  {emotions.map((emotion) => {
                    const isSelected = selectedEmotion === emotion.id;
                    const isCorrect = showResult && emotion.id === currentPair.emotion.id;
                    const isWrong = showResult && isSelected && emotion.id !== currentPair.emotion.id;
                    
                    return (
                      <div
                        key={emotion.id}
                        onClick={() => handleEmotionSelect(emotion.id)}
                        className={`
                          ${emotion.color} rounded-3xl p-4 cursor-pointer transition-all duration-300 border-4
                          ${isCorrect ? 
                            'border-green-400 scale-105 shadow-2xl shadow-green-400/30' : 
                            isWrong ?
                            'border-red-400 scale-95 shadow-2xl shadow-red-400/30' :
                            isSelected ?
                            'border-purple-400 scale-105 shadow-2xl shadow-purple-400/30' :
                            'border-white hover-orange-300 hover-102 shadow-lg'
                          }
                          ${showResult && !isCorrect && !isSelected ? 'opacity-50' : 'opacity-100'}
                        `}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-2">{emotion.emoji}</div>
                          <h4 className="font-bold text-gray-800 text-lg">{emotion.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{emotion.description}</p>
                          {isCorrect && (
                            <div className="mt-2 text-green-600 font-bold">✓ Correct!</div>
                          )}
                          {isWrong && (
                            <div className="mt-2 text-red-600 font-bold">✗ Try again!</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="child-friendly bg-soft-green/30 mt-6">
              <CardContent className="p-4 text-center">
                <p className="text-lg text-gray-700">
                  💡 <strong>Detective Tip:</strong> Think about how you would feel in this situation!
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default EmotionDetective;
