// src/components/Timer.js
import React, { useState, useEffect } from 'react';
import '../styles/Timer.css';

const Timer = ({ onSessionEnd }) => {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  // Conversion function: converts seconds into "Hh Mm Ss" format.
  const convertSecondsToTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${secs}s`);
    return parts.join(' ');
  };

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active]);

  const handleStart = () => setActive(true);
  const handlePause = () => setActive(false);
  
  // When stopping, compute the formatted time and pass both values.
  const handleStop = () => {
    setActive(false);
    const formattedTime = convertSecondsToTime(seconds);
    onSessionEnd(seconds, formattedTime);
    setSeconds(0);
  };

  return (
    <div className="timer">
      <h2>Timer</h2>
      <div>Elapsed Time: {convertSecondsToTime(seconds)}</div>
      <div className="timer-buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop}>Stop & Save Session</button>
      </div>
    </div>
  );
};

export default Timer;
