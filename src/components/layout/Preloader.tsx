import React, { useEffect, useState } from 'react';
import { Shield, HeartHandshake } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 400);
          }, 200);
          return 100;
        }
        return prev + 12;
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isFading && progress >= 100) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-950 text-white transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Brand Emblem */}
        <div className="relative flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-tr from-teal-600 via-cyan-500 to-teal-400 p-0.5 shadow-xl shadow-teal-500/20 animate-pulse-subtle">
          <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center">
            <HeartHandshake className="w-10 h-10 text-cyan-400 animate-bounce" />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <h1 className="font-serif text-4xl tracking-wide font-normal bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-teal-300 mb-2">
          SAHYA
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-teal-300/80 font-medium mb-8">
          Community Support Network
        </p>

        {/* Progress Bar Container */}
        <div className="w-48 h-1.5 bg-navy-800 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
