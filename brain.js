const brainCanvas = document.getElementById("brainCanvas");
const brainCtx = brainCanvas.getContext("2d");

brainCanvas.width = brainCanvas.offsetWidth;
brainCanvas.height = brainCanvas.offsetHeight;

let brainTime = 0;

function drawBrain() {
    brainCtx.clearRect(0, 0, brainCanvas.width, brainCanvas.height);

    const centerX = brainCanvas.width / 2;
    const centerY = brainCanvas.height / 2;
    const baseRadius = 100;
    const pulse = Math.sin(brainTime) * 10; // Smooth pulsation
    const radius = baseRadius + pulse;

    brainCtx.beginPath();
    brainCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    brainCtx.closePath();

    // Fill with gradient
    const gradient = brainCtx.createRadialGradient(centerX, centerY, baseRadius / 2, centerX, centerY, radius);
    gradient.addColorStop(0, "#d3c4aa");
    gradient.addColorStop(1, "#a89276");

    brainCtx.fillStyle = gradient;
    brainCtx.fill();

    // Stroke the outline
    brainCtx.strokeStyle = "#5b4636";
    brainCtx.lineWidth = 3;
    brainCtx.stroke();

    brainTime += 0.03;
    requestAnimationFrame(drawBrain);
}

drawBrain();
