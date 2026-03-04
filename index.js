/* ==============================
   SaaStrategy — Interactivity & Animations
   ============================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Scroll reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Animated counter for benefit stats ---
  const statElements = document.querySelectorAll('.benefit-card__stat');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 300);
        
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statElements.forEach((el) => counterObserver.observe(el));

  // --- Agent cards hover tilt effect ---
  const agentCards = document.querySelectorAll('.agent-card');

  agentCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // --- Floating particle background in hero ---
  const heroSection = document.querySelector('.hero__bg');
  if (heroSection) {
    createParticles(heroSection, 30);
  }

  function createParticles(container, count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(0, 229, 160, ${Math.random() * 0.3 + 0.05});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 15 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * -15}s;
        pointer-events: none;
      `;
      container.appendChild(particle);
    }

    // Add particle animation keyframes
    if (!document.getElementById('particle-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-styles';
      style.textContent = `
        @keyframes particleFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * -80 - 20}px) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -40 - 10}px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(${Math.random() * -60 + 30}px, ${Math.random() * -60 - 10}px) scale(1.1);
            opacity: 0.5;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // --- Mobile hamburger menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.navbar__links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // --- Cursor glow effect on hero ---
  const hero = document.querySelector('.hero');
  if (hero) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: absolute;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 229, 160, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      opacity: 0;
    `;
    hero.appendChild(glow);

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left - 200;
      const y = e.clientY - rect.top - 200;
      glow.style.transform = `translate(${x}px, ${y}px)`;
      glow.style.opacity = '1';
    });

    hero.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  }

});
