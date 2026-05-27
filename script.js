// Nav: switch to light mode when hero scrolls out of view
const nav = document.querySelector('nav');
const hero = document.querySelector('.hero');

if (nav && hero) {
  const heroObserver = new IntersectionObserver(([entry]) => {
    nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
  }, { threshold: 0 });

  heroObserver.observe(hero);
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
