/* ============================================================
   RNS APPS — zoom engine + warp starfield
   ============================================================ */
(function(){
  "use strict";

  // shared, tweakable config (Tweaks panel writes here) -------------
  const CFG = window.RNS_CONFIG = window.RNS_CONFIG || {
    speed: 1.0,        // zoom doubling per station
    smooth: 0.09,      // camera lerp factor
    starDensity: 0.8,  // multiplier
    glow: 1.0,         // glow strength
    stars: true        // starfield on/off
  };

  const layers = Array.from(document.querySelectorAll('.layer'));
  const N = layers.length;
  const navBtns = Array.from(document.querySelectorAll('.dnav'));
  const hint = document.querySelector('.scrollhint');
  const progress = document.querySelector('.progress');
  const spacer = document.getElementById('spacer');

  let STATION = window.innerHeight * 1.25;   // scroll px per station
  let cur = 0, target = 0;
  let lastCur = 0;
  let lastT = performance.now();

  function layout(){
    STATION = window.innerHeight * 1.25;
    spacer.style.height = ((N - 1) * STATION + window.innerHeight) + 'px';
  }
  layout();
  window.addEventListener('resize', ()=>{ layout(); resizeStars(); }, {passive:true});

  function clamp(v,a,b){ return v<a?a:v>b?b:v; }

  // ---- camera / layer transforms ----------------------------------
  function updateLayers(){
    const SP = CFG.speed;
    for(let i=0;i<N;i++){
      const el = layers[i];
      const rel = cur - i;
      const scale = Math.pow(2, rel * SP);

      let op;
      if(rel <= -1.35) op = 0;
      else if(rel < -0.18) op = (rel + 1.35) / 1.17;
      else if(rel <= 0.22) op = 1;
      else if(rel < 1.0) op = 1 - (rel - 0.22) / 0.78;
      else op = 0;
      op = clamp(op,0,1);

      if(op <= 0.001){
        if(el.style.display !== 'none') el.style.display = 'none';
        continue;
      }
      el.style.display = 'flex';

      let blur = 0;
      if(rel < -0.1) blur = Math.min(6, (-rel - 0.1) * 5);
      else if(rel > 0.25) blur = Math.min(6, (rel - 0.25) * 6);

      el.style.transform = 'translateZ(0) scale(' + scale.toFixed(4) + ')';
      el.style.opacity = op.toFixed(3);
      el.style.filter = blur > 0.25 ? 'blur(' + blur.toFixed(1) + 'px)' : 'none';
      el.style.zIndex = Math.round(rel * 100) + 3000;
      el.style.pointerEvents = (op > 0.6 && Math.abs(rel) < 0.32) ? 'auto' : 'none';
    }
    // active nav
    const active = Math.round(clamp(cur,0,N-1));
    for(let i=0;i<navBtns.length;i++) navBtns[i].classList.toggle('is-active', i===active);
    // progress
    progress.style.width = ((cur/(N-1))*100).toFixed(2) + '%';
    // scroll hint only on the intro
    if(hint){
      const ho = clamp(1 - cur*2.0, 0, 1);
      hint.style.opacity = ho;
      hint.style.display = ho < 0.02 ? 'none' : 'flex';
    }
  }

  // ---- starfield ---------------------------------------------------
  const cvs = document.getElementById('stars');
  const ctx = cvs.getContext('2d');
  let DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  let W=0,H=0,CX=0,CY=0,stars=[];
  const FOCAL = 380;

  function makeStar(z){
    return {
      x: (Math.random()*2-1) * 1000,
      y: (Math.random()*2-1) * 1000,
      z: z!=null ? z : Math.random()*1600 + 60,
      o: Math.random() < 0.16,           // orange?
      px:0, py:0, init:false
    };
  }
  function buildStars(){
    const base = Math.round((W*H)/9000);
    const count = clamp(Math.round(base * CFG.starDensity), 50, 420);
    stars = new Array(count);
    for(let i=0;i<count;i++) stars[i] = makeStar();
  }
  function resizeStars(){
    DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    W = cvs.width = Math.floor(innerWidth*DPR);
    H = cvs.height = Math.floor(innerHeight*DPR);
    cvs.style.width = innerWidth+'px'; cvs.style.height = innerHeight+'px';
    CX = W/2; CY = H/2;
    buildStars();
  }
  resizeStars();

  function drawStars(vel){
    if(!CFG.stars){ ctx.clearRect(0,0,W,H); return; }
    // re-density if tweak changed a lot
    const want = clamp(Math.round((W*H)/9000 * CFG.starDensity),50,420);
    if(Math.abs(want - stars.length) > 30){ buildStars(); }

    ctx.clearRect(0,0,W,H);
    // travel speed: idle drift + camera velocity (px of cam per frame)
    const sp = (0.9 + vel * 260) * DPR;
    for(let i=0;i<stars.length;i++){
      const s = stars[i];
      s.z -= sp;
      if(s.z < 1){ Object.assign(s, makeStar(1700)); }
      const k = FOCAL / s.z;
      const sx = CX + s.x * k * DPR;
      const sy = CY + s.y * k * DPR;
      if(sx<0||sx>W||sy<0||sy>H){ if(s.init){ s.init=false; } continue; }
      const depth = 1 - s.z/1760;
      const r = clamp(depth*depth*2.6*DPR, 0.25, 3.2*DPR);
      const a = clamp(depth*0.9, 0.05, 0.9);
      if(s.init && vel > 0.0015){
        ctx.strokeStyle = s.o ? 'rgba(255,140,90,'+a+')' : 'rgba(235,233,233,'+a+')';
        ctx.lineWidth = r;
        ctx.beginPath(); ctx.moveTo(s.px,s.py); ctx.lineTo(sx,sy); ctx.stroke();
      } else {
        ctx.fillStyle = s.o ? 'rgba(255,140,90,'+a+')' : 'rgba(235,233,233,'+a+')';
        ctx.beginPath(); ctx.arc(sx,sy,r,0,6.2832); ctx.fill();
      }
      s.px=sx; s.py=sy; s.init=true;
    }
  }

  // ---- main loop (rAF = smoothing enhancement when available) ------
  let easing = false, settleTimer = 0;

  function ease(now){
    const dt = Math.min(0.05, Math.max(0.001, (now - lastT) / 1000));
    lastT = now;
    target = clamp(window.scrollY / STATION, 0, N-1);
    const k = 1 - Math.pow(1 - CFG.smooth, dt * 60);
    cur += (target - cur) * k;
    const vel = Math.abs(cur - lastCur);
    lastCur = cur;
    document.documentElement.style.setProperty('--glow-strength', CFG.glow);
    updateLayers();
    drawStars(vel);
    if(Math.abs(target - cur) > 0.0004){
      requestAnimationFrame(ease);
    } else {
      cur = target; updateLayers(); drawStars(0); easing = false;
    }
  }
  function kick(){ if(!easing){ easing = true; lastT = performance.now(); requestAnimationFrame(ease); } }

  // Synchronous render on every scroll event — guarantees a correct frame
  // even where rAF is throttled (screenshots / background tabs).
  function onScroll(){
    target = clamp(window.scrollY / STATION, 0, N-1);
    cur += (target - cur) * 0.35;          // immediate partial ease for responsiveness
    const vel = Math.abs(cur - lastCur); lastCur = cur;
    updateLayers();
    drawStars(vel);
    kick();
    clearTimeout(settleTimer);
    settleTimer = setTimeout(function(){    // snap to rest after scrolling stops
      cur = target; lastCur = cur; updateLayers(); drawStars(0);
    }, 140);
  }
  window.addEventListener('scroll', onScroll, {passive:true});

  // initial paint (snap to current scroll position)
  document.documentElement.style.setProperty('--glow-strength', CFG.glow);
  target = cur = clamp(window.scrollY / STATION, 0, N-1);
  lastCur = cur;
  updateLayers();
  drawStars(0);

  // gentle idle star drift when rAF is alive (no-op when throttled)
  (function idle(){ if(!easing){ drawStars(0.0008); } requestAnimationFrame(idle); })();

  // ---- depth nav clicks -------------------------------------------
  navBtns.forEach((b,i)=>{
    b.addEventListener('click', ()=> window.scrollTo({ top: i*STATION, behavior:'smooth' }));
  });
  // brand → top
  const brand = document.querySelector('.brand');
  if(brand) brand.addEventListener('click', (e)=>{ e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });
  // in-page anchors that point to a station index
  document.querySelectorAll('[data-goto]').forEach(a=>{
    a.addEventListener('click',(e)=>{ e.preventDefault();
      const i = parseInt(a.getAttribute('data-goto'),10);
      window.scrollTo({ top:i*STATION, behavior:'smooth' });
    });
  });

  // allow Tweaks panel to nudge a re-render of star density immediately
  window.RNS_refresh = ()=>{ buildStars(); };

  // debug/preview hook — move the camera without scrolling (for screenshots)
  window.RNS_setCam = function(v){
    cur = target = lastCur = clamp(v, 0, N-1);
    updateLayers(); drawStars(0);
  };
})();
