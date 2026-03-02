/**
 * Rider – draws a stick-figure cyclist whose limbs are positioned
 * relative to the Bicycle's seat, handlebar, and pedal.
 *
 * To add helmet, backpack, etc., extend draw() with extra shapes.
 */
class Rider
{

    /** Draw the rider on top of the given bicycle */
    draw(ctx, bicycle, styled = false)
    {
        ctx.save();

        const seat = bicycle.getSeatPosition();
        const handlebar = bicycle.getHandlebarPosition();
        const pedal = bicycle.getPedalPosition();
        const bx = bicycle.baseX;
        const gy = bicycle.groundY;

        /* ---- Torso (seat → shoulder) ---- */
        const shoulderX = bx + 55;
        const shoulderY = gy - 110;

        ctx.beginPath();
        ctx.moveTo(seat.x, seat.y);
        ctx.lineTo(shoulderX, shoulderY);
        ctx.lineWidth = styled ? 16 : 1;
        ctx.strokeStyle = styled ? 'orange' : 'black';
        ctx.stroke();

        /* ---- Neck ---- */
        const neckEndX = bx + 58;
        const neckEndY = gy - 115;

        ctx.beginPath();
        ctx.moveTo(shoulderX, shoulderY);
        ctx.lineTo(neckEndX, neckEndY);
        ctx.lineWidth = styled ? 5 : 1;
        ctx.strokeStyle = styled ? 'orange' : 'black';
        ctx.stroke();

        /* ---- Head ---- */
        const headX = bx + 60;
        const headY = styled ? gy - 125 : gy - 130;
        const headR = styled ? 12 : 15;

        ctx.beginPath();
        ctx.arc(headX, headY, headR, 0, 2 * Math.PI);
        if (styled)
        {
            ctx.fillStyle = 'orange';
            ctx.fill();
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = styled ? 'orange' : 'black';
        ctx.stroke();

        /* ---- Upper arm (shoulder area → elbow) ---- */
        const armStartX = bx + 50;
        const armStartY = gy - 100;
        const elbowX = bx + 60;
        const elbowY = gy - 75;

        ctx.beginPath();
        ctx.moveTo(armStartX, armStartY);
        ctx.lineTo(elbowX, elbowY);
        ctx.lineWidth = styled ? 10 : 1;
        ctx.strokeStyle = styled ? 'orange' : 'black';
        ctx.stroke();

        /* ---- Forearm (elbow → handlebar grip) ---- */
        ctx.beginPath();
        ctx.moveTo(elbowX, elbowY);
        ctx.lineTo(handlebar.x, handlebar.y);
        ctx.lineWidth = styled ? 5 : 1;
        ctx.strokeStyle = styled ? 'orange' : 'black';
        ctx.stroke();

        /* ---- Upper leg (seat → knee) ---- */
        const kneeX = bx + 60;
        const kneeY = bicycle.pedalPhase ? gy - 30 : gy - 38;

        ctx.beginPath();
        ctx.moveTo(seat.x, seat.y);
        ctx.lineTo(kneeX, kneeY);
        ctx.lineWidth = styled ? 13 : 1;
        ctx.strokeStyle = styled ? 'orange' : 'black';
        ctx.stroke();

        /* ---- Lower leg (knee → pedal/foot) ---- */
        ctx.beginPath();
        ctx.moveTo(kneeX, kneeY);
        ctx.lineTo(pedal.x, pedal.y);
        ctx.lineWidth = styled ? 7 : 1;
        ctx.strokeStyle = styled ? 'orange' : 'black';
        ctx.stroke();

        ctx.restore();
    }
}
