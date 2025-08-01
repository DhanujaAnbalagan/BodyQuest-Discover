import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/contexts/AudioContext';
import { Home, RotateCcw, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PuzzlePiece {
  id: string;
  name: string;
  emoji: string;
  correctPosition: { x: number; y: number };
  currentPosition: { x: number; y: number } | null;
}

const BodyPartPuzzle: React.FC = () => {
  const navigate = useNavigate();
  const { playNarration, playSound } = useAudio();
  const [score, setScore] = useState(0);
  const [completedPieces, setCompletedPieces] = useState<string[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  const puzzlePieces: PuzzlePiece[] = [
    { id: 'head', name: 'Head', emoji: '🤔', correctPosition: { x: 50, y: 15 }, currentPosition: null },
    { id: 'eyes', name: 'Eyes', emoji: '👀', correctPosition: { x: 50, y: 20 }, currentPosition: null },
    { id: 'mouth', name: 'Mouth', emoji: '👄', correctPosition: { x: 50, y: 25 }, currentPosition: null },
    { id: 'arms', name: 'Arms', emoji: '💪', correctPosition: { x: 30, y: 45 }, currentPosition: null },
    { id: 'heart', name: 'Heart', emoji: '❤️', correctPosition: { x: 50, y: 40 }, currentPosition: null },
    { id: 'hands', name: 'Hands', emoji: '🙌', correctPosition: { x: 20, y: 60 }, currentPosition: null },
    { id: 'legs', name: 'Legs', emoji: '🦵', correctPosition: { x: 50, y: 70 }, currentPosition: null },
    { id: 'feet', name: 'Feet', emoji: '🦶', correctPosition: { x: 50, y: 85 }, currentPosition: null }
  ];

  useEffect(() => {
    playNarration("Welcome to Body Part Puzzle! Drag and drop the body parts to their correct positions on the body outline.");
  }, [playNarration]);

  const handleDragStart = (pieceId: string) => {
    setDraggedPiece(pieceId);
  };

  const handleDrop = (e: React.DragEvent, targetX: number, targetY: number) => {
    e.preventDefault();
    if (!draggedPiece) return;

    const piece = puzzlePieces.find(p => p.id === draggedPiece);
    if (!piece) return;

    const distance = Math.sqrt(
      Math.pow(piece.correctPosition.x - targetX, 2) + 
      Math.pow(piece.correctPosition.y - targetY, 2)
    );

    if (distance <= 15) { // Close enough to correct position
      setCompletedPieces(prev => [...prev, draggedPiece]);
      setScore(prev => prev + 10);
      playSound('success');
      playNarration(`Great job! You placed the ${piece.name} correctly!`);
      
      if (completedPieces.length + 1 === puzzlePieces.length) {
        setGameCompleted(true);
        playSound('celebration');
        setTimeout(() => {
          playNarration("Congratulations! You completed the body puzzle! You're amazing at learning about the human body!");
        }, 500);
      }
    } else {
      playSound('error');
      playNarration(`Not quite right. Try placing the ${piece.name} somewhere else!`);
    }

    setDraggedPiece(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const resetGame = () => {
    setCompletedPieces([]);
    setScore(0);
    setGameCompleted(false);
    playNarration("Let's try again! Drag the body parts to their correct positions.");
  };

  return (
    <div className="min-h-screen bg-warm-white p-4">
      <div className="fixed top-4 left-4 z-50">
        <Button onClick={() => navigate('/games')} variant="outline" className="bodyquest-button">
          <Home size={20} className="mr-2" />
          Back to Games
        </Button>
      </div>

      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-soft-purple mb-4">
            🧩 Body Part Puzzle 🧩
          </h1>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-soft-blue text-white px-6 py-2 rounded-full text-xl font-bold">
              Score: {score}
            </div>
            <Button onClick={resetGame} className="bodyquest-button">
              <RotateCcw size={20} className="mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {gameCompleted && (
          <Card className="child-friendly bg-soft-yellow mb-8">
            <CardContent className="p-6 text-center">
              <Trophy size={48} className="mx-auto mb-4 text-yellow-600" />
              <h2 className="text-2xl font-bold text-yellow-700 mb-2">🎉 Puzzle Complete! 🎉</h2>
              <p className="text-lg text-yellow-600">
                Amazing job! You know where all the body parts go!
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Puzzle Pieces */}
          <Card className="child-friendly bg-soft-pink">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">
                Drag these body parts:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {puzzlePieces.filter(piece => !completedPieces.includes(piece.id)).map((piece) => (
                  <div
                    key={piece.id}
                    draggable
                    onDragStart={() => handleDragStart(piece.id)}
                    className="bg-white rounded-2xl p-4 cursor-grab hover:scale-105 transition-all shadow-lg border-2 border-gray-200 hover:border-purple-300"
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{piece.emoji}</div>
                      <p className="font-bold text-gray-700">{piece.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Body Outline Drop Zone */}
          <Card className="child-friendly bg-soft-blue">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Drop them here:
              </h3>
              <div 
                className="relative bg-white rounded-3xl h-96 border-4 border-dashed border-gray-300"
                onDrop={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  handleDrop(e, x, y);
                }}
                onDragOver={handleDragOver}
              >
                {/* Body outline */}
                <div className="absolute inset-4 border-2 border-gray-400 rounded-full opacity-30"></div>
                
                {/* Drop zones with hints */}
                {puzzlePieces.map((piece) => (
                  <div
                    key={`zone-${piece.id}`}
                    className={`absolute w-12 h-12 rounded-full border-2 border-dashed transition-all ${
                      completedPieces.includes(piece.id) 
                        ? 'bg-green-200 border-green-400' 
                        : 'border-gray-400 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                    style={{
                      left: `${piece.correctPosition.x}%`,
                      top: `${piece.correctPosition.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {completedPieces.includes(piece.id) && (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        {piece.emoji}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BodyPartPuzzle;