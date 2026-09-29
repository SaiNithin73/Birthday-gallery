/* ══════════════════════════════════════════════════════════════════════
   Happy Birthday, Safrin
   A small blue universe. Plain JS, no build step.
   ──────────────────────────────────────────────────────────────────────
   Everything you might want to change lives in CONFIG below.
   ════════════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────────────
   CONFIG  ·  edit this block and nothing else
   ────────────────────────────────────────────────────────────────────── */
const CONFIG = {
  /* who this is for ------------------------------------------------- */
  name: "Safrin",
  birthday: { day: "29", month: "September" },
  heroLede: "Every photo below is a reason I'm glad you exist.",

  /* audio · drop a file at this path (mp3 works best) ---------------- */
  music: { file: "audio/song.mp3", volume: 0.35 },

  /* the blue system -------------------------------------------------- */
  colors: {
    ink: "#050b1f", deep: "#081431", royal: "#1b3a8f",
    blue: "#2f6bff", sky: "#7cc4ff", ice: "#eaf4ff",
    cyan: "#7ff0ff", gold: "#e9d8a6",
  },

  /* THE PHOTOS -------------------------------------------------------
     src      → your real photo, e.g. images/photo1.jpg
     fallback → what to show until that file exists (samples live here)
     span     → the size in the bento grid. Your photos are 9:16 portrait,
                 so every tile is at least 2 rows tall — a 1-row tile would
                 crop a tall photo into a letterbox sliver:
                   narrow (1 col) · std (2) · feature (3)
     There is deliberately no `date` or `caption` here: the photos are shown
     blank, with no text over them anywhere on the site. If you ever want
     wording back, add `date:` / `caption:` to an entry and wire it into the
     builders in Gallery, Carousel, Polaroid and Lightbox.
     The order below packs with zero empty cells at 2, 3 AND 6 columns, and
     alternates big–small–small so a phone gets the same bento rhythm you see
     on a laptop instead of a stack of full-width photos.                 */
  photos: [
    { src: "images/photo1.jpg",  fallback: "images/sample1.svg",  span: "feature" },
    { src: "images/photo2.jpg",  fallback: "images/sample2.svg",  span: "std" },
    { src: "images/photo3.jpg",  fallback: "images/sample3.svg",  span: "narrow" },
    { src: "images/photo4.jpg",  fallback: "images/sample4.svg",  span: "feature" },
    { src: "images/photo5.jpg",  fallback: "images/sample5.svg",  span: "feature" },
    { src: "images/photo6.jpg",  fallback: "images/sample6.svg",  span: "std" },
    { src: "images/photo7.jpg",  fallback: "images/sample7.svg",  span: "std" },
    { src: "images/photo8.jpg",  fallback: "images/sample8.svg",  span: "std" },
    { src: "images/photo9.webp", fallback: "images/sample9.svg",  span: "feature" },
    { src: "images/photo10.jpg", fallback: "images/sample10.svg", span: "feature" },
    { src: "images/photo11.jpg", fallback: "images/sample11.svg", span: "std" },
    { src: "images/photo12.jpg", fallback: "images/sample12.svg", span: "std" },
    { src: "images/photo13.jpg", fallback: "images/sample13.svg", span: "std" },
  ],

  /* memories timeline · `photo` is the 1-based photo number ---------- */
  timeline: [
    { photo: 1,  date: "October 2025",  title: "The beginning of something",     text: "Nothing about that day was planned, which is exactly why it worked. You laughed at something I said that I still can't explain." },
    { photo: 4,  date: "January 2026",  title: "The winter we stopped rushing",  text: "Two weeks, one broken heater, zero regrets. You taught me that slow days are the good ones." },
    { photo: 7,  date: "April 2026",    title: "Cake maths",                    text: "You cut the cake into eight pieces and gave me the biggest one, then denied it. I have the photo. I have the receipt." },
    { photo: 10, date: "July 2026",     title: "Too many people, one good song", text: "Everyone was loud and the room was too warm and you looked at me like we'd known each other for years. We hadn't. We do now." },
    { photo: 13, date: "Today",         title: "Right here, right now",         text: "Nothing spectacular happened at all, and it was one of my favourite days. I'd like more of those with you — starting today." },
  ],

  /* the letter · one string per paragraph · {name} becomes her name -- */
  letter: [
    `Dear {name},`,
    `I've been thinking about how to start this, and every draft was too much like a speech. So: no speech. Just the true parts.`,
    `You are the person who notices. The waiter who's having a hard day. The friend who hasn't said anything in a while. You notice, and then you do something small and enormous about it — and you never make a speech about that either.`,
    `I don't think you know how much of my year is better simply because you're in it. The boring days improve. The loud ones get better. The hard ones get lighter, and I don't think you ever once needed credit for that.`,
    `So here is a whole website, built by hand, for one birthday. Thirteen photographs I would keep on a slow afternoon. Four true things. One letter. No rush.`,
    `Happy birthday, {name}. I hope this year is gentle with you, and that I get to be in most of it.`,
  ],
  letterSign: "with everything, always",

  /* flip cards · tap to turn them over ------------------------------- */
  reasons: [
    { title: "Your laugh arrives before you do", body: "You hear something funny from three rooms away and it reaches me first. It's my favourite sound in the world." },
    { title: "You notice the quiet things",      body: "The light at 5pm. That someone looked tired. The exact moment a photo becomes worth keeping. You catch all of it." },
    { title: "You're kind when it's inconvenient", body: "Not the easy kind that gets noticed. The kind that costs you something and gets no applause." },
    { title: "You make ordinary days feel chosen", body: "A bus ride. Waiting for water to boil. Walking nowhere in particular. Somehow it counts. You did that." },
  ],

  /* what the box reveals --------------------------------------------- */
  final: {
    eyebrow: "the last page",
    text: "That's the whole gift, and the smallest one: I get to keep showing up. Make a wish, close this tab, and go have a good day. I'll be here, glad it's yours.",
    cta: "One more time",
  },

  footer: "Make a wish, {name}. I'll keep the rest of the year safe.",
};

/* ══════════════════════════════════════════════════════════════════════
   Below here: the machine.
   ════════════════════════════════════════════════════════════════════ */

const qs  = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const HOVER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
/* the library objects themselves — null if the CDN never arrived, and the
   whole site then falls back to plain CSS behaviour */
const GSAP = typeof window.gsap !== "undefined" && window.gsap ? window.gsap : null;
const ST = GSAP && typeof window.ScrollTrigger !== "undefined" && window.ScrollTrigger ? window.ScrollTrigger : null;
if (ST && typeof GSAP.registerPlugin === "function") GSAP.registerPlugin(ST);

const DPR = () => clamp(window.devicePixelRatio || 1, 1, 2);
const rand = (a, b) => a + Math.random() * (b - a);
const pad2 = (n) => String(n).padStart(2, "0");
/* every tween duration passes through this, so reduced-motion means
   "jump straight to the end state" instead of "still animate" */
