# The guitar-for-kids deck

`projects/guitar-for-kids/` is a small slide deck in Bulgarian for a kindergarten lesson. On the
home page its card is `.project-card.special` (wood colours, sound hole and strings, a
"special edition" badge; styles in `home.css`).

- `<body class="kids">`, styles in `css/guitar.css` with `--g-*` tokens for the drawings. The
  site header, breadcrumb and footer are as on any project page.
- Slides are `<article class="slide">` inside `.deck .slides`. `deck.js` adds `.is-ready` to the
  deck and shows one slide at a time (arrows, dots, ← → / PageUp / PageDown, swipe, `#2` in the
  URL, full screen). Without JS every slide is shown in a column.
- Slide sizes use container units (`cqi`) of `.deck-stage`, so the deck scales up in full
  screen. A slide must fit the 4:3 stage at desktop width or the full-screen view gets cut.
- Guitars are inline SVG drawn with classes (`.g-*` acoustic, `.e-*` electric/bass). The
  acoustic guitar is defined once as `#acoustic` on the parts slide and reused with `<use>`.
- `.play-btn[data-sound="x"]` plays `assets/guitar_sounds/x.m4a` (`acoustic`, `bass`,
  `electric`). The m4a files are the audio of the `.mp4` videos there, levelled with
  `ffmpeg -i x.mp4 -vn -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:a aac -b:a 160k x.m4a`.
