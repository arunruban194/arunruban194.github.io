/**
 * App entry-point – hash-based routing between the front page and the animations.
 *
 * Routes:
 *   #/            → Front page (one number box per entry in ANIMATIONS)
 *   #/<number>    → That animation (canvas + Rerun button on finish)
 *   #/animation   → Old link, opens animation 1
 *   anything else → Front page
 */
class App
{

    constructor()
    {
        // DOM refs
        this.homeScreen = document.getElementById('home-screen');
        this.animationScreen = document.getElementById('animation-screen');
        this.animationGrid = document.getElementById('animation-grid');
        this.canvas = document.getElementById('canvas');
        this.rerunBtn = document.getElementById('rerun-btn');

        this.controller = null;
        this.current = null;          // ANIMATIONS entry being shown

        this._renderBoxes();
        this._bindEvents();
        this._handleRoute();           // honour URL on first load
    }

    /* ---------- front page ---------- */

    _renderBoxes()
    {
        for (const anim of ANIMATIONS)
        {
            const link = document.createElement('a');
            link.className = 'animation-box';
            link.href = `#/${anim.number}`;
            link.setAttribute('aria-label', `Animation ${anim.number}: ${anim.title}`);

            const number = document.createElement('span');
            number.className = 'animation-box__number';
            number.textContent = anim.number;

            const title = document.createElement('span');
            title.className = 'animation-box__title';
            title.textContent = anim.title;

            link.append(number, title);
            this.animationGrid.append(link);
        }
    }

    /* ---------- events ---------- */

    _bindEvents()
    {
        this.rerunBtn.addEventListener('click', () => this._rerun());
        window.addEventListener('hashchange', () => this._handleRoute());
    }

    /* ---------- routing ---------- */

    _handleRoute()
    {
        const hash = window.location.hash || '#/';

        // Old single-animation link
        if (hash === '#/animation')
        {
            window.location.replace('#/1');
            return;
        }

        const match = hash.match(/^#\/(\d+)$/);
        const anim = match && ANIMATIONS.find(a => a.number === Number(match[1]));

        if (anim)
        {
            this._showAnimation(anim);
        } else
        {
            if (hash !== '#/') window.location.replace('#/');
            this._showHome();
        }
    }

    /* ---------- screens ---------- */

    _showHome()
    {
        this._stopController();
        this.current = null;
        document.title = 'Bicycle Animations';

        this.homeScreen.classList.remove('hidden');
        this.animationScreen.classList.add('hidden');
        this.rerunBtn.classList.add('hidden');

        // Reset canvas background
        this.canvas.style.backgroundColor = '#fff';
    }

    _showAnimation(anim)
    {
        this.current = anim;
        document.title = `${anim.number}. ${anim.title} – Bicycle Animations`;

        this.homeScreen.classList.add('hidden');
        this.animationScreen.classList.remove('hidden');
        this.rerunBtn.classList.add('hidden');
        this._startAnimation();
    }

    /* ---------- animation lifecycle ---------- */

    _stopController()
    {
        if (this.controller)
        {
            this.controller.stop();
            this.controller = null;
        }
    }

    _startAnimation()
    {
        this._stopController();

        // Clear what the previous animation left on the canvas
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.style.backgroundColor = '#fff';

        this.controller = this.current.create(this.canvas, () =>
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