const dur = (s) => (REDUCED ? 0 : s);

/* seeded random, so the polaroid wall looks the same on every reload */
function seeded(seed) {
  let s = seed;
  return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
}
const sr = seeded(20260929);

const el = {};                       /* cached nodes, filled by init() */
const N = () => CONFIG.photos.length;
const wrapIdx = (i) => ((Math.round(i) % N()) + N()) % N();
const phrase = (s) => s.replace(/\{name\}/g, CONFIG.name);

/* tiny DOM builder */
function wrap(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

let toastTimer;
function toast(msg, ms = 4600) {
  if (!el.toast) return;
  el.toast.textContent = msg;
  el.toast.classList.add("is-shown");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove("is-shown"), ms);
}

function debounce(fn, ms) {
  let t;
  return function () { clearTimeout(t); t = setTimeout(fn, ms); };
}

/* resolves once the image has painted (or given up) */
function imgReady(img) {
  if (img.complete && img.naturalWidth > 0) return Promise.resolve();
  return new Promise((res) => {
    const done = () => { img.removeEventListener("load", done); img.removeEventListener("error", done); res(); };
    img.addEventListener("load", done);
    img.addEventListener("error", done);
    setTimeout(done, 2500);
  });
}

/* try `photo.src`, fall back to the sample, then hide the image cleanly */
function attachImage(img, photo, holder) {
  const giveUp = () => { if (holder) holder.classList.add("is-missing"); img.style.visibility = "hidden"; };
  img.addEventListener("error", function first() {
    img.removeEventListener("error", first);
    if (photo.fallback && img.getAttribute("src") !== photo.fallback) {
      img.addEventListener("error", giveUp, { once: true });
      img.setAttribute("src", photo.fallback);
    } else {
      giveUp();
    }
  }, { once: true });
  img.setAttribute("src", photo.src);
  return img;
}

function splitWords(str) {
  return str.split(/(\s+)/).map((chunk) =>
    /^\s+$/.test(chunk) ? document.createTextNode(chunk) : wrap("span", "w", chunk));
}

function scrollToEl(target, offset = 0) {
  const node = typeof target === "string" ? qs(target) : target;
  if (!node) return;
  const y = node.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: REDUCED ? "auto" : "smooth" });
}

/* ScrollTrigger.batch with a no-GSAP escape hatch */
function batchReveal(targets, onEnter, start = "top 90%") {
  if (!targets.length) return;
  if (ST && typeof ST.batch === "function") {
    ST.batch(targets, { start, once: true, onEnter });
  } else if (GSAP) {
    GSAP.set(targets, { opacity: 1, y: 0, scale: 1 });
    onEnter(targets);
  }
}

/* ──────────────────────────────────────────────────────────────────────
   1 · Ambient canvas — stars, dust, slow bubbles
   ────────────────────────────────────────────────────────────────────── */
const Ambient = (() => {
  let c = null, ctx = null;
  let w = 0, h = 0, stars = [], dust = [], bubbles = [], raf = 0, t = 0;

  function build() {
    if (!c) return;
    w = c.clientWidth || window.innerWidth;
    h = c.clientHeight || window.innerHeight;
    const dpr = DPR();
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const area = (w * h) / 1e6;
    stars = Array.from({ length: Math.round(90 * clamp(area, 0.6, 2.2)) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: rand(0.4, 1.5), a: rand(0.15, 0.8),
      tw: rand(0.6, 2.4), ph: Math.random() * 6.283, drift: rand(-0.05, 0.05),
    }));
    dust = Array.from({ length: Math.round(38 * clamp(area, 0.6, 2)) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: rand(0.6, 2.1), a: rand(0.06, 0.3),
      vx: rand(-0.13, 0.13), vy: rand(-0.22, -0.05),
      tw: rand(1, 3.2), ph: Math.random() * 6.283,
    }));
    bubbles = Array.from({ length: Math.round(11 * clamp(area, 0.6, 1.6)) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: rand(6, 26), a: rand(0.05, 0.16),
      v: rand(0.16, 0.5), ph: Math.random() * 6.283, sw: rand(0.4, 1.1),
    }));
  }

  function draw() {
    if (!ctx) return;
    t += 0.016;
    ctx.clearRect(0, 0, w, h);

    for (const s of stars) {
      s.x += s.drift;
      if (s.x < -4) s.x = w + 4; else if (s.x > w + 4) s.x = -4;
      ctx.globalAlpha = s.a * (0.55 + 0.45 * Math.sin(t * s.tw + s.ph));
      ctx.fillStyle = s.r > 1.1 ? "#cfe9ff" : "#ffffff";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
    }

    ctx.save();
    ctx.lineWidth = 1;
    for (const b of bubbles) {
      b.y -= b.v;
      if (b.y + b.r < 0) { b.y = h + b.r; b.x = Math.random() * w; }
      const x = b.x + Math.sin(t * 0.7 + b.ph) * b.sw;
      ctx.globalAlpha = b.a;
      ctx.strokeStyle = "rgba(160,215,255,0.85)";
      ctx.beginPath(); ctx.arc(x, b.y, b.r, 0, 6.283); ctx.stroke();
      ctx.fillStyle = "rgba(47,107,255,0.35)";
      ctx.beginPath(); ctx.arc(x, b.y, b.r, 0, 6.283); ctx.fill();
      ctx.globalAlpha = b.a * 2.6;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath(); ctx.arc(x - b.r * 0.32, b.y - b.r * 0.34, Math.max(0.6, b.r * 0.12), 0, 6.283); ctx.fill();
    }
    ctx.restore();

    for (const d of dust) {
      d.x += d.vx; d.y += d.vy;
      if (d.y < -6) { d.y = h + 6; d.x = Math.random() * w; }
      if (d.x < -6) d.x = w + 6; else if (d.x > w + 6) d.x = -6;
      ctx.globalAlpha = d.a * (0.4 + 0.6 * Math.sin(t * d.tw + d.ph));
      ctx.fillStyle = "#7ff0ff";
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }

  return {
    init() { c = el.ambient; if (c) ctx = c.getContext("2d"); },
    resize() { if (!c) return; build(); if (REDUCED) draw(); },
    start() {
      if (!c) return;
      cancelAnimationFrame(raf);
      build();
      if (REDUCED) { draw(); cancelAnimationFrame(raf); return; }
      raf = requestAnimationFrame(draw);
    },
    stop() { cancelAnimationFrame(raf); },
  };
})();

/* ──────────────────────────────────────────────────────────────────────
   2 · FX canvas — bubbles, confetti, fireworks
   ────────────────────────────────────────────────────────────────────── */
