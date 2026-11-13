# GYM — Exercise Encyclopedia
Pure HTML + CSS + JavaScript. No build step, no server, no installs.

## Run
Double-click `index.html`.

## Host free on GitHub Pages
Push the folder to a repo → Settings → Pages → Deploy from branch → `main` / root.

## Files
`*.html` pages · `css/style.css` · `js/app.js` (all page logic) · `js/data.js` (ALL data: categories, 103 exercises, muscles, plans, media credits) · `assets/` (logo, your own GIFs/videos)

## Add an exercise
Open `js/data.js`, copy one line inside `exercises:[ ... ]`, change `id` (unique), `slug`, `name`, `cat` (warmup/cardio/chest/back/legs/biceps/triceps/shoulder/abs), `sub`, `mode` (G/H/B), `diff` (B/I/A), muscles (names must match the `muscles` list) and text. Keep the comma between lines.

## Demo media
Demos load from the free open dataset free-exercise-db (public domain) via the jsDelivr CDN (falls back to raw.githubusercontent), matched by name (needs internet). Unmatched exercises show "Demo media pending". Matches are automatic, so spot-check them. To use your own licensed file, put it in `assets/gifs/<category>/` and add to `attr.overrides` in `js/data.js`: `"your-slug":{"src":"assets/gifs/chest/x.gif","source":"...","license":"..."}`. Force a match with `"fedb":"Exact dataset name"` on the exercise.

## Not done
Drawn anatomy SVG, workout builder (reorder/notes), custom dragon logo art (placeholder), contact backend (uses mailto; set your email in `js/app.js`), human review of exercise text (marked draft), browser testing.
