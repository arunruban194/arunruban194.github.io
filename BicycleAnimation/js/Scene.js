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

/* Clouds for the coloured phase, placed clear of the text */
const PHASE2_CLOUDS = [
    { x: 70, y: 150, scale: 0.9 },
    { x: 700, y: 230, scale: 0.8 },
];

class Scene
{

    constructor(canvas)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Reusable gradients for accent text
        this.gradient = this._createGradient();
        this.messageGradient = this.ctx.createLinearGradient(150, 0, 850, 0);
        this.messageGradient.addColorStop(0, '#667eea');
        this.messageGradient.addColorStop(1, '#764ba2');
    }

    /** Wipe the entire canvas */
    clear()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /* ---------- Phase 1 ---------- */

    drawPhase1Background()
    {
        const ctx = this.ctx;
        Backdrop.sketch(ctx, this.canvas.width, this.canvas.height);

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
        const ctx = this.ctx;
        const { width, height } = this.canvas;

        // Same sunny day as animation 2; ground is the bottom of the wheels
        Backdrop.sky(ctx, width, height, GROUND_Y + Bicycle.WHEEL_RADIUS, PHASE2_CLOUDS);

        ctx.save();
        ctx.font = '80px Cursive';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#fff';
        ctx.strokeText(PHASE2_HEADING, 200, 200);
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowColor = 'rgba(30, 60, 140, 0.35)';
        ctx.fillStyle = this.gradient;
        ctx.fillText(PHASE2_HEADING, 200, 200);
        ctx.restore();                  // shadow doesn't leak
    }

    /* ---------- Final message ---------- */

    drawFinalMessage()
    {
        const ctx = this.ctx;

        ctx.save();
        ctx.font = 'bold 26px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const cx = this.canvas.width / 2 - 40, cy = 60;   // keeps the bubble clear of the sun
        Backdrop.pill(ctx, cx, cy, ctx.measureText(FINAL_MESSAGE).width + 48, 54);
        ctx.fillStyle = this.messageGradient;
        ctx.fillText(FINAL_MESSAGE, cx, cy + 1);
        ctx.restore();
    }

    /* ---------- helpers ---------- */

    _createGradient()
    {
        // Deeper blues than before so the words read on the sky
        const g = this.ctx.createLinearGradient(200, 0, 600, 0);
        g.addColorStop(0, '#3a8ee6');
        g.addColorStop(0.5, '#1d2fc4');
        g.addColorStop(1, '#3a8ee6');
        return g;
    }
}
