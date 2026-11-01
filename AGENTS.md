# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

Personal website and blog of Ovsep Avakian, served by GitHub Pages from the `master` branch at
https://hovsep.github.io. It is **plain static HTML + CSS**. There is no build step, no bundler,
no templating engine, no package manager, no tests, and no JavaScript of our own except the
one script of the guitar-for-kids deck (`projects/guitar-for-kids/deck.js`).

Every page is a hand-written `index.html`. "Deploying" means committing and pushing to `master`.

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
- **No inline `<style>` blocks, no `style=""` attributes and no JavaScript** (the guitar deck's
  `deck.js` is the single exception; do not add scripts to other pages).
- **External links** get `target="_blank" rel="noopener"`. Internal links do not.

## Writing

Keep the author's voice: first person, casual, short paragraphs, occasional humour. Do not
rewrite prose unless asked; when asked to "polish", fix grammar and clarity, not tone.

## Page-specific notes

- Adding a blog post or a project page: skills `add-blog-post` and `add-project-page`
  (`.claude/skills/`).
- The FMesh product page (`projects/fmesh/`, `css/product.css`) and the guitar-for-kids deck
  (`projects/guitar-for-kids/`, `css/guitar.css`, `assets/guitar_sounds/`) have their own
  rules in `projects/fmesh/CLAUDE.md` and `projects/guitar-for-kids/CLAUDE.md`. Read the
  matching file before touching either page or its CSS.

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
