document.addEventListener('DOMContentLoaded', function() {
    // --- Feather Icons Initialization ---
    feather.replace();

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Header Background on Scroll ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-gray-900', 'shadow-lg');
        } else {
            header.classList.remove('bg-gray-900', 'shadow-lg');
        }
    });

    // --- Animated Typing Effect ---
    const typingTextElement = document.getElementById('typing-text');
    const phrases = ["Data Enthusiast", "Business Analyst", "Strategic Thinker", "Data Science"];

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typingEffect() {
        let phraseIndex = 0;
        while (true) {
            const currentPhrase = phrases[phraseIndex];
            for (let i = 0; i <= currentPhrase.length; i++) {
                if (typingTextElement) {
                    typingTextElement.textContent = currentPhrase.substring(0, i);
                }
                await sleep(100);
            }
            await sleep(2000);
            for (let i = currentPhrase.length; i >= 0; i--) {
                if (typingTextElement) {
                    typingTextElement.textContent = currentPhrase.substring(0, i);
                }
                await sleep(50);
            }
            await sleep(500);
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }
    if (typingTextElement) {
        typingEffect();
    }

    // --- Project Filtering ---
    const filterContainer = document.querySelector("#project-filters");
    const projectCards = document.querySelectorAll("#project-grid .project-card");

    if (filterContainer) {
        filterContainer.addEventListener("click", (event) => {
            if (event.target.tagName !== 'BUTTON') return;

            filterContainer.querySelector(".active").classList.remove("active");
            event.target.classList.add("active");

            const filter = event.target.dataset.filter;

            projectCards.forEach(card => {
                const categories = card.dataset.category.split(' ');

                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }

    // --- Animate Sections on Scroll ---
    const sections = document.querySelectorAll('.fade-in-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Hero Canvas Animation ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = 'rgba(34, 211, 238, 0.5)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.1) this.size -= 0.01;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        function initParticles() {
            particles = [];
            const particleCount = Math.floor(canvas.width / 20);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        function handleParticles() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(34, 211, 238, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.2;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
                if (particles[i].size <= 0.1) {
                    particles.splice(i, 1);
                    i--;
                    particles.push(new Particle());
                }
            }
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
            requestAnimationFrame(animate);
        }
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        resizeCanvas();
        initParticles();
        animate();
    }
});