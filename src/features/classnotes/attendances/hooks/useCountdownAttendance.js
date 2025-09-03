import { useEffect, useState } from "react";

export const useCountdownAttendance = (targetTime) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    return targetTime ? new Date(targetTime).getTime() - Date.now() : 0;
  });

  useEffect(() => {
    if (!targetTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = new Date(targetTime).getTime() - now;

      if (distance <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const formatTime = () => {
    const totalSeconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return {
    timeLeft,
    isFinished: timeLeft === 0,
    formatted: formatTime()
  };
};
