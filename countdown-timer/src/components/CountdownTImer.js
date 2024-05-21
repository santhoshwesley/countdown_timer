import React, { useState, useEffect, useRef } from "react";
import "../styles/CountdownTimer.css";
const CountdownTimer = ({ targetDate, onCancel }) => {
  const audioRef = useRef(new Audio("/notifications.wav"));

  const calculateTimeLeft = (target) => {
    const difference = target - new Date();
    const timeLeft = {
      total: difference,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(targetDate);
      if (updatedTimeLeft.total <= 0) {
        clearInterval(timer);
        audioRef.current.play();
        setTimeLeft({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft(updatedTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-timer">
      {timeLeft.total <= 0 ? (
        <div>
          <p>Countdown is over! What's next on your adventure?</p>
          <button className="cancel-button" onClick={onCancel}>
            Clear
          </button>
        </div>
      ) : (
        <>
          <div className="timer-container">
            <div className="timer-item">
              <p>{timeLeft.days}</p>
              <p>Days</p>
            </div>
            <div className="timer-item">
              <p>{timeLeft.hours}</p>
              <p>Hours</p>
            </div>
            <div className="timer-item">
              <p>{timeLeft.minutes}</p>
              <p>Minutes</p>
            </div>
            <div className="timer-item">
              <p>{timeLeft.seconds}</p>
              <p>Seconds</p>
            </div>
          </div>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
};
export default CountdownTimer;
