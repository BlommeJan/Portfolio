# Jan Blomme — Portfolio

Static portfolio site: **index.html**, **styles.css**, **app.js**. No build step, no framework.

**Version:** 1.1.0

## Run locally

```bash
npx serve .
# or
python -m http.server 8080
```

Open `http://localhost:8080` (or the port shown).

## Deploy

### GitHub Pages

1. Push this folder to a repo.
2. **Settings → Pages → Build and deployment → Source:** Deploy from a branch.
3. Branch: `main`, folder: `/` (root).
4. Site URL: `https://<user>.github.io/<repo>/`

### Netlify

Drag-and-drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop), or connect the repo. `netlify.toml` is included.

### Vercel

```bash
npx vercel
```

No build command — deploy the project root as static files.

## Structure

| Path | Role |
|------|------|
| `index.html` | Markup, meta, font links |
| `styles.css` | Layout and theme |
| `app.js` | i18n, scroll hero, canvas animation |
| `assets/fonts/` | Local IBM Plex font files (optional backup) |
| `assets/images/` | Optimized JPGs used by the live site (avatar, project thumbnails, og-image) |
| `assets/images/originals/` | Full-res source images, git-ignored — not deployed |
| `assets/papers/` | Thesis PDF and other documents linked from the site |
| `CONTENT.md` | Fill-in sheet for links, copy, images — sync to site when ready |

**Live fonts:** loaded from [Google Fonts](https://fonts.google.com/) in `index.html`. The files in `assets/fonts/` are not used by the site right now — safe to keep as a self-hosted backup, or delete if you prefer a smaller repo.

**Images:** drop full-res files anywhere, track them in `CONTENT.md`, then ask to sync — new images get resized/compressed with `ffmpeg` into `assets/images/` before being wired into `index.html`.

## Changelog

### 1.1.0
- Synced `CONTENT.md` into the live site: press links, thesis PDF, video links, org links (itsBryce, Granstudio, JB-Signs, De Treffer Bar, Howest, Portsmouth) now point to real URLs
- Optimized and wired in all 9 project/profile images (avatar, Starkpad photo, 5 card thumbnails, Granstudio figure, og-image) — originals were ~24MB total, optimized JPGs are ~650KB combined
- Added Open Graph / Twitter card meta tags using the new `og-image.jpg`
- Fixed NMBS PowerApp year (2024 → 2022)
- Added honest "coming soon" / "being published" notes for OrbitalPlay repo, Cocktail Shaker repo, and OrderPoint live site instead of dead links

### 1.0.2
- Added `CONTENT.md` — master fill-in sheet for all portfolio links, copy, and media

### 1.0.1
- Removed build artifacts (original bundle, unpack/split scripts)
- Organized `assets/fonts/` and added `assets/images/` for media

### 1.0.0
- Split single-file bundle into `index.html`, `styles.css`, and `app.js`
- Added Netlify deployment config
- Replaced embedded font binaries with Google Fonts CDN
