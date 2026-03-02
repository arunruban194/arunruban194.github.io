/**
 * AnimationController – orchestrates the two-phase bicycle animation.
 *
 * Phase 1  ─  plain sketch rides from "HARD WORK" across to "SUCCESS"
 * Phase 2  ─  colourful styled ride ending with a motivational message
 *
 * Uses requestAnimationFrame with a frame-rate cap (~70 ms / frame)
 * to stay battery-friendly while preserving the original timing.
 */
/* ---- tunables ---- */
const SPEED = 5;       // pixels per frame
const FRAME_INTERVAL = 70;      // ms between logical frames
const GROUND_Y = 400;     // y-coordinate of wheel centres

const PHASE1_START_X = 25;
const PHASE1_END_X = 280;

const PHASE2_START_X = 175;
const PHASE2_END_X = 335;

class AnimationController
{

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Function}         onComplete – called when the full animation finishes
     */
    constructor(canvas, onComplete)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.onComplete = onComplete;

        this.scene = new Scene(canvas);
        this.bicycle = null;
        this.rider = new Rider();

        this.phase = 1;
        this.isRunning = false;
        this.animationId = null;
        this.lastFrameTime = 0;
    }

    /* ---------- public API ---------- */

    /** Start (or restart) the animation from the beginning */
    start()
    {
        this.stop();
        this._initPhase1();
        this.isRunning = true;
        this.lastFrameTime = 0;
        this.animationId = requestAnimationFrame(t => this._loop(t));
    }

    /** Immediately stop the animation */
    stop()
    {
        this.isRunning = false;
        if (this.animationId)
        {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /* ---------- internal loop ---------- */

    _loop(timestamp)
    {
        if (!this.isRunning) return;

        // Throttle to FRAME_INTERVAL
        if (timestamp - this.lastFrameTime >= FRAME_INTERVAL)
        {
            this.lastFrameTime = timestamp;
            this._tick();
        }

        if (this.isRunning)
        {
            this.animationId = requestAnimationFrame(t => this._loop(t));
        }
    }

    _tick()
    {
        if (this.phase === 1)
        {
            this._drawPhase1();
            this.bicycle.update(SPEED);
            if (this.bicycle.baseX >= PHASE1_END_X)
            {
                this._transitionToPhase2();
            }
        } else
        {
            this._drawPhase2();
            this.bicycle.update(SPEED);
            if (this.bicycle.baseX >= PHASE2_END_X)
            {
                this._finish();
            }
        }
    }

    /* ---------- phase management ---------- */

    _initPhase1()
    {
        this.phase = 1;
        this.bicycle = new Bicycle(PHASE1_START_X, GROUND_Y);
    }

    _transitionToPhase2()
    {
        this.phase = 2;
        this.bicycle = new Bicycle(PHASE2_START_X, GROUND_Y);
    }

    _finish()
    {
        // Draw the last frame with the motivational message
        this.scene.clear();
        this.scene.drawPhase2Background();
        this.bicycle.draw(this.ctx, true);
        this.rider.draw(this.ctx, this.bicycle, true);
        this.scene.drawFinalMessage();

        this.stop();

        if (this.onComplete)
        {
            this.onComplete();
        }
    }

    /* ---------- frame renderers ---------- */

    _drawPhase1()
    {
        this.scene.clear();
        this.scene.drawPhase1Background();
        this.bicycle.draw(this.ctx, false);
        this.rider.draw(this.ctx, this.bicycle, false);
    }

    _drawPhase2()
    {
        this.scene.clear();
        this.scene.drawPhase2Background();
        this.bicycle.draw(this.ctx, true);
        this.rider.draw(this.ctx, this.bicycle, true);
    }
}
