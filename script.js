// Mobile nav + subtle hero polish

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Highlight active nav pill link from hash / scroll
const sections = ['features', 'how-it-works', 'faq']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const pillLinks = document.querySelectorAll('.nav-pill a[href^="#"]');

function setActiveFromHash() {
  const hash = (location.hash || '#top').replace('#', '');
  pillLinks.forEach((link) => {
    const target = (link.getAttribute('href') || '').replace('#', '');
    const isHome = target === 'top' && (hash === 'top' || hash === '');
    link.classList.toggle('is-active', isHome || target === hash);
  });
}

if (sections.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id;
      pillLinks.forEach((link) => {
        const target = (link.getAttribute('href') || '').replace('#', '');
        link.classList.toggle('is-active', target === id);
      });
    },
    { rootMargin: '-35% 0px -50% 0px', threshold: [0.1, 0.35, 0.6] }
  );
  sections.forEach((section) => observer.observe(section));
}

window.addEventListener('hashchange', setActiveFromHash);
setActiveFromHash();
