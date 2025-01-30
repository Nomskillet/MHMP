const canvas = document.getElementById("vinesCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const vines = [];
const maxVines = 20;

// Vine properties
function createVine() {
    const angle = Math.random() * Math.PI * 2; // Random angle
    const radius = 150; // Circle radius
    const startX = canvas.width / 2 + radius * Math.cos(angle);
    const startY = canvas.height / 2 + radius * Math.sin(angle);

    return {
        x: startX,
        y: startY,
        length: 0,
        maxLength: Math.random() * 100 + 50,
        angle: angle + (Math.random() - 0.5),
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };
}

// Draw a vine
function drawVine(vine) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(vine.x, vine.y);
    ctx.strokeStyle = vine.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Extend the vine
    vine.x += Math.cos(vine.angle) * 2;
    vine.y += Math.sin(vine.angle) * 2;
    vine.length++;
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw vines
    vines.forEach((vine, index) => {
        if (vine.length < vine.maxLength) {
            drawVine(vine);
        } else {
            vines.splice(index, 1, createVine());
        }
    });

    requestAnimationFrame(animate);
}

// Initialize vines
for (let i = 0; i < maxVines; i++) {
    vines.push(createVine());
}

// Start animation
animate();


