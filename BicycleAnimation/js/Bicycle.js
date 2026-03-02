/**
 * Bicycle – draws and animates the bicycle frame, wheels, and drivetrain.
 *
 * Every coordinate is computed relative to the rear-wheel centre (baseX, groundY)
 * so moving the bicycle only requires changing baseX.
 *
 * To extend (e.g. slope riding), override update() and adjust groundY or add
 * a rotation transform before draw().
 */
class Bicycle
{

    /* ---- geometry (pixel offsets from rear-wheel centre) ---- */

    static WHEEL_RADIUS = 30;
    static FRONT_WHEEL_OFFSET = 100;   // dx to front-wheel centre
    static CRANK_OFFSET = 50;          // dx to crank/chainring centre
    static CHAINRING_RADIUS = 8;

    /** Frame tubes – each {name, from:[dx,dy], to:[dx,dy]} */
    static FRAME_LINES = [
        { name: 'rearFork', from: [0, 0], to: [40, -60] },
        { name: 'seatStay', from: [40, -60], to: [20, -60] },
        { name: 'frontFork', from: [100, 0], to: [70, -60] },
        { name: 'handlebar', from: [70, -60], to: [85, -60] },
        { name: 'topTube', from: [33, -50], to: [75, -50] },
        { name: 'downTube', from: [50, 0], to: [78, -45] },
        { name: 'seatTube', from: [33, -50], to: [50, 0] },
    ];

    /* ---- instance ---- */

    constructor(startX, groundY)
    {
        this.baseX = startX;
        this.groundY = groundY;
        this.wheelAngle = 0;
        this.pedalPhase = 0;          // toggles 0 ↔ 1 each frame
    }

    /** Advance position & animation state by one frame */
    update(speed)
    {
        this.baseX += speed;
        this.wheelAngle += 0.1;
        this.pedalPhase = 1 - this.pedalPhase;
    }

    /** Draw the complete bicycle onto ctx */
    draw(ctx, styled = false)
    {
        ctx.save();
        this._drawWheels(ctx, styled);
        this._drawFrame(ctx, styled);
        this._drawDrivetrain(ctx, styled);
        ctx.restore();
    }

    /* ---------- internal drawing helpers ---------- */

    _drawWheels(ctx, styled)
    {
        const { baseX: x, groundY: y, wheelAngle: a } = this;
        const r = Bicycle.WHEEL_RADIUS;
        const fx = x + Bicycle.FRONT_WHEEL_OFFSET;

        ctx.lineWidth = styled ? 5 : 1;
        ctx.strokeStyle = 'black';

        if (styled)
        {
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 30;
            ctx.shadowColor = 'grey';
        }

        // Rear wheel (small gap in arc → visible spinning)
        ctx.beginPath();
        ctx.arc(x, y, r, a, a + 1.95 * Math.PI);
        ctx.stroke();

        // Front wheel (offset start angle for visual variety)
        ctx.beginPath();
        ctx.arc(fx, y, r, a + 3, a + 2.89 * Math.PI);
        ctx.stroke();

        // Reset shadow so it doesn't leak
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
    }

    _drawFrame(ctx, styled)
    {
        const { baseX: x, groundY: y } = this;

        for (const tube of Bicycle.FRAME_LINES)
        {
            ctx.beginPath();
            ctx.moveTo(x + tube.from[0], y + tube.from[1]);
            ctx.lineTo(x + tube.to[0], y + tube.to[1]);
            ctx.lineWidth = styled ? 2 : 1;

            if (styled)
            {
                ctx.strokeStyle =
                    (tube.name === 'seatStay' || tube.name === 'handlebar')
                        ? 'gray' : 'red';
            } else
            {
                ctx.strokeStyle = 'black';
            }
            ctx.stroke();
        }
    }

    _drawDrivetrain(ctx, styled)
    {
        const { baseX: x, groundY: y, pedalPhase: ph } = this;
        const cx = x + Bicycle.CRANK_OFFSET;
        const cy = y;

        ctx.lineWidth = styled ? 2 : 1;
        ctx.strokeStyle = styled ? '#505050' : 'black';

        // Chainring
        ctx.beginPath();
        ctx.arc(cx, cy, Bicycle.CHAINRING_RADIUS, 0, 2 * Math.PI);
        ctx.stroke();

        // Crank arm (two-state toggle)
        const crankEndX = ph ? cx + 5 : cx - 5;
        const crankEndY = ph ? cy + 8 : cy - 8;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(crankEndX, crankEndY);
        ctx.stroke();

        // Pedal rectangle
        const pedalX = ph ? cx + 2 : cx + 7;
        const pedalY = ph ? cy + 6 : cy - 8;
        ctx.beginPath();
        ctx.rect(pedalX, pedalY, 4, 2);
        ctx.stroke();

        // Chain lines (rear hub → crank)
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(cx, cy + 8);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(cx, cy - 8);
        ctx.stroke();
    }

    /* ---------- position helpers (used by Rider) ---------- */

    /** Seat connection point */
    getSeatPosition()
    {
        return { x: this.baseX + 35, y: this.groundY - 60 };
    }

    /** Handlebar grip point */
    getHandlebarPosition()
    {
        return { x: this.baseX + 75, y: this.groundY - 60 };
    }

    /** Current pedal foot position (toggles each frame) */
    getPedalPosition()
    {
        const cx = this.baseX + Bicycle.CRANK_OFFSET;
        return this.pedalPhase
            ? { x: cx - 2, y: this.groundY + 6 }
            : { x: cx + 2, y: this.groundY - 8 };
    }
}
