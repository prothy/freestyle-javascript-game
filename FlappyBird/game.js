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

    const gravity = -150   // gravitational acceleration
    let velocity = 0;      // vertical velocity
    let initTime = Date.now()
    const interval = 20    // milliseconds per update
    
    let gameStarted = false;

    let birdLeft = 220;
    let birdBottom = 100;
    // let gravity = 2;

    function startGame() {
        let curTime = Date.now();
        let timeDiff = (curTime - initTime)/1000
        if (birdBottom > 0 && gameStarted) birdBottom += (velocity * timeDiff) + (gravity * timeDiff**2)/2
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
        // if (birdBottom === 0) break;
        document.addEventListener('keydown', jump);
    }
    let timerId = setInterval(startGame, interval);


    function jump() {
        if (!gameStarted) gameStarted = true;
        initTime = Date.now();
        velocity = 40;
        bird.style.bottom = birdBottom + 'px';
        // timeDiff = 
    }
})
