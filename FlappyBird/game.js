'use strict';


document.addEventListener('DOMContentLoaded', () => {
    startGame()
})

function startGame() {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');
    const wrapper = document.querySelector('.wrapper');


    /* PHSYICS CONSTANTS */
    const gravity = -150   // gravitational acceleration
    let velocity = 0;      // vertical velocity
    let initTime = Date.now()
    const interval = 20    // milliseconds per update
    const startTime = Date.now();
    

    let gameStarted = false;

    let birdBottom = 100;

    function gameLoop() {
        let curTime = Date.now();
        let timeDiff = (curTime - initTime)/1000

        if (birdBottom > 0 && gameStarted) birdBottom += (velocity * timeDiff) + (gravity * timeDiff**2)/2
        bird.style.bottom = birdBottom + 'px';
        
        // if (birdBottom === 0) break;
        document.addEventListener('keydown', jump);

        if (gameStarted) {
            if ((startTime - curTime) % 2000 === 0) placeObstacles();
        }
    }
    let timerId = setInterval(gameLoop, interval);


    function jump(e) {
        if (e.key == ' ') {
            if (!gameStarted) {
                gameStarted = true;
                document.querySelector('.start-game').style.display = 'none';
            }
            initTime = Date.now();
            velocity = 40;
            bird.style.bottom = birdBottom + 'px';
        }
    }

    function placeObstacles() {
        const obstacle = document.createElement('div');
        const bg = document.querySelector('.sliding-background');

        obstacle.classList.add('obstacle');

        let randomY = Math.floor(Math.random() * wrapper.clientHeight);

        obstacle.style.top = `${randomY}px`;
        obstacle.style.left = `${wrapper.clientWidth}px`
        
        wrapper.appendChild(obstacle);
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

document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    // const ground = document.querySelector('.ground');

    const gravity = -150;   // gravitational acceleration
    let velocity = 0;
    let initTime = Date.now();
    const interval = 20;   // milliseconds per update

    let birdLeft = 220;
    let birdBottom = 100;
    // let gravity = 2;

    function startGame() {
        let curTime = Date.now();
        let timeDiff = (curTime - initTime)/1000;
        if (birdBottom > 0) birdBottom += (velocity * timeDiff) + (gravity * timeDiff**2)/2;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
        PlacePipes(); // Bori
        CheckCollision();
        // if (birdBottom === 0) break;
        document.addEventListener('keydown', jump);
    }
    let timerId = setInterval(startGame, interval);


    function GameOver()
    {
        alert("Game Over!\nYou lost!");
    }

    function jump() {
        initTime = Date.now();
        velocity = 40;
        bird.style.bottom = birdBottom + 'px';
        // timeDiff = 
    }

    function CheckCollision()
    {
        const obstacles = document.querySelectorAll('.obstacle');
        const bird_pos = document.querySelector('.bird').getBoundingClientRect();

        for (let obs of obstacles)
        {
            var rect = obs.getBoundingClientRect();
            if (Compare(bird_pos, rect))
            {
                // TODO: write function GameOver()
                GameOver();
            }
        }

        function Compare(bird, obstacle)
        {
            /*
            Azért használok 2 betűs változókat mert különben nem férne ki az egész feltétel a képernyőre.
            A változónevek az objektum (bird/obstacle) első betűjéből
            és a kulcs (top/bottom/right/left) első betűjéből tevődnek össze.
            Ebből az oldalból indultam ki:
            https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
             */

            var bt = bird["top"], bb = bird['bottom'], bl = bird['left'], br = bird['right'];
            var ot = obstacle['top'], ob = obstacle['bottom'], ol = obstacle['left'], or = obstacle['right'];
            
            if ((bt <= ot) && (bt >= ob) && (bl >= ol) && (bl <= or)) return true;
            else if ((bb <= ot) && (bb >= ob) && (br <= ol) && (bl >= or)) return true;
            else if ((bt <= ot) && (bt >= ob) && (br <= ol) && (bl >= or)) return true;
            else if ((bb <= ot) && (bb >= ob) && (bl >= ol) && (bl <= or)) return true;
            else return false;
        }
    }
})
