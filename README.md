# Max My Literacy

A single-page Quarto website with GitHub Pages deployment. The homepage copy
is in `index.qmd`; navigation and metadata are in `_quarto.yml`; presentation
is in `theme.scss`.

## Local development

Prerequisites: [Quarto 1.10.19](https://github.com/quarto-dev/quarto-cli/releases/tag/v1.10.19),
Node.js matching `.node-version`, npm, Python 3, and Google Chrome for local browser tests.
The Markdown website needs no R, Jupyter, Ruby, or Python packages.

```sh
npm ci
npm run dev
```

Open the address printed by Quarto. It refreshes when source files change.

```sh
npm run build
npm test
```

The build writes `_site/`. `npm test` builds and checks the rendered homepage
at desktop and mobile widths: content and asset loading, keyboard navigation,
horizontal overflow, and automated WCAG A/AA accessibility checks.
It writes ignored screenshots to `test-results/` and an HTML report to
`playwright-report/`. Run `npm run test:report` to inspect the report.
Screenshots require human review; automated checks do not establish full
accessibility or usability. `npm run check` checks the Quarto installation.

Browser checks serve the built `_site/` with Python's standard-library HTTP
server, so they exercise the files that will be deployed. Local tests use
installed Google Chrome. CI installs Playwright's Chromium.
Keep dependencies locked in `package-lock.json` and use the configured caches.

## GitHub Pages

The `pages.yml` workflow builds and tests pull requests. Pushes to `main` and
manual runs on `main` additionally deploy `_site/` using the official Pages
artifact workflow. Deployment permissions belong only to the deployment job.

After the first commit is pushed, select **Settings → Pages → Build and
deployment → Source → GitHub Actions** in
[the repository](https://github.com/Denubis/maxmyliteracy.com/settings/pages).
The initial Pages URL is `https://denubis.github.io/maxmyliteracy.com/`.
The workflow requires no personal access token.

Quarto is pinned in the workflow and required by `_quarto.yml`. Node is
pinned in `.node-version`. Dependabot checks GitHub Actions weekly.

Workflow references:
[GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
and [Quarto on GitHub Pages](https://quarto.org/docs/publishing/github-pages.html).

## Custom domain, when ready

1. Configure the DNS records and the custom domain in the repository's Pages
   settings, following [GitHub's domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
2. Add a root `CNAME` containing the chosen hostname. Quarto copies this to
   `_site/` automatically.
3. Change `website.site-url` to the domain's HTTPS URL and `website.site-path`
   to `/` in `_quarto.yml`.
4. Run `npm test`, push the approved changes, and enable HTTPS in Pages settings
   when the certificate is available.
