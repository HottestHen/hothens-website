// Hot Hens — small progressive enhancements. The page works fully without this file.
(() => {
  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });

  // Header border once scrolled
  const header = document.querySelector('.site-header');
  const sentinel = document.getElementById('top');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-scrolled', entry.boundingClientRect.top < 0);
    }, { threshold: [0.98] }).observe(sentinel);
  }

  // Reveal on scroll, staggered within a group
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.filter((e) => e.isIntersecting).forEach((entry, i) => {
        entry.target.style.transitionDelay = `${Math.min(i, 4) * 90}ms`;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  }

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
