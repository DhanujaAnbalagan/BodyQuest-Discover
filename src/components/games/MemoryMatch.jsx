import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { AudioControls } from '@/components/AudioControls';
import { FocusToggle } from '@/components/FocusToggle';
import { Home, RotateCcw } from 'lucide-react';

interface MemoryCard {
  id;
  emoji;
  name;
  isFlipped;
  isMatched;
}

const MemoryMatch = () => {
  const navigate = useNavigate();
  const { playSound, playNarration } = useAudio();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const cardPairs = [
    { emoji: '👁️', name: 'Eyes' },
    { emoji: '👂', name: 'Ears' },
    { emoji: '👃', name: 'Nose' },
    { emoji: '👄', name: 'Mouth' },
    { emoji: '❤️', name: 'Heart' },
    { emoji: '🧠', name: 'Brain' },
    { emoji: '🦷', name: 'Teeth' },
    { emoji: '🫁', name: 'Lungs' }
  ];

  useEffect(() => {
    initializeGame();
    playNarration("Welcome to Memory Match! Flip the cards to find matching pairs of body parts. Remember where each card is!");
  }, [playNarration]);

  const initializeGame = () => {
    const shuffledCards = [...cardPairs, ...cardPairs]
      .map((card, index) => ({
        id,
        emoji.emoji,
        name.name,
        isFlipped,
        isMatched
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return;
    }

    playSound('click');
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped } 
    ));

    if (newFlippedCards.length === 2) {
      setAttempts(prev => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.name === secondCard.name) {

        playSound('success');
        playNarration(`Great match! You found the ${firstCard.name} pair!`);
        setScore(prev => prev + 10);
        
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched }
              
          ));
          setFlippedCards([]);
          

          const updatedCards = cards.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched }
              
          );
          
          if (updatedCards.every(card => card.isMatched)) {
            setGameComplete(true);
            playSound('celebration');
            playNarration(`Congratulations! You completed Memory Match in ${attempts + 1} attempts with a score of ${score + 10}!`);
          }
        }, 1000);
      } else {

        playSound('error');
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped }
              
          ));
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const resetGame = () => {
    playSound('click');
    initializeGame();
    playNarration("New game started! Find all the matching pairs.");
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
          <h1 className="text-4xl md-5xl font-bold text-soft-green mb-4">
            🔄 Memory Match 🔄
          </h1>
          <p className="text-xl text-soft-blue font-semibold mb-4">
            Find matching pairs of body parts!
          </p>
          
          <div className="flex justify-center gap-6 mb-6">
            <div className="bg-white/80 rounded-2xl p-4 border-2 border-soft-blue">
              <p className="text-2xl font-bold text-soft-purple">Score: {score}</p>
            </div>
            <div className="bg-white/80 rounded-2xl p-4 border-2 border-soft-purple">
              <p className="text-2xl font-bold text-soft-blue">Attempts: {attempts}</p>
            </div>
            <Button onClick={resetGame} className="bodyquest-button">
              <RotateCcw size={20} className="mr-2" />
              New Game
            </Button>
          </div>
        </div>

        {gameComplete && (
          <Card className="child-friendly bg-gradient-to-r from-green-100 to-blue-100 border-4 border-green-300 mb-6">
            <CardContent className="p-6 text-center">
              <h2 className="text-3xl font-bold text-green-600 mb-2">🎉 Fantastic! 🎉</h2>
              <p className="text-xl text-gray-700">
                You completed Memory Match in {attempts} attempts!
              </p>
              <p className="text-lg text-gray-600 mt-2">Final Score: {score} points</p>
            </CardContent>
          </Card>
        )}

        <Card className="child-friendly bg-gradient-to-b from-purple-50 to-blue-50 border-4 border-white shadow-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`
                    relative h-24 rounded-2xl cursor-pointer transition-all duration-300
                    ${card.isMatched 
                      ? 'bg-green-200 border-4 border-green-400' 
                      .isFlipped 
                        ? 'bg-white border-4 border-purple-400' 
                        : 'bg-gradient-to-br from-purple-400 to-blue-400 border-4 border-white hover-105'
                    }
                  `}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {card.isFlipped || card.isMatched ? (
                      <span className="text-3xl">{card.emoji}</span>
                    ) : (
                      <span className="text-3xl text-white">❓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="child-friendly bg-soft-yellow/30 mt-6">
          <CardContent className="p-4 text-center">
            <p className="text-lg text-gray-700">
              💡 <strong>Tip:</strong> Remember where you saw each body part to make faster matches!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemoryMatch;
