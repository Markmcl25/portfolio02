window.onload = function () {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
        console.error("Canvas not found!");
        return;
    }
    console.log("Canvas found and initializing...");

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.size = Math.random() * 10 + 5;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.color = "rgba(255, 255, 255, 1)"; // Brighter particles
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.speedX *= -1;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.speedY *= -1;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    const particles = [];
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
};
