const canvas = document.getElementById("wormhole");
const ctx = canvas.getContext("2d");

let width, height, particles;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * width,
            radius: Math.random() * 3 + 1,
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";

    particles.forEach((particle) => {
        let perspective = width / (width + particle.z);
        let x2d = particle.x * perspective;
        let y2d = particle.y * perspective;
        let radius2d = particle.radius * perspective;

        ctx.beginPath();
        ctx.arc(x2d, y2d, radius2d, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateParticles() {
    particles.forEach((particle) => {
        particle.z -= 2;
        if (particle.z <= 0) {
            particle.z = width;
        }
    });
}

function animate() {
    drawParticles();
    updateParticles();
    requestAnimationFrame(animate);
}

// Initialize
resizeCanvas();
createParticles();
animate();
window.addEventListener("resize", resizeCanvas);