const Fx = (() => {
  let c = null, ctx = null, w = 0, h = 0, parts = [], raf = 0;

  function resize() {
    if (!c) return;
    w = c.clientWidth || window.innerWidth;
    h = c.clientHeight || window.innerHeight;
    const dpr = DPR();
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function loop() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life -= 1;
      if (p.life <= 0 || p.y < -80) { parts.splice(i, 1); continue; }
      p.vy += p.g;
      p.vx *= p.drag; p.vy *= p.drag;
      p.x += p.vx; p.y += p.vy;
      p.rot += p.vr;
      ctx.globalAlpha = clamp(p.life / p.max, 0, 1) * p.a;

      if (p.kind === "confetti") {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        const sq = Math.abs(Math.cos(p.rot)) * 0.7 + 0.3;
        ctx.fillRect(-p.r * sq, -p.r * 0.55, p.r * 2 * sq, p.r * 1.1);
        ctx.restore();
      } else if (p.kind === "spark") {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.r * 0.7;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2.6, p.y - p.vy * 2.6);
        ctx.stroke();
      } else {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.stroke();
        ctx.fillStyle = p.color;
        ctx.globalAlpha *= 0.4;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.92, 0, 6.283); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    raf = parts.length ? requestAnimationFrame(loop) : 0;
  }

  function add(p) {
    if (parts.length > 800) parts.splice(0, parts.length - 600);
    parts.push(p);
    if (!raf) raf = requestAnimationFrame(loop);
  }

  /* bubbles rising from a point */
  function burst(x, y, count = 14) {
    if (REDUCED || !ctx) return;
    for (let i = 0; i < count; i++) {
      add({
        kind: "bubble",
        x: x + rand(-26, 26), y: y + rand(-14, 14),
        vx: rand(-0.5, 0.5), vy: rand(-1.5, -0.5),
        g: -0.006, drag: 0.995,
        r: rand(5, 24), a: rand(0.2, 0.45), color: "rgba(140,200,255,0.8)",
        rot: 0, vr: 0, life: rand(170, 300), max: 300,
      });
    }
    for (let i = 0; i < Math.round(count * 0.6); i++) {
      add({
        kind: "spark", x, y,
        vx: rand(-2.4, 2.4), vy: rand(-2.4, 2.4), g: 0.03, drag: 0.93,
        r: rand(1.4, 3), a: 0.9, color: Math.random() > 0.5 ? "#7ff0ff" : "#cfe9ff",
        rot: 0, vr: 0, life: rand(34, 66), max: 66,
      });
    }
  }

  const CONFETTI = ["#2f6bff", "#7cc4ff", "#7ff0ff", "#ffffff", "#e9d8a6", "#1b3a8f"];
  function confetti(x, y, count = 90) {
    if (REDUCED || !ctx) return;
    for (let i = 0; i < count; i++) {
      const ang = rand(-Math.PI * 0.95, -Math.PI * 0.05);
      const sp = rand(4, 15);
      add({
        kind: "confetti",
        x: x + rand(-18, 18), y: y + rand(-10, 10),
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
        g: 0.24, drag: 0.985,
        r: rand(3, 7), a: 1, color: CONFETTI[(Math.random() * CONFETTI.length) | 0],
        rot: Math.random() * 6.283, vr: rand(-0.3, 0.3),
        life: rand(140, 260), max: 260,
      });
    }
  }

  const FIRE = ["#2f6bff", "#7cc4ff", "#7ff0ff", "#ffffff", "#e9d8a6"];
  function explode(x, y, power = 1) {
    if (REDUCED || !ctx) return;
    const n = Math.round(64 * power);
    const color = FIRE[(Math.random() * FIRE.length) | 0];
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * 6.283 + rand(-0.12, 0.12);
      const sp = rand(2.5, 8) * power;
      add({
        kind: "spark", x, y,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
        g: 0.055, drag: 0.965,
        r: rand(1.2, 2.8), a: 1, color,
        rot: 0, vr: 0, life: rand(55, 105), max: 105,
      });
    }
  }

  /* a rocket climbs, then blooms */
  function firework(x, targetY) {
    if (REDUCED || !ctx) return;
    const color = FIRE[(Math.random() * FIRE.length) | 0];
    const rocket = {
      kind: "spark", x, y: h,
      vx: rand(-0.6, 0.6), vy: rand(-15, -12),
      g: 0.14, drag: 0.995,
      r: 2.4, a: 1, color, rot: 0, vr: 0, life: 9999, max: 9999,
    };
    const tick = () => {
      if (rocket.y <= targetY || rocket.vy >= 0) { rocket.life = 0; explode(rocket.x, rocket.y, rand(0.85, 1.35)); return; }
      add(rocket);
      setTimeout(tick, 26);
    };
    tick();
  }

  return {
    init() { c = el.fx; if (c) ctx = c.getContext("2d"); resize(); },
    resize, burst, confetti, explode, firework,
  };
})();

/* ══════════════════════════════════════════════════════════════════════
   3 · Loader
   ════════════════════════════════════════════════════════════════════ */
