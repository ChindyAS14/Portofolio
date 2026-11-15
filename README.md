# Portfolio — Chindy Aulia Sari

A plain HTML/CSS/JS portfolio site, no build step, built to host on GitHub Pages.

## Pages

- `index.html` — landing page: summary, experience highlights, a preview of the
  case log and project highlights, skills, contact
- `cases.html` — the full Risk mitigation case log
- `highlights.html` — the full Project highlights list

Each entry on `cases.html` / `highlights.html` opens its own detail view in place,
with a shareable link (e.g. `cases.html#case-003`).

## Files

- `cases.js` — **content file.** Risk mitigation case log entries
  (Context → Risk → Mitigation → Outcome).
- `highlights.js` — **content file.** Project highlights: memorable projects and
  moments, just a story plus a few bullet points.
- `style.css` — all styling, including the colour palette (edit the variables at
  the top of the file to change colours site-wide).
- `script.js` — renders both data files into whichever page is open. No need to
  touch this for content updates.

## Adding a new case study

1. Open `cases.js`.
2. Copy the last object in the `caseStudies` array.
3. Give it the next `id` (e.g. `"008"`), fill in the fields, keep client/colleague
   names generalised if they're under NDA.
4. Add a comma after the previous entry's closing `}` and paste your new object
   before the closing `];`.
5. Commit and push — no other file changes needed.

## Adding a new project highlight

Same idea, in `highlights.js` and its `projectHighlights` array — see the comment
block at the top of that file for the field list. Use this file instead of
`cases.js` when the story isn't really a risk-mitigation decision, just a
memorable project or moment.

## Publishing on GitHub Pages

1. Push this folder's contents to a repo (e.g. `chindyaulia/portfolio`).
2. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)`.
3. Your site will be live at `https://<username>.github.io/<repo-name>/` within a
   few minutes.

## Previewing locally

Keep all the files in one folder and open `index.html` in a browser — no server or
build step required.
