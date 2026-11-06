/**
 * BigJump – animation 2.
 *
 *   ride     plain sketch: the cyclist rides in, speeds up and climbs a ramp
 *   fly      at the ramp lip everything bursts into colour; the bike follows a
 *            gravity arc, levels out, and time slows down near the top
 *   land     flat landing with a squash-and-bounce and dust, then rolls to a stop
 *   message  "Be brave — take the leap!" pops in, then onComplete()
 *
 * Time-based (requestAnimationFrame + delta time) so the arc is smooth at any
 * display rate. Reuses Bicycle and Rider by drawing them in a translated and
 * rotated frame whose origin is the rear-wheel centre.
 *
 * All tunables are static fields so they never clash with the global
 * constants of animation 1.
 */
class BigJump
{
    /* ---- scene layout (canvas is 1000 × 500) ---- */
    static GROUND_Y = 440;                      // ground surface
    static R = Bicycle.WHEEL_RADIUS;            // 30
    static WHEELBASE = Bicycle.FRONT_WHEEL_OFFSET; // 100
    static RAMP_FOOT_X = 160;
    static RAMP_LIP_X = 340;
    static RAMP_ANGLE = 35 * Math.PI / 180;
    static RAMP_LIP_Y = this.GROUND_Y - (this.RAMP_LIP_X - this.RAMP_FOOT_X) * Math.tan(this.RAMP_ANGLE);

    /* ---- motion ---- */
    static START_X = -140;          // rear-wheel centre, off screen
    static START_SPEED = 120;       // px/s
    static MAX_SPEED = 420;
    static ACCEL = 270;             // px/s² while pedalling on the flat
    static RAMP_DECEL = 75;         // px/s² while climbing
    static GRAVITY = 520;           // px/s² (floaty, cartoon gravity)
    static SLOW_MO = 0.6;           // how much time slows at the top of the jump
    static STOP_DISTANCE = 90;      // roll-out after landing
    static PEDAL_STEP = 18;         // px travelled per pedal flip

    /* ---- timings (s) ---- */
    static FLASH_TIME = 0.35;
    static SETTLE_TIME = 0.7;       // min time on the ground before the message
    static MESSAGE_TIME = 0.9;

    static MESSAGE = 'Be brave — take the leap!';

    constructor(canvas, onComplete)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.onComplete = onComplete;

        this.bicycle = new Bicycle(0, 0);   // drawn in its own local frame
        this.bicycle.wheelShadow = false;
        this.rider = new Rider();