function runLoader() {
  const loader = el.loader;
  const count = qs("#loaderCount", loader);
  const fill = qs("#loaderFill", loader);
  const line = qs("#loaderLine", loader);
  let done = false;

  function finish() {
    if (done) return;
    done = true;
    document.body.classList.remove("is-loading");
    loader.classList.add("is-done");
    Ambient.start();
    Fx.resize();
    Reveals.init();
    setTimeout(() => loader.remove(), 1000);
    setTimeout(() => { if (ST) ST.refresh(); }, 300);
    Hero.play();
  }

  loader.addEventListener("click", finish);

  if (REDUCED || !GSAP) {
    if (count) count.textContent = "";
    if (line) line.textContent = CONFIG.name;
    if (fill) fill.style.width = "100%";
    setTimeout(finish, 500);
    return;
  }

  const steps = [
    { n: 3, text: "Something special for you…", p: 24 },
    { n: 2, text: `${CONFIG.photos.length} little moments…`, p: 58 },
    { n: 1, text: `One whole sky, for ${CONFIG.name}.`, p: 84 },
  ];
  let i = 0;

  const step = () => {
    if (done) return;
    const s = steps[i++];
    if (!s) { finish(); return; }
    count.textContent = s.n;
    line.textContent = s.text;
    GSAP.fromTo(line, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    GSAP.fromTo(count, { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" });
    GSAP.to(fill, { width: s.p + "%", duration: 0.85, ease: "power2.inOut" });
    setTimeout(step, 950);
  };

  setTimeout(step, 320);
  setTimeout(finish, 3700); /* safety net */
}

/* ══════════════════════════════════════════════════════════════════════
   4 · Music
   ════════════════════════════════════════════════════════════════════ */
const Music = (() => {
  let audio = null, playing = false, available = null;

  /* quietly find out whether a song is actually there */
  function probe() {
    return new Promise((res) => {
      if (!CONFIG.music || !CONFIG.music.file) return res(false);
      const a = new Audio();
      let settled = false;
      const end = (ok) => { if (settled) return; settled = true; res(ok); };
      a.addEventListener("loadeddata", () => end(true), { once: true });
      a.addEventListener("canplaythrough", () => end(true), { once: true });
      a.addEventListener("error", () => end(false), { once: true });
      a.preload = "metadata";
      a.setAttribute("src", CONFIG.music.file);
      try { a.load(); } catch (e) { end(false); }
      setTimeout(() => end(false), 4000);
    });
  }

  function setUI(on) {
    el.musicBtn.setAttribute("aria-pressed", on ? "true" : "false");
    el.musicBtn.setAttribute("aria-label", on ? "Pause music" : "Play music");
    el.musicBtn.classList.toggle("is-playing", on);
    el.musicLabel.textContent = on ? "pause" : "music";
  }

  async function toggle() {
    if (!audio) {
      audio = new Audio();
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = clamp(CONFIG.music.volume == null ? 0.35 : CONFIG.music.volume, 0, 1);
      audio.setAttribute("src", CONFIG.music.file);
    }
    if (playing) { audio.pause(); playing = false; setUI(false); return; }
    try {
      await audio.play();
      playing = true;
      setUI(true);
    } catch (e) {
      playing = false;
      setUI(false);
      toast("I can't find audio/song.mp3 yet — drop one in that folder and refresh.");
    }
  }

  return {
    init() {
      el.musicBtn.addEventListener("click", toggle);
      setUI(false);
      document.addEventListener("visibilitychange", () => {
        if (!audio) return;
        if (document.hidden) audio.pause();
        else if (playing) audio.play().catch(() => {});
      });
      probe().then((ok) => {
        available = ok;
        if (!ok) el.musicLabel.textContent = "no song yet";
      });
    },
    get available() { return available; },
    get playing() { return playing; },
  };
})();

/* ══════════════════════════════════════════════════════════════════════
   5 · Hero — letter reveal, balloons, confetti, fireworks easter egg
   ════════════════════════════════════════════════════════════════════ */
const Hero = (() => {
  let played = false;

  function balloons() {
    if (REDUCED || !GSAP) return;
    const n = window.innerWidth < 720 ? 7 : 10;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const b = wrap("span", "balloon");
      b.style.left = (4 + (92 / n) * i + rand(-5, 5)).toFixed(1) + "%";
      b.style.setProperty("--bw", rand(38, 78).toFixed(0) + "px");
      b.appendChild(wrap("i"));
      frag.appendChild(b);
      GSAP.set(b, { y: 0, x: 0, rotation: 0, opacity: 0 });
      GSAP.to(b, { opacity: rand(0.5, 0.9), duration: 1.4, delay: rand(0, 1.4) });
      GSAP.to(b, { y: () => -window.innerHeight * rand(1.15, 1.5), duration: rand(17, 27), ease: "none", delay: rand(0, 4), repeat: -1 });
      GSAP.to(b, { x: rand(26, 62), duration: rand(3.4, 5.6), ease: "sine.inOut", yoyo: true, repeat: -1, delay: rand(0, 2) });
      GSAP.to(b, { rotation: rand(-7, 7), duration: rand(4, 7), ease: "sine.inOut", yoyo: true, repeat: -1, delay: rand(0, 2) });
    }
    el.balloons.appendChild(frag);
  }

  /* one span per letter so the gradient can live on each glyph */
  function splitName() {
    const node = el.heroNameText;
    node.textContent = "";
    [...CONFIG.name].forEach((ch) => {
      const s = wrap("span", "hero__char", ch === " " ? " " : ch);
      s.setAttribute("aria-hidden", "true");
      node.appendChild(s);
    });
    return node.children;
  }

  function play() {
    if (played) return;
    played = true;
    balloons();

    const chars = el.heroNameText.children;
    if (GSAP && chars.length && !REDUCED) {
      GSAP.fromTo(chars,
        { opacity: 0, yPercent: 55, scale: 0.88 },
        { opacity: 1, yPercent: 0, scale: 1, duration: 1.15, ease: "expo.out", stagger: 0.055, delay: 0.12 });
    }
    if (GSAP && !REDUCED) {
      const r = el.heroName.getBoundingClientRect();
      setTimeout(() => Fx.confetti(r.left + r.width / 2, r.top + r.height * 0.7, 120), 420);
    }
  }

  function init() {
    el.heroName.setAttribute("aria-label", `${CONFIG.name} — tap for a surprise`);
    el.heroLede.textContent = CONFIG.heroLede;
    splitName();

    el.openGift.addEventListener("click", () => scrollToEl("#gallery", 8));
    const jump = qs('a[href="#gallery"]');
    if (jump) jump.addEventListener("click", (e) => { e.preventDefault(); scrollToEl("#gallery", 8); });

    /* easter egg: fireworks when you tap her name */
    el.heroName.addEventListener("click", () => {
      const r = el.heroName.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        setTimeout(() => Fx.firework(
          r.left + r.width / 2 + rand(-r.width * 0.6, r.width * 0.6),
          r.top + r.height / 2 + rand(-r.height * 0.5, r.height * 0.5)
        ), i * 190);
      }
      if (GSAP) GSAP.fromTo(el.heroName, { scale: 1 }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
    });
  }

  return { init, play };
})();

/* ══════════════════════════════════════════════════════════════════════
   6 · Gallery view A — bento grid with 3D tilt
   ════════════════════════════════════════════════════════════════════ */
const Grid = (() => {
  let host = null, tiles = [];

  function build() {
    host = el.grid;
    const frag = document.createDocumentFragment();
    CONFIG.photos.forEach((p, i) => {
      const btn = wrap("button", "tile");
      btn.type = "button";
      btn.dataset.span = p.span || "std";
      btn.dataset.i = i;
      btn.setAttribute("aria-label", `Open photo ${i + 1} of ${N()}`);

      const media = wrap("span", "tile__media");
      const img = wrap("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = `Photo ${i + 1} of ${N()}`;
      attachImage(img, p, btn);
      media.appendChild(img);
      btn.appendChild(media);

      btn.appendChild(wrap("span", "tile__num", pad2(i + 1)));

      btn.addEventListener("click", () => Lightbox.open(i, btn));
      frag.appendChild(btn);
    });
    host.appendChild(frag);
    tiles = qsa(".tile", host);
    if (HOVER) tiles.forEach(tilt);
  }

  /* 3D tilt + parallax written straight to custom properties */
  function tilt(tile) {
    const media = qs(".tile__media", tile);
    const img = qs("img", tile);
    let raf = 0;
    const set = (k, v) => { (k === "px" ? img : media).style.setProperty(k, v); };

    tile.addEventListener("pointermove", (e) => {
      const r = tile.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        media.style.setProperty("--ry", ((px - 0.5) * 13).toFixed(2) + "deg");
        media.style.setProperty("--rx", ((0.5 - py) * 11).toFixed(2) + "deg");
        media.style.setProperty("--ts", "1.035");
        media.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        media.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        img.style.setProperty("--px", ((px - 0.5) * -14).toFixed(1) + "px");
        img.style.setProperty("--py", ((py - 0.5) * -14).toFixed(1) + "px");
      });
    });

    tile.addEventListener("pointerleave", () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      media.style.setProperty("--ry", "0deg");
      media.style.setProperty("--rx", "0deg");
      media.style.setProperty("--ts", "1");
      media.style.setProperty("--mx", "50%");
      media.style.setProperty("--my", "50%");
      img.style.setProperty("--px", "0px");
      img.style.setProperty("--py", "0px");
    });
  }

  return { build, tiles: () => tiles };
})();

