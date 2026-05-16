# Alex Barkus — Personal Portfolio

Angular 19 portfolio site for [alexbarkus.dev](https://alexbarkus.dev). Showcases case studies, tools, algorithmic art, and a downloadable resume.

## Tech Stack

- Angular 19, TypeScript, Tailwind CSS
- jsPDF + html2canvas for PDF/image export
- Hosted on GitHub Pages (custom domain via CNAME)

## Project Structure

```
src/
  app/
    features/       # Page-level components (home, resume, approach, my-services)
    layout/         # Header, footer, navigation
    core/services/  # GitHub, resume, skills services
  assets/
    art/            # Standalone HTML pages for algorithmic art pieces
    images/         # Case study screenshots
    tools/          # Standalone HTML pages for browser-based tools
  index.html
  styles.scss

public/             # Static files copied to root of build output
  CNAME             # Custom domain for GitHub Pages
  favicon.ico
  .nojekyll         # Prevents GitHub Pages from running Jekyll

docs/               # Build output — committed to main, deployed to gh-pages
```

## Development

```bash
npm install
npm start           # ng serve → http://localhost:4200
```

## Deployment

The live site is served from the **`gh-pages` branch** (configured in GitHub Pages settings).

### Workflow

1. Make changes in `src/`
2. Build: `npm run build` — outputs to `docs/`
3. Commit `docs/` to `main`: `git add docs/ && git commit -m "build: update production build"`
4. Deploy to gh-pages: `npm run deploy` — pushes `docs/` contents to the `gh-pages` branch
5. Push main: `git push`

> **Note:** Always run `npm run build` before `npm run deploy`. The deploy command re-runs the build internally, but committing `docs/` first keeps `main` in sync with what's live.

### Static Asset Pages (`src/assets/`)

Tools and art pieces are **standalone HTML files** (no Angular routing). They live in `src/assets/` and are copied as-is into `docs/assets/` during build.

- Accessed at: `alexbarkus.dev/assets/tools/prd-generator.html`
- Linked from Angular components via `<a href="/assets/tools/...">` 
- To add a new tool or art piece: drop an HTML file in the appropriate subfolder and link to it.

## Scripts

| Command | Description |
|---|---|
| `npm start` | Dev server at localhost:4200 |
| `npm run build` | Production build → `docs/` |
| `npm run deploy` | Build + push to `gh-pages` branch |
| `npm test` | Unit tests |
