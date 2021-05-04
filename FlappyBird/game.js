'use strict';

// initGame();
//
// function initGame() {
//
//     // Your game can start here, but define separate functions, don't write everything in here :)
//
// }

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

document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    const gravity = -10   // gravitational acceleration
    let time = Date.now()
    const interval = 20   // milliseconds per update

    let birdLeft = 220;
    let birdBottom = 100;
    // let gravity = 2;

    function startGame() {
        birdBottom > 0 ? birdBottom += ((gravity * ((time-Date.now())/50)**2)) : birdBottom = 0
        console.log((gravity * ((time-Date.now())/100)**2))*10
        time = Date.now();
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
        PlacePipes() // Bori
    }
    let timerId = setInterval(startGame, interval);


    function jump() {
        birdBottom += 50
        bird.style.bottom = birdBottom + 'px';
    }
    document.addEventListener('keyup', jump);
})
