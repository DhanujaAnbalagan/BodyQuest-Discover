
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Settings, BarChart, Shield, Volume2 } from 'lucide-react';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been safely logged out"
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-warm-white p-4">
      {}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-soft-purple">Parent Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and customize your child's learning experience</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/')} variant="outline" className="bodyquest-button">
            View App
          </Button>
          <Button onClick={handleLogout} variant="outline" className="bodyquest-button">
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg-cols-2 gap-6 max-w-6xl mx-auto">
        {}
        <Card className="child-friendly">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-blue">
              <Settings className="mr-2" size={24} />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="audio-enabled">Audio Narration</Label>
              <Switch id="audio-enabled" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="animations">Gentle Animations</Label>
              <Switch id="animations" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="focus-mode">Focus Mode Available</Label>
              <Switch id="focus-mode" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Default Volume Level</Label>
              <Slider defaultValue={[70]} max={100} step={10} className="w-full" />
              <p className="text-sm text-gray-500">70%</p>
            </div>
          </CardContent>
        </Card>

        {}
        <Card className="child-friendly">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-green">
              <BarChart className="mr-2" size={24} />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Body Map Exploration</span>
                <span className="font-semibold">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-soft-green h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Five Senses Activities</span>
                <span className="font-semibold">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-soft-blue h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Emotion Recognition</span>
                <span className="font-semibold">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-soft-yellow h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Quizzes Completed</span>
                <span className="font-semibold">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-soft-purple h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {}
        <Card className="child-friendly">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-pink">
              <Shield className="mr-2" size={24} />
              Safety & Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">✅ Autism-Friendly Design</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Soft, calming colors</li>
                <li>• No sudden flashing or overwhelming animations</li>
                <li>• Large, accessible buttons</li>
                <li>• Focus mode for reduced distractions</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🔊 Audio Features</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Child-friendly narration</li>
                <li>• Volume controls</li>
                <li>• Alt-text for all images</li>
                <li>• ARIA labels for screen readers</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {}
        <Card className="child-friendly">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-purple">
              <Volume2 className="mr-2" size={24} />
              Content Customization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">Learning Pace</h4>
              <div className="space-y-2">
                <Label className="flex items-center">
                  <input type="radio" name="pace" className="mr-2" defaultChecked />
                  Self-paced (recommended)
                </Label>
                <Label className="flex items-center">
                  <input type="radio" name="pace" className="mr-2" />
                  Guided progression
                </Label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Feedback Frequency</h4>
              <div className="space-y-2">
                <Label className="flex items-center">
                  <input type="radio" name="feedback" className="mr-2" defaultChecked />
                  Frequent encouragement
                </Label>
                <Label className="flex items-center">
                  <input type="radio" name="feedback" className="mr-2" />
                  Minimal feedback
                </Label>
              </div>
            </div>

            <Button className="w-full bodyquest-button bg-soft-purple hover-soft-purple/80 text-white">
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
