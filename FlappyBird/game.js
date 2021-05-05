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
            CheckCollision();
            if ((startTime - curTime) % 2000 === 0) {
                wrapper.appendChild(new Obstacle());
            }
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

    class Obstacle {
        constructor() {
            const obstacle = document.createElement('div');

            this.setProperties(obstacle);

            return obstacle;
        }

        setProperties(obstacle) {
            let randomY = Math.floor(Math.random() * wrapper.clientHeight);

            obstacle.classList.add('obstacle');

            obstacle.style.top = `${randomY}px`;
            obstacle.style.left = `${wrapper.clientWidth}px`

            obstacle.animate({
                transform: ['translateX(0px)', [`translateX(-500px)`]]
            }, 2000)
            
        }
    }
}

function GameOver()
{
    alert("Game Over!\nYou lost!");
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
