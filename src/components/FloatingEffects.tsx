import React, { useState } from 'react';
import { Sparkles, EyeOff, Eye } from 'lucide-react';

export const FloatingEffects: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  // Background floating pastel elements
  const floatingItems = [
    { type: 'heart', color: 'text-pink-300/40', size: 'text-2xl', left: '8%', delay: '0s', duration: '14s' },
    { type: 'butterfly', color: 'text-purple-300/40', size: 'text-xl', left: '22%', delay: '3s', duration: '16s' },
    { type: 'star', color: 'text-amber-200/50', size: 'text-lg', left: '38%', delay: '1s', duration: '12s' },
    { type: 'petal', color: 'text-rose-300/40', size: 'text-xl', left: '55%', delay: '5s', duration: '15s' },
    { type: 'heart', color: 'text-pink-400/35', size: 'text-3xl', left: '72%', delay: '2s', duration: '18s' },
    { type: 'star', color: 'text-purple-200/40', size: 'text-sm', left: '86%', delay: '4s', duration: '13s' },
    { type: 'butterfly', color: 'text-pink-300/40', size: 'text-lg', left: '94%', delay: '6s', duration: '17s' },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'heart':
        return '💖';
      case 'butterfly':
        return '🦋';
      case 'star':
        return '✨';
      case 'petal':
        return '🌸';
      default:
        return '✨';
    }
  };

  if (disabled) {
    return (
      <button
        onClick={() => setDisabled(false)}
        className="fixed bottom-20 right-4 z-40 p-2.5 rounded-full bg-white/80 backdrop-blur border border-pink-200 text-pink-600 shadow-md text-xs flex items-center gap-1.5 hover:bg-pink-50 transition-colors"
        title="Enable background sparkles & floating particles"
      >
        <Eye className="w-3.5 h-3.5" />
        <span className="text-[11px] font-medium hidden sm:inline">Sparkles</span>
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingItems.map((item, index) => (
          <div
            key={index}
            className={`absolute select-none ${item.color} ${item.size} animate-float`}
            style={{
              left: item.left,
              bottom: '-30px',
              animation: `floatUp ${item.duration} linear infinite`,
              animationDelay: item.delay,
            }}
          >
            {renderIcon(item.type)}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(105vh) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>

      {/* Floating control to toggle particles for performance/cleanliness */}
      <button
        onClick={() => setDisabled(true)}
        className="fixed bottom-20 right-4 z-40 p-2 rounded-full bg-white/60 hover:bg-white/90 backdrop-blur border border-pink-200 text-pink-500 shadow-sm transition-all opacity-60 hover:opacity-100"
        title="Reduce motion / hide floating particles"
      >
        <EyeOff className="w-3.5 h-3.5" />
      </button>
    </>
  );
};
