/**
 * App entry-point – handles hash-based routing and button interactions.
 *
 * Routes:
 *   #/            → Home screen  (Start button)
 *   #/animation   → Animation    (canvas + Rerun button on finish)
 */
class App
{

    constructor()
    {
        // DOM refs
        this.homeScreen = document.getElementById('home-screen');
        this.animationScreen = document.getElementById('animation-screen');
        this.canvas = document.getElementById('canvas');
        this.startBtn = document.getElementById('start-btn');
        this.rerunBtn = document.getElementById('rerun-btn');

        this.controller = null;

        this._bindEvents();
        this._handleRoute();           // honour URL on first load
    }

    /* ---------- events ---------- */

    _bindEvents()
    {
        this.startBtn.addEventListener('click', () => this._navigate('animation'));
        this.rerunBtn.addEventListener('click', () => this._rerun());
        window.addEventListener('hashchange', () => this._handleRoute());
    }

    /* ---------- routing ---------- */

    _navigate(route)
    {
        window.location.hash = `#/${route}`;
    }

    _handleRoute()
    {
        const hash = window.location.hash || '#/';

        if (hash === '#/animation')
        {
            this._showAnimation();
        } else
        {
            this._showHome();
        }
    }

    /* ---------- screens ---------- */

    _showHome()
    {
        this.homeScreen.classList.remove('hidden');
        this.animationScreen.classList.add('hidden');
        this.rerunBtn.classList.add('hidden');

        // Tear down any running animation
        if (this.controller)
        {
            this.controller.stop();
            this.controller = null;
        }

        // Reset canvas background
        this.canvas.style.backgroundColor = '#fff';
    }

    _showAnimation()
    {
        this.homeScreen.classList.add('hidden');
        this.animationScreen.classList.remove('hidden');
        this.rerunBtn.classList.add('hidden');
        this._startAnimation();
    }

    /* ---------- animation lifecycle ---------- */

    _startAnimation()
    {
        if (this.controller)
        {
            this.controller.stop();
        }

        this.controller = new AnimationController(this.canvas, () =>
        {
            // Animation finished → show Rerun button
            this.rerunBtn.classList.remove('hidden');
        });

        this.controller.start();
    }

    _rerun()
    {
        this.rerunBtn.classList.add('hidden');
        this._startAnimation();
    }
}

/* ---------- bootstrap ---------- */
document.addEventListener('DOMContentLoaded', () => new App());