/* ══════════════════════════════════════════════════════════════════════
   7 · Gallery view B — 3D coverflow carousel
   ════════════════════════════════════════════════════════════════════ */
const Carousel = (() => {
  let shell = null, track = null, dots = [];
  let cards = [], index = 0, step = 250, shown = false;

  function build() {
    const frag = document.createDocumentFragment();
    CONFIG.photos.forEach((p, i) => {
      const card = wrap("figure", "ccard");
      card.dataset.i = i;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Open photo ${i + 1} of ${N()}`);

      const img = wrap("img", "ccard__img");
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = `Photo ${i + 1} of ${N()}`;
      attachImage(img, p, card);
      card.appendChild(img);

      const open = () => (i === wrapIdx(index) ? Lightbox.open(i, card) : goTo(i));
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); Lightbox.open(i, card); }
      });
      frag.appendChild(card);
    });
    track.appendChild(frag);
    cards = qsa(".ccard", track);

    CONFIG.photos.forEach((_, i) => {
      const d = wrap("button", "cdot");
      d.type = "button";
      d.setAttribute("aria-label", `Go to photo ${i + 1}`);
      d.addEventListener("click", () => goTo(i));
      el.cdots.appendChild(d);
    });
    dots = qsa(".cdot", el.cdots);
  }

  /* paint every card for a fractional index (used for the drag) */
  function paint(pos = index, ms = 0) {
    const n = N();
    cards.forEach((card, i) => {
      let d = (i - pos) % n;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      const ad = Math.abs(d);
      const x = d * step;
      const y = -ad * 10;
      const z = -ad * 170;
      const ry = -d * 26;
      const sc = 1 - ad * 0.075;
      const op = ad > 3.2 ? 0 : clamp(1 - ad * 0.16, 0, 1);
      const zi = Math.round(100 - ad * 10);
      if (ms && GSAP) {
        /* component values: safer than handing GSAP a transform string */
        GSAP.to(card, {
          xPercent: -50, yPercent: -50,
          x, y, z, rotationY: ry, scaleX: sc, scaleY: sc,
          opacity: op, zIndex: zi,
          duration: dur(ms), ease: "power3.out", overwrite: true,
        });
      } else {
        card.style.transform =
          `translate(-50%,-50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(0)}px) rotateY(${ry.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
        card.style.opacity = op;
        card.style.zIndex = zi;
      }
      card.classList.toggle("is-active", i === wrapIdx(pos));
    });
    dots.forEach((d, i) => d.classList.toggle("is-active", i === wrapIdx(pos)));
  }

  function layout(animate = true) {
    if (!cards.length) return;
    const cardW = cards[0].getBoundingClientRect().width || clamp(window.innerWidth * 0.56, 200, 330);
    const vw = (shell && shell.clientWidth) || window.innerWidth;
    step = Math.min(cardW * 0.64, Math.max(110, vw * 0.46));
    paint(index, animate && GSAP ? 0.5 : 0);
  }

  function goTo(i) {
    const next = wrapIdx(i);
    if (next === index) { paint(); return; }
    index = next;
    paint(index, GSAP ? 0.62 : 0);
  }
  const go = (d) => goTo(index + d);

  function bindDrag() {
    let down = false, startX = 0, startY = 0, dx = 0, axis = null, base = 0;
    shell.addEventListener("pointerdown", (e) => {
      if (e.button != null && e.button > 0) return;
      down = true; axis = null; dx = 0; base = index;
      startX = e.clientX; startY = e.clientY;
      shell.classList.add("is-dragging");
      if (GSAP) GSAP.killTweensOf(cards);
    });
    shell.addEventListener("pointermove", (e) => {
      if (!down) return;
      dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!axis) axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (axis !== "x") return;
      if (e.cancelable) e.preventDefault();
      paint(base - dx / step, 0);
    });
    const end = () => {
      if (!down) return;
      down = false;
      shell.classList.remove("is-dragging");
      if (axis !== "x") { paint(); return; }
      index = wrapIdx(base - dx / step);
      paint(index, GSAP ? 0.6 : 0);
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  }

  function init() {
    shell = el.carousel;
    track = el.carouselTrack;
    build();
    bindDrag();
    el.cPrev.addEventListener("click", () => go(-1));
    el.cNext.addEventListener("click", () => go(1));
    el.carouselPanel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    });
    paint(0, 0);
  }

  function onShow() {
    shown = true;
    requestAnimationFrame(() => layout(true));
  }

  return { init, onShow, layout: () => layout(false), get shown() { return shown; } };
})();

/* ══════════════════════════════════════════════════════════════════════
   8 · Gallery view C — polaroid scatter
   ════════════════════════════════════════════════════════════════════ */
