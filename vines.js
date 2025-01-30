const vinesCanvas = document.getElementById("vinesCanvas");
const vinesCtx = vinesCanvas.getContext("2d");

vinesCanvas.width = vinesCanvas.offsetWidth;
vinesCanvas.height = vinesCanvas.offsetHeight;

// Configuration for the vine growth
const maxDepth = 5;
const branchLength = 40;
const branchAngle = Math.PI / 4;

// Recursive function to draw vines
function drawBranch(x, y, angle, depth) {
    if (depth === 0) return;

    // Calculate endpoint of the current branch
    const endX = x + Math.cos(angle) * branchLength * (0.8 + Math.random() * 0.4);
    const endY = y + Math.sin(angle) * branchLength * (0.8 + Math.random() * 0.4);

    // Draw the branch
    vinesCtx.beginPath();
    vinesCtx.moveTo(x, y);
    vinesCtx.lineTo(endX, endY);
    vinesCtx.strokeStyle = `hsl(${Math.random() * 120 + 120}, 70%, 50%)`; // Greenish hues
    vinesCtx.lineWidth = depth;
    vinesCtx.stroke();

    // Recursively draw branches
    setTimeout(() => {
        drawBranch(endX, endY, angle - branchAngle * (0.7 + Math.random() * 0.6), depth - 1);
        drawBranch(endX, endY, angle + branchAngle * (0.7 + Math.random() * 0.6), depth - 1);
    }, 300);
}

// Start drawing vines from the circle border
function startVines() {
    vinesCtx.clearRect(0, 0, vinesCanvas.width, vinesCanvas.height);

    const centerX = vinesCanvas.width / 2;
    const centerY = vinesCanvas.height / 2;
    const radius = 200;

    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const startX = centerX + Math.cos(angle) * radius;
        const startY = centerY + Math.sin(angle) * radius;
        drawBranch(startX, startY, angle, maxDepth);
    }
}

startVines();

