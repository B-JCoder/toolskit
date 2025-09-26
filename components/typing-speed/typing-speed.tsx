"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Zap, Play, Pause, RotateCcw, Clock, Target, CheckCircle } from "lucide-react";

const TypingSpeed = () => {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [userText, setUserText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet and is commonly used for typing practice. It's a great way to test your keyboard skills and improve your typing speed.",
    "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat.",
    "To be or not to be, that is the question. Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles and by opposing end them.",
    "Space exploration represents humanity's greatest adventure. From the first steps on the moon to the rovers exploring Mars, we continue to push the boundaries of what's possible and expand our understanding of the universe.",
    "The art of programming is the art of organizing complexity, of mastering multitude and avoiding its bastard chaos as effectively as possible. Good programmers worry about data structures and their relationships."
  ];

  const currentText = sampleTexts[currentTextIndex];

  
  const calculateStats = useCallback(() => {
    const wordsTyped = userText.trim().split(/\s+/).length;
    const timeElapsed = (duration - timeLeft) / 60; // in minutes
    const calculatedWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    
    let correct = 0;
    const total = userText.length;
    
    for (let i = 0; i < Math.min(userText.length, currentText.length); i++) {
      if (userText[i] === currentText[i]) {
        correct++;
      }
    }
    
    const calculatedAccuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
    
    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setTotalChars(total);
    setCorrectChars(correct);
  }, [userText, duration, timeLeft, currentText]);

  // Removed duplicate endTest declaration to fix redeclaration error

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const endTest = () => {
    setIsActive(false);
    calculateStats();
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [endTest, isActive, timeLeft]);

  useEffect(() => {
    if (hasStarted) {
      calculateStats();
    }
  }, [userText, timeLeft, hasStarted, calculateStats]);

  const startTest = () => {
    setIsActive(true);
    setHasStarted(true);
    setTimeLeft(duration);
    setUserText('');
    setWpm(0);
    setAccuracy(100);
    setTotalChars(0);
    setCorrectChars(0);
  };

  const pauseTest = () => {
    setIsActive(false);
  };

  const resumeTest = () => {
    if (timeLeft > 0) {
      setIsActive(true);
    }
  };

  const resetTest = () => {
    setIsActive(false);
    setHasStarted(false);
    setTimeLeft(0);
    setUserText('');
    setWpm(0);
    setAccuracy(100);
    setTotalChars(0);
    setCorrectChars(0);
  };

  const changeText = () => {
    setCurrentTextIndex((prev) => (prev + 1) % sampleTexts.length);
    resetTest();
  };

  const getCharacterClass = (index: number) => {
    if (index >= userText.length) {
      return 'text-muted-foreground';
    }
    return userText[index] === currentText[index] 
      ? 'text-green-400 bg-green-400/10' 
      : 'text-red-400 bg-red-400/10';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Typing Speed Checker</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test and improve your typing speed with our comprehensive speed test
          </p>
        </div>

        <div className="grid gap-8">
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Test Settings</CardTitle>
                  <CardDescription>Configure your typing test</CardDescription>
                </div>
                <Button
                  onClick={changeText}
                  variant="outline"
                  size="sm"
                  disabled={isActive}
                >
                  New Text
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Label htmlFor="duration">Duration (seconds):</Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  max="300"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
                  disabled={isActive || hasStarted}
                  className="w-20"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle>Sample Text</CardTitle>
              <CardDescription>Type the following text as accurately and quickly as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted/20 rounded-lg font-mono text-lg leading-relaxed">
                {currentText.split('').map((char, index) => (
                  <span key={index} className={getCharacterClass(index)}>
                    {char}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle>Type Here</CardTitle>
              <CardDescription>
                {!hasStarted ? "Click start and begin typing" : 
                 isActive ? "Keep typing!" : 
                 timeLeft === 0 ? "Test completed!" : "Test paused"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  placeholder="Start typing here..."
                  disabled={!isActive}
                  className="min-h-32 font-mono text-lg"
                />
                
                <div className="flex justify-center gap-4">
                  {!hasStarted && (
                    <Button
                      onClick={startTest}
                      className="bg-primary hover:bg-primary-dark shadow-glow"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Test
                    </Button>
                  )}
                  
                  {hasStarted && timeLeft > 0 && (
                    <>
                      {isActive ? (
                        <Button onClick={pauseTest} variant="outline">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </Button>
                      ) : (
                        <Button onClick={resumeTest} className="bg-primary hover:bg-primary-dark">
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </Button>
                      )}
                    </>
                  )}
                  
                  {hasStarted && (
                    <Button onClick={resetTest} variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle>Live Statistics</CardTitle>
              <CardDescription>Your current typing performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm text-muted-foreground">Time Left</span>
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {hasStarted ? timeLeft : duration}
                  </div>
                  <div className="text-xs text-muted-foreground">seconds</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm text-muted-foreground">WPM</span>
                  </div>
                  <div className="text-3xl font-bold text-primary">{wpm}</div>
                  <div className="text-xs text-muted-foreground">words/min</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                  </div>
                  <div className="text-3xl font-bold text-primary">{accuracy}%</div>
                  <div className="text-xs text-muted-foreground">correct</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm text-muted-foreground">Progress</span>
                  </div>
                  <div className="text-3xl font-bold text-primary">{totalChars}</div>
                  <div className="text-xs text-muted-foreground">characters</div>
                </div>
              </div>

              {hasStarted && timeLeft === 0 && (
                <div className="mt-8 p-6 bg-primary/10 rounded-lg text-center">
                  <h3 className="text-xl font-bold mb-4">Test Completed! 🎉</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-semibold">Final WPM</div>
                      <div className="text-2xl text-primary">{wpm}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Accuracy</div>
                      <div className="text-2xl text-primary">{accuracy}%</div>
                    </div>
                    <div>
                      <div className="font-semibold">Characters</div>
                      <div className="text-2xl text-primary">{correctChars}/{totalChars}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TypingSpeed;