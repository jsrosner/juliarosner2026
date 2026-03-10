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
