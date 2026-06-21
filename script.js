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
document.querySelectorAll('a, button, .node-card, .project-card, .contact-card, .research-card, .about-single-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.2)';
        cursor.style.opacity = '0.18';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.opacity = '0.35';
    });
});

// =====================
// FLOATING PARTICLES
// =====================
const particleContainer = document.getElementById('particles');
for (let i = 0; i < 28; i++) {
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

function typingStep() {
    if (typingIndex < typingText.length) {
        typingEl.textContent += typingText[typingIndex];
        typingIndex++;
        setTimeout(typingStep, 55);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typingStep, 700);
});

// =====================
// SCROLL REVEAL
// =====================
const sections = document.querySelectorAll('section');
function revealSections() {
    const trigger = window.innerHeight * 0.88;
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < trigger) {
            section.classList.add('show');
        }
    });
}
window.addEventListener('scroll', revealSections);
revealSections();

// =====================
// ACTIVE NAVBAR
// =====================
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 180) {
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
// NAVBAR SCROLL OPACITY
// =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 60
        ? 'rgba(2, 12, 24, 0.97)'
        : 'rgba(2, 12, 24, 0.80)';
});

// =====================
// SKILL TABS
// =====================
const tabButtons = document.querySelectorAll('.skill-tab');
const tabPanels  = document.querySelectorAll('.skill-panel');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === 'tab-' + target) {
                panel.classList.add('active');
                // Re-trigger skill bar animation (if a panel has .pv-fill elements)
                panel.querySelectorAll('.pv-fill').forEach(fill => {
                    const w = fill.style.getPropertyValue('--w');
                    fill.style.width = '0%';
                    requestAnimationFrame(() => {
                        setTimeout(() => { fill.style.width = w; }, 50);
                    });
                });
                // Play/pause embedded video only while its tab is visible
                const video = panel.querySelector('.panel-media-video');
                if (video) {
                    video.currentTime = 0;
                    video.play().catch(() => {});
                }
            } else {
                const video = panel.querySelector('.panel-media-video');
                if (video) video.pause();
            }
        });
    });
});

// =====================
// CONTROL PANEL VIDEO — MUTE / UNMUTE TOGGLE
// =====================
function initControlVideoMute() {
    const btn = document.getElementById('controlMuteBtn');
    const video = document.querySelector('#tab-control .panel-media-video');
    if (!btn || !video) return;

    btn.addEventListener('click', () => {
        video.muted = !video.muted;
        btn.textContent = video.muted ? '🔇' : '🔊';
    });
}
window.addEventListener('DOMContentLoaded', initControlVideoMute);

// =====================
// PROJECT CARD STAGGER
// =====================
const projectCards = document.querySelectorAll('.project-card');
const projectObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 90);
            projectObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.06 });

projectCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity .55s ease, transform .55s ease, border-color .3s, box-shadow .3s';
    projectObs.observe(card);
});

// =====================
// RESEARCH CARD STAGGER
// =====================
const researchCards = document.querySelectorAll('.research-card');
const rcObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 100);
            rcObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

researchCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity .55s ease, transform .55s ease, border-color .3s, box-shadow .3s';
    rcObs.observe(card);
});

// =====================
// TIMELINE STAGGER
// =====================
const timelineItems = document.querySelectorAll('.timeline-item');
const tlObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateX(0)';
            }, i * 120);
            tlObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
    item.style.opacity   = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity .6s ease, transform .6s ease';
    tlObs.observe(item);
});

// =====================
// ORBIT NODE HOVER
// =====================
document.querySelectorAll('.node-card').forEach(node => {
    node.addEventListener('mouseenter', () => {
        node.style.background = 'rgba(0, 229, 204, 0.15)';
        node.style.borderColor = 'var(--cyan)';
    });
    node.addEventListener('mouseleave', () => {
        node.style.background = '';
        node.style.borderColor = '';
    });
});

// =====================
// EXPERIENCE — AMBIENT BACKGROUND SLIDER
// Setiap .tl-ambient card punya 3 foto yang dirotasi otomatis
// dengan jeda, berhenti saat di-hover, dan bisa diganti manual lewat dot.
// =====================
function initAmbientSliders() {
    const cards = document.querySelectorAll('.tl-ambient');

    cards.forEach(card => {
        const imgs = card.querySelectorAll('.tl-ambient-bg img');
        const dotsWrap = card.querySelector('.tl-ambient-dots');
        if (!imgs.length) return;

        let current = 0;
        let timer = null;
        const intervalMs = 4500;

        // Build dots
        const dots = [];
        imgs.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', 'Tampilkan foto ' + (i + 1));
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goTo(i);
                restartTimer();
            });
            dotsWrap.appendChild(dot);
            dots.push(dot);
        });

        function goTo(index) {
            imgs[current].classList.remove('is-active');
            dots[current].classList.remove('active');
            current = index;
            imgs[current].classList.add('is-active');
            dots[current].classList.add('active');
        }

        function next() {
            goTo((current + 1) % imgs.length);
        }

        function startTimer() {
            timer = setInterval(next, intervalMs);
        }
        function stopTimer() {
            clearInterval(timer);
        }
        function restartTimer() {
            stopTimer();
            startTimer();
        }

        // Init first image as active once it loads (or immediately if cached)
        const markLoaded = () => card.classList.add('is-loaded');
        if (imgs[0].complete) {
            markLoaded();
        } else {
            imgs[0].addEventListener('load', markLoaded, { once: true });
        }
        imgs[0].classList.add('is-active');

        startTimer();
        card.addEventListener('mouseenter', stopTimer);
        card.addEventListener('mouseleave', startTimer);
    });
}

window.addEventListener('DOMContentLoaded', initAmbientSliders);