import confetti from 'canvas-confetti';

const PASTEL_COLORS = ['#f472b6', '#c084fc', '#fbcfe8', '#f43f5e', '#fbbf24', '#e0e7ff', '#fda4af'];

export function triggerConfettiExplosion(x = 0.5, y = 0.6) {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x, y },
    colors: PASTEL_COLORS,
    disableForReducedMotion: true,
  });
}

export function triggerHeartConfetti() {
  // Dual-cannon heart and soft petal explosion
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af'],
    shapes: ['circle'],
    disableForReducedMotion: true,
  });
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af'],
    shapes: ['circle'],
    disableForReducedMotion: true,
  });
}

export function triggerGrandCelebration(durationMs = 3500) {
  const end = Date.now() + durationMs;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.65 },
      colors: PASTEL_COLORS,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.65 },
      colors: PASTEL_COLORS,
      disableForReducedMotion: true,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

export function triggerFireworks() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f472b6', '#ec4899'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#c084fc', '#a855f7'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#fde047', '#fbbf24', '#f472b6'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#e0e7ff', '#c7d2fe'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#fda4af', '#f43f5e'],
  });
}
