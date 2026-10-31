# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

Personal website and blog of Ovsep Avakian, served by GitHub Pages from the `master` branch at
https://hovsep.github.io. It is **plain static HTML + CSS**. There is no build step, no bundler,
no templating engine, no JavaScript of our own, no package manager, no tests.

Every page is a hand-written `index.html`. "Deploying" means committing and pushing to `master`.

## Layout

```
index.html                 Home page (social icon row, Projects list)
about/index.html           About page (bio, Talks list)
blog/index.html            Blog index (list of posts, newest first)
blog/<slug>/index.html     One blog post
blog/<slug>/image/         Images for that post
blog/<slug>/video/         Videos for that post (.mp4 / .mov)
projects/<slug>/index.html One project page
projects/<slug>/image/     Images for that project
assets/talks/              Slide PDFs linked from the About page (kebab-case file names)
css/base.css               CSS variables (colours, fonts), reset, body, main/footer, section titles
css/components.css         Shared: site-header + nav, breadcrumb, page-header, link-card, btn, badge, feature, project-card
css/home.css               Home page only (social icon row)
css/blog.css               Blog index + single post (.content typography, figures, gists, post-nav)
css/project.css            Project pages only (.content, video embeds, use-cases, gallery, members)
css/about.css              About page only (bio, talks list)
css/product.css            FMesh product page only (body.product, p-* components, own tokens)
```

`.idea/` is IDE noise and is gitignored. Do not add it to commits.

## Conventions that are easy to get wrong

- **All paths are relative.** From `blog/<slug>/` and `projects/<slug>/` CSS is `../../css/...`,
  home is `../../`, blog index is `../`. From `blog/index.html` CSS is `../css/...`. Never use
  absolute `/css/...` paths; the site must also work when opened from the filesystem.
- **Two fonts, one `<link>`.** Every page loads the same Google Fonts link (JetBrains Mono +
  Inter); copy it from any page. Inter (`--font-sans`) is the body font everywhere: prose,
  headings, titles. JetBrains Mono (`--font-mono`) is for site chrome and metadata: the site
  name, nav, breadcrumb, section titles, dates, labels, project names, inline code.
- **Body classes drive styling.** Blog index uses `<body class="blog">`, a post uses
  `<body class="blog blog-post">`, home, about and project pages use a bare `<body>`.
- **Dates are written as `Month D, YYYY`** (e.g. `January 30, 2026`) inside `<p class="post-date">`.
  The same string appears in both the post page and the blog index; keep them identical.
- **Blog index is newest first.** When adding a post, insert its card at the top of `.posts`.
- **Every page shares the same chrome:** a `<header class="site-header">` (name linking home
  and a `.site-nav` with about / blog / projects) and a
  footer with `© 2026 Ovsep Avakian`. Copy them from a sibling page of the same depth. The nav
  link for the section the page belongs to gets `class="active"` (none on the home page).
- **Breadcrumbs only on posts and project pages**, without a Home link:
  `blog / <slug>` or `projects / <slug>`. The blog index and about page have none.
- **Light theme only.** Colours come from CSS variables in `css/base.css` (`--bg`,
  `--bg-secondary`, `--text`, `--text-muted`, `--accent`, `--accent-soft`, `--border`,
  `--code-bg`, `--dot`) plus `--radius`, `--shadow`, `--shadow-hover`. Use variables, never
  hard-coded hex or rgba. `--accent` (violet) is a **fill** behind black text (labels, active
  nav, hover states), never a text colour; `--accent-soft` is the highlighter under text links.
- **Clickable vs static surfaces.** Anything clickable (cards, icon buttons, talk links,
  gallery images) has a 2px `--text` border and the hard `--shadow`, and turns `--accent` on
  hover; the shared rule lives in `components.css`. Static boxes (features, use-cases, lists,
  figures, code) get a soft 1.5px `--border` and no shadow. Keep that split.
- **No inline `<style>` blocks, no `style=""` attributes and no JavaScript.**
- **External links** get `target="_blank" rel="noopener"`. Internal links do not.

## Adding a blog post

1. Pick a kebab-case slug. Create `blog/<slug>/index.html` by copying the most recent post
   (check `git log` or the top of `blog/index.html`) and replacing title, date, breadcrumb
   `.current` text, and content.
