// Components functional component with hooks
import React, { useState, useEffect } from 'react'; // Hooks, useEffect
import { Button } from '@/components/ui/button'; // Components button UI
import { Card, CardContent } from '@/components/ui/card'; // Components card UI
import { useAudio } from '@/contexts/AudioContext'; // Custom Hook context
import { Home, RotateCcw, Trophy } from 'lucide-react'; // External icon components
import { useNavigate } from 'react-router-dom'; // Router between routes

// TypeScript Interfaces for Props/Data
interface SenseItem {
  id;
  name;
  emoji;
  sense;
  description;
}

interface Target {
  sense;
  emoji;
  color;
}

// Components game screen component
const SenseTarget = () => {
  const navigate = useNavigate(); // Router Navigation Hook
  const { playNarration, playSound } = useAudio(); // Custom Hook usage

  // State, round, selections, game status
  const [score, setScore] = useState(0); // State Hook
  const [currentRound, setCurrentRound] = useState(0); // State Hook
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // State Hook
  const [gameCompleted, setGameCompleted] = useState(false); // State Hook
  const [correctMatches, setCorrectMatches] = useState<string[]>([]); // State Hook

  // Data Arrays & Keys will be applied when rendering
  const senseItems = [
    { id: 'apple', name: 'Apple', emoji: '🍎', sense: 'taste', description: 'Sweet and crunchy' },
    { id: 'flower', name: 'Flower', emoji: '🌸', sense: 'smell', description: 'Sweet floral scent' },
    { id: 'music', name: 'Music', emoji: '🎵', sense: 'hearing', description: 'Beautiful melody' },
    { id: 'rainbow', name: 'Rainbow', emoji: '🌈', sense: 'sight', description: 'Colorful arc in sky' },
    { id: 'teddy', name: 'Teddy Bear', emoji: '🧸', sense: 'touch', description: 'Soft and cuddly' },
    { id: 'pizza', name: 'Pizza', emoji: '🍕', sense: 'taste', description: 'Delicious and cheesy' },
    { id: 'cookies', name: 'Cookies', emoji: '🍪', sense: 'smell', description: 'Sweet baking aroma' },
    { id: 'bird', name: 'Bird Song', emoji: '🐦', sense: 'hearing', description: 'Chirping sounds' },
    { id: 'star', name: 'Stars', emoji: '⭐', sense: 'sight', description: 'Twinkling lights' },
    { id: 'sand', name: 'Sand', emoji: '🏖️', sense: 'touch', description: 'Grainy texture' }
  ];

  const targets = [
    { sense: 'sight', emoji: '👀', color: 'bg-red-400' },
    { sense: 'hearing', emoji: '👂', color: 'bg-blue-400' },
    { sense: 'touch', emoji: '✋', color: 'bg-green-400' },
    { sense: 'smell', emoji: '👃', color: 'bg-yellow-400' },
    { sense: 'taste', emoji: '👅', color: 'bg-purple-400' }
  ];

  // Derived Data only items for current round
  const currentItems = senseItems.slice(currentRound * 2, (currentRound + 1) * 2);

  // Hooks to run narration when component mounts
  useEffect(() => {
    playNarration("Welcome to Sense Target! Match each object with the correct sense. Click on an item, then click on the matching sense target!");
  }, [playNarration]);

  // Event Handling on an item
  const handleItemClick = (itemId) => {
    setSelectedItem(itemId); // State update
    const item = senseItems.find(i => i.id === itemId);
    if (item) {
      playNarration(`You selected ${item.name}. Now click on the ${item.sense} target!`);
    }
  };

  // Event Handling on a target
  const handleTargetClick = (targetSense) => {
    if (!selectedItem) {
      playNarration("First select an item, then click on a sense target!");
      return;
    }

    const item = senseItems.find(i => i.id === selectedItem);
    if (!item) return;

    // Conditional Rendering logic/incorrect handling
    if (item.sense === targetSense) {
      setScore(prev => prev + 10); // State update
      setCorrectMatches(prev => [...prev, selectedItem]); // State update
      playSound('success');
      playNarration(`Excellent! ${item.name} is indeed something you ${item.sense}!`);
      
      if (correctMatches.length + 1 === currentItems.length) {
        if (currentRound < 4) {
          // Next round
          setTimeout(() => {
            setCurrentRound(prev => prev + 1);
            setCorrectMatches([]);
            setSelectedItem(null);
            playNarration("Great job! Let's try some new items!");
          }, 2000);
        } else {
          // Game completion
          setGameCompleted(true);
          playSound('celebration');
          setTimeout(() => {
            playNarration("Amazing! You completed all the sense challenges! You're a sense detective!");
          }, 500);
        }
      }
    } else {
      playSound('error');
      playNarration(`Not quite right. ${item.name} is not something you ${targetSense}. Try again!`);
    }

    setSelectedItem(null);
  };

  // Event Handling game state
  const resetGame = () => {
    setScore(0);
    setCurrentRound(0);
    setSelectedItem(null);
    setGameCompleted(false);
    setCorrectMatches([]);
    playNarration("Let's start over! Match each item with the correct sense.");
  };

  // JSX rendering
  return (
    <div className="min-h-screen bg-warm-white p-4">
      {/* Router Navigation Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button onClick={() => navigate('/games')} variant="outline" className="bodyquest-button">
          <Home size={20} className="mr-2" />
          Back to Games
        </Button>
      </div>

      <div className="max-w-6xl mx-auto pt-20">
        {/* Scoreboard UI */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md-5xl font-bold text-soft-purple mb-4">
            🎯 Sense Target 🎯
          </h1>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-soft-blue text-white px-6 py-2 rounded-full text-xl font-bold">
              Score: {score}
            </div>
            <div className="bg-soft-green text-white px-6 py-2 rounded-full text-xl font-bold">
              Round: {currentRound + 1}/5
            </div>
            <Button onClick={resetGame} className="bodyquest-button">
              <RotateCcw size={20} className="mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Conditional Rendering final message when game completed */}
        {gameCompleted && (
          <Card className="child-friendly bg-soft-yellow mb-8">
            <CardContent className="p-6 text-center">
              <Trophy size={48} className="mx-auto mb-4 text-yellow-600" />
              <h2 className="text-2xl font-bold text-yellow-700 mb-2">🎉 Sense Master! 🎉</h2>
              <p className="text-lg text-yellow-600">
                You matched all the items perfectly! You understand the five senses!
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg-cols-2 gap-8">
          {/* Lists & Keys items dynamically */}
          <Card className="child-friendly bg-soft-pink">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">
                Click on an item:
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {currentItems.filter(item => !correctMatches.includes(item.id)).map((item) => (
                  <div
                    key={item.id} // Keys id for each item
                    onClick={() => handleItemClick(item.id)} // Event Handling
                    className={`bg-white rounded-2xl p-6 cursor-pointer hover-105 transition-all shadow-lg border-4 ${
                      selectedItem === item.id ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover-purple-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <p className="font-bold text-gray-700 text-xl">{item.name}</p>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lists & Keys sense targets dynamically */}
          <Card className="child-friendly bg-soft-blue">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Then click the matching sense:
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {targets.map((target) => (
                  <div
                    key={target.sense} // Keys
                    onClick={() => handleTargetClick(target.sense)} // Event Handling
                    className={`${target.color} rounded-2xl p-6 cursor-pointer hover-105 transition-all shadow-lg border-4 border-white hover-xl`}
                  >
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">{target.emoji}</div>
                      <p className="font-bold text-xl capitalize">{target.sense}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conditional Rendering current selected item */}
        {selectedItem && (
          <Card className="child-friendly bg-soft-yellow mt-6">
            <CardContent className="p-4 text-center">
              <p className="text-lg font-bold text-yellow-700">
                You selected: {senseItems.find(i => i.id === selectedItem)?.name} {senseItems.find(i => i.id === selectedItem)?.emoji}
              </p>
              <p className="text-yellow-600">Now click on the matching sense target!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SenseTarget;
