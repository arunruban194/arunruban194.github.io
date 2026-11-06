/**
 * Animation registry – one entry per animation on the front page.
 *
 * The front page draws one number box per entry, in order, and the route
 * #/<number> opens it. To add an animation, write its controller class
 * (with start() and stop()) and add an entry here.
 *
 *   number – shown in the box and used in the URL (#/1, #/2 …)
 *   title  – short name shown under the box
 *   create – (canvas, onComplete) => controller
 */
const ANIMATIONS = [
    {
        number: 1,
        title: 'Hard Work',
        create: (canvas, onComplete) => new AnimationController(canvas, onComplete),
    },
    {
        number: 2,
        title: 'Big Jump',
        create: (canvas, onComplete) => new BigJump(canvas, onComplete),
    },
];
