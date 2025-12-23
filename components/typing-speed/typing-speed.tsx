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
import { Textarea } from "@/components/ui/textarea";
import {
  Zap,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Target,
  CheckCircle,
} from "lucide-react";

// Extract sample texts as constants
const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet and is commonly used for typing practice. It's a great way to test your keyboard skills and improve your typing speed.",
  "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat.",
  "To be or not to be, that is the question. Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles and by opposing end them.",
  "Space exploration represents humanity's greatest adventure. From the first steps on the moon to the rovers exploring Mars, we continue to push the boundaries of what's possible and expand our understanding of the universe.",
  "The art of programming is the art of organizing complexity, of mastering multitude and avoiding its bastard chaos as effectively as possible. Good programmers worry about data structures and their relationships.",
  "Pack my box with five dozen liquor jugs. This is another famous pangram used to test typewriters and computer keyboards. It is slightly shorter than the quick brown fox but just as effective for testing purposes.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. This quote by Winston Churchill reminds us that persistence is key to overcoming obstacles and achieving our goals in life.",
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it. And, like any great relationship, it just gets better and better as the years roll on.",
  "Artificial intelligence is transforming the way we live and work. From autonomous vehicles to intelligent assistants, AI technologies are becoming increasingly integrated into our daily lives, offering new possibilities and challenges.",
];

