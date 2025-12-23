"use client";

import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Timer, RotateCcw, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CPSCheckerComponent = () => {
  const [duration, setDuration] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentCps, setCurrentCps] = useState(0);
  const [bestCps, setBestCps] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Load best score on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bestCps");
      if (saved) {
        setBestCps(parseFloat(saved));
      }
    } catch (e) {
      console.error("Failed to load best CPS:", e);
    }
  }, []);

  // Memoized end test handler
  const endTest = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const elapsed = ((Date.now() - (startTimeRef.current ?? 0)) / 1000).toFixed(
      2
    );
    const finalCps = clicks / parseFloat(elapsed);
    setCurrentCps(finalCps);

    if (finalCps > bestCps) {
      setBestCps(finalCps);
      try {
        localStorage.setItem("bestCps", finalCps.toString());
      } catch (e) {
        console.error("Failed to save best CPS:", e);
      }
      toast({
        title: "New Record! 🎉",
        description: `You achieved ${finalCps.toFixed(2)} CPS!`,
      });
    }
  }, [clicks, bestCps, toast]);

  // Memoized start test handler
  const startTest = useCallback(() => {
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
        setCurrentCps((prev) => clicks / elapsed);
      }
    }, 100);
  }, [duration, clicks, endTest]);

  // Memoized click handler
  const handleClick = useCallback(() => {
    if (isActive) {
      setClicks((prev) => prev + 1);
    }
  }, [isActive]);

  // Memoized reset handler
  const resetTest = useCallback(() => {
    setIsActive(false);
    setClicks(0);
    setTimeLeft(0);
    setCurrentCps(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Memoized reset best handler
  const resetBest = useCallback(() => {
    setBestCps(0);
    try {
      localStorage.removeItem("bestCps");
    } catch (e) {
      console.error("Failed to reset best CPS:", e);
    }
    toast({
      title: "Best score reset",
      description: "Your best CPS has been cleared.",
    });
  }, [toast]);

  // Memoized display values
  const displayValues = useMemo(
    () => ({
      displayTime: isActive ? timeLeft : duration,
      timeLabel: isActive ? "Time Left" : "Duration",
      formattedCurrentCps: currentCps.toFixed(2),
      formattedBestCps: bestCps.toFixed(2),
    }),
    [isActive, timeLeft, duration, currentCps, bestCps]
  );

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const showBestScore = bestCps > 0;
  const testNotStarted = !isActive && timeLeft === 0;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Settings Card */}
        <div className="grid gap-8">
          <Card className="bg-card shadow-lg border-border/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Settings</CardTitle>
              <CardDescription>Configure your test duration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 flex-wrap">
                <Label htmlFor="duration" className="font-medium">
                  Duration (seconds):
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="60"
                  value={duration}
                  onChange={(e) =>
                    setDuration(Math.max(1, parseInt(e.target.value) || 10))
                  }
                  disabled={isActive}
                  className="w-24 border-2"
                />
                <span className="text-sm text-muted-foreground ml-auto">
                  {duration}s test
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Test Card */}
          <Card className="bg-card shadow-lg border-border/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Click Speed Test</CardTitle>
              <CardDescription>
                {isActive
                  ? "Click as fast as you can!"
                  : "Click the start button to begin"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-primary/10">
                    <div className="text-4xl font-bold text-primary">
                      {clicks}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Clicks
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10">
                    <div className="text-4xl font-bold text-primary">
                      {displayValues.displayTime}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {displayValues.timeLabel}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10">
                    <div className="text-4xl font-bold text-primary">
                      {displayValues.formattedCurrentCps}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Current CPS
                    </div>
                  </div>
                </div>

                {/* Action Section */}
                {testNotStarted ? (
                  <Button
                    onClick={startTest}
                    size="lg"
                    className="w-full sm:w-auto px-8 py-6 text-lg font-semibold"
                  >
                    <Timer className="w-5 h-5 mr-2" />
                    Start Test
                  </Button>
                ) : isActive ? (
                  <button
                    onClick={handleClick}
                    className="w-full h-48 sm:h-40 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 border-2 border-primary/30 rounded-lg cursor-pointer flex items-center justify-center transition-all active:scale-95 select-none font-bold text-xl text-white shadow-lg touch-action-manipulation"
                  >
                    Click Here!
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-foreground">
                      Test completed!
                    </div>
                    <Button
                      onClick={resetTest}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      New Test
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Best Score Card */}
          {showBestScore && (
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-50/50 dark:from-yellow-950/20 dark:to-yellow-950/10 shadow-lg border border-yellow-200 dark:border-yellow-800 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Best Score
                </CardTitle>
                <CardDescription>
                  Your personal best performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-yellow-500">
                      {displayValues.formattedBestCps}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Best CPS
                    </div>
                  </div>
                  <Button
                    onClick={resetBest}
                    variant="outline"
                    size="sm"
                    className="border-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
                  >
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

const CPSChecker = memo(CPSCheckerComponent);

export default CPSChecker;
