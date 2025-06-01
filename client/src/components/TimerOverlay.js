// Nový komponent: components/TimerOverlay.js
import React, { useState, useEffect } from 'react';
import { Clock, X, Play, Pause, RotateCcw } from 'lucide-react';

export const TimerOverlay = ({ initialTime, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-[1000]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-green-600" />
          <span className="font-semibold">Kuchyňský časovač</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-3xl font-mono bg-gray-100 px-3 py-1 rounded">
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 rounded-md bg-green-100 hover:bg-green-200 text-green-700"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={() => {
              setTimeLeft(initialTime);
              setIsRunning(false);
            }}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
