/**
 * Scene – draws backgrounds, text labels, and the final motivational message.
 *
 * Edit the constants below to change the displayed messages without
 * touching any drawing logic.
 */

/* ===== Customisable messages ===== */
const PHASE1_LEFT_TEXT = 'HARD WORK';
const PHASE1_RIGHT_TEXT = 'SUCCESS';
const PHASE2_HEADING = 'SUCCESS';
const FINAL_MESSAGE = "Hard work beats talent when talent doesn't work hard!";
/* ================================= */

class Scene
{

    constructor(canvas)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Reusable gradient for accent text
        this.gradient = this._createGradient();
    }

    /** Wipe the entire canvas */
    clear()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /* ---------- Phase 1 ---------- */

    drawPhase1Background()
    {
        this.canvas.style.backgroundColor = '#fff';
        const ctx = this.ctx;

        ctx.save();
        ctx.font = '42px Arial';
        ctx.fillStyle = '#222';

        // Left label
        ctx.fillText(PHASE1_LEFT_TEXT, 100, 200);
        // Right label
        ctx.fillText(PHASE1_RIGHT_TEXT, 500, 200);

        // Dividing line
        ctx.beginPath();
        ctx.moveTo(400, 200);
        ctx.lineTo(400, 500);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#222';
        ctx.stroke();
        ctx.restore();
    }

    /* ---------- Phase 2 ---------- */

    drawPhase2Background()
    {
        this.canvas.style.backgroundColor = 'lavender';
        const ctx = this.ctx;

        ctx.save();
        ctx.font = '80px Cursive';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowColor = 'skyblue';
        ctx.fillStyle = this.gradient;
        ctx.fillText(PHASE2_HEADING, 200, 200);
        ctx.restore();                  // shadow doesn't leak
    }

    /* ---------- Final message ---------- */

    drawFinalMessage()
    {
        const ctx = this.ctx;

        ctx.save();
        ctx.font = '26px Arial';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowColor = 'skyblue';
        ctx.fillStyle = this.gradient;
        ctx.fillText(FINAL_MESSAGE, 40, 70);
        ctx.restore();
    }

    /* ---------- helpers ---------- */

    _createGradient()
    {
        const g = this.ctx.createLinearGradient(0, 0, 600, 0);
        g.addColorStop(0, 'skyblue');
        g.addColorStop(0.5, 'blue');
        g.addColorStop(1, 'skyblue');
        return g;
    }
}
