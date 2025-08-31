import { useState, useEffect } from "react";

export const useCountdown = (initialSeconds) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (initialSeconds) {
      setSecondsLeft(initialSeconds);
    }
  }, [initialSeconds]);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [secondsLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return { secondsLeft, setSecondsLeft, formatTime };
};
