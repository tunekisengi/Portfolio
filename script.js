const navLinks = document.querySelectorAll('nav a');
const backToTop = document.createElement('button');
backToTop.textContent = '↑ Top';
backToTop.className = 'back-to-top';
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(backToTop);

const updateActiveNav = () => {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('href') === current);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  const reveal = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          reveal.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.fade-item').forEach(item => reveal.observe(item));
});

window.addEventListener('scroll', () => {
  const show = window.scrollY > 320;
  backToTop.style.opacity = show ? '1' : '0';
  backToTop.style.pointerEvents = show ? 'auto' : 'none';
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });
});