const TypingSpeedComponent = () => {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [userText, setUserText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentText = SAMPLE_TEXTS[currentTextIndex];

  // Memoized stats calculation
  const calculateStats = useCallback(() => {
    const wordsTyped = userText.trim().split(/\s+/).filter(Boolean).length;
    const timeElapsed = (duration - timeLeft) / 60;
    const calculatedWpm =
      timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;

    let correct = 0;
    const total = userText.length;

    for (let i = 0; i < Math.min(userText.length, currentText.length); i++) {
      if (userText[i] === currentText[i]) {
        correct++;
      }
    }

    const calculatedAccuracy =
      total > 0 ? Math.round((correct / total) * 100) : 100;

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setTotalChars(total);
    setCorrectChars(correct);
  }, [userText, duration, timeLeft, currentText]);

  // Memoized end test handler
  const endTest = useCallback(() => {
    setIsActive(false);
  }, []);

  // Timer effect
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
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
  }, [isActive]);

  // Calculate stats effect
  useEffect(() => {
    if (hasStarted) {
      calculateStats();
    }
  }, [userText, timeLeft, hasStarted, calculateStats]);

  // Memoized handlers
  const startTest = useCallback(() => {
    setIsActive(true);
    setHasStarted(true);
    setTimeLeft(duration);
    setUserText("");
    setWpm(0);
    setAccuracy(100);
    setTotalChars(0);
    setCorrectChars(0);
  }, [duration]);

  const pauseTest = useCallback(() => {
    setIsActive(false);
  }, []);

  const resumeTest = useCallback(() => {
    if (timeLeft > 0) {
      setIsActive(true);
    }
  }, [timeLeft]);

  const resetTest = useCallback(() => {
    setIsActive(false);
    setHasStarted(false);
    setTimeLeft(0);
    setUserText("");
    setWpm(0);
    setAccuracy(100);
    setTotalChars(0);
    setCorrectChars(0);
  }, []);

  const changeText = useCallback(() => {
    setCurrentTextIndex((prev) => (prev + 1) % SAMPLE_TEXTS.length);
    resetTest();
  }, [resetTest]);

  // Memoized character class getter
  const getCharacterClass = useCallback(
    (index: number) => {
      if (index >= userText.length) {
        return "text-muted-foreground";
      }
      return userText[index] === currentText[index]
        ? "text-green-500 bg-green-500/20 rounded px-0.5"
        : "text-red-500 bg-red-500/20 rounded px-0.5";
    },
    [userText, currentText]
  );

  // Memoized display values
  const displayValues = useMemo(
    () => ({
      timeDisplay: hasStarted ? timeLeft : duration,
      statusText: !hasStarted
        ? "Click start and begin typing"
        : isActive
        ? "Keep typing!"
        : timeLeft === 0
        ? "Test completed!"
        : "Test paused",
    }),
    [hasStarted, timeLeft, duration, isActive]
  );

  // Memoized text rendering
  const textCharacters = useMemo(
    () =>
      currentText.split("").map((char, index) => (
        <span key={index} className={getCharacterClass(index)}>
          {char}
        </span>
      )),
    [currentText, getCharacterClass]
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8">
          {/* Test Settings Card */}
          <Card className="bg-card shadow-lg border-border/50 rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="text-2xl">Test Settings</CardTitle>
                  <CardDescription>Configure your typing test</CardDescription>
                </div>
                <Button
                  onClick={changeText}
                  variant="outline"
                  size="sm"
                  disabled={isActive}
                  className="border-2"
                >
                  New Text
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 flex-wrap">
                <Label htmlFor="duration" className="font-medium">
                  Duration (seconds):
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  max="300"
                  value={duration}
                  onChange={(e) =>
                    setDuration(Math.max(15, parseInt(e.target.value) || 60))
                  }
                  disabled={isActive || hasStarted}
                  className="w-24 border-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sample Text Card */}
          <Card className="bg-card shadow-lg border-border/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Sample Text</CardTitle>
              <CardDescription>
                Type the following text as accurately and quickly as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-muted/20 rounded-xl font-mono text-lg leading-8 break-words overflow-x-auto">
                {textCharacters}
              </div>
            </CardContent>
          </Card>

          {/* Input Card */}
          <Card className="bg-card shadow-lg border-border/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Type Here</CardTitle>
              <CardDescription>{displayValues.statusText}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Textarea
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  placeholder="Start typing here..."
                  disabled={!isActive}
                  className="min-h-40 font-mono text-lg border-2 rounded-lg p-4"
                />

                {/* Control Buttons */}
                <div className="flex justify-center gap-4 flex-wrap">
                  {!hasStarted && (
                    <Button onClick={startTest} size="lg" className="px-8 py-6">
                      <Play className="w-5 h-5 mr-2" />
                      Start Test
                    </Button>
                  )}

                  {hasStarted && timeLeft > 0 && (
                    <>
                      {isActive ? (
                        <Button onClick={pauseTest} variant="outline" size="lg">
                          <Pause className="w-5 h-5 mr-2" />
                          Pause
                        </Button>
                      ) : (
                        <Button onClick={resumeTest} size="lg">
                          <Play className="w-5 h-5 mr-2" />
                          Resume
                        </Button>
                      )}
                    </>
                  )}

                  {hasStarted && (
                    <Button onClick={resetTest} variant="outline" size="lg">
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Statistics Card */}
          <Card className="bg-card shadow-lg border-border/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Live Statistics</CardTitle>
              <CardDescription>Your current typing performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="p-4 rounded-lg bg-primary/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground font-medium">
                      Time Left
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-primary text-center">
                    {displayValues.timeDisplay}
                  </div>
                  <div className="text-xs text-muted-foreground text-center mt-1">
                    seconds
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground font-medium">
                      WPM
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-primary text-center">
                    {wpm}
                  </div>
                  <div className="text-xs text-muted-foreground text-center mt-1">
                    words/min
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground font-medium">
                      Accuracy
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-primary text-center">
                    {accuracy}%
                  </div>
                  <div className="text-xs text-muted-foreground text-center mt-1">
                    correct
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground font-medium">
                      Progress
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-primary text-center">
                    {totalChars}
                  </div>
                  <div className="text-xs text-muted-foreground text-center mt-1">
                    characters
                  </div>
                </div>
              </div>

              {/* Test Completed Summary */}
              {hasStarted && timeLeft === 0 && (
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-950/10 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    Test Completed! 🎉
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-white dark:bg-black/20 rounded-lg">
                      <div className="font-semibold text-muted-foreground mb-2">
                        Final WPM
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        {wpm}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-black/20 rounded-lg">
                      <div className="font-semibold text-muted-foreground mb-2">
                        Accuracy
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        {accuracy}%
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-black/20 rounded-lg col-span-2 md:col-span-1">
                      <div className="font-semibold text-muted-foreground mb-2">
                        Characters
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        {correctChars}/{totalChars}
                      </div>
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

const TypingSpeed = memo(TypingSpeedComponent);

export default TypingSpeed;
