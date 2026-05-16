# Rohal_portfolio

A modern, responsive personal portfolio for **Rohal Jamal** built with **HTML5**, **CSS3**, **Vanilla JavaScript**, **Three.js**, and **GSAP**.

## Features

- Minimal dark-first design with optional light mode
- Responsive hero, about, projects, skills, GitHub insights, and contact sections
- Interactive 3D background using Three.js
- Smooth entrance and scroll animations with GSAP
- GitHub-powered profile and repository data loaded from the public API with local fallbacks
- Accessible navigation, focus states, semantic structure, and reduced-motion support
- Lazy-loaded GitHub stat cards for better performance
- GitHub Pages deployment workflow included

## Project structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── package-lock.json
├── script.js
├── styles.css
├── vendor/
│   ├── ScrollTrigger.min.js
│   ├── gsap.min.js
│   └── three.min.js
└── README.md
```

## Local development

Because this is a static GitHub Pages site, no build step is required.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Dependency notes

The project vendors local copies of `three` and `gsap` inside `vendor/` so the deployed site does not rely on third-party CDN script execution.

If you ever want to refresh those files locally:

```bash
npm install
cp node_modules/three/build/three.min.js vendor/three.min.js
cp node_modules/gsap/dist/gsap.min.js vendor/gsap.min.js
cp node_modules/gsap/dist/ScrollTrigger.min.js vendor/ScrollTrigger.min.js
```

## GitHub Pages deployment

1. Push changes to the `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. The included workflow at `.github/workflows/deploy.yml` will publish the site automatically.

## Notes

- All local asset references use relative paths so the site works on GitHub Pages.
- Live GitHub data is fetched from `https://api.github.com/users/Rohal004` and the repositories endpoint.
- If the GitHub API rate limit is hit, the site falls back to embedded profile and project data.
