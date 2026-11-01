---
name: add-project-page
description: Steps for adding a new project page to this site (which page to copy, breadcrumb, home page card, available section components).
---

# Adding a project page

1. Create `projects/<slug>/index.html` by copying `projects/php-elephant/index.html` (photo
   gallery) or `projects/the-horrvas/index.html` (people grid). `projects/fmesh/` is a product
   landing page, not a template for ordinary projects (see `projects/fmesh/CLAUDE.md`).
2. Breadcrumb is `<a href="../../#projects">projects</a> / <span class="current"><slug></span>`;
   the nav's `projects` link gets `class="active"`.
3. Add a `.project-card` to the Projects section of the root `index.html`.
4. Sections use `<h2 class="section-title">` and the components in `css/components.css`
   (`.links-grid` + `.link-card`, `.features` + `.feature`, `.badges`, `.btn`) and
   `css/project.css` (`.use-cases`, `.gallery`, `.members`, `.tracks` for SoundCloud players). YouTube `<iframe>`s inside
   `.content` scale to the column width automatically.
