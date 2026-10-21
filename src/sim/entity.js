import { Vector2 } from './vector.js';

export class Entity {
  static #nextId = 1;
  #id = Entity.#nextId++;

  constructor(x, y, kind, radius = 10) {
    this.id = this.#id;
    this.pos = new Vector2(x, y);
    this.vel = new Vector2(0, 0);
    this.angle = 0;
    this.radius = radius;
    this.kind = kind;
    this.alive = true;
  }

  update(dt, world, inputs) {
    this.pos = this.pos.add(this.vel.scale(dt));
  }
}

export class Ship extends Entity {
  #hp = 100;

  constructor(x, y) {
    super(x, y, 'ship', 15);
    this.rotationSpeed = Math.PI * 1.5;
    this.acceleration = 300;
    this.drag = 0.98;
    this.isThrusting = false;
    this.cooldown = 0;
  }

  get hp() {
    return this.#hp;
  }

  takeDamage(amount) {
    this.#hp -= amount;
    if (this.#hp <= 0) {
      this.alive = false;
    }
  }

  fire(world) {
    if (this.cooldown > 0) return;
    this.cooldown = 0.25;

    const noseOffset = Vector2.fromAngle(this.angle, 20);
    const spawnPos = this.pos.add(noseOffset);
    const bulletVel = Vector2.fromAngle(this.angle, 500).add(this.vel);

    const bullet = new Bullet(spawnPos.x, spawnPos.y, bulletVel);
    world.spawn(bullet);
  }

  update(dt, world, inputs) {
    if (this.cooldown > 0) this.cooldown -= dt;

    // Управління поворотом
    if (inputs.isDown('ArrowLeft') || inputs.isDown('KeyA')) {
      this.angle -= this.rotationSpeed * dt;
    }
    if (inputs.isDown('ArrowRight') || inputs.isDown('KeyD')) {
      this.angle += this.rotationSpeed * dt;
    }

    this.isThrusting = inputs.isDown('ArrowUp') || inputs.isDown('KeyW');
    if (this.isThrusting) {
      const dir = Vector2.fromAngle(this.angle, this.acceleration * dt);
      this.vel = this.vel.add(dir);
    }

    if (inputs.isDown('Space')) {
      this.fire(world);
    }

    // Опір середовища
    this.vel = this.vel.scale(Math.pow(this.drag, dt * 60));

    super.update(dt, world, inputs);
  }
}

export class Bullet extends Entity {
  constructor(x, y, vel) {
    super(x, y, 'bullet', 4);
    this.vel = vel;
    this.ttl = 2.0;
  }

  update(dt, world) {
    this.ttl -= dt;
    if (this.ttl <= 0) {
      this.alive = false;
    }
    super.update(dt, world);
  }
}

export class Asteroid extends Entity {
  constructor(x, y, vel, radius = 25) {
    super(x, y, 'asteroid', radius);
    this.vel = vel;
  }
}

export class Pickup extends Entity {
  constructor(x, y) {
    super(x, y, 'pickup', 12);
  }
}