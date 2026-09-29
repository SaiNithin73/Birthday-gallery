# Happy Birthday, Safrin

A small blue universe: a hand-built birthday gallery that opens like a box.
Plain HTML, CSS and vanilla JavaScript — no build step, no framework, no
install. Double-click `index.html` and it works, even offline-ish and even
straight from a USB stick.

```
bithday saf/
├── index.html          the whole page
├── css/style.css       the design system + all animation
├── js/main.js          all behaviour (CONFIG lives at the top)
├── images/             13 photos + the sample placeholders they fall back to
├── audio/              put song.mp3 here (optional)
└── README.md           you are here
```

---

## 1. Add the real photos (5 minutes)

1. Rename your photos to `photo1.jpg`, `photo2.jpg`, … and drop them in
   `images/`.
2. That's it. Each slot already points at the right file.

If a file is missing, the site quietly shows its placeholder
(`sample1.svg` … `sample15.svg`) instead of a broken image, so you can
drop the photos in one at a time.

**`.webp` works too** — `images/photo9.webp` is already wired up that way.
If you save a photo in a different format, just change its `src` in
`CONFIG.photos`.

**Portrait photos are what this layout is built for** — 9:16 phone shots
look best. Everything crops with `object-fit: cover`, biased to the top
third, so faces stay in frame. A square or landscape photo still works,
it just gets cropped more.

Your current files are 540×960, which is great for the grid. The
full-screen viewer shows a photo at its real size, never stretched, so
540×960 looks slightly soft on a big monitor — if you ever re-export at
1080×1920, just overwrite the same filenames and nothing else to change.

## 2. Change the words

Everything personal lives in one block at the very top of `js/main.js`:

```js
const CONFIG = {
  name: "Safrin",
  birthday: { day: "29", month: "September" },
  heroLede: "Every photo below is a reason I'm glad you exist.",
  music: { file: "audio/song.mp3", volume: 0.35 },
  colors: { … },
  photos: [ … ],     // src, fallback, span  (no captions — photos stay blank)
  timeline: [ … ],   // date, title, text  (photo: N pulls from photos)
  letter: [ … ],     // one string per paragraph; {name} is replaced
  letterSign: "with everything, always",
  reasons: [ … ],    // the four flip cards: title + body
  final: { … },      // what the gift box reveals
  footer: "…{name}…",
};
```

Edit that block and nowhere else.

| Want to… | Do this |
| --- | --- |
| Rename the birthday person | `name: "…"` — `{name}` everywhere follows |
| Change the date | `birthday: { day: "5", month: "July" }` |
| Rewrite a caption | Photos have no captions any more — see the note below |
| Reorder the story | move entries in `photos: [ … ]` |
| Reshape the bento grid | `span:` on each photo (see below) |
| Rewrite the letter | `letter: [ … ]` — one string per paragraph |
| Change the colours | `colors: { … }` — the whole site follows |

### Bento grid shapes

`span` controls how wide each photo is. Every tile is at least two rows
tall, because your photos are tall — a one-row tile would crop a portrait
into a letterbox sliver.

There are only two layouts: **2 columns on a phone**, and **6 columns from
720px up** (tablet and laptop show the same arrangement, just smaller).

| `span` | 6 cols (tablet + laptop) | 2 cols (phone) | Use for |
| --- | --- | --- | --- |
| `narrow` | 1 col | 1 col | a quiet accent |
| `std` | 2 cols | 1 col | a normal photo |
| `feature` | 3 cols | 2 cols | the big ones |
| `tall` | 2 × 3 rows | 1 × 3 rows | extra-tall portrait |
| `wide` | 4 cols | 2 cols | a group shot |
| `full` | 6 cols | 2 cols | edge to edge |

The order in `CONFIG.photos` matters. The current order —
`feature, std, narrow, feature, feature, std, std, std, feature, feature,
std, std, std` — is deliberate:

- **6 columns:** 5 complete rows, zero empty cells.
- **2 columns:** 9 complete rows, zero empty cells, and it alternates
  big–small–small so a phone shows the same bento rhythm as a laptop
  instead of a stack of full-width photos.
- **The tablet reuses the 6-column layout** rather than a 3-column one,
  because mixing 2-row and 3-row tiles in 3 columns punched holes in the
  middle of the grid.

If you shuffle the list, check it still has no holes. A quick way: count
the `std` tiles. With 13 photos you want 5 `feature`, 7 `std` and 1
`narrow` — 5×3 + 7×2 + 1 = 30, exactly five rows of six.

