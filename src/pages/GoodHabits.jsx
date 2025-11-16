// src/pages/GoodHabits.tsx
import React, { Component, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useAudio } from "@/contexts/AudioContext";
import { Lightbulb, Fan, Home } from "lucide-react";

/* ---------------------------------------------------
   1️⃣ Function Component Version
--------------------------------------------------- */
export const GoodHabitsFunction: React.FC = () => {
  const navigate = useNavigate();
  const { playNarration, playSound } = useAudio();

  const [isLightOn, setIsLightOn] = useState(true);
  const [isFanOn, setIsFanOn] = useState(true);

  useEffect(() => {
    playNarration(
      "Good Habit Time! Always remember to switch off the lights and fan before leaving the room. Let's practice together!"
    );
  }, [playNarration]);

  const toggleLight = () => {
    setIsLightOn(!isLightOn);
    playSound("click");
    playNarration(
      isLightOn
        ? "Good job! You switched OFF the light and saved energy."
        : "The light is ON now. Remember to turn it off before leaving!"
    );
  };

  const toggleFan = () => {
    setIsFanOn(!isFanOn);
    playSound("click");
    playNarration(
      isFanOn
        ? "Great! You turned OFF the fan. Saving energy is important!"
        : "Fan is ON now. Don't forget to turn it off when leaving!"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
      <div className="fixed top-4 left-4 z-50">
        <Button onClick={() => navigate("/")} variant="outline" className="bodyquest-button">
          <Home size={20} className="mr-2" />
          Home
        </Button>
      </div>

      <div className="max-w-5xl mx-auto pt-20 text-center">
        <h1 className="text-4xl md-5xl font-bold text-orange-600 mb-4">
          💡 Good Habit Electricity 🌍
        </h1>
        <p className="text-xl text-gray-700 mb-10 font-medium">
          Switch off lights & fans when not in use. Let’s try it below!
        </p>

        <div className="grid grid-cols-1 md-cols-2 gap-8 justify-center">
          <Card className="cursor-pointer hover-105 transition-all border-4 border-yellow-200 shadow-lg" onClick={toggleLight}>
            <CardContent className="p-8 text-center">
              <Lightbulb size={80} className={`mx-auto mb-4 ${isLightOn ? "text-yellow-400" : "text-gray-400"}`} />
              <h3 className="text-2xl font-bold mb-2">{isLightOn ? "Light ON" : "Light OFF"}</h3>
              <p className="text-gray-600">{isLightOn ? "Click to turn OFF and save power!" : "Yay! Light is OFF, you saved electricity!"}</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover-105 transition-all border-4 border-blue-200 shadow-lg" onClick={toggleFan}>
            <CardContent className="p-8 text-center">
              <Fan size={80} className={`mx-auto mb-4 animate-spin-slow ${isFanOn ? "text-blue-400" : "text-gray-400"}`} />
              <h3 className="text-2xl font-bold mb-2">{isFanOn ? "Fan ON" : "Fan OFF"}</h3>
              <p className="text-gray-600">{isFanOn ? "Click to turn OFF and save power!" : "Awesome! Fan is OFF, you're saving energy!"}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-10 bg-green-100 border-4 border-green-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-2">🌟 Great Job! 🌟</h2>
            <p className="text-lg text-green-800 font-medium">
              Every time you switch off lights and fans, you help save electricity and protect the planet! 🌍💚
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   2️⃣ Class Component Version
--------------------------------------------------- */
type GoodHabitsProps = {
  navigate: NavigateFunction;
  playNarration: (text: string) => void;
  playSound: (sound: string) => void;
};

type GoodHabitsState = {
  isLightOn: boolean;
  isFanOn: boolean;
};

export class GoodHabitsClass extends Component<GoodHabitsProps, GoodHabitsState> {
  constructor(props: GoodHabitsProps) {
    super(props);
    this.state = { isLightOn: true, isFanOn: true };
  }

  componentDidMount() {
    this.props.playNarration(
      "Good Habit Time! Always remember to switch off the lights and fan before leaving the room. Let's practice together!"
    );
  }

  toggleLight = () => {
    this.setState(
      (prev) => ({ isLightOn: !prev.isLightOn }),
      () => {
        this.props.playSound("click");
        this.props.playNarration(
          this.state.isLightOn
            ? "The light is ON now. Remember to turn it off before leaving!"
            : "Good job! You switched OFF the light and saved energy."
        );
      }
    );
  };

  toggleFan = () => {
    this.setState(
      (prev) => ({ isFanOn: !prev.isFanOn }),
      () => {
        this.props.playSound("click");
        this.props.playNarration(
          this.state.isFanOn
            ? "Fan is ON now. Don't forget to turn it off when leaving!"
            : "Great! You turned OFF the fan. Saving energy is important!"
        );
      }
    );
  };

  render() {
    const { navigate } = this.props;
    const { isLightOn, isFanOn } = this.state;

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={() => navigate("/")} variant="outline" className="bodyquest-button">
            <Home size={20} className="mr-2" />
            Home
          </Button>
        </div>

        <div className="max-w-5xl mx-auto pt-20 text-center">
          <h1 className="text-4xl md-5xl font-bold text-orange-600 mb-4">
            💡 Good Habit Electricity 🌍
          </h1>
          <p className="text-xl text-gray-700 mb-10 font-medium">
            Switch off lights & fans when not in use. Let’s try it below!
          </p>

          <div className="grid grid-cols-1 md-cols-2 gap-8 justify-center">
            <Card className="cursor-pointer hover-105 transition-all border-4 border-yellow-200 shadow-lg" onClick={this.toggleLight}>
              <CardContent className="p-8 text-center">
                <Lightbulb size={80} className={`mx-auto mb-4 ${isLightOn ? "text-yellow-400" : "text-gray-400"}`} />
                <h3 className="text-2xl font-bold mb-2">{isLightOn ? "Light ON" : "Light OFF"}</h3>
                <p className="text-gray-600">{isLightOn ? "Click to turn OFF and save power!" : "Yay! Light is OFF, you saved electricity!"}</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover-105 transition-all border-4 border-blue-200 shadow-lg" onClick={this.toggleFan}>
              <CardContent className="p-8 text-center">
                <Fan size={80} className={`mx-auto mb-4 animate-spin-slow ${isFanOn ? "text-blue-400" : "text-gray-400"}`} />
                <h3 className="text-2xl font-bold mb-2">{isFanOn ? "Fan ON" : "Fan OFF"}</h3>
                <p className="text-gray-600">{isFanOn ? "Click to turn OFF and save power!" : "Awesome! Fan is OFF, you're saving energy!"}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-10 bg-green-100 border-4 border-green-300">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">🌟 Great Job! 🌟</h2>
              <p className
