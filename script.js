/* ========================================
   AZYNIX — Futuristic Academic Platform
   Interactive JavaScript Engine
   ======================================== */

(function() {
  'use strict';

  // ===== CURSOR GLOW =====
  const cursorGlow = document.getElementById('cursorGlow');
  const cursorDot = document.getElementById('cursorDot');
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
  });

  function animateCursor() {
    glowX += (cursorX - glowX) * 0.08;
    glowY += (cursorY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .tilt-card, .upload-zone, input, select, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('active'));
  });

  // ===== SCROLL PROGRESS BAR =====
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  }

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkElements = document.querySelectorAll('.nav-link');

  // Scroll effects
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    // Navbar scroll state
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Active section detection
    updateActiveSection();
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Active section detection
  function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinkElements.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ===== PARTICLE SYSTEM =====
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 30 : 60;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.5 ? 180 : 270; // cyan or purple
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 245, 255, ${0.03 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ===== REVEAL ON SCROLL =====
  const revealElements = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== 3D TILT EFFECT =====
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -8;
      const rotateY = (x - centerX) / centerX * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== MAGNETIC BUTTONS =====
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ===== ANIMATED COUNTERS =====
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ===== STAT RING ANIMATION =====
  const statRings = document.querySelectorAll('.stat-ring-fill');
  const ringObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const percent = ring.getAttribute('data-percent');
        ring.style.setProperty('--percent', percent);
        ring.classList.add('animated');
        ringObserver.unobserve(ring);
      }
    });
  }, { threshold: 0.5 });

  statRings.forEach(ring => ringObserver.observe(ring));

  // ===== REVIEWS AUTO-SCROLL (Duplicate for seamless loop) =====
  const reviewsTrack = document.getElementById('reviewsTrack');
  if (reviewsTrack) {
    const reviewCards = reviewsTrack.innerHTML;
    reviewsTrack.innerHTML += reviewCards; // Duplicate for seamless loop
  }

  // ===== HERO PARALLAX (Mouse) =====
  const heroContent = document.getElementById('heroContent');
  const floatingCards = document.querySelectorAll('.float-card');

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    floatingCards.forEach(card => {
      const speed = parseFloat(card.getAttribute('data-speed')) || 0.03;
      const moveX = x * speed * 100;
      const moveY = y * speed * 100;
      card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // ===== FILE UPLOAD =====
  const uploadZone = document.getElementById('uploadZone');
  const fileUpload = document.getElementById('fileUpload');
  const uploadProgress = document.getElementById('uploadProgress');
  const uploadFilename = document.getElementById('uploadFilename');
  let uploadedFile = null;

  uploadZone.addEventListener('click', () => fileUpload.click());

  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  });

  fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  });

  function handleFileUpload(file) {
    uploadedFile = file;
    uploadProgress.classList.add('active');
    const bar = uploadProgress.querySelector('.upload-progress-bar');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          uploadProgress.classList.remove('active');
        }, 500);
      }
      bar.style.width = progress + '%';
    }, 150);
    uploadFilename.textContent = '📄 ' + file.name;
  }

  // ===== WHATSAPP FORM SUBMISSION =====
  /*
   * IMPORTANT NOTE: WhatsApp Security Restrictions
   * ================================================
   * Browsers cannot directly send uploaded files to WhatsApp automatically
   * due to WhatsApp's security restrictions. The WhatsApp API (wa.me links)
   * only supports pre-filled text messages, not file attachments.
   *
   * When the user submits the form:
   * 1. A formatted text message is generated with all form details
   * 2. WhatsApp chat is opened with the pre-filled message via wa.me link
   * 3. A notification popup reminds the user to manually attach their file
   *    in the WhatsApp chat before sending
   *
   * This is a platform limitation, not a bug. There is no workaround
   * to programmatically attach files via WhatsApp web links.
   */
  const assignmentForm = document.getElementById('assignmentForm');
  const notificationPopup = document.getElementById('notificationPopup');
  const notificationClose = document.getElementById('notificationClose');

  assignmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const whatsapp = document.getElementById('userWhatsApp').value.trim();
    const service = document.getElementById('serviceType').value;
    const deadline = document.getElementById('deadline').value;
    const instructions = document.getElementById('instructions').value.trim();

    // Validate required fields
    if (!name || !whatsapp || !service || !deadline) {
      // Shake effect on empty fields
      assignmentForm.querySelectorAll('input[required], select[required]').forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ff4444';
          field.style.animation = 'shake 0.5s ease';
          setTimeout(() => {
            field.style.borderColor = '';
            field.style.animation = '';
          }, 1000);
        }
      });
      return;
    }

    // Build WhatsApp message
    const message = `🎓 *AZYNIX — New Assignment Request*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${name}\n` +
      `📱 *WhatsApp:* ${whatsapp}\n` +
      `📋 *Service:* ${service}\n` +
      `📅 *Deadline:* ${deadline}\n` +
      `📝 *Instructions:* ${instructions || 'Not specified'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📎 _File will be attached separately_`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/94714668412?text=${encodedMessage}`;

    // Show notification popup
    if (uploadedFile) {
      notificationPopup.classList.add('active');
    }

    // Open WhatsApp
    window.open(waUrl, '_blank');
  });

  notificationClose.addEventListener('click', () => {
    notificationPopup.classList.remove('active');
  });

  notificationPopup.addEventListener('click', (e) => {
    if (e.target === notificationPopup) {
      notificationPopup.classList.remove('active');
    }
  });

  // ===== RIPPLE CLICK EFFECT =====
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // ===== FOOTER YEAR =====
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // ===== PRICING CARD SPOTLIGHT =====
  const pricingCards = document.querySelectorAll('.pricing-card-inner');
  pricingCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 245, 255, 0.06), var(--bg-glass))`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // ===== SHAKE ANIMATION (for form validation) =====
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-5px); }
      40% { transform: translateX(5px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(shakeStyle);

})();
