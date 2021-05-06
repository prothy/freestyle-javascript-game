'use strict';


document.addEventListener('DOMContentLoaded', () => {
    startGame()
})

function startGame() {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const wrapper = document.querySelector('.wrapper');


    /* PHSYICS CONSTANTS */
    const gravity = -150   // gravitational acceleration
    let velocity = 0;      // vertical velocity
    let initTime = Date.now()
    const interval = 20    // milliseconds per update
    const startTime = Date.now();
    let rotation = 0;
    

    let gameStarted = false;

    let birdBottom = 100;

    let score_counter = 0;

    function gameLoop() {
        let curTime = Date.now();
        let timeDiff = (curTime - initTime)/1000;

        if (birdBottom > 0 && gameStarted) birdBottom += (velocity * timeDiff) + (gravity * timeDiff**2)/2
        bird.style.bottom = birdBottom + 'px';
        
        // if (birdBottom === 0) break;
        document.addEventListener('keydown', jump);

        if (gameStarted) {
            CheckCollision();
            score_counter += 1;
            if (score_counter === 50)
            {
                UpdateScore();
                score_counter = 0;
            }

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
            rotation = -45;

            bird.style.bottom = birdBottom + 'px';
            // bird.style.transform = `rotate(${rotation}deg)`


            bird.animate({
                transform: [`rotate(${rotation}deg)`, 'rotate(90deg)']
            }, 1000)
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
                transform: ['translateX(0px)', `translateX(-500px)`]
            }, 2000)
            
        }
    }
}

function GameOver()
{
    alert("Game Over!");
}

function CheckCollision()
{
    const obstacles = document.querySelectorAll('.obstacle');
    const bird_pos = document.querySelector('.bird');

    for (let obs of obstacles)
    {
        if (Compare(bird_pos, obs) === true)
        {
            // TODO: write function GameOver()
            console.log("Van egy talalat.");
            GameOver();
        }
    }
}

function UpdateScore()
{
    let current_score = document.getElementById("score").innerHTML.substr(12);
    let score = parseInt(current_score) + 1;
    let new_score = score.toFixed(0).toString();
    //let image_url = 'images/numbers/'+new_score+'.png';
    document.getElementById("score").innerHTML = "Your score: " + new_score;
}

function Compare(bird, obstacle)
{
    const bt = bird.getBoundingClientRect().top;
    const bb = bird.getBoundingClientRect().bottom;
    const bl = bird.getBoundingClientRect().left;
    const br = bird.getBoundingClientRect().right;

    const ot = obstacle.getBoundingClientRect().top;
    const ob = obstacle.getBoundingClientRect().bottom;
    const ol = obstacle.getBoundingClientRect().left;
    const or = obstacle.getBoundingClientRect().right;

    let result = false;

    if ((bt <= ot) && (bt >= ob) && (bl >= ol) && (bl <= or)) {result = true;}
    else if ((bb <= ot) && (bb >= ob) && (br <= ol) && (bl >= or)) {result = true;}
    else if ((bt <= ot) && (bt >= ob) && (br <= ol) && (bl >= or)) {result = true;}
    else if ((bb <= ot) && (bb >= ob) && (bl >= ol) && (bl <= or)) {result = true;}

    return result;
}
/*
function Compare_these() {
    function getPositions( elem ) {
        var pos, width, height;
        pos = elem.position();
        width = elem.clientWidth() / 2;
        height = elem.clientHeight();
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
*/