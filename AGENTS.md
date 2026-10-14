# Max My Literacy

This is a single-page Quarto website for Max My Literacy, deployed through
GitHub Actions to GitHub Pages. Read `README.md` for setup and deployment.
Inspect project-owned `.notes/` and its decision register before consequential work.

## Scope and content

- `index.qmd` owns the supplied homepage copy. Preserve it until the human
  requests a revision. Ask before adding pages, affiliations, claims, or features.
- `_quarto.yml` owns navigation, metadata, and the Pages URL; `theme.scss`
  owns styling. Use Australian English and accessible, responsive layouts.
- The reference site is visual inspiration. Its research data, biographies,
  analytics, and project-specific rules belong to that project.
- Custom-domain setup is pending. Follow the README when the domain is ready.

## Tooling and verification

Use the pinned Quarto version and Node version in the project files.
Run `npm ci`, then `npm test` before reporting changes verified.
Tests exercise the rendered website; avoid prose assertions and snapshot gates.
Inspect the generated desktop and mobile screenshots and obtain human review
for significant presentation changes. `npm run dev` starts the preview.

Use configured package caches; stop if they are unavailable or unwritable.
Keep generated output and reports ignored. Commit or push only when explicitly
requested: a push to `main` runs the deployment workflow.
