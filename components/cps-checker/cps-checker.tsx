"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Timer, RotateCcw, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CPSChecker = () => {
  const [duration, setDuration] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentCps, setCurrentCps] = useState(0);
  const [bestCps, setBestCps] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Load best score
  useEffect(() => {
    const saved = localStorage.getItem("bestCps");
    if (saved) {
      setBestCps(parseFloat(saved));
    }
  }, []);

  const endTest = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const elapsed = ((Date.now() - (startTimeRef.current ?? 0)) / 1000).toFixed(2);
    const finalCps = clicks / parseFloat(elapsed);
    setCurrentCps(finalCps);

    if (finalCps > bestCps) {
      setBestCps(finalCps);
      localStorage.setItem("bestCps", finalCps.toString());
      toast({
        title: "New Record! 🎉",
        description: `You achieved ${finalCps.toFixed(2)} CPS!`,
      });
    }
  }, [clicks, bestCps, toast]);

  const startTest = () => {
    setIsActive(true);
    setClicks(0);
    setCurrentCps(0);
    setTimeLeft(duration);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - (startTimeRef.current ?? 0)) / 1000;
      const remaining = duration - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        endTest();
      } else {
        setTimeLeft(Math.ceil(remaining));
        setCurrentCps(clicks / elapsed);
      }
    }, 100);
  };

  const handleClick = () => {
    if (isActive) {
      setClicks((prev) => prev + 1);
    }
  };

  const resetTest = () => {
    setIsActive(false);
    setClicks(0);
    setTimeLeft(0);
    setCurrentCps(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetBest = () => {
    setBestCps(0);
    localStorage.removeItem("bestCps");
    toast({
      title: "Best score reset",
      description: "Your best CPS has been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Timer className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">CPS Checker</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your clicking speed with our precise clicks-per-second measurement tool
          </p>
        </div>

        {/* --- Settings Card --- */}
        <div className="grid gap-8">
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your test duration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Label htmlFor="duration">Duration (seconds):</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="60"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 10)}
                  disabled={isActive}
                  className="w-20"
                />
              </div>
            </CardContent>
          </Card>

          {/* --- Test Card --- */}
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle>Click Speed Test</CardTitle>
              <CardDescription>
                {isActive ? "Click as fast as you can!" : "Click the start button to begin"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary">{clicks}</div>
                    <div className="text-sm text-muted-foreground">Clicks</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      {isActive ? timeLeft : duration}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isActive ? "Time Left" : "Duration"}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      {currentCps.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Current CPS</div>
                  </div>
                </div>

                {!isActive && timeLeft === 0 ? (
                  <Button onClick={startTest} size="lg" className="bg-primary shadow-glow">
                    Start Test
                  </Button>
                ) : isActive ? (
                  <div
                    onClick={handleClick}
                    className="w-full h-40 bg-primary/10 hover:bg-primary/20 border-2 border-primary/30 rounded-lg cursor-pointer flex items-center justify-center transition-colors select-none"
                  >
                    <div className="text-2xl font-bold text-primary">Click Here!</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-lg">Test completed!</div>
                    <Button onClick={resetTest} variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      New Test
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* --- Best Score Card --- */}
          {bestCps > 0 && (
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Best Score
                </CardTitle>
                <CardDescription>Your personal best performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-500">
                      {bestCps.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Best CPS</div>
                  </div>
                  <Button onClick={resetBest} variant="outline" size="sm">
                    Reset Best
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CPSChecker;