        this.animationId = null;
        this.isRunning = false;
    }

    /* ---------- public API ---------- */

    start()
    {
        this.stop();
        this._reset();
        this.isRunning = true;
        this.lastTime = null;
        this.animationId = requestAnimationFrame(t => this._loop(t));
    }

    stop()
    {
        this.isRunning = false;
        if (this.animationId)
        {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /* ---------- state ---------- */

    _reset()
    {
        const B = BigJump;
        this.phase = 'ride';
        this.speed = B.START_SPEED;
        this.rearX = B.START_X;
        this.pedalDistance = 0;
        this.colourAge = null;      // seconds since takeoff, null while sketch
        this.particles = [];
        this.squash = 0;
        this.bicycle.wheelAngle = 0;
        this.bicycle.pedalPhase = 0;
        this._placeOnGround();
    }

    /* ---------- loop ---------- */

    _loop(time)
    {
        if (!this.isRunning) return;

        // Clamp dt so a hidden tab or a slow frame doesn't teleport the bike
        const dt = this.lastTime === null ? 0 : Math.min((time - this.lastTime) / 1000, 1 / 30);
        this.lastTime = time;

        this._update(dt);
        this._draw();

        if (this.phase === 'done')
        {
            this.stop();
            if (this.onComplete) this.onComplete();
            return;
        }
        if (this.isRunning)
        {
            this.animationId = requestAnimationFrame(t => this._loop(t));
        }
    }

    _update(dt)
    {
        if (this.colourAge !== null) this.colourAge += dt;
        this._updateParticles(dt);

        switch (this.phase)
        {
            case 'ride': this._updateRide(dt); break;
            case 'fly': this._updateFly(dt); break;
            case 'land': this._updateLand(dt); break;
            case 'message':
                this.messageAge += dt;
                if (this.messageAge >= BigJump.MESSAGE_TIME) this.phase = 'done';
                break;
        }
    }

    /* ---------- ride: flat approach and ramp ---------- */

    _updateRide(dt)
    {
        const B = BigJump;
        const onRamp = this.rearX > B.RAMP_FOOT_X - B.R;

        this.speed = onRamp
            ? Math.max(300, this.speed - B.RAMP_DECEL * dt)
            : Math.min(B.MAX_SPEED, this.speed + B.ACCEL * dt);

        const distance = this.speed * dt;
        this.rearX += distance * Math.cos(this.angle);
        this._spinWheels(distance);
        this._pedal(distance);

        const launchX = B.RAMP_LIP_X - B.R * Math.sin(B.RAMP_ANGLE);
        if (this.rearX >= launchX)
        {
            this.rearX = launchX;
            this._placeOnGround();
            this._takeOff();
        } else
        {
            this._placeOnGround();
        }
    }

    /** Set rearY, frontX/Y and angle so both wheels sit on the ground/ramp */
    _placeOnGround()
    {
        const L = BigJump.WHEELBASE;
        this.rearY = this._wheelCentreY(this.rearX, false);

        // Front wheel: on the ground envelope, exactly one wheelbase away
        let fx = this.rearX + L;
        let fy = this.rearY;
        for (let i = 0; i < 4; i++)
        {
            fy = this._wheelCentreY(fx, true);
            const dy = fy - this.rearY;
            fx = this.rearX + Math.sqrt(Math.max(0, L * L - dy * dy));
        }
        this.angle = Math.atan2(fy - this.rearY, fx - this.rearX);
    }

    /**
     * Height of a rolling wheel's centre whose x is cx: the lowest the wheel
     * can sit without cutting into the ground. Handles the ramp foot smoothly.
     * extendRamp: the front wheel "sees" the ramp continue past the lip,
     * so the bike stays on the slope line until the rear wheel leaves it.
     */
    _wheelCentreY(cx, extendRamp)
    {
        const R = BigJump.R;
        let best = Infinity;
        for (let px = cx - R; px <= cx + R; px += 1)
        {
            const dx = px - cx;
            const y = this._surfaceY(px, extendRamp) - Math.sqrt(R * R - dx * dx);
            if (y < best) best = y;
        }
        return best;
    }

    _surfaceY(x, extendRamp)
    {
        const B = BigJump;
        if (x <= B.RAMP_FOOT_X) return B.GROUND_Y;
        if (x <= B.RAMP_LIP_X || extendRamp)
        {
            return B.GROUND_Y - (x - B.RAMP_FOOT_X) * Math.tan(B.RAMP_ANGLE);
        }
        return B.GROUND_Y;
    }

    /* ---------- fly ---------- */

    _takeOff()
    {
        const B = BigJump;
        this.phase = 'fly';
        this.colourAge = 0;

        this.launch = {
            x: this.rearX,
            y: this.rearY,
            vx: this.speed * Math.cos(B.RAMP_ANGLE),
            vy: -this.speed * Math.sin(B.RAMP_ANGLE),
            angle: this.angle,
        };
        // Time until the wheels are back on the flat: y0 + vy·t + ½g·t² = landY
        const drop = (B.GROUND_Y - B.R) - this.launch.y;
        const { vy } = this.launch;
        this.flightTime = (-vy + Math.sqrt(vy * vy + 2 * B.GRAVITY * drop)) / B.GRAVITY;
        this.flightClock = 0;

        this._burst(B.RAMP_LIP_X, B.RAMP_LIP_Y);
    }

    _updateFly(dt)
    {
        const B = BigJump;
        const p = this.flightClock / this.flightTime;

        // Slow motion that peaks at the top of the jump
        const timeScale = 1 - B.SLOW_MO * Math.sin(Math.PI * p) ** 2;
        const step = dt * timeScale;
        this.flightClock = Math.min(this.flightTime, this.flightClock + step);

        const t = this.flightClock;
        const { x, y, vx, vy, angle } = this.launch;
        this.rearX = x + vx * t;
        this.rearY = y + vy * t + 0.5 * B.GRAVITY * t * t;
        this.velocityY = vy + B.GRAVITY * t;

        // Nose comes down from the ramp angle to level just before landing
        this.angle = angle * (1 - this._smoothstep(0, 0.85, t / this.flightTime));

        // Wheels keep spinning in the air, slowly losing speed; no pedalling
        this._spinWheels(vx * step * 0.6);

        if (this.flightClock >= this.flightTime) this._touchDown();
    }

    _touchDown()
    {
        const B = BigJump;
        this.phase = 'land';
        this.landAge = 0;
        this.rearY = B.GROUND_Y - B.R;
        this.angle = 0;
        this.speed = this.launch.vx;
        this.landDecel = (this.speed * this.speed) / (2 * B.STOP_DISTANCE);

        this._dust(this.rearX, B.GROUND_Y);
        this._dust(this.rearX + B.WHEELBASE, B.GROUND_Y);
    }

    /* ---------- land ---------- */

    _updateLand(dt)
    {
        this.landAge += dt;
        this.speed = Math.max(0, this.speed - this.landDecel * dt);

        const distance = this.speed * dt;
        this.rearX += distance;
        this._spinWheels(distance);     // coasting: wheels turn, pedals still

        // Squash on impact, then a few springy wobbles that die away
        this.squash = 0.16 * Math.exp(-6 * this.landAge) * Math.cos(16 * this.landAge);

        if (this.speed === 0 && this.landAge >= BigJump.SETTLE_TIME)
        {
            this.squash = 0;
            this.phase = 'message';
            this.messageAge = 0;
        }
    }

    /* ---------- bike helpers ---------- */

    _spinWheels(distance)
    {
        this.bicycle.wheelAngle += distance / BigJump.R;
    }

    _pedal(distance)
    {
        this.pedalDistance += distance;
        while (this.pedalDistance >= BigJump.PEDAL_STEP)
        {
            this.pedalDistance -= BigJump.PEDAL_STEP;
            this.bicycle.pedalPhase = 1 - this.bicycle.pedalPhase;
        }
    }

    /* ---------- particles ---------- */

    _burst(x, y)
    {
        const colours = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff924c'];
        for (let i = 0; i < 18; i++)
        {
            const a = -Math.PI * (0.05 + 0.9 * Math.random());   // mostly upward
            const s = 140 + Math.random() * 160;
            this.particles.push({
                kind: 'star', x, y,
                vx: Math.cos(a) * s, vy: Math.sin(a) * s, gravity: 160,
                age: 0, life: 0.9 + Math.random() * 0.4,
                size: 5 + Math.random() * 4, spin: (Math.random() - 0.5) * 8,
                colour: colours[i % colours.length],
            });
        }
    }

    _dust(x, y)
    {
        for (let i = 0; i < 9; i++)
        {
            const dir = i % 2 ? 1 : -1;
            this.particles.push({
                kind: 'dust', x: x + dir * Math.random() * 10, y: y - 2,
                vx: dir * (40 + Math.random() * 120), vy: -(20 + Math.random() * 70), gravity: 180,
                age: 0, life: 0.6 + Math.random() * 0.3,
                size: 4 + Math.random() * 5,
            });
        }
    }

    _updateParticles(dt)
    {
        for (const p of this.particles)
        {
            p.age += dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += p.gravity * dt;
        }
        this.particles = this.particles.filter(p => p.age < p.life);
    }

    /* ---------- drawing ---------- */

    _draw()
    {
        const ctx = this.ctx;
        const coloured = this.colourAge !== null;

        ctx.save();
        if (coloured)
        {
            this._drawColourScene();
        } else
        {
            this._drawSketchScene();
        }

        if (this.phase === 'fly') this._drawGroundShadow();
        this._drawBike(coloured);
        if (this.phase === 'fly') this._drawSpeedLines();
        this._drawParticles();
        if (coloured) this._drawFlash();
        if (this.phase === 'message' || this.phase === 'done') this._drawMessage();
        ctx.restore();
    }

    _drawSketchScene()
    {
        const ctx = this.ctx;
        const B = BigJump;
        const { width, height } = this.canvas;

        Backdrop.sketch(ctx, width, height);

        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, B.GROUND_Y);
        ctx.lineTo(width, B.GROUND_Y);
        ctx.stroke();

        this._rampPath();
        ctx.stroke();
    }

    _drawColourScene()
    {
        const ctx = this.ctx;
        const B = BigJump;
        const { width, height } = this.canvas;

        // Clouds drift slowly
        const drift = this.colourAge * 10;
        Backdrop.sky(ctx, width, height, B.GROUND_Y, [
            { x: 150 + drift, y: 90, scale: 1 },
            { x: 640 + drift * 0.6, y: 175, scale: 0.8 },
        ]);

        // Wooden ramp with planks
        this._rampPath();
        ctx.fillStyle = '#e0a458';
        ctx.fill();
        ctx.save();
        ctx.clip();
        ctx.strokeStyle = 'rgba(140, 85, 35, 0.45)';
        ctx.lineWidth = 2;
        for (let x = B.RAMP_FOOT_X + 30; x < B.RAMP_LIP_X; x += 30)
        {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, B.GROUND_Y);
            ctx.stroke();
        }
        ctx.restore();
        this._rampPath();
        ctx.strokeStyle = '#8a5a2b';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    _rampPath()
    {
        const B = BigJump;
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(B.RAMP_FOOT_X, B.GROUND_Y);
        ctx.lineTo(B.RAMP_LIP_X, B.RAMP_LIP_Y);
        ctx.lineTo(B.RAMP_LIP_X, B.GROUND_Y);
        ctx.closePath();
    }

    _drawGroundShadow()
    {
        const B = BigJump;
        const ctx = this.ctx;
        const height = (B.GROUND_Y - B.R) - this.rearY;      // how high above the flat
        const cx = this.rearX + B.WHEELBASE / 2;
        // Over the ramp the shadow would sit on wood; keep it on the grass
        if (cx < B.RAMP_LIP_X + 10) return;
        const k = Math.max(0.35, 1 - height / 300);
        ctx.fillStyle = `rgba(40, 70, 30, ${0.35 * k})`;
        ctx.beginPath();
        ctx.ellipse(cx, B.GROUND_Y + 4, 75 * k, 7 * k, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

    _drawBike(coloured)
    {
        const ctx = this.ctx;
        const B = BigJump;

        ctx.save();
        ctx.translate(this.rearX, this.rearY);
        ctx.rotate(this.angle);
        if (this.squash)
        {
            // Squash towards the ground line, centred under the bike
            ctx.translate(B.WHEELBASE / 2, B.R);
            ctx.scale(1 + this.squash * 0.5, 1 - this.squash);
            ctx.translate(-B.WHEELBASE / 2, -B.R);
        }
        this.bicycle.draw(ctx, coloured);
        this.rider.draw(ctx, this.bicycle, coloured);
        ctx.restore();
    }

    _drawSpeedLines()
    {
        const ctx = this.ctx;
        const { vx } = this.launch;
        const vy = this.velocityY;
        const len = Math.hypot(vx, vy);
        const ux = vx / len, uy = vy / len;            // direction of travel
        const nx = -uy, ny = ux;                        // perpendicular
        const cx = this.rearX + 20, cy = this.rearY - 50;

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        for (const [offset, back, size] of [[-35, 40, 45], [0, 70, 60], [35, 45, 40]])
        {
            const sx = cx + nx * offset - ux * back;
            const sy = cy + ny * offset - uy * back;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx - ux * size, sy - uy * size);
            ctx.stroke();
        }
        ctx.restore();
    }

    _drawParticles()
    {
        const ctx = this.ctx;
        for (const p of this.particles)
        {
            const fade = 1 - p.age / p.life;
            ctx.save();
            ctx.globalAlpha = Math.max(0, fade);
            if (p.kind === 'star')
            {
                ctx.translate(p.x, p.y);
                ctx.rotate(p.age * p.spin);
                ctx.fillStyle = p.colour;
                this._star(p.size);
                ctx.fill();
            } else
            {
                ctx.fillStyle = 'rgb(176, 146, 104)';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * (1 + p.age * 1.5), 0, 2 * Math.PI);
                ctx.fill();
            }
            ctx.restore();
        }

        // Golden ring that spreads out from the ramp lip at takeoff
        if (this.colourAge !== null && this.colourAge < 0.6)
        {
            const B = BigJump;
            const k = this.colourAge / 0.6;
            ctx.save();
            ctx.globalAlpha = 1 - k;
            ctx.strokeStyle = '#ffca3a';
            ctx.lineWidth = 6 * (1 - k) + 1;
            ctx.beginPath();
            ctx.arc(B.RAMP_LIP_X, B.RAMP_LIP_Y, 20 + k * 200, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
        }
    }

    /** Five-point star path centred on the origin */
    _star(r)
    {
        const ctx = this.ctx;
        ctx.beginPath();
        for (let i = 0; i < 10; i++)
        {
            const rad = i % 2 ? r * 0.45 : r;
            const a = -Math.PI / 2 + i * Math.PI / 5;
            ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
        }
        ctx.closePath();
    }

    /** White flash that fades as the colour arrives */
    _drawFlash()
    {
        const k = this.colourAge / BigJump.FLASH_TIME;
        if (k >= 1) return;
        const ctx = this.ctx;
        ctx.save();
        ctx.globalAlpha = 0.85 * (1 - k);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.restore();
    }

    _drawMessage()
    {
        const ctx = this.ctx;
        const k = Math.min(1, this.messageAge / 0.5);
        const scale = this._easeOutBack(k);
        const cx = this.canvas.width / 2, cy = 70;

        ctx.save();
        ctx.globalAlpha = Math.min(1, k * 1.5);
        ctx.translate(cx, cy);
        ctx.scale(scale, scale);

        ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const w = ctx.measureText(BigJump.MESSAGE).width + 48;

        Backdrop.pill(ctx, 0, 0, w, 64);

        const g = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
        g.addColorStop(0, '#667eea');
        g.addColorStop(1, '#764ba2');
        ctx.fillStyle = g;
        ctx.fillText(BigJump.MESSAGE, 0, 2);
        ctx.restore();
    }

    /* ---------- easing ---------- */

    _smoothstep(a, b, x)
    {
        const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
        return t * t * (3 - 2 * t);
    }

    _easeOutBack(t)
    {
        const c = 1.7;
        return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
    }
}
