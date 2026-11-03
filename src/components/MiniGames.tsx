import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Heart, 
  HelpCircle, 
  Sparkles, 
  RotateCcw, 
  Trophy, 
  Play, 
  CheckCircle, 
  XCircle,
  Timer
} from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundEngine } from '../utils/soundEffects';
import { triggerConfettiExplosion, triggerFireworks, triggerHeartConfetti } from '../utils/confetti';

interface FallingHeart {
  id: number;
  x: number; // percentage 10% to 90%
  y: number; // 0 to 100%
  speed: number;
  size: number;
}

export const MiniGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'hearts' | 'quiz' | 'balloons'>('hearts');

  // =================== GAME 1: CATCH THE HEARTS ===================
  const [heartsScore, setHeartsScore] = useState(0);
  const [heartsTimeLeft, setHeartsTimeLeft] = useState(30);
  const [heartsPlaying, setHeartsPlaying] = useState(false);
  const [heartsWonCelebration, setHeartsWonCelebration] = useState(false);
  const [fallingHearts, setFallingHearts] = useState<FallingHeart[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Heart game loop
  useEffect(() => {
    if (!heartsPlaying) return;

    // Timer countdown
    const timer = setInterval(() => {
      setHeartsTimeLeft((prev) => {
        if (prev <= 1) {
          setHeartsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Spawning hearts
    const spawner = setInterval(() => {
      setFallingHearts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80,
          y: -10,
          speed: 1.5 + Math.random() * 1.8,
          size: 24 + Math.random() * 14,
        },
      ]);
    }, 450);

    // Animation frame for moving hearts down
    let animFrame: number;
    const moveHearts = () => {
      setFallingHearts((prev) =>
        prev
          .map((h) => ({ ...h, y: h.y + h.speed }))
          .filter((h) => h.y < 105)
      );
      animFrame = requestAnimationFrame(moveHearts);
    };
    animFrame = requestAnimationFrame(moveHearts);

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
      cancelAnimationFrame(animFrame);
    };
  }, [heartsPlaying]);

  const handleStartHeartGame = () => {
    setHeartsScore(0);
    setHeartsTimeLeft(30);
    setHeartsWonCelebration(false);
    setFallingHearts([]);
    setHeartsPlaying(true);
    soundEngine.playSparkle();
  };

  const handleCatchHeart = (id: number) => {
    soundEngine.playCatchDing();
    setFallingHearts((prev) => prev.filter((h) => h.id !== id));
    const nextScore = heartsScore + 1;
    setHeartsScore(nextScore);

    if (nextScore === 20 && !heartsWonCelebration) {
      setHeartsWonCelebration(true);
      triggerHeartConfetti();
      soundEngine.playCelebrationFanfare();
    }
  };

  // =================== GAME 2: BROTHER TRIVIA QUIZ ===================
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const currentQuiz = BIRTHDAY_CONFIG.brotherQuizQuestions[quizQuestionIndex];

  const handleQuizAnswer = (optionIndex: number) => {
    if (quizSelectedOption !== null) return; // already answered
    setQuizSelectedOption(optionIndex);

    const isCorrect = optionIndex === currentQuiz.correctIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      soundEngine.playCatchDing();
      setQuizFeedback("Spot on! You know your brother inside out! 😂");
    } else {
      soundEngine.playWhoosh();
      setQuizFeedback(currentQuiz.explanation);
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizSelectedOption(null);
    setQuizFeedback(null);
    if (quizQuestionIndex + 1 < BIRTHDAY_CONFIG.brotherQuizQuestions.length) {
      setQuizQuestionIndex(quizQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      triggerFireworks();
      soundEngine.playCelebrationFanfare();
    }
  };

  const handleResetQuiz = () => {
    setQuizQuestionIndex(0);
    setQuizSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
    setQuizFeedback(null);
  };

  // =================== GAME 3: POP THE BALLOONS ===================
  const [poppedCount, setPoppedCount] = useState(0);
  const [latestBalloonMessage, setLatestBalloonMessage] = useState<string | null>(null);
  const [balloonsList, setBalloonsList] = useState<{ id: number; color: string; popped: boolean }[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      color: ['#f472b6', '#c084fc', '#fb7185', '#38bdf8', '#fbbf24', '#a78bfa'][i % 6],
      popped: false,
    }))
  );

  const handlePopBalloon = (id: number) => {
    const balloon = balloonsList.find((b) => b.id === id);
    if (!balloon || balloon.popped) return;

    soundEngine.playBalloonPop();
    setBalloonsList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    const nextCount = poppedCount + 1;
    setPoppedCount(nextCount);

    const msgs = BIRTHDAY_CONFIG.balloonMessages;
    const msg = msgs[(nextCount - 1) % msgs.length];
    setLatestBalloonMessage(msg);

    if (nextCount === 10) {
      triggerFireworks();
      soundEngine.playCelebrationFanfare();
    }
  };

  const handleResetBalloons = () => {
    setPoppedCount(0);
    setLatestBalloonMessage(null);
    setBalloonsList((prev) => prev.map((b) => ({ ...b, popped: false })));
  };

  return (
    <section id="games" className="py-14 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-pink-200/90 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-pink-500 uppercase mb-1">
            Birthday Arcade 🎮
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-800">
            Ranu&apos;s Playful Mini Games
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Three mobile-friendly games designed for laughs, fun, and brotherly teasing.
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 p-1.5 bg-pink-100/70 rounded-2xl max-w-md mx-auto border border-pink-200/60">
          <button
            onClick={() => setActiveGame('hearts')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeGame === 'hearts'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4 text-pink-500" />
            <span>Catch Hearts</span>
          </button>

          <button
            onClick={() => setActiveGame('quiz')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeGame === 'quiz'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-500" />
            <span>Brother Quiz</span>
          </button>

          <button
            onClick={() => setActiveGame('balloons')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeGame === 'balloons'
                ? 'bg-white text-rose-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Pop Balloons</span>
          </button>
        </div>

        {/* GAME 1: CATCH THE HEARTS */}
        {activeGame === 'hearts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>Score: <strong className="text-pink-600 text-base">{heartsScore}</strong> / 20</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Timer className="w-4 h-4 text-amber-500" />
                <span>Time: <strong className="text-slate-800">{heartsTimeLeft}s</strong></span>
              </div>
            </div>

            {/* Canvas / Arena */}
            <div
              ref={gameAreaRef}
              className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-pink-50 via-purple-50/50 to-pink-100/60 border border-pink-200 overflow-hidden select-none"
            >
              {!heartsPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/70 backdrop-blur-xs z-20">
                  <Heart className="w-12 h-12 text-pink-500 fill-pink-300 mb-2 animate-bounce" />
                  <h3 className="font-display font-bold text-lg text-slate-800">
                    Catch The Falling Hearts!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4">
                    Tap the falling hearts before they hit the ground! Reach 20 points in 30 seconds for a special crown! 👑
                  </p>
                  <button
                    onClick={handleStartHeartGame}
                    className="px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>{heartsTimeLeft === 0 ? 'Play Again' : 'Start Game'}</span>
                  </button>
                </div>
              ) : (
                fallingHearts.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => handleCatchHeart(h.id)}
                    onTouchStart={() => handleCatchHeart(h.id)}
                    style={{
                      left: `${h.x}%`,
                      top: `${h.y}%`,
                      width: `${h.size * 1.5}px`,
                      height: `${h.size * 1.5}px`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-pink-500 hover:scale-125 active:scale-90 transition-transform cursor-pointer drop-shadow-md z-10"
                  >
                    <span style={{ fontSize: `${h.size}px` }}>💖</span>
                  </button>
                ))
              )}

              {/* Celebration Banner when reaching 20 */}
              {heartsWonCelebration && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 border border-pink-300 shadow-xl px-4 py-2 rounded-full text-pink-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 z-30 animate-bounce">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>20 Hearts Caught! Birthday Queen Medal Unlocked! 👑</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GAME 2: BROTHER TRIVIA QUIZ */}
        {activeGame === 'quiz' && (
          <div className="max-w-xl mx-auto">
            {!quizFinished ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
                  <span>Question {quizQuestionIndex + 1} of {BIRTHDAY_CONFIG.brotherQuizQuestions.length}</span>
                  <span>Score: {quizScore}</span>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm text-left">
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-800">
                    {currentQuiz.question}
                  </h3>

                  <div className="mt-4 space-y-2.5">
                    {currentQuiz.options.map((option, idx) => {
                      const isSelected = quizSelectedOption === idx;
                      const isCorrect = idx === currentQuiz.correctIndex;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(idx)}
                          className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${
                            quizSelectedOption !== null
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold'
                                : isSelected
                                ? 'bg-rose-50 border-rose-300 text-rose-800'
                                : 'bg-slate-50 text-slate-400 border-slate-100'
                              : 'bg-white hover:bg-purple-50/60 border-purple-100 text-slate-700'
                          }`}
                        >
                          <span>{option}</span>
                          {quizSelectedOption !== null && (
                            <span>
                              {isCorrect ? (
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                              ) : isSelected ? (
                                <XCircle className="w-4 h-4 text-rose-500" />
                              ) : null}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Message */}
                  {quizFeedback && (
                    <div className="mt-4 p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 font-medium">
                      {quizFeedback}
                    </div>
                  )}

                  {quizSelectedOption !== null && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={handleNextQuizQuestion}
                        className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        {quizQuestionIndex + 1 < BIRTHDAY_CONFIG.brotherQuizQuestions.length
                          ? 'Next Question →'
                          : 'See Final Results 🏆'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Finished View */
              <div className="p-8 text-center bg-white rounded-2xl border border-purple-200 shadow-lg">
                <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-3 animate-bounce" />
                <h3 className="font-display text-2xl font-bold text-slate-800">
                  Sibling Connection Score: {quizScore} / {BIRTHDAY_CONFIG.brotherQuizQuestions.length}
                </h3>
                <p className="text-xs sm:text-sm text-purple-800 font-medium mt-2 max-w-sm mx-auto">
                  {quizScore >= 4
                    ? "Official Title: Supreme Brother Telepath! You know Kartik better than he knows himself! 😂❤️"
                    : "Official Title: Drama Queen Sister! You might fail his tests, but he will still spoil you! 😜"}
                </p>
                <button
                  onClick={handleResetQuiz}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* GAME 3: POP THE BALLOONS */}
        {activeGame === 'balloons' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 px-2">
              <span>Balloons Popped: <strong className="text-rose-600 text-sm">{poppedCount}</strong> / 10</span>
              <button
                onClick={handleResetBalloons}
                className="text-slate-400 hover:text-slate-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Balloons</span>
              </button>
            </div>

            {/* Active message revealed from popped balloon */}
            {latestBalloonMessage && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 border border-pink-200 text-center text-xs sm:text-sm font-semibold text-pink-900 animate-fade-in shadow-xs">
                🎈 Secret Message Revealed: &ldquo;{latestBalloonMessage}&rdquo;
              </div>
            )}

            {/* Balloons Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4 rounded-2xl bg-gradient-to-b from-sky-50 to-pink-50 border border-pink-100">
              {balloonsList.map((b) => (
                <div key={b.id} className="flex justify-center">
                  {!b.popped ? (
                    <button
                      onClick={() => handlePopBalloon(b.id)}
                      className="group flex flex-col items-center animate-float hover:scale-115 active:scale-75 transition-transform cursor-pointer"
                      style={{ animationDelay: `${(b.id * 0.3) % 2}s` }}
                    >
                      <div
                        className="w-12 h-16 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-md flex items-center justify-center text-white"
                        style={{ backgroundColor: b.color }}
                      >
                        <span className="text-[10px] font-bold opacity-75">POP</span>
                      </div>
                      <div className="w-0.5 h-6 bg-slate-300" />
                    </button>
                  ) : (
                    <div className="w-12 h-20 flex items-center justify-center text-slate-300 text-xs">
                      ✨
                    </div>
                  )}
                </div>
              ))}
            </div>

            {poppedCount >= 10 && (
              <div className="p-4 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 text-center text-xs sm:text-sm font-bold animate-bounce">
                🎉 All 10 Balloons Popped! Ranu is officially declared the champion of birthday fun!
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
