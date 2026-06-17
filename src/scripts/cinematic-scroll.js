/**
 * Cinematic homepage orchestrator — hero fade, section snap, progress bar.
 */
import { initScrollVideo } from './scroll-video.js';
import { initParticles } from './particles.js';

let teardown = [];

const STATION_IDS = ['hero', 'ydelser', 'projekter', 'om-os', 'kontakt'];

function clamp(v, a, b) {
  return v < a ? a : v > b ? b : v;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getStations() {
  return STATION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
}

function getNearestStationIndex() {
  const stations = getStations();
  if (!stations.length) return 0;
  const scrollY = window.scrollY + window.innerHeight * 0.35;
  let nearest = 0;
  let minDist = Infinity;
  stations.forEach((el, i) => {
    const dist = Math.abs(el.offsetTop - scrollY);
    if (dist < minDist) {
      minDist = dist;
      nearest = i;
    }
  });
  return nearest;
}

function initProgressBar() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
  teardown.push(() => window.removeEventListener('scroll', update));
}

function initHeroFade() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const update = () => {
    const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.28));
    hero.style.opacity = String(fade);
    hero.style.visibility = fade > 0.02 ? 'visible' : 'hidden';
    hero.style.pointerEvents = fade > 0.15 ? 'auto' : 'none';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
  teardown.push(() => window.removeEventListener('scroll', update));
}

function initSectionSnap() {
  const stations = getStations();
  if (!stations.length) return;

  let currentIndex = getNearestStationIndex();
  let isAnimating = false;

  const scrollToIndex = (index, behavior = 'smooth') => {
    const target = stations[clamp(index, 0, stations.length - 1)];
    if (!target) return;
    currentIndex = stations.indexOf(target);
    isAnimating = true;
    target.scrollIntoView({ behavior, block: 'start' });
    window.setTimeout(() => {
      isAnimating = false;
    }, behavior === 'smooth' ? 700 : 50);
  };

  const onAnchorClick = (e) => {
    const link = e.target.closest('a[href^="#"], a[href^="/#"]');
    if (!link) return;
    let href = link.getAttribute('href') || '';
    if (href.startsWith('/')) {
      href = href.slice(1);
    }
    const id = href.slice(1);
    if (!id || !STATION_IDS.includes(id)) return;
    e.preventDefault();
    const idx = STATION_IDS.indexOf(id);
    scrollToIndex(idx);
  };

  document.addEventListener('click', onAnchorClick);

  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    const idx = STATION_IDS.indexOf(id);
    if (idx >= 0) {
      window.requestAnimationFrame(() => scrollToIndex(idx, 'auto'));
    }
  }

  teardown.push(() => {
    document.removeEventListener('click', onAnchorClick);
  });
}

function boot() {
  teardown.forEach((fn) => fn());
  teardown = [];
  teardown.push(initScrollVideo());
  teardown.push(initParticles());
  initProgressBar();
  initHeroFade();
  initSectionSnap();
}

function shutdown() {
  teardown.forEach((fn) => fn());
  teardown = [];
}

document.addEventListener('astro:page-load', boot);
if (document.readyState !== 'loading') boot();
document.addEventListener('astro:before-swap', shutdown);
