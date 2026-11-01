---
name: add-blog-post
description: Steps and markup for adding a new blog post to this site (folder, title, media, blog index card, figures, videos, gists).
---

# Adding a blog post

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
6. Keep the author's voice (see "Writing" in AGENTS.md).
