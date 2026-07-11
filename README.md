# Double Wedding — Static HTML Version

The same luxury Islamic double-wedding invitation, rebuilt as **plain HTML, CSS,
and vanilla JavaScript** — no npm, no build step, no framework. Just open the
file and it works.

## How to view it

**Easiest:** double-click `index.html` to open it in your browser.

**Recommended (avoids occasional local-file quirks with audio/fonts):** serve
it with any simple static server, for example:

```bash
# Python (already installed on most machines)
python3 -m http.server 8000
# then open http://localhost:8000

# or, if you have Node:
npx serve .
```

## Editing content

Everything you'd want to change — both couples' names, the date, venue,
timeline, family details, RSVP labels, footer text — lives in one place:

```
js/content.js
```

Open that file and edit the `CONTENT` object. The page reads from it and
rebuilds itself; you never need to touch the HTML for a text change.

## Structure

```
index.html          Page markup / section skeleton
css/style.css        All styling: colors, fonts, layout, animations
js/content.js         Single source of truth for every piece of text
js/script.js          Populates content, handles nav/drawer, countdown,
                       the Bismillah intro reveal, audio, scroll-reveal
                       animations, and smooth scrolling
audio/wedding-song.mp3      Background music (toggle in the navbar)
```

## Notes

- The site opens with a **Bismillah intro** — the Arabic verse "بِسْمِ اللَّهِ
  الرَّحْمَٰنِ الرَّحِيمِ" fades in with a slow gold shimmer on a plain black
  background (no photo), then automatically fades into the site after a few
  seconds. Visitors can also tap/click anywhere to skip it early.
- Smooth scrolling uses **Lenis** and subtle motion uses **GSAP**, both loaded
  from a CDN — you need an internet connection the first time the page loads
  for those two script tags (everything else is fully local/offline).
- The Google Map embed on the Venue section also needs an internet connection,
  same as it would for any website.
- All motion respects `prefers-reduced-motion`.
- To change the venue map, edit `venue.mapEmbedUrl`, `venue.mapLink`, and
  `venue.directionsLink` inside `js/content.js`.
- To swap the background song, replace `audio/wedding-song.mp3` with your own
  file of the same name (or update the `src` in `index.html`'s `<audio>` tag).
- To change the intro's Arabic verse or its translation, edit
  `invitation.arabicVerse` / `invitation.arabicTranslation` in `js/content.js`
  — the intro reuses the same text as the Invitation section further down the
  page.
