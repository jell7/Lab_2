import { setupCanvas } from './render/canvas.js';
import { createInput } from './input.js';
import { Ship, Asteroid, Pickup } from './sim/entity.js';
import { World } from './sim/world.js';
import { checkCollisions } from './sim/collision.js';
import { Vector2 } from './sim/vector.js';
import { createLoop } from './loop.js';
import { drawEntity, drawHud } from './render/draw.js';

const canvas = document.getElementById('gameCanvas');
const { ctx, width, height } = setupCanvas(canvas);
const input = createInput();

const world = new World();

function spawnPlayer() {
  return new Ship(width() / 2, height() / 2);
}

let playerShip = spawnPlayer();
world.spawn(playerShip);

let score = 0;
let asteroidTimer = 0;
let pickupTimer = 0;

const loop = createLoop({
  step: 1 / 60,
  simulate: (dt) => {
    if (!playerShip.alive) {
      if (input.isDown('Enter') || input.isDown('NumpadEnter')) {
        world.clear();   
        score = 0;    
        asteroidTimer = 0;  
        pickupTimer = 0;
        
        playerShip = spawnPlayer(); 
        world.spawn(playerShip);  
      }
      return;
    }

    // спавн астероїдів
    asteroidTimer += dt;
    if (asteroidTimer > 2.0) {
      asteroidTimer = 0;
      const ax = Math.random() * width();
      const ay = Math.random() * height();
      const aVel = new Vector2((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
      world.spawn(new Asteroid(ax, ay, aVel, 20 + Math.random() * 15));
    }

    // спавн бонусів
    pickupTimer += dt;
    if (pickupTimer > 5.0) {
      pickupTimer = 0;
      world.spawn(new Pickup(Math.random() * width(), Math.random() * height()));
    }

    world.step(dt, input, width(), height());

    // Перевірка колізій
    checkCollisions(world, (points) => {
      score += points;
    });

    input.clear();
  },
  render: (alpha, stats) => {
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, width(), height());

    // Рендеринг усіх сутностей у світі
    for (const entity of world) {
      drawEntity(ctx, entity);
    }

    drawHud(ctx, stats, score, playerShip.alive ? playerShip.hp : 0);

    if (!playerShip.alive) {
      ctx.save();
      ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER - Press ENTER to Restart', width() / 2, height() / 2);
      ctx.restore();
    }
  }
});

loop.start();