const Polaroid = (() => {
  let cards = [];

  function build() {
    const frag = document.createDocumentFragment();
    CONFIG.photos.forEach((p, i) => {
      const card = wrap("figure", "polaroid");
      card.dataset.i = i;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Open photo ${i + 1} of ${N()}`);
      card.style.setProperty("--rot", (sr() * 17 - 8.5).toFixed(1) + "deg");

      const img = wrap("img", "polaroid__img");
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = `Photo ${i + 1} of ${N()}`;
      attachImage(img, p, card);
      card.appendChild(img);

      const open = () => Lightbox.open(i, card);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
      frag.appendChild(card);
    });
    el.scatter.appendChild(frag);
    cards = qsa(".polaroid", el.scatter);
    layout();
  }

  /* 5 across on desktop, pinned at slightly different angles */
  function layout() {
    if (!cards.length) return;
    const wide = window.innerWidth >= 1000;
    if (!wide) {
      cards.forEach((c) => {
        c.style.position = ""; c.style.left = ""; c.style.top = "";
        c.style.width = ""; c.style.zIndex = "";
      });
      el.scatter.style.height = "";
      return;
    }
    const cols = 5, rows = Math.ceil(cards.length / cols);
    const gapX = 34, gapY = 48;
    const avail = el.scatter.clientWidth || 1200;
    const cardW = Math.min(194, (avail - gapX * (cols - 1)) / cols);
    const cardH = Math.round(cardW * 1.36);
    const usedW = cardW * cols + gapX * (cols - 1);
    const startX = Math.max(0, (avail - usedW) / 2);
    el.scatter.style.height = rows * cardH + (rows - 1) * gapY + 30 + "px";

    cards.forEach((c, i) => {
      const col = i % cols, row = (i / cols) | 0;
      const jx = (sr() - 0.5) * gapX * 0.5;
      const jy = (sr() - 0.5) * gapY * 0.5;
      const x = clamp(startX + col * (cardW + gapX) + jx, 0, Math.max(0, avail - cardW));
      c.style.position = "absolute";
      c.style.left = x.toFixed(0) + "px";
      c.style.top = Math.max(0, row * (cardH + gapY) + jy).toFixed(0) + "px";
      c.style.width = cardW.toFixed(0) + "px";
      c.style.zIndex = String(10 + row * 2 + (sr() > 0.5 ? 1 : 0));
    });
  }

  return { build, layout };
})();

/* ══════════════════════════════════════════════════════════════════════
   9 · Lightbox
   ════════════════════════════════════════════════════════════════════ */
const Lightbox = (() => {
  let idx = 0, isOpen = false, source = null, busy = false;
  let dragging = false, dragX = 0, startX = 0, startY = 0, axis = null;

  function fill(img) {
    const p = CONFIG.photos[idx];
    el.lbImg.alt = `Photo ${idx + 1} of ${N()}`;
    el.lbCount.textContent = `${idx + 1} / ${N()}`;
    return attachImage(img, p, el.lbFrame);
  }

  /* the transform that would line the big image up with its thumbnail */
  function zoomFrom(srcEl) {
    if (!srcEl || !srcEl.isConnected) return null;
    const r = srcEl.getBoundingClientRect();
    const f = el.lbFrame.getBoundingClientRect();
    if (!r.width || !r.height || !f.width || !f.height) return null;
    return {
      scale: Math.max(0.08, r.width / f.width),
      x: (r.left + r.width / 2) - (f.left + f.width / 2),
      y: (r.top + r.height / 2) - (f.top + f.height / 2),
    };
  }

  async function show(i, srcEl) {
    if (busy) return;
    busy = true;
    idx = ((Math.round(i) % N()) + N()) % N();
    source = srcEl || null;
    isOpen = true;
    document.body.classList.add("lb-open");
    el.lb.hidden = false;
    el.lbFrame.classList.add("is-loading");
    el.lbImg.style.visibility = "hidden";

    if (GSAP) {
      GSAP.set(el.lbBackdrop, { opacity: 0 });
      GSAP.to(el.lbBackdrop, { opacity: 1, duration: dur(0.45), ease: "power2.out" });
      GSAP.fromTo(el.lbStage, { opacity: 0 }, { opacity: 1, duration: dur(0.4) });
      GSAP.fromTo(qsa(".lb__close, .lb__nav"), { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: dur(0.4), delay: dur(0.12), stagger: 0.05, clearProps: "scale" });
    }

    fill(el.lbImg);
    await imgReady(el.lbImg);
    el.lbFrame.classList.remove("is-loading");
    el.lbImg.style.visibility = "";

    const from = zoomFrom(source);
    if (GSAP) {
      if (from) {
        GSAP.fromTo(el.lbFrame, { x: from.x, y: from.y, scale: from.scale, opacity: 0.2 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: dur(0.72), ease: "expo.out" });
      } else {
        GSAP.fromTo(el.lbFrame, { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: dur(0.5), ease: "expo.out" });
      }
    }
    el.lbClose.focus({ preventScroll: true });
    busy = false;
  }

  async function step(delta) {
    if (busy || !isOpen) return;
    busy = true;
    const dir = delta > 0 ? 1 : -1;
    if (GSAP) await GSAP.to(el.lbFrame, { x: dir * -46, opacity: 0, duration: dur(0.18), ease: "power2.in" });
    idx = wrapIdx(idx + delta);
    el.lbFrame.classList.add("is-loading");
    el.lbImg.style.visibility = "hidden";
    fill(el.lbImg);
    await imgReady(el.lbImg);
    el.lbFrame.classList.remove("is-loading");
    el.lbImg.style.visibility = "";
    if (GSAP) {
      GSAP.fromTo(el.lbFrame, { x: dir * 46, opacity: 0 },
        { x: 0, opacity: 1, duration: dur(0.42), ease: "power2.out", clearProps: "transform" });
    } else {
      el.lbFrame.style.transform = "";
      el.lbFrame.style.opacity = "1";
    }
    busy = false;
  }

  function close() {
    if (!isOpen || busy) return;
    busy = true;
    isOpen = false;
    document.body.classList.remove("lb-open");
    const back = zoomFrom(source);
    const finish = () => {
      el.lb.hidden = true;
      el.lbImg.removeAttribute("src");
      el.lbFrame.style.transform = "";
      el.lbFrame.style.opacity = "";
      el.lbCap.style.opacity = "";
      el.lbBackdrop.style.opacity = "";
      if (source && source.isConnected) source.focus({ preventScroll: true });
      source = null;
      busy = false;
    };
    if (!GSAP) { finish(); return; }
    const t = GSAP.timeline({ onComplete: finish });
    t.to(el.lbBackdrop, { opacity: 0, duration: dur(0.4), ease: "power2.inOut" }, 0);
    t.to(el.lbCap, { opacity: 0, duration: dur(0.2) }, 0);
    if (back) {
      t.to(el.lbFrame, { x: back.x, y: back.y, scale: back.scale, opacity: 0, duration: dur(0.5), ease: "power2.inOut" }, 0.06);
    } else {
      t.to(el.lbFrame, { scale: 0.92, opacity: 0, duration: dur(0.3) }, 0.06);
    }
    t.to(qsa(".lb__close, .lb__nav"), { opacity: 0, duration: dur(0.2) }, 0);
  }

  function keys(e) {
    if (!isOpen) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    else if (e.key === "Tab") {
      const f = [el.lbClose, el.lbPrev, el.lbNext];
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? f.length - 1 : 1) + f.length) % f.length].focus();
    }
  }

  function bindSwipe() {
    el.lbStage.addEventListener("pointerdown", (e) => {
      if (!isOpen) return;
      dragging = true; axis = null; dragX = 0;
      startX = e.clientX; startY = e.clientY;
    });
    el.lbStage.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (!axis) axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (axis !== "x") return;
      dragX = dx;
      if (GSAP) GSAP.set(el.lbFrame, { x: dx, opacity: clamp(1 - Math.abs(dx) / 700, 0.3, 1) });
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      if (axis !== "x") { if (GSAP) GSAP.to(el.lbFrame, { x: 0, opacity: 1, duration: dur(0.3) }); return; }
      if (Math.abs(dragX) > 70) step(dragX < 0 ? 1 : -1);
      else if (GSAP) GSAP.to(el.lbFrame, { x: 0, opacity: 1, duration: dur(0.35), ease: "power3.out" });
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  }

  function init() {
    el.lbBackdrop.addEventListener("click", close);
    el.lbClose.addEventListener("click", close);
    el.lbPrev.addEventListener("click", () => step(-1));
    el.lbNext.addEventListener("click", () => step(1));
    document.addEventListener("keydown", keys);
    bindSwipe();
  }

  return { init, open: show, close, next: () => step(1), prev: () => step(-1), get isOpen() { return isOpen; } };
})();

/* ══════════════════════════════════════════════════════════════════════
   10 · Timeline
   ════════════════════════════════════════════════════════════════════ */
function buildTimeline() {
  const frag = document.createDocumentFragment();
  CONFIG.timeline.forEach((m) => {
    const i = ((m.photo - 1) % N() + N()) % N();
    const p = CONFIG.photos[i];

    const li = wrap("li", "tl__item");
    li.dataset.i = i;
    li.appendChild(wrap("span", "tl__dot"));

    const card = wrap("div", "tl__card");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Open photo ${i + 1}: ${m.title}`);

    const media = wrap("div", "tl__media");
    const img = wrap("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = m.title;
    attachImage(img, p, card);
    media.appendChild(img);
    media.appendChild(wrap("span", "tl__tag", m.date));
    card.appendChild(media);

    const body = wrap("div", "tl__body");
    body.appendChild(wrap("span", "tl__date", m.date));
    body.appendChild(wrap("h3", "tl__title", m.title));
    body.appendChild(wrap("p", "tl__text", m.text));
    card.appendChild(body);

    const open = () => Lightbox.open(i, img);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });

    li.appendChild(card);
    frag.appendChild(li);
  });
  el.tlList.appendChild(frag);
}

