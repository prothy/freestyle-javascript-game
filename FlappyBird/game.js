'use strict';

// initGame();
//
// function initGame() {
//
//     // Your game can start here, but define separate functions, don't write everything in here :)
//
// }


document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    const gravity = -10   // gravitational acceleration
    let initTime = Date.now()
    const interval = 20   // milliseconds per update

    let birdLeft = 220;
    let birdBottom = 100;
    // let gravity = 2;

    function startGame() {
        let curTime = Date.now();
        let timeDiff = (curTime - initTime)/1000
        if (birdBottom > 0) birdBottom += (gravity * timeDiff**2)/2
        // console.log((gravity * ((time-Date.now())/100)**2))*10
        // time = Date.now();
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let timerId = setInterval(startGame, interval);


    function jump() {
        initTime = Date.now();
        birdBottom += 50
        bird.style.bottom = birdBottom + 'px';
        // timeDiff = 
    }
    document.addEventListener('keyup', jump);
})
