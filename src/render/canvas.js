export function setupCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  return { ctx, width: () => window.innerWidth, height: () => window.innerHeight };
}