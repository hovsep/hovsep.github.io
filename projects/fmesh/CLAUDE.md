# The FMesh product page

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
