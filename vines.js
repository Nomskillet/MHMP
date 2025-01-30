document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("vinesCanvas");
    paper.setup(canvas);

    // Resize canvas to fit its container
    function resizeCanvas() {
        const container = document.getElementById("animationContainer");
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        paper.view.viewSize = new paper.Size(canvas.width, canvas.height);
        console.log(`Canvas resized: ${canvas.width} x ${canvas.height}`);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const tl = gsap.timeline();

    // Define vine paths and groups dynamically
    const vinePaths = [
        { selector: '#LeftBottomGroup_1_ path', direction: 'bottom-left' },
        { selector: '#LeftTopGroup_1_ path', direction: 'top-left' },
        { selector: '#RightBottomGroup_1_ path', direction: 'bottom-right' },
        { selector: '#RightTopGroup_1_ path', direction: 'top-right' },
    ];

    // Setup vine growth animations
    vinePaths.forEach((vinePath) => {
        const vines = document.querySelectorAll(vinePath.selector);

        if (vines.length) {
            tl.staggerFromTo(
                vines,
                2,
                { drawSVG: "0% 0%", autoAlpha: 0 },
                { drawSVG: "0% 100%", autoAlpha: 1 },
                0.2,
                "start"
            );
        }
    });

    // Define additional animations for stems, leaves, and flowers
    const stemGroups = [
        '#Stem2_1_', '#Stem3_1_', '#Stem4_1_', '#Stem5a_1_', '#Stem5b_1_',
    ];

    const leafGroups = [
        '#Leaf2_1_', '#Leaf4_1_', '#Leaf5a_1_', '#Leaf5b_1_',
    ];

    const flowerGroups = [
        '#Bud3_1_', '#Bud6_1_', '#Bud18_1_',
    ];

    // Staggered animations for stems
    tl.staggerFromTo(
        stemGroups,
        1.5,
        { drawSVG: "0% 0%", autoAlpha: 0 },
        { drawSVG: "0% 100%", autoAlpha: 1 },
        0.2,
        "start+=0.5"
    );

    // Staggered animations for leaves
    tl.staggerFromTo(
        leafGroups,
        1.5,
        { scale: 0, autoAlpha: 0, transformOrigin: "center center" },
        { scale: 1, autoAlpha: 1 },
        0.2,
        "start+=0.8"
    );

    // Flower blooming animation
    tl.staggerFromTo(
        flowerGroups,
        1.5,
        { scale: 0, autoAlpha: 0, transformOrigin: "center center" },
        { scale: 1, autoAlpha: 1 },
        0.3,
        "start+=1.0"
    );

    // Final update to canvas
    function animateCanvas() {
        paper.view.update();
        requestAnimationFrame(animateCanvas);
    }

    animateCanvas();
});