`full` and `wide` are wide crops — fine for one or two, best saved for
landscape shots.

**Photos are blank — there is no wording anywhere on them.** Not in the
bento grid, not in the carousel, not on the polaroids, not in the
lightbox. The `date` and `caption` fields were removed from
`CONFIG.photos` entirely, so the only text left about a photo is its
position, e.g. the lightbox counter "4 / 13" and the accessible name
"Photo 4 of 13".

If you ever want wording back, add `date:` and `caption:` to a photo in
`CONFIG.photos`, then re-add the markup in the four builders in
`js/main.js`:

| Where | Builder | What was removed |
| --- | --- | --- |
| Bento grid | `Gallery` | `.tile__cap` with `.tile__date` + `.tile__text` |
| Carousel | `Carousel` | `figcaption.ccard__cap` with the same two spans |
| Polaroids | `Polaroid` | `figcaption.polaroid__cap` with the same two spans |
| Lightbox | `Lightbox` / `index.html` | `#lbDate` and `#lbText` inside `.lb__cap` |

The polaroid keeps a blank paper strip under each photo via padding on
`.polaroid` itself, so removing its caption didn't shrink the frame.

## 3. Add a song

Drop any audio file at the path in `CONFIG.music.file` (default
`audio/song.mp3`). `.mp3` is safest, `.m4a` and `.ogg` also work.

The music button is the ♪ in the top-right corner. Browsers won't start
audio until you've interacted with the page, so the first tap on it is
what starts the song — that's normal, not a bug. If the file is missing,
the site says so instead of failing.

## 4. Publish it (free, 2 minutes)

It's a static site, so anywhere that serves files works:

- **Netlify Drop** — go to netlify.com/drop, drag the whole folder in. Done.
- **GitHub Pages** — push the folder to a repo, then Settings → Pages →
  deploy from `main` / root.
- **Google Drive / iCloud** — you can also just share the folder and ask
  people to open `index.html`. It works offline, minus the two CDN scripts.

If you host it anywhere, consider changing nothing else. The only external
requests are GSAP and the Google Fonts; if the person opening it is
offline, the page still renders completely, just without the scroll
choreography.

---

## What's inside

Eight chapters, in order:

1. **Loader** — "a small universe is waking up", with a progress bar. Tap
   to skip it.
2. **Hero** — her name, written in script, one letter at a time. *Try
   clicking the name.*
3. **Gallery, three ways** — a bento grid, a 3D coverflow carousel you can
   drag, and a scattered wall of polaroids. Same 13 photos, three
   personalities. Tabs at the top right of the section.
4. **Timeline** — five memories down a line that fills as you scroll.
5. **The letter** — reveals word by word.
6. **Four flip cards** — tap to turn them over.
7. **The gift box** — click it. Confetti, fireworks, and the last page.
8. **Footer** — and a slow drift back up.

Plus: a full-screen lightbox (click any photo — arrows, swipe, `Esc`),
scroll progress at the top, floating bubbles and sparkles, and a soft glow
that follows the cursor on desktop.

## Details worth knowing

- **Accessibility** — semantic landmarks, real `<button>`s with labels,
  `aria-pressed` / `aria-expanded`, focus visible everywhere, focus
  returned to the right photo when the lightbox closes, and a full
  `prefers-reduced-motion` path (durations collapse to zero, particles
  and parallax switch off, nothing is ever left invisible).
- **Performance** — images lazy-load, the particle canvas pauses when the
  tab is hidden and never runs on reduced motion, and the canvas is capped
  at 2× DPR.
- **Resilience** — if the GSAP CDN is blocked, the site degrades to a
  clean, fully readable, static page instead of a blank screen. Every
  photo still falls back to its placeholder.
- **Browsers** — current Chrome, Edge, Firefox, Safari (desktop and
  mobile). `overflow: clip` needs Safari 16+, with a `hidden` fallback
  below that.

## Small things you may want to tweak

- Hero balloons: the count in `balloons()` in `js/main.js` (7 on phones,
  10 on desktop). They only run when motion is allowed.
- Particle count and speed: search `Ambient` and `Fx` in `js/main.js`.
- Loader duration: the `steps` in `runLoader()`.
- The name easter egg: search `heroName` in `js/main.js`.

Enjoy it. Happy birthday. 🎈
