/* ============================================
   KOMAL KALE PORTFOLIO — script.js
============================================ */

// ——— TYPED TEXT ———
const typedEl = document.querySelector('.typed-text');
const phrases = ['Frontend Developer', '.NET MVC Developer', 'Full Stack Developer'];
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function type() {
  if (!typedEl) return;
  const current = phrases[phraseIdx];
  typedEl.textContent = isDeleting
    ? current.substring(0, --charIdx)
    : current.substring(0, ++charIdx);

  if (!isDeleting && charIdx === current.length) {
    isDeleting = true;
    setTimeout(type, 1500);
    return;
  }
  if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
  }
  setTimeout(type, isDeleting ? 45 : 90);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 800));


// ——— CUSTOM CURSOR ———
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, [data-reveal], .skill-pill, .project-card, .about-card')
  .forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
  });

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity = '0'; cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity = '1'; cursorRing.style.opacity = '1';
});


// ——— NAVBAR SCROLL ———
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


// ——— MOBILE NAV ———
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


// ——— ACTIVE NAV LINK ON SCROLL ———
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => observer.observe(s));


// ——— REVEAL ANIMATION ———
const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-delay]');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));


// ——— COUNTER ANIMATION (optional stat numbers if added) ———
function animateCounter(el, target, duration = 1800) {
  let start = 0, step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    if (start >= target) clearInterval(timer);
  }, 16);
}


// ——— CONTACT FORM ———
const form = document.getElementById('contact-form');
const successEl = document.getElementById('form-success');
const errorEl = document.getElementById('form-error');
const sendBtn = document.getElementById('send-btn');

form?.addEventListener('submit', async e => {
  e.preventDefault();
  successEl.classList.add('d-none');
  errorEl.classList.add('d-none');
  sendBtn.disabled = true;
  sendBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      form.reset();
      successEl.classList.remove('d-none');
      sendBtn.innerHTML = '<i class="bi bi-check-circle"></i> Sent!';
      setTimeout(() => {
        sendBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
        sendBtn.disabled = false;
        successEl.classList.add('d-none');
      }, 4000);
    } else {
      const data = await res.json().catch(() => ({}));
      errorEl.textContent = '❌ ' + (data?.errors?.map(e => e.message).join(', ') || 'Failed to send.');
      errorEl.classList.remove('d-none');
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
    }
  } catch {
    errorEl.textContent = '❌ Network error. Please check your connection.';
    errorEl.classList.remove('d-none');
    sendBtn.disabled = false;
    sendBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
  }
});


// ——— SMOOTH TILT on project cards ———
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `translateY(-8px) rotateY(${x}deg) rotateX(${y}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ——— PAGE LOAD ANIMATION ———
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
