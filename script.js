// Nav: collapse to full-width when hero scrolls out of view (works on homepage + case study pages)
const nav = document.querySelector('nav');
const heroSentinel = document.querySelector('.cs-hero-layout') || document.querySelector('.hero');

if (nav && heroSentinel) {
  const heroObserver = new IntersectionObserver(([entry]) => {
    nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
  }, { threshold: 0 });

  heroObserver.observe(heroSentinel);
}

// Hide nav on scroll down, reveal on scroll up (case study pages only)
if (nav && document.querySelector('.cs-hero-layout')) {
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    if (scrollingDown && currentScrollY > 80) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

// Password gate for case study pages
const pwGate = document.getElementById('pw-gate');
if (pwGate) {
  if (sessionStorage.getItem('cs-auth') === 'true') {
    pwGate.remove();
  } else {
    document.body.style.overflow = 'hidden';
    const pwInput = document.getElementById('pw-input');
    const pwError = document.getElementById('pw-error');
    const pwSubmit = document.getElementById('pw-submit');

    function attemptAuth() {
      if (pwInput.value === 'beanpole') {
        sessionStorage.setItem('cs-auth', 'true');
        pwGate.style.opacity = '0';
        setTimeout(() => { pwGate.remove(); }, 300);
        document.body.style.overflow = '';
      } else {
        pwError.style.display = 'block';
        pwInput.value = '';
        pwInput.focus();
      }
    }

    pwSubmit.addEventListener('click', attemptAuth);
    pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') attemptAuth(); });
  }
}

// About section carousel
const aboutCarousel = document.querySelector('.about-carousel');
if (aboutCarousel) {
  const track = aboutCarousel.querySelector('.carousel-track');
  const dots = aboutCarousel.querySelectorAll('.carousel-dot');
  const total = dots.length;
  let current = 0;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('carousel-dot--active', i === current));
  }

  aboutCarousel.querySelector('.carousel-btn--prev').addEventListener('click', () => goTo(current - 1));
  aboutCarousel.querySelector('.carousel-btn--next').addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
}

// Smooth fade-in as you scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project, .card, .about-grid, .contact-inner').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
