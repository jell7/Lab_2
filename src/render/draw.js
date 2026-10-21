export function drawEntity(ctx, entity) {
  ctx.save();
  ctx.translate(entity.pos.x, entity.pos.y);

  if (entity.kind === 'ship') {
    ctx.rotate(entity.angle);
    ctx.strokeStyle = '#00ffff';
    ctx.fillStyle = '#0b0f19';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-12, -10);
    ctx.lineTo(-6, 0);
    ctx.lineTo(-12, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (entity.isThrusting) {
      ctx.strokeStyle = '#ffaa00';
      ctx.beginPath();
      ctx.moveTo(-8, -5);
      ctx.lineTo(-16, 0);
      ctx.lineTo(-8, 5);
      ctx.stroke();
    }
  } else if (entity.kind === 'bullet') {
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(0, 0, entity.radius, 0, Math.PI * 2);
    ctx.fill();
  } else if (entity.kind === 'asteroid') {
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, entity.radius, 0, Math.PI * 2);
    ctx.stroke();
  } else if (entity.kind === 'pickup') {
    ctx.fillStyle = '#00ff66';
    ctx.beginPath();
    ctx.arc(0, 0, entity.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

export function drawHud(ctx, stats, score, hp) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(10, 10, 240, 110);

  ctx.fillStyle = '#00ffcc';
  ctx.font = '13px monospace';
  ctx.fillText(`Steps/s: ${stats.stepsPerSecond}`, 20, 30);
  ctx.fillText(`Frames/s: ${stats.framesPerSecond}`, 20, 50);
  ctx.fillText(`Score: ${score}`, 20, 75);
  ctx.fillText(`Ship HP: ${hp}`, 20, 95);
}