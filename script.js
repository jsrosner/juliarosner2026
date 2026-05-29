// Nav: go transparent + black when hero scrolls out of view
const nav = document.querySelector('nav');
const heroSentinel = document.querySelector('.cs-hero-layout');

if (nav && heroSentinel) {
  const heroObserver = new IntersectionObserver(([entry]) => {
    nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
  }, { threshold: 0 });

  heroObserver.observe(heroSentinel);
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