/* ══════════════════════════════════════════════════════════════════════
   11 · Wishes — the letter and the flip cards
   ════════════════════════════════════════════════════════════════════ */
function buildLetter() {
  CONFIG.letter.forEach((para, i) => {
    const p = wrap("p");
    if (i === 0) p.className = "w-open";
    if (i === CONFIG.letter.length - 1) p.className = "w-sign";
    splitWords(phrase(para)).forEach((node) => p.appendChild(node));
    el.letterBody.appendChild(p);
  });
  el.letterSign.textContent = CONFIG.letterSign;
}

function buildReasons() {
  const frag = document.createDocumentFragment();
  CONFIG.reasons.forEach((r, i) => {
    const card = wrap("div", "reason");
    const btn = wrap("button", "reason__btn");
    btn.type = "button";
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", `Turn over: ${r.title}`);

    const inner = wrap("span", "reason__inner");
    const front = wrap("span", "reason__face reason__face--front");
    front.dataset.n = pad2(i + 1);
    front.appendChild(wrap("span", "reason__hint", "tap to turn"));
    front.appendChild(wrap("span", "reason__title", r.title));
    const back = wrap("span", "reason__face reason__face--back");
    back.appendChild(wrap("span", "reason__body", r.body));

    inner.appendChild(front);
    inner.appendChild(back);
    btn.appendChild(inner);
    card.appendChild(btn);
    frag.appendChild(card);
  });
  el.reasons.appendChild(frag);

  qsa(".reason__btn", el.reasons).forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".reason");
      const flipped = card.classList.toggle("is-flipped");
      btn.setAttribute("aria-pressed", flipped ? "true" : "false");
      if (flipped) {
        const r = btn.getBoundingClientRect();
        Fx.burst(r.left + r.width / 2, r.top + r.height / 2, 8);
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════
   12 · The gift box
   ════════════════════════════════════════════════════════════════════ */
function buildGift() {
  el.finalTitle.textContent = `Happy Birthday, ${CONFIG.name}`;
  el.finalText.textContent = CONFIG.final.text;
  el.replayFireworks.textContent = CONFIG.final.cta;
  qs("#finalMessage .final__eyebrow").textContent = CONFIG.final.eyebrow;

  let opened = false;
  el.giftBox.addEventListener("click", () => {
    const r = el.giftBox.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height * 0.35;

    if (!opened) {
      opened = true;
      el.giftBox.classList.add("is-open");
      el.giftBox.setAttribute("aria-expanded", "true");
      el.giftHint.style.opacity = "0";
      Fx.confetti(cx, cy, 150);
      setTimeout(() => Fx.explode(cx, cy - 20, 1.2), 420);
      el.final.hidden = false;
      if (GSAP) {
        GSAP.fromTo(el.final, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: dur(0.9), ease: "expo.out" });
        GSAP.fromTo(qsa("#finalMessage h3, #finalMessage p, #finalMessage .btn"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: dur(0.7), delay: dur(0.28), stagger: 0.09, ease: "power2.out" });
      }
      setTimeout(() => scrollToEl(el.final, 120), 640);
    } else {
      Fx.confetti(cx, cy, 110);
    }
  });

  el.replayFireworks.addEventListener("click", () => {
    const r = el.replayFireworks.getBoundingClientRect();
    for (let i = 0; i < 6; i++) {
      setTimeout(() => Fx.firework(r.left + r.width / 2 + rand(-280, 280), rand(110, 330)), i * 180);
    }
  });
}

/* ══════════════════════════════════════════════════════════════════════
   13 · View switcher
   ════════════════════════════════════════════════════════════════════ */
const Views = (() => {
  let panels = {};

  function movePill() {
    const btn = qs(`.viewswitch__btn[data-view="${el.pill.dataset.current || "grid"}"]`);
    if (!btn || !el.pill) return;
    el.pill.style.width = btn.offsetWidth + "px";
    el.pill.style.transform = `translateX(${btn.offsetLeft - 5}px)`;
  }

  function set(name) {
    if (!panels[name]) return;
    el.pill.dataset.current = name;
    qsa(".viewswitch__btn").forEach((b) => {
      const on = b.dataset.view === name;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    qsa(".view").forEach((v) => {
      const on = v.id === `view-${name}`;
      v.classList.toggle("is-active", on);
      v.hidden = !on;
    });
    movePill();
    if (name === "carousel") Carousel.onShow();
    if (name === "polaroid") Polaroid.layout();
    if (ST) setTimeout(() => ST.refresh(), 60);
  }

  function init() {
    panels = { grid: el.grid, carousel: el.carouselPanel, polaroid: el.polaroidPanel };
    qsa(".viewswitch__btn").forEach((b) => b.addEventListener("click", () => set(b.dataset.view)));
    set("grid");
    window.addEventListener("resize", debounce(movePill, 200));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill).catch(() => {});
  }

  return { init, set, current: () => el.pill.dataset.current };
})();

/* ══════════════════════════════════════════════════════════════════════
   14 · Scroll reveals (armed after the loader lifts)
   ════════════════════════════════════════════════════════════════════ */
const Reveals = (() => {
  let armed = false;

  function init() {
    if (armed) return;
    armed = true;
    if (!GSAP) return;

    if (REDUCED) {
      /* no motion: make sure nothing is left stranded at opacity 0 */
      qsa("[data-reveal], .tile, .tl__item, .w, .polaroid").forEach((n) => {
        GSAP.set(n, { clearProps: "all" });
        n.style.opacity = "1";
      });
      el.tlFill.style.height = "100%";
      qsa(".tl__item", el.tlList).forEach((n) => n.classList.add("is-in"));
      return;
    }

    /* generic [data-reveal] blocks: hero copy, section headers */
    const blocks = qsa("[data-reveal]");
    GSAP.set(blocks, { opacity: 0, y: 30 });
    batchReveal(blocks, (batch) =>
      GSAP.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.09, overwrite: true }));

    /* bento tiles */
    const tiles = Grid.tiles();
    if (tiles.length) {
      GSAP.set(tiles, { opacity: 0, y: 40, scale: 0.965 });
      batchReveal(tiles, (batch) =>
        GSAP.to(batch, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "expo.out", stagger: 0.07, overwrite: true }),
        "top 92%");
    }

    /* timeline items + the glowing line */
    const items = qsa(".tl__item", el.tlList);
    if (items.length) {
      GSAP.set(items, { opacity: 0, y: 48 });
      batchReveal(items, (batch) => {
        batch.forEach((b) => b.classList.add("is-in"));
        GSAP.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 });
      }, "top 88%");
    }
    const tl = qs(".tl");
    if (tl && ST) {
      GSAP.fromTo(el.tlFill, { height: 0 }, {
        height: () => tl.offsetHeight + "px",
        ease: "none",
        scrollTrigger: { trigger: tl, start: "top 72%", end: "bottom 80%", scrub: 0.4 },
      });
    }

    /* the letter, word by word */
    const words = qsa(".w", el.letterBody);
    if (words.length && ST) {
      GSAP.set(words, { opacity: 0, y: 16 });
      GSAP.timeline({
        scrollTrigger: { trigger: el.letterBody, start: "top 88%", once: true },
      }).to(words, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.012 });
    }

    /* polaroids drift in */
    const polas = qsa(".polaroid", el.scatter);
    if (polas.length && ST) {
      GSAP.set(polas, { opacity: 0, scale: 0.9, y: 30 });
      ST.batch(polas, {
        start: "top 92%", once: true,
        onEnter: (batch) => GSAP.to(batch, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.4)", stagger: 0.06 }),
      });
    }
  }

  return { init };
})();

