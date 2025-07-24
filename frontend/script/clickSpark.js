// 🔥 Click Sparkle Effect in Vanilla JS
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = "none";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = 9999;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sparks = [];
    const sparkCount = 10;
    const sparkSize = 10;
    const sparkRadius = 15;
    const duration = 500;

    function createSparks(x, y) {
        const now = performance.now();
        for (let i = 0; i < sparkCount; i++) {
            const angle = (2 * Math.PI * i) / sparkCount;
            sparks.push({
                x,
                y,
                angle,
                startTime: now,
            });
        }
    }

    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = sparks.length - 1; i >= 0; i--) {
            const spark = sparks[i];
            const elapsed = time - spark.startTime;
            if (elapsed > duration) {
                sparks.splice(i, 1);
                continue;
            }

            const progress = elapsed / duration;
            const eased = progress * (2 - progress); // ease-out

            const distance = eased * sparkRadius;
            const length = sparkSize * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + length) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + length) * Math.sin(spark.angle);

            ctx.strokeStyle = "#fc8019";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    document.addEventListener("click", (e) => {
        createSparks(e.clientX, e.clientY);
    });

    requestAnimationFrame(animate);
});