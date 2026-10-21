export class World {
  #entities = new Map();

  spawn(entity) {
    this.#entities.set(entity.id, entity);
  }

  despawn(id) {
    const entity = this.#entities.get(id);
    if (entity) {
      entity.alive = false;
    }
  }

  clear() {
    this.#entities.clear();
  }

  get(id) {
    return this.#entities.get(id);
  }

  *[Symbol.iterator]() {
    yield* this.#entities.values();
  }

  *ofKind(kind) {
    for (const e of this) {
      if (e.kind === kind && e.alive) {
        yield e;
      }
    }
  }

  step(dt, inputs, width, height) {
    for (const entity of this.#entities.values()) {
      if (entity.alive) {
        entity.update(dt, this, inputs);
        
        if (entity.pos.x < 0) entity.pos.x += width;
        if (entity.pos.x > width) entity.pos.x -= width;
        if (entity.pos.y < 0) entity.pos.y += height;
        if (entity.pos.y > height) entity.pos.y -= height;
      }
    }

    for (const [id, entity] of this.#entities.entries()) {
      if (!entity.alive) {
        this.#entities.delete(id);
      }
    }
  }
}