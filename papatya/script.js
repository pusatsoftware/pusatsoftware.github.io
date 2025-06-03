const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Branch {
  constructor(startX, startY, ctrlX, ctrlY, endX, endY, depth, parentAngle) {
    this.startX = startX;
    this.startY = startY;
    this.ctrlX = ctrlX;
    this.ctrlY = ctrlY;
    this.endX = endX;
    this.endY = endY;
    this.progress = 0;
    this.depth = depth;
    this.finished = false;
    this.childrenSpawned = false;
    this.floralDone = false;
    this.parentAngle = parentAngle;
  }

  draw() {
    this.progress += 0.004;
    if (this.progress > 1) this.progress = 1;
    if (this.progress === 1) this.finished = true;

    const t = this.progress;
    const x = (1 - t) ** 2 * this.startX + 2 * (1 - t) * t * this.ctrlX + t ** 2 * this.endX;
    const y = (1 - t) ** 2 * this.startY + 2 * (1 - t) * t * this.ctrlY + t ** 2 * this.endY;

    const lineWidth = 1.5 * (this.depth / maxDepth);
    ctx.strokeStyle = `rgba(50, 160, 50, ${t})`;
    ctx.lineWidth = lineWidth < 0.6 ? 0.6 : lineWidth;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.quadraticCurveTo(this.ctrlX, this.ctrlY, x, y);
    ctx.stroke();

    return { x, y };
  }
}

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.opacity = 0;
    this.scale = 0;
    this.petalCount = 18 + Math.floor(Math.random() * 6);
    this.rotation = (Math.random() - 0.5) * 0.6;
  }

  draw() {
    if (this.opacity < 1) this.opacity += 0.025;
    if (this.scale < 1) this.scale += 0.02;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;

    for (let i = 0; i < this.petalCount; i++) {
      const angle = (i * 2 * Math.PI) / this.petalCount;
      ctx.save();
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(2 * this.scale, -5 * this.scale, 3 * this.scale, -12 * this.scale, 0, -14 * this.scale);
      ctx.bezierCurveTo(-3 * this.scale, -12 * this.scale, -2 * this.scale, -5 * this.scale, 0, 0);
      ctx.fillStyle = "white";
      ctx.shadowColor = "rgba(200,200,200,0.6)";
      ctx.shadowBlur = 5;
      ctx.fill();

      ctx.restore();
    }

    ctx.beginPath();
    ctx.fillStyle = "gold";
    ctx.shadowColor = "rgba(255, 215, 0, 0.8)";
    ctx.shadowBlur = 8;
    ctx.arc(0, 0, 4 * this.scale, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  }
}

let branches = [];
let flowers = [];
const maxDepth = 6;

function spawnBranch(x, y, depth, angle, length) {
  if (depth <= 0) return;

  length = length * (0.7 + 0.3 * Math.random());

  const endX = x + Math.cos(angle) * length;
  const endY = y + Math.sin(angle) * length;
  const ctrlX = (x + endX) / 2 + (Math.random() - 0.5) * 20;
  const ctrlY = (y + endY) / 2 - Math.random() * 20;

  branches.push(new Branch(x, y, ctrlX, ctrlY, endX, endY, depth, angle));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let b of branches) {
    const { x, y } = b.draw();

    if (b.finished && !b.childrenSpawned) {
      if (b.depth > 1) {
        if (b.depth === maxDepth) {
          // İlk dal yukarı dikey
          spawnBranch(x, y, b.depth - 1, -Math.PI / 2, 120 + Math.random() * 40);
        } else {
          // Sonraki dallar sağa ve sola daha geniş yayılıyor
          const branchesCount = 3 + Math.floor(Math.random() * 2); // 3-4 dal
          for (let i = 0; i < branchesCount; i++) {
            const spread = Math.PI / 2; // 90 derece açılım
            const angleOffset = (Math.random() - 0.5) * 2 * spread;
            spawnBranch(x, y, b.depth - 1, b.parentAngle + angleOffset, 60 + Math.random() * 40);
          }
        }
      }

      if (!b.floralDone) {
        flowers.push(new Flower(b.endX, b.endY));
        b.floralDone = true;
      }
      b.childrenSpawned = true;
    }
  }

  for (let f of flowers) {
    f.draw();
  }

  requestAnimationFrame(animate);
}

function start() {
  branches = [];
  flowers = [];

  const baseX = canvas.width / 2;
  const baseY = canvas.height;

  // Sadece 1 tane kök dalı yukarı doğru başlatıyoruz
  spawnBranch(baseX, baseY, maxDepth, -Math.PI / 2, 100);

  animate();
}

start();
