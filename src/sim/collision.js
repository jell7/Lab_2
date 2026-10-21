export function checkCollisions(world, scoreCallback) {
  const entities = [...world];

  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      const a = entities[i];
      const b = entities[j];

      if (!a.alive || !b.alive) continue;

      // Не перевіряємо однакові типи або деякі комбінації
      if (a.kind === b.kind) continue;

      const dx = a.pos.x - b.pos.x;
      const dy = a.pos.y - b.pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < a.radius + b.radius) {
        // Логіка зіткнень куля <-> астероїд
        if ((a.kind === 'bullet' && b.kind === 'asteroid') || (a.kind === 'asteroid' && b.kind === 'bullet')) {
          a.alive = false;
          b.alive = false;
          scoreCallback(100);
        }

        // Логіка зіткнень куля <-> корабель ворога абощо
        if (a.kind === 'bullet' && b.kind === 'ship') {
          a.alive = false;
          b.takeDamage(25);
        }
        if (a.kind === 'ship' && b.kind === 'bullet') {
          b.alive = false;
          a.takeDamage(25);
        }

        // Корабель <-> Астероїд
        if ((a.kind === 'ship' && b.kind === 'asteroid') || (a.kind === 'asteroid' && b.kind === 'ship')) {
          const ship = a.kind === 'ship' ? a : b;
          ship.takeDamage(50);
          b.alive = false;
        }

        // Корабель <-> Pickup (бонус)
        if ((a.kind === 'ship' && b.kind === 'pickup') || (a.kind === 'pickup' && b.kind === 'ship')) {
          const pickup = a.kind === 'pickup' ? a : b;
          pickup.alive = false;
          scoreCallback(250);
        }
      }
    }
  }
}