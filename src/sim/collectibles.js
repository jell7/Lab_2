export function createCollectibleManager() {
  return {
    items: [],
    spawnTimer: 0,
    spawnInterval: 5, 
    score: 0,          

    update(dt, arenaWidth, arenaHeight) {
      this.spawnTimer += dt;
      if (this.spawnTimer >= this.spawnInterval) {
        this.spawnTimer = 0;
        this.spawnItem(arenaWidth, arenaHeight);
      }
    },

    // Створення випадкового бонуса на арені
    spawnItem(width, height) {
      const padding = 50;
      const x = padding + Math.random() * (width - padding * 2);
      const y = padding + Math.random() * (height - padding * 2);

      this.items.push({
        x,
        y,
        radius: 10,
        value: 1 // скільки очок дає бонус
      });
    },

    // Перевірка зіткнення корабля з бонусами
    checkCollisions(ship) {
      const shipRadius = 12; // радіус зіткнення корабля

      for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];
    
        const dx = ship.x - item.x;
        const dy = ship.y - item.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Якщо відстань менша за суму радіусів — сталося зіткнення
        if (distance < shipRadius + item.radius) {
          this.score += item.value;
          this.items.splice(i, 1); 
        }
      }
    }
  };
}