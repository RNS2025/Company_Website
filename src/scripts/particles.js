/**
 * Ambient particle field overlay.
 */
export function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    canvas.style.display = 'none';
    return () => {};
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  let rafId = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const divisor = window.innerWidth < 768 ? 30000 : 20000;
    const count = Math.floor((canvas.width * canvas.height) / divisor);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.25 + 0.06,
        orange: Math.random() < 0.06,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      if (p.orange) {
        ctx.fillStyle = `rgba(255,105,65,${p.opacity})`;
      } else {
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
      }
      ctx.fill();
    }
    rafId = requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  rafId = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
  };
}
