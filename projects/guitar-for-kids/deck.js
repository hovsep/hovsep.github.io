// Guitar for kids: slide deck + guitar sounds.
// The only JavaScript on the site; it is used by this page alone.

(() => {
    const deck = document.querySelector('.deck');
    if (!deck) return;

    const stage = deck.querySelector('.deck-stage');
    const slides = [...deck.querySelectorAll('.slide')];
    const dots = [...deck.querySelectorAll('.deck-dot')];
    const prev = deck.querySelector('.deck-prev');
    const next = deck.querySelector('.deck-next');
    const full = deck.querySelector('.deck-full');
    let current = 0;

    // ---- Slides ----

    function show(i) {
        current = Math.max(0, Math.min(slides.length - 1, i));
        slides.forEach((s, n) => {
            s.classList.toggle('is-active', n === current);
            s.setAttribute('aria-hidden', String(n !== current));
        });
        dots.forEach((d, n) => d.setAttribute('aria-current', n === current ? 'step' : 'false'));
        prev.disabled = current === 0;
        next.disabled = current === slides.length - 1;
        history.replaceState(null, '', '#' + (current + 1));
        stopSound();
    }

    prev.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    dots.forEach((d, n) => d.addEventListener('click', () => show(n)));

    document.addEventListener('keydown', (e) => {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown') show(current + 1);
        else if (e.key === 'ArrowLeft' || e.key === 'PageUp') show(current - 1);
        else if (e.key === 'Home') show(0);
        else if (e.key === 'End') show(slides.length - 1);
        else if (e.key === 'f' && full && !full.hidden) toggleFullscreen();
        else return;
        e.preventDefault();
    });

    // Swipe left / right on touch screens
    let startX = null, startY = null;
    stage.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse') return;
        startX = e.clientX;
        startY = e.clientY;
    });
    stage.addEventListener('pointerup', (e) => {
        if (startX === null) return;
        const dx = e.clientX - startX, dy = e.clientY - startY;
        startX = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
    });

    // Full screen (not available on iPhone; the button stays hidden there)
    function toggleFullscreen() {
        if (document.fullscreenElement) document.exitFullscreen();
        else {
            const r = deck.requestFullscreen();
            if (r && r.catch) r.catch(() => {});
        }
    }
    if (full && deck.requestFullscreen) {
        full.hidden = false;
        full.addEventListener('click', toggleFullscreen);
        document.addEventListener('fullscreenchange', () => {
            full.setAttribute('aria-label', document.fullscreenElement ? 'Изход от цял екран' : 'На цял екран');
        });
    }

    // ---- Sounds ----
    // Real recordings in assets/guitar_sounds/<name>.m4a (audio taken from the
    // videos next to them, levelled to the same loudness). Loaded with the page
    // so the buttons play at once, even if the network drops later.

    const SOUND_DIR = '../../assets/guitar_sounds/';
    const tracks = {};
    let playing = null; // { audio, button }

    deck.querySelectorAll('.play-btn').forEach((button) => {
        const name = button.dataset.sound;
        const a = new Audio(SOUND_DIR + name + '.m4a');
        a.preload = 'auto';
        a.addEventListener('ended', () => {
            if (playing && playing.audio === a) {
                playing = null;
                setPlaying(button, false);
            }
        });
        tracks[name] = a;
        button.addEventListener('click', () => play(button));
    });

    function setPlaying(button, on) {
        button.setAttribute('aria-pressed', String(on));
        button.querySelector('.play-icon').textContent = on ? '■' : '▶';
        button.querySelector('.play-label').textContent = on ? 'Спри' : 'Чуй';
        button.closest('.guitar-card').classList.toggle('is-playing', on);
    }

    function stopSound() {
        if (!playing) return;
        const { audio, button } = playing;
        playing = null;
        audio.pause();
        audio.currentTime = 0;
        setPlaying(button, false);
    }

    function play(button) {
        const wasThis = playing && playing.button === button;
        stopSound();
        if (wasThis) return;

        const audio = tracks[button.dataset.sound];
        audio.currentTime = 0;
        playing = { audio, button };
        setPlaying(button, true);
        audio.play().catch(() => {
            if (playing && playing.audio === audio) stopSound();
        });
    }

    document.addEventListener('visibilitychange', () => { if (document.hidden) stopSound(); });

    // ---- Start ----

    deck.classList.add('is-ready');
    const fromHash = parseInt(location.hash.slice(1), 10);
    show(Number.isFinite(fromHash) ? fromHash - 1 : 0);
})();
