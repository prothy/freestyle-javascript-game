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
    const bird_pos = document.querySelector('.bird');

    for (let obs of obstacles)
    {
        let comparison = Compare_these(bird_pos, obs);
        console.log("97th line"); // idáig eljut a program
        if (comparison === true)
        {
            // TODO: write function GameOver()
            GameOver();
        }
    }
}

/*
function Compare(bird, obstacle)
{
    /!*
    Azért használok 2 betűs változókat mert különben nem férne ki az egész feltétel a képernyőre.
    A változónevek az objektum (bird/obstacle) első betűjéből
    és a kulcs (top/bottom/right/left) első betűjéből tevődnek össze.
    Ebből az oldalból indultam ki:
    https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
     *!/

    var bt = bird["top"], bb = bird['bottom'], bl = bird['left'], br = bird['right'];
    var ot = obstacle['top'], ob = obstacle['bottom'], ol = obstacle['left'], or = obstacle['right'];
    var result = false;

    if ((bt <= ot) && (bt >= ob) && (bl >= ol) && (bl <= or)) {result = true;}
    else if ((bb <= ot) && (bb >= ob) && (br <= ol) && (bl >= or)) {result = true;}
    else if ((bt <= ot) && (bt >= ob) && (br <= ol) && (bl >= or)) {result = true;}
    else if ((bb <= ot) && (bb >= ob) && (bl >= ol) && (bl <= or)) {result = true;}

    console.log(`The value of result: ${result}`);
    return result;
}*/

// EZ az új programrész
function Compare_these() {
    function getPositions( elem ) {
        var pos, width, height;
        pos = $( elem ).position();
        width = $( elem ).width() / 2;
        height = $( elem ).height();
        return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
    }

    function comparePositions( p1, p2 ) {
        var r1, r2;
        r1 = p1[0] < p2[0] ? p1 : p2;
        r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function ( a, b ) {
        var pos1 = getPositions( a ),
            pos2 = getPositions( b );
        console.log("Start to compare"); // idáig nem jut el a program.
        if (comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] ))
        {
            console.log("The return value of Compare is true.");
            return true;
        }
        else
        {
            console.log("The return value of Compare is false.");
            return false;
        }
        //return (comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] ));
    };
}