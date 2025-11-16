
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useAudio } from '@/contexts/AudioContext';
import { Volume2, VolumeX, Music, MicOff } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const AudioControls = () => {
  const { isAudioEnabled, volume, isMusicEnabled, toggleAudio, setVolume, toggleMusic } = useAudio();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bodyquest-button text-sm min-h-10 min-w-20"
          aria-label="Audio controls"
        >
          {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 child-friendly bg-white">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-center text-soft-blue">
            Audio Settings
          </h3>
          
          {}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Narration</span>
            <Button
              onClick={toggleAudio}
              variant={isAudioEnabled ? "default" : "outline"}
              size="sm"
              className="bodyquest-button text-sm min-h-8"
              aria-label={isAudioEnabled ? "Turn off narration" : "Turn on narration"}
            >
              {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </Button>
          </div>

          {}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Volume</label>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
              disabled={!isAudioEnabled}
              aria-label="Volume control"
            />
            <div className="text-xs text-gray-500 mt-1 text-center">
              {Math.round(volume * 100)}%
            </div>
          </div>

          {}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Background Music</span>
            <Button
              onClick={toggleMusic}
              variant={isMusicEnabled ? "default" : "outline"}
              size="sm"
              className="bodyquest-button text-sm min-h-8"
              aria-label={isMusicEnabled ? "Turn off background music" : "Turn on background music"}
            >
              {isMusicEnabled ? <Music size={16} /> : <MicOff size={16} />}
            </Button>
          </div>
        </CardContent>
      </PopoverContent>
    </Popover>
  );
};
