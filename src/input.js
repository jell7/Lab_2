export function createInput(target = window) {
  const down = new Set();
  const justPressed = new Set();

  target.addEventListener('keydown', (e) => {
    if (!down.has(e.code)) {
      justPressed.add(e.code);
    }
    down.add(e.code);
  });

  target.addEventListener('keyup', (e) => {
    down.delete(e.code);
  });

  return {
    isDown: (code) => down.has(code),
    isJustPressed: (code) => {
      const res = justPressed.has(code);
      return res;
    },
    clear() {
      justPressed.clear();
    }
  };
}