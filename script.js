const canvas = document.getElementById("vinesCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const vines = [];
const maxVines = 50;

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function createVine() {
    const angle = randomRange(0, Math.PI * 2);
    return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        dx: Math.cos(angle) * randomRange(1, 3),
        dy: Math.sin(angle) * randomRange(1, 3),
        points: [],
        maxPoints: randomRange(20, 50),
        color: `hsl(${randomRange(0, 360)}, 70%, 50%)`,
    };
}

function drawVine(vine) {
    vine.points.push({ x: vine.x, y: vine.y });
    if (vine.points.length > vine.maxPoints) {
        vine.points.shift();
    }

    ctx.beginPath();
    ctx.moveTo(vine.points[0].x, vine.points[0].y);
    for (let i = 1; i < vine.points.length; i++) {
        ctx.lineTo(vine.points[i].x, vine.points[i].y);
    }
    ctx.strokeStyle = vine.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    vine.x += vine.dx;
    vine.y += vine.dy;

    // Bounce off walls
    if (vine.x < 0 || vine.x > canvas.width) vine.dx *= -1;
    if (vine.y < 0 || vine.y > canvas.height) vine.dy *= -1;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let vine of vines) {
        drawVine(vine);
    }

    requestAnimationFrame(animate);
}

// Initialize vines
for (let i = 0; i < maxVines; i++) {
    vines.push(createVine());
}

// Start animation
animate();
