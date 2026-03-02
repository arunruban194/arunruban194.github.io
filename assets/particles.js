// Generate floating particles
(function ()
{
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++)
  {
    const span = document.createElement('span');
    const size = Math.random() * 6 + 2;
    span.style.width = size + 'px';
    span.style.height = size + 'px';
    span.style.left = Math.random() * 100 + '%';
    span.style.animationDuration = Math.random() * 12 + 8 + 's';
    span.style.animationDelay = Math.random() * 10 + 's';
    container.appendChild(span);
  }
})();
