// =====================
// SCROLL PROGRESS BAR
// =====================
const bar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (scroll / height * 100) + '%';
});

// =====================
// CUSTOM CURSOR GLOW
// =====================
const cursor = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
});

// Scale cursor on hover over interactive elements
document.querySelectorAll('a, button, .node-card, .skill-card, .project-card, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.2)';
        cursor.style.opacity   = '0.2';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.opacity   = '0.35';
    });
});

// =====================
// FLOATING PARTICLES (HERO)
// =====================
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 28;

for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left   = Math.random() * 100 + '%';
    p.style.bottom = Math.random() * 30 + '%';
    p.style.setProperty('--dur',   (Math.random() * 4 + 3) + 's');
    p.style.setProperty('--delay', (Math.random() * 5) + 's');
    particleContainer.appendChild(p);
}

// =====================
// TYPING EFFECT
// =====================
const typingText = 'Electrical Engineering | Automation Engineer';
let typingIndex = 0;
const typingEl = document.getElementById('typing-target');

// Remove the blinking cursor pseudo-element during typing
function typingStep() {
    if (typingIndex < typingText.length) {
        typingEl.textContent += typingText[typingIndex];
        typingIndex++;
        setTimeout(typingStep, 55);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typingStep, 600);
});

// =====================
// SCROLL REVEAL ANIMATION
// =====================
const sections = document.querySelectorAll('section');

function revealSections() {
    const trigger = window.innerHeight * 0.88;
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < trigger) {
            section.classList.add('show');
        }
    });
}

window.addEventListener('scroll', revealSections);
revealSections();

// =====================
// ACTIVE NAVBAR HIGHLIGHT
// =====================
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 180;
        if (window.scrollY >= top) {
            current = section.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// =====================
// NAVBAR SCROLL SHADOW
// =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.style.background = 'rgba(2, 12, 24, 0.95)';
    } else {
        navbar.style.background = 'rgba(2, 12, 24, 0.75)';
    }
});

// =====================
// ORBIT NODE TOOLTIP INTERACTION
// =====================
const nodes = document.querySelectorAll('.node-card');
nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
        node.style.background = 'rgba(0, 229, 204, 0.15)';
    });
    node.addEventListener('mouseleave', () => {
        node.style.background = '';
    });
});

// =====================
// STAGGERED SKILL CARD ENTRANCE
// =====================
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

skillCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    skillObserver.observe(card);
});

// =====================
// PROJECT CARD STAGGER
// =====================
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 120);
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity 0.65s ease, transform 0.65s ease, border-color 0.35s, box-shadow 0.35s';
    projectObserver.observe(card);
});
