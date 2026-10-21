export function createShip(x, y) {
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    angle: 0,
    thrusting: false
  };
}

export function integrate(ship, input, dt, arenaWidth, arenaHeight) {
  const rotationSpeed = Math.PI * 1.5;
  const acceleration = 300;
  const drag = 0.98;

  if (input.isDown('ArrowLeft') || input.isDown('KeyA')) {
    ship.angle -= rotationSpeed * dt;
  }
  if (input.isDown('ArrowRight') || input.isDown('KeyD')) {
    ship.angle += rotationSpeed * dt;
  }

  ship.thrusting = input.isDown('ArrowUp') || input.isDown('KeyW');
  if (ship.thrusting) {
    ship.vx += Math.cos(ship.angle) * acceleration * dt;
    ship.vy += Math.sin(ship.angle) * acceleration * dt;
  }

  ship.vx *= Math.pow(drag, dt * 60);
  ship.vy *= Math.pow(drag, dt * 60);

  ship.x += ship.vx * dt;
  ship.y += ship.vy * dt;
}