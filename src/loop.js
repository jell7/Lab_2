export function createLoop({ step = 1 / 60, simulate, render }) {
  let accumulator = 0;
  let lastTime = performance.now();
  let rafId = null;

  let stepCount = 0;
  let frameCount = 0;
  let stepsPerSecond = 0;
  let framesPerSecond = 0;
  let lastFpsUpdate = lastTime;
  let lastFrameMs = 0;

  function frame(now) {
    const frameTime = (now - lastTime) / 1000;
    lastFrameMs = now - lastTime;
    lastTime = now;

    accumulator += Math.min(frameTime, 0.25);

    frameCount++;
    if (now - lastFpsUpdate >= 1000) {
      stepsPerSecond = stepCount;
      framesPerSecond = frameCount;
      stepCount = 0;
      frameCount = 0;
      lastFpsUpdate = now;
    }

    while (accumulator >= step) {
      simulate(step);
      stepCount++;
      accumulator -= step;
    }

    const alpha = accumulator / step;
    render(alpha, { stepsPerSecond, framesPerSecond, lastFrameMs });

    rafId = requestAnimationFrame(frame);
  }

  return {
    start() {
      lastTime = performance.now();
      rafId = requestAnimationFrame(frame);
    },
    stop() {
      if (rafId) cancelAnimationFrame(rafId);
    }
  };
}