2. `<title>` is `Post Title | Ovsep Avakian`.
3. Put media in `blog/<slug>/image/` and `blog/<slug>/video/`. Reference them as `image/foo.png`.
4. Add a card at the **top** of `.posts` in `blog/index.html` with date, title, and a 1–2
   sentence excerpt.
5. Content markup available inside `<div class="content">` (styled in `css/blog.css`):
   - `<p>`, `<h2>` (section headings; `h1` is reserved for the post title), `<ul>`, `<ol>`,
     `<blockquote>`, `<strong>`, `<em>`, inline `<code>`.
   - Image with caption:
     ```html
     <figure>
         <a href="image/x.png" target="_blank" rel="noopener"><img src="image/x.png" alt="..."></a>
         <figcaption>Caption</figcaption>
     </figure>
     ```
   - Diagram on a padded white card (for SVGs / transparent PNGs): `<figure class="diagram">...</figure>`.
   - Video: `<video width="100%" muted autoplay loop src="video/x.mp4"></video>` (add `controls`
     for longer clips).
   - Code samples are **GitHub Gists**, not `<pre>` blocks:
     ```html
     <div class="gist-wrapper">
         <script src="https://gist.github.com/hovsep/<id>.js"></script>
     </div>
     ```
6. Keep the author's voice: first person, casual, short paragraphs, occasional humour. Do not
   rewrite prose unless asked; when asked to "polish", fix grammar and clarity, not tone.

## Adding a project page

1. Create `projects/<slug>/index.html` by copying `projects/php-elephant/index.html` (photo
   gallery) or `projects/the-horrvas/index.html` (people grid). `projects/fmesh/` is a product
   landing page, not a template for ordinary projects (see below).
2. Breadcrumb is `<a href="../../#projects">projects</a> / <span class="current"><slug></span>`;
   the nav's `projects` link gets `class="active"`.
3. Add a `.project-card` to the Projects section of the root `index.html`.
4. Sections use `<h2 class="section-title">` and the components in `css/components.css`
   (`.links-grid` + `.link-card`, `.features` + `.feature`, `.badges`, `.btn`) and
   `css/project.css` (`.use-cases`, `.gallery`, `.members`, `.tracks` for SoundCloud players). YouTube `<iframe>`s inside
   `.content` scale to the column width automatically.

## The FMesh product page

`projects/fmesh/index.html` is deliberately **not** in the personal-site style. It is a landing
page that sends visitors to the FMesh repo, so it looks like a tech product site: white
background, teal-to-blue brand gradient, soft shadows, dark code window.

- `<body class="product">`, styles in `css/product.css`. All its classes start with `p-`
  (`.p-hero`, `.p-section`, `.p-btn`, ...). Its colours are `--p-*` tokens defined on
  `body.product` in that file; do not use them elsewhere, and do not use the personal-site
  hard-shadow components on this page.
- The site header and footer stay as on every other page. There is no breadcrumb.
- Facts on the page (features, limits, ecosystem, examples count) come from the FMesh README
  and repos. Re-check them against `github.com/hovsep/fmesh` before changing copy; do not add
  claims the README does not make. Avoid hard-coding version numbers.
- The code sample is hand-highlighted with spans: `.c` comment, `.s` string, `.k` keyword,
  `.f` function, `.t` type. Keep lines under ~90 characters so they fit the desktop window.

## Editing CSS

- Put a rule in the most specific file that needs it: shared components in `components.css`,
  page-type rules in `blog.css` / `project.css` / `home.css` / `about.css`, tokens and layout
  in `base.css`.
- Every file ends with `@media (max-width: 768px)` and `@media (max-width: 480px)` blocks.
  Add responsive overrides there rather than scattering media queries.
- The site must stay readable on a phone: `main` has a `max-width` and `html, body` hide
  horizontal overflow. Do not introduce fixed-width elements.

## Verifying changes

There is nothing to build or test. To preview, serve the repo root and open it in a browser:

```
python3 -m http.server 8000
```

Then check the page you changed plus the index that links to it (`blog/index.html` or the root
`index.html`). Confirm relative links, images and videos resolve, and look at a narrow viewport.

## Git

- Work directly on `master`; that is what GitHub Pages serves. Commit only when asked.
- Commit messages are short and lowercase in the existing history (`add post`, `polishing the
  post`, `reorder links`). Match that style.
- Never commit `.idea/` or other IDE files.
