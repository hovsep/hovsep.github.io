# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

Personal website and blog of Ovsep Avakian, served by GitHub Pages from the `master` branch at
https://hovsep.github.io. It is **plain static HTML + CSS**. There is no build step, no bundler,
no templating engine, no JavaScript of our own, no package manager, no tests.

Every page is a hand-written `index.html`. "Deploying" means committing and pushing to `master`.

## Layout

```
index.html                 Home page (bio, Connect links, Projects list)
blog/index.html            Blog index (list of posts, newest first)
blog/<slug>/index.html     One blog post
blog/<slug>/image/         Images for that post
blog/<slug>/video/         Videos for that post (.mp4 / .mov)
projects/<slug>/index.html One project page
projects/<slug>/image/     Images for that project
css/base.css               CSS variables, reset, body, main/footer, section titles
css/components.css         Shared components: breadcrumb, link-item, link-card, btn, badge, feature, project-card
css/home.css               Home page only
css/blog.css               Blog index + single post (loads Inter font, .content typography, figures, gists, post-nav)
css/project.css            Project pages only (page-header, use-cases, gallery, members)
```

`.idea/` is IDE noise and is gitignored. Do not add it to commits.

## Conventions that are easy to get wrong

- **All paths are relative.** From `blog/<slug>/` and `projects/<slug>/` CSS is `../../css/...`,
  home is `../../`, blog index is `../`. From `blog/index.html` CSS is `../css/...`. Never use
  absolute `/css/...` paths; the site must also work when opened from the filesystem.
- **Fonts differ per page type.** Home and project pages load only JetBrains Mono. Blog pages
  load JetBrains Mono **and** Inter (Inter is the body font on `body.blog`). Copy the exact
  `<link>` from an existing page of the same type.
- **Body classes drive styling.** Blog index uses `<body class="blog">`, a post uses
  `<body class="blog blog-post">`, home and project pages use a bare `<body>`.
- **Dates are written as `Month D, YYYY`** (e.g. `January 30, 2026`) inside `<p class="post-date">`.
  The same string appears in both the post page and the blog index; keep them identical.
- **Blog index is newest first.** When adding a post, insert its card at the top of `.posts`.
- **Every page shares the same chrome:** `<div class="noise">`, the compact `.intro` header
  (name linking home + "Software Engineer at Sumup" tagline), a `.breadcrumb` nav, and a
  footer with `© 2026 Ovsep Avakian`. Copy these verbatim from a sibling page.
- **Dark theme only.** Colours come from CSS variables in `css/base.css` (`--bg`, `--text`,
  `--text-muted`, `--accent`, `--border`, `--code-bg`, ...). Use variables, never hard-coded hex,
  except the deliberate white background on `figure.diagram`.
- **No inline `<style>` blocks and no JavaScript.** The only `style=""` attribute in use is the
  one on the intro `<h1><a>` link; reuse it as-is rather than adding more.
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
   - Diagram on white background (for SVGs / transparent PNGs): `<figure class="diagram">...</figure>`.
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

1. Create `projects/<slug>/index.html` by copying `projects/fmesh/index.html` (software project)
   or `projects/php-elephant/index.html` (photo gallery) or `projects/the-horrvas/index.html`
   (people grid).
2. Breadcrumb middle link points to `../../#projects`.
3. Add a `.project-card` to the Projects section of the root `index.html`.
4. Sections use `<h2 class="section-title">` and the components in `css/components.css`
   (`.links-grid` + `.link-card`, `.features` + `.feature`, `.badges`, `.btn`) and
   `css/project.css` (`.use-cases`, `.gallery`, `.members`).

## Editing CSS

- Put a rule in the most specific file that needs it: shared components in `components.css`,
  page-type rules in `blog.css` / `project.css` / `home.css`, tokens and layout in `base.css`.
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
