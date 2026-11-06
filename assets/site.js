// Shared page behaviour: subtle particles, reveal-on-scroll, nav background once scrolled.
(function ()
{
  document.documentElement.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const particles = document.getElementById('particles');
  if (particles && !reduceMotion)
  {
    for (let i = 0; i < 18; i++)
    {
      const span = document.createElement('span');
      const size = Math.random() * 5 + 2;
      span.style.width = size + 'px';
      span.style.height = size + 'px';
      span.style.left = Math.random() * 100 + '%';
      span.style.animationDuration = Math.random() * 14 + 14 + 's';
      span.style.animationDelay = -Math.random() * 20 + 's';
      particles.appendChild(span);
    }
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion)
  {
    const observer = new IntersectionObserver((entries) =>
    {
      for (const entry of entries)
      {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => observer.observe(el));
  }
  else
  {
    reveals.forEach((el) => el.classList.add('in'));
  }

  const nav = document.querySelector('.site-nav');
  if (nav)
  {
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }
})();
