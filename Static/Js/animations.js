const animateNumbers = (entries, observer) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        const target = Number.parseInt(entry.target.getAttribute("data-target"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
        current += increment;
        if (current < target) {
            entry.target.textContent = Math.floor(current);
            requestAnimationFrame(updateNumber);
        } else {
            entry.target.textContent = target + (target === 100 ? "%" : "+");
        }
        };
        updateNumber();
        observer.unobserve(entry.target);
    }
    });
};

const statsObserver = new IntersectionObserver(animateNumbers, { threshold: 0.5 });
document.querySelectorAll(".stat-number").forEach((stat) => statsObserver.observe(stat));

const enhancedFadeInObserver = new IntersectionObserver(
    (entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
        setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }, index * 100);
        enhancedFadeInObserver.unobserve(entry.target);
        }
    });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(".service-card, .standard-card, .stat-box, .info-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    enhancedFadeInObserver.observe(el);
});

const canvas = document.getElementById("particleCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    const particleCount = 120;
    const maxDistance = 150;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.7;
            this.speedY = (Math.random() - 0.5) * 0.7;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        // Lógica de conexión...
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist/maxDistance) * 0.15})`;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        animationId = requestAnimationFrame(animate);
    }
    initParticles();
    animate();
    window.addEventListener("resize", resizeCanvas);
}