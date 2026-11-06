/**
 * Backdrop – scene backgrounds shared by the animations.
 *
 * Everything is painted into the canvas itself (never a CSS background), so
 * browser dark modes and dark-theme extensions can't darken it and hide the
 * black sketch lines.
 */
const Backdrop = {

    /** Plain white paper for the sketch phases */
    sketch(ctx, width, height)
    {
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    },

    /**
     * Sunny day: sky gradient, sun, clouds and grass from groundY down.
     * clouds: [{x, y, scale}]
     */
    sky(ctx, width, height, groundY, clouds = [])
    {
        ctx.save();

        const sky = ctx.createLinearGradient(0, 0, 0, groundY);
        sky.addColorStop(0, '#7cc8f8');
        sky.addColorStop(1, '#e3f5ff');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, width, groundY);

        ctx.save();
        ctx.shadowColor = 'rgba(255, 200, 40, 0.8)';
        ctx.shadowBlur = 30;
        ctx.fillStyle = '#ffd23f';
        ctx.beginPath();
        ctx.arc(width - 120, 80, 38, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        for (const c of clouds) this.cloud(ctx, c.x, c.y, c.scale);

        ctx.fillStyle = '#7ccf5a';
        ctx.fillRect(0, groundY, width, height - groundY);
        ctx.fillStyle = '#5aa83c';
        ctx.fillRect(0, groundY, width, 5);

        ctx.restore();
    },

    cloud(ctx, x, y, scale = 1)
    {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, 2 * Math.PI);
        ctx.arc(26, -10, 28, 0, 2 * Math.PI);
        ctx.arc(56, 0, 22, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillRect(0, 0, 56, 22);
        ctx.restore();
    },

    /** Soft white pill behind a line of text so it reads on the sky */
    pill(ctx, cx, cy, width, height)
    {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
        ctx.shadowColor = 'rgba(40, 60, 120, 0.25)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(cx - width / 2, cy - height / 2, width, height, height / 2);
        ctx.fill();
        ctx.restore();
    },
};
