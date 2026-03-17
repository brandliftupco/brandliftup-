// Metrix Mind — Global JS Engine

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// 1. Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Raf loop for Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Custom Cursor Logic
const initCursor = () => {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; 
    my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .magnetic-btn, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'var(--orange)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'var(--gold)';
    });
  });
};

// 3. Reveal Animations (GSAP)
const initReveals = () => {
  document.querySelectorAll('.reveal').forEach((el) => {
    const text = el.innerText;
    // Word-by-word reveal if it's mostly text
    if (text.length > 5 && !el.querySelector('span') && !el.classList.contains('no-word-split')) {
      el.innerHTML = text.split(' ').map(word => `<span class="word-wrap" style="display:inline-block; overflow:hidden;"><span class="word" style="display:inline-block;">${word}&nbsp;</span></span>`).join('');
    }
    
    const words = el.querySelectorAll('.word');
    if (words.length > 0) {
      gsap.set(el, { opacity: 1, visibility: 'visible' });
      gsap.from(words, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: "110%",
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out"
      });
    } else {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        ease: "power3.out"
      });
    }
  });

  // Staggered Grid Reveals
  const grids = ['.asymmetric-grid', '.services-grid', '.why-points', '.process-steps', '.results-grid', '.testi-grid', '.portfolio-grid', '.team-grid', '.feature-grid'];
  grids.forEach(selector => {
    const grid = document.querySelector(selector);
    if (grid) {
      const cards = grid.children;
      gsap.set(cards, { y: 50, opacity: 0 });
      ScrollTrigger.create({
        trigger: grid,
        start: "top 80%",
        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: "auto"
          });
        }
      });
    }
  });
};

// 4. Magnetic Buttons
const initMagnetic = () => {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: 'power3.out' });
    });
    btn.addEventListener('mouseleave', () => { gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' }); });
  });
};

// 5. Theme Manager
class ThemeManager {
  constructor() {
    this.toggleBtn = document.getElementById('themeToggle');
    this.currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    this.init();
  }

  init() {
    if (this.currentTheme === 'light') {
      document.body.classList.add('light-mode');
    }
    
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', this.currentTheme);
    
    // Optional: Add a quick GSAP animation on toggle
    gsap.fromTo('body', { opacity: 0.9 }, { opacity: 1, duration: 0.4 });
  }
}

// Initialize everything on load
window.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initReveals();
  initMagnetic();
  new ThemeManager();
});
