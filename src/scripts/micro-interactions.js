/**
 * Advanced Micro-interactions: Card Tilt, Glow Borders, Magnetic Buttons, and Custom Brand Cursor.
 */

let teardownList = [];

// 1. 3D Tilt Effect
function initCardTilt() {
  const cards = document.querySelectorAll('.cinematic-project-card, .card, .service-tile');
  
  cards.forEach(card => {
    const el = card;
    
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const angleX = (yc - y) / 15; // Max 10-15 degrees
      const angleY = (x - xc) / 15;
      
      el.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.015, 1.015, 1.015)`;
    };
    
    const onMouseLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };
    
    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave, { passive: true });
    
    teardownList.push(() => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    });
  });
}

// 2. Glow-Following Borders
function initGlowBorders() {
  const cards = document.querySelectorAll('.cinematic-project-card, .card, .service-tile, .pill-btn, .row-btn');
  
  cards.forEach(card => {
    const el = card;
    
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      el.style.setProperty('--x', `${x}px`);
      el.style.setProperty('--y', `${y}px`);
    };
    
    el.addEventListener('mousemove', onMouseMove, { passive: true });
    
    teardownList.push(() => {
      el.removeEventListener('mousemove', onMouseMove);
    });
  });
}

// 3. Magnetic CTA Buttons
function initMagnetButtons() {
  const buttons = document.querySelectorAll('.cta-nav, .cinematic-btn, .magnetic-btn, .contact-submit, #next-step-btn, #submit-planner-btn');
  
  buttons.forEach(btn => {
    const el = btn;
    
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull element 22% toward cursor
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px) scale(1.03)`;
      const innerSpan = el.querySelector('span');
      if (innerSpan) {
        innerSpan.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      }
    };
    
    const onMouseLeave = () => {
      el.style.transform = '';
      const innerSpan = el.querySelector('span');
      if (innerSpan) {
        innerSpan.style.transform = '';
      }
    };
    
    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave, { passive: true });
    
    teardownList.push(() => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    });
  });
}

// 4. Custom Brand Cursor
function initCustomCursor() {
  // Disable custom cursor on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  // Clean up any existing cursor elements
  const existingCursor = document.querySelectorAll('.custom-cursor-dot, .custom-cursor-ring');
  existingCursor.forEach(c => c.remove());

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  
  dot.className = 'custom-cursor-dot';
  ring.className = 'custom-cursor-ring';
  
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  
  let mouse = { x: 0, y: 0 };
  let dotPos = { x: 0, y: 0 };
  let ringPos = { x: 0, y: 0 };
  
  const onMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };
  
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  teardownList.push(() => window.removeEventListener('mousemove', onMouseMove));
  
  let isHovering = false;
  
  const addHoverState = () => {
    isHovering = true;
    ring.classList.add('custom-cursor-ring--hover');
    dot.classList.add('custom-cursor-dot--hover');
  };
  
  const removeHoverState = () => {
    isHovering = false;
    ring.classList.remove('custom-cursor-ring--hover');
    dot.classList.remove('custom-cursor-dot--hover');
  };
  
  const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .cursor-pointer');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', addHoverState, { passive: true });
    el.addEventListener('mouseleave', removeHoverState, { passive: true });
    
    teardownList.push(() => {
      el.removeEventListener('mouseenter', addHoverState);
      el.removeEventListener('mouseleave', removeHoverState);
    });
  });
  
  let rafId = 0;
  
  function tick() {
    // Lerp dot
    dotPos.x += (mouse.x - dotPos.x) * 0.35;
    dotPos.y += (mouse.y - dotPos.y) * 0.35;
    dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
    
    // Lerp ring (slower for trailing effect)
    ringPos.x += (mouse.x - ringPos.x) * 0.16;
    ringPos.y += (mouse.y - ringPos.y) * 0.16;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
    
    rafId = requestAnimationFrame(tick);
  }
  
  rafId = requestAnimationFrame(tick);
  teardownList.push(() => cancelAnimationFrame(rafId));
}

function bootInteractions() {
  teardown();
  initCardTilt();
  initGlowBorders();
  initMagnetButtons();
  initCustomCursor();
}

function teardown() {
  teardownList.forEach(fn => fn());
  teardownList = [];
}

// Bind to Astro Lifecycle
document.addEventListener('astro:page-load', bootInteractions);
if (document.readyState !== 'loading') bootInteractions();
document.addEventListener('astro:before-swap', teardown);
