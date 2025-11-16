
import React from 'react';
import { Button } from '@/components/ui/button';
import { useFocus } from '@/contexts/FocusContext';
import { useAudio } from '@/contexts/AudioContext';
import { Focus, Eye } from 'lucide-react';

export const FocusToggle = () => {
  const { isFocusMode, toggleFocusMode } = useFocus();
  const { playNarration, playSound } = useAudio();

  const handleToggle = () => {
    playSound('click');
    toggleFocusMode();
    
    if (!isFocusMode) {
      playNarration("Focus mode is now on. Only the active element will be highlighted to help you concentrate better.");
    } else {
      playNarration("Focus mode is now off. You can see everything clearly again.");
    }
  };

  return (
    <Button
      onClick={handleToggle}
      variant={isFocusMode ? "default" : "outline"}
      size="sm"
      className="bodyquest-button text-sm min-h-10 min-w-20"
      aria-label={isFocusMode ? "Turn off focus mode" : "Turn on focus mode"}
    >
      {isFocusMode ? <Focus size={16} /> : <Eye size={16} />}
      <span className="ml-1 hidden sm">
        {isFocusMode ? 'Focus' : 'Normal'}
      </span>
    </Button>
  );
};
