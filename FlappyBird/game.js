'use strict';


document.addEventListener('DOMContentLoaded', () => {
    startGame()
})

function startGame() {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');


    /* PHSYICS CONSTANTS */
    const gravity = -150   // gravitational acceleration
    let velocity = 0;      // vertical velocity
    let initTime = Date.now()
    const interval = 20    // milliseconds per update
    
    
    let gameStarted = false;

    let birdBottom = 100;

    function gameLoop() {
        let curTime = Date.now();
        let timeDiff = (curTime - initTime)/1000
        if (birdBottom > 0 && gameStarted) birdBottom += (velocity * timeDiff) + (gravity * timeDiff**2)/2
        bird.style.bottom = birdBottom + 'px';
        PlacePipes() // Bori
        // if (birdBottom === 0) break;
        document.addEventListener('keydown', jump);
    }
    let timerId = setInterval(gameLoop, interval);


    function jump(e) {
        if (e.key == ' ') {
            if (!gameStarted) gameStarted = true;

            initTime = Date.now();
            velocity = 40;
            bird.style.bottom = birdBottom + 'px';
        }
    }
}

function makeNew(counter)
{
    var random = Math.random() % 400;
    document.body.appendChild( document.createElement('div') );
    counter++;
    for (cl of ["lower", "upper"])
    {
        var new_pipe = document.createElement('div');
        new_pipe.setAttribute("class", '.'+cl+'_pipe');
        new_pipe.setAttribute("id", `${cl}_pipe_${counter}`);
        document.body.appendChild(new_pipe);
    }

    var upper = document.querySelector('#upper_pipe_' + counter.toString());
    var lower = document.querySelector('#lower_pipe_' + counter.toString());

    upper.bottom = random;
    lower.top = random;
}

function PlacePipes()
{
    var timer = 1000;
    var counter = 0;
    setInterval(timer = function(timer){timer -= 200; return timer;}, 10000);
    setTimeout(function(){setInterval(makeNew(counter), timer)}, 3000);
}
