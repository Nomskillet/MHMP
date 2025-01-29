const canvas = document.getElementById("brainCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Draw Detailed Brain
function drawBrain() {
    ctx.beginPath();
    ctx.moveTo(centerX - 50, centerY);
    ctx.bezierCurveTo(centerX - 80, centerY - 70, centerX + 80, centerY - 70, centerX + 50, centerY);
    ctx.bezierCurveTo(centerX + 80, centerY + 70, centerX - 80, centerY + 70, centerX - 50, centerY);
    ctx.closePath();

    ctx.fillStyle = "#d6d6d6";
    ctx.fill();

    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#bbb";
    ctx.fill();
}

// Flower Class for Detailed Animation
class Flower {
    constructor(angle, distance, color) {
        this.angle = angle;
        this.distance = distance;
        this.size = 8;
        this.color = color;
    }

    draw() {
        const x = centerX + Math.cos(this.angle) * this.distance;
        const y = centerY + Math.sin(this.angle) * this.distance;

        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Petals
        for (let i = 0; i < 5; i++) {
            const petalX = x + Math.cos((i / 5) * Math.PI * 2) * this.size;
            const petalY = y + Math.sin((i / 5) * Math.PI * 2) * this.size;

            ctx.beginPath();
            ctx.arc(petalX, petalY, this.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}

// Create Flowers Around the Brain
const flowers = [];
const colors = ["#ff6f61", "#ffcc00", "#8bd3dd", "#ff9d76", "#a6d5a6"];
for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 150;
    const color = colors[i % colors.length];
    flowers.push(new Flower(angle, distance, color));
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBrain();

    flowers.forEach((flower) => {
        flower.draw();
    });

    requestAnimationFrame(animate);
}

animate();
