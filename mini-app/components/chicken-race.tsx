"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

export default function ChickenRace() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!running) return;
    if (e.key.toLowerCase() === "a") {
      setCount1((c) => c + 1);
    } else if (e.key.toLowerCase() === "l") {
      setCount2((c) => c + 1);
    }
  }, [running]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      endGame();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [running, timeLeft, endGame]);

  const startGame = () => {
    setCount1(0);
    setCount2(0);
    setWinner(null);
    setTimeLeft(5);
    setRunning(true);
  };

  const endGame = () => {
    setRunning(false);
    if (count1 > count2) setWinner("Player 1 (A)");
    else if (count2 > count1) setWinner("Player 2 (L)");
    else setWinner("Tie");
  };

  const resetGame = () => {
    setCount1(0);
    setCount2(0);
    setWinner(null);
    setRunning(false);
    setTimeLeft(0);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="text-xl font-semibold">Chicken Race</div>
      <div className="text-sm text-muted-foreground">
        Press <span className="font-mono">A</span> for Player 1, <span className="font-mono">L</span> for Player 2
      </div>
      <div className="flex gap-8">
        <div className="text-center">
          <div className="text-4xl">{count1}</div>
          <div className="text-sm">Player 1 (A)</div>
        </div>
        <div className="text-center">
          <div className="text-4xl">{count2}</div>
          <div className="text-sm">Player 2 (L)</div>
        </div>
      </div>
      <div className="text-lg">
        {running ? `Time left: ${timeLeft}s` : winner ? `Winner: ${winner}` : "Press Start to play"}
      </div>
      <div className="flex gap-4">
        {!running && !winner && (
          <Button onClick={startGame}>Start</Button>
        )}
        {winner && (
          <Button variant="secondary" onClick={resetGame}>Play Again</Button>
        )}
      </div>
    </div>
  );
}