/* ══════════════════════════════════════════════════════════════════════
   15 · Chrome: sparkles, cursor, progress, background clicks
   ════════════════════════════════════════════════════════════════════ */
function sparkles() {
  if (REDUCED) return;
  const n = window.innerWidth < 720 ? 18 : 30;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const s = wrap("span", "sparkle");
    s.style.left = (Math.random() * 100).toFixed(1) + "%";
    s.style.top = (Math.random() * 100).toFixed(1) + "%";
    s.style.setProperty("--dur", rand(2.4, 6).toFixed(2) + "s");
    s.style.setProperty("--delay", rand(0, 5).toFixed(2) + "s");
    frag.appendChild(s);
  }
  el.sparkleField.appendChild(frag);
}

function cursor() {
  if (!HOVER || REDUCED) return;
  const dot = el.cursorGlow;
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, live = false;
  const loop = () => {
    cx = lerp(cx, x, 0.14);
    cy = lerp(cy, y, 0.14);
    dot.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
    requestAnimationFrame(loop);
  };
  window.addEventListener("pointermove", (e) => {
    x = e.clientX; y = e.clientY;
    if (!live) { live = true; document.body.classList.add("has-cursor"); loop(); }
  }, { passive: true });
  document.addEventListener("mouseleave", () => document.body.classList.remove("has-cursor"));
}

function chrome() {
  /* scroll progress + back to top */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
      el.scrollBar.style.transform = `scaleX(${p})`;
      el.toTop.classList.toggle("is-shown", scrollY > innerHeight * 0.9);
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  el.toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }));

  /* pointer-following sheen on every button */
  qsa(".btn, .rbtn, .fab, .lb__nav, .lb__close").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
      b.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
    }, { passive: true });
  });

  /* tap the background → bubbles */
  document.addEventListener("pointerdown", (e) => {
    if (Lightbox.isOpen) return;
    const onControl = e.target.closest("a, button, input, .tile, .polaroid, .ccard, .fab, .lb");
    Fx.burst(e.clientX, e.clientY, onControl ? 5 : 16);
  }, { passive: true });

  /* one gentle nudge about the music, once */
  setTimeout(() => {
    if (Music.available === false || Music.playing) return;
    toast("Tap the circle in the corner if you'd like some music.", 5200);
  }, 8000);
}

/* ══════════════════════════════════════════════════════════════════════
   init
   ════════════════════════════════════════════════════════════════════ */
function cacheDom() {
  const ids = {
    ambient: "#ambient", fx: "#fx", loader: "#loader", toast: "#toast", toTop: "#toTop",
    scrollBar: "#scrollBar", cursorGlow: "#cursorGlow", sparkleField: "#sparkleField",
    balloons: "#heroBalloons", heroName: "#heroName", heroNameText: "#heroNameText",
    heroLede: "#heroLede", openGift: "#openGift",
    grid: "#view-grid", carousel: "#carousel", carouselTrack: "#carouselTrack",
    carouselPanel: "#view-carousel", polaroidPanel: "#view-polaroid", scatter: "#scatter",
    pill: "#viewPill", cdots: "#carouselDots", cPrev: "#cPrev", cNext: "#cNext",
    tlList: "#tlList", tlFill: "#tlFill",
    letterBody: "#letterBody", letterSign: ".letter__sign", reasons: "#reasons",
    giftBox: "#giftBox", giftHint: "#giftHint", final: "#finalMessage",
    finalTitle: "#finalTitle", finalText: "#finalText", replayFireworks: "#replayFireworks",
    lb: "#lightbox", lbBackdrop: "#lbBackdrop", lbStage: "#lbStage", lbFrame: "#lbFrame",
    lbImg: "#lbImg", lbCount: "#lbCount",
    lbCap: ".lb__cap", lbClose: "#lbClose", lbPrev: "#lbPrev", lbNext: "#lbNext",
    musicBtn: "#musicBtn", musicLabel: "#musicLabel",
  };
  Object.keys(ids).forEach((k) => { el[k] = qs(ids[k]); });
}

function init() {
  cacheDom();

  document.title = `Happy Birthday, ${CONFIG.name}`;
  qs("#photoCount").textContent = N();
  qs("#heroDate").textContent = CONFIG.birthday.day;
  qs("#footerLine").textContent = phrase(CONFIG.footer);
  qs(".footer__made").textContent = `made with love, for ${CONFIG.name}`;

  Ambient.init();
  Fx.init();

  Grid.build();
  Carousel.init();
  Polaroid.build();
  buildTimeline();
  buildLetter();
  buildReasons();
  buildGift();
  Lightbox.init();
  Music.init();
  Hero.init();
  Views.init();

  sparkles();
  cursor();
  chrome();

  if (ST) {
    addEventListener("load", () => ST.refresh());
    setTimeout(() => ST.refresh(), 1400);
  }

  resize();
  runLoader();
}

function resize() {
  Ambient.resize();
  Fx.resize();
  Polaroid.layout();
  Carousel.layout();
  if (ST) ST.refresh();
}

addEventListener("resize", debounce(resize, 220));
document.addEventListener("visibilitychange", () => {
  if (document.hidden) Ambient.stop();
  else if (!REDUCED) Ambient.start();
});

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
