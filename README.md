# Ananant Systems — corporate site

Static site. No build step, no dependencies, no framework. The five HTML files are
the deployable artefact; everything they need is in `assets/`.

## Structure

```
index.html          Home
products.html       Products      — DSP, architecture, generations, connectivity,
                                    perception, platform, product journey
use-cases.html      Use Cases     — by industry, partner ecosystem
company.html        Company       — vision, history, team, advisors, partners,
                                    offices, careers, contact
careers.html        Careers       — open roles

assets/site.css     Single stylesheet for all pages
assets/site.js      Progressive enhancement only; every panel is readable without it
assets/fonts/       Space Grotesk, Inter, IBM Plex Mono (woff2)
assets/data/        FPGA measurement plots
assets/team/        Founder photographs
assets/partners/    Institution logos
assets/og-card.png  Social share image (1200×630)

vercel.json         Security headers, cache policy and redirects
robots.txt
sitemap.xml
```

## Deploying

1. Vercel → Add New → Project → import this repo
2. Framework preset: **Other**
3. Build command: **leave empty**; Output directory: **leave empty**
4. Deploy

Vercel redeploys on every push to the default branch, and builds a preview
deployment for every pull request.

## URLs

`cleanUrls` is on, so pages are served without the `.html` extension:
`ananantsys.com/products`, not `/products.html`. Internal links, canonical tags and
the sitemap all use the extensionless form, so no navigation costs a redirect hop.
Requests to the `.html` form still resolve — Vercel 308s them to the clean URL.

`vercel.json` also redirects the URLs from the previous site structure
(`/silicon`, `/connect`, `/cognize`, `/proof`, `/partners`, …) plus a few paths
people guess at (`/about`, `/team`, `/jobs`).

**Local preview needs a server**, since extensionless links do not resolve over
`file://`:

```
python3 -m http.server 8000     # then open http://localhost:8000
```

Or `vercel dev`, which additionally applies the headers and redirects.

## Domain

Canonical is `https://ananantsys.com`, set in three places:

- `<link rel="canonical">` and the `og:` tags in each page's `<head>`
- `sitemap.xml`
- `robots.txt`

In Vercel, add both the apex and `www` to the project and set one to redirect to
the other — a site reachable at both without a redirect splits its search ranking.
If the domain changes, update all three places above.

## Editing content

The HTML is generated from Python sources held outside this repo, so edits made
directly to the `.html` files here will be overwritten the next time the site is
regenerated. For anything beyond a typo fix, change the source and rebuild.

The roadmap is the case worth knowing about: every date appears on several pages
but comes from one place in the generator, so the Home ledger, the generation
ladder, the spec tables and the Products timeline cannot drift apart. Editing a
date in the HTML would break that guarantee.

## Cache behaviour

HTML revalidates on every request, so content changes go live immediately.
Images and fonts are cached for a year — they are never edited in place, only
replaced under a new filename.

`site.css` and `site.js` are cached for 24 hours because their filenames carry no
version hash. A CSS fix therefore reaches returning visitors within a day. To make
one land immediately, rename the file (`site.v2.css`) and update the `<link>` tag
in all five pages.

## Content Security Policy

The CSP is strict: no `unsafe-inline`, no external origins. The site carries no
inline `style` attributes and no inline `<script>` — spacing that would otherwise
be inline uses utility classes in `site.css`.

Adding an inline style, an inline script, or any third-party embed (analytics,
hosted fonts, video, chat widget) **will be blocked** until the policy is widened
in `vercel.json`. Prefer a first-party alternative: Vercel Analytics works without
loosening the policy, and is cookieless, so it needs no consent banner.

## Accessibility and browser support

- Every interactive panel renders its content in full with JavaScript disabled
- Interactive elements are real buttons with visible keyboard focus
- Tap targets are at least 44px on touch viewports
- No horizontal overflow from 320px to 1440px
- Safari handling in place for `svh` units, `backdrop-filter` and text size
  adjustment on rotation

Tested in Chromium across desktop and phone viewports, and against a local
emulation of Vercel's routing and headers. **Not yet verified on real iOS Safari
or Android hardware** — worth checking on a device before promoting the site.

## Known gaps

- Contact is `mailto:` only. There is no form and no lead capture.
- No analytics is installed.
- The Bengaluru street address needs confirming against the lease or MCA filing.
- Institution logos are used with permission assumed; confirm before wide promotion.
