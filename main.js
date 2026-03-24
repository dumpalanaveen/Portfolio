// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) btn.classList.add('visible');
  else btn.classList.remove('visible');
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('.section');
const navLinkItems = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));

// ===== SCROLL ANIMATIONS =====
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 100);
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => {
  animateObserver.observe(el);
});

// Stagger children animations
document.querySelectorAll('.projects-grid, .certs-grid, .skills-layout').forEach(grid => {
  const cards = grid.querySelectorAll('[data-animate]');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });
});

// ===== SKILL BARS =====
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = width + '%'; }, 300);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsBars = document.querySelector('.skills-bars');
if (skillsBars) barObserver.observe(skillsBars);

// ===== BACK TO TOP =====
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-text');
  const successMsg = document.getElementById('formSuccess');

  btn.textContent = 'Sending...';

  const name = document.getElementById('fname').value;
  const email = document.getElementById('femail').value;
  const subject = document.getElementById('fsubject').value;
  const message = document.getElementById('fmessage').value;

  const mailtoBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailtoLink = `mailto:dumpalanaveen05@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

  setTimeout(() => {
    window.location.href = mailtoLink;
    btn.textContent = 'Send Message';
    successMsg.classList.add('visible');
    e.target.reset();
    setTimeout(() => successMsg.classList.remove('visible'), 5000);
  }, 800);
}

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== HERO TEXT ROLE CYCLE =====
const roleElements = document.querySelectorAll('.role-item');
let roleIndex = 0;

setInterval(() => {
  roleElements.forEach(el => el.classList.remove('active-role'));
  roleIndex = (roleIndex + 1) % roleElements.length;
  roleElements[roleIndex].classList.add('active-role');
}, 2500);

// ===== CURSOR GLOW =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: left 0.2s ease, top 0.2s ease;
  z-index: 0;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ===== NUMBER COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(counter => {
        const text = counter.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        let start = 0;
        const duration = 1500;
        const step = duration / num;

        const timer = setInterval(() => {
          start++;
          counter.innerHTML = start + '<span>' + suffix + '</span>';
          if (start >= num) clearInterval(timer);
        }, step);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);
