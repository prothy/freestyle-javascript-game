'use strict';


document.addEventListener('DOMContentLoaded', () => {
    startGame()
})

function startGame() {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const wrapper = document.querySelector('.wrapper');


    /* PHSYICS CONSTANTS */
    const gravity = -250   // gravitational acceleration
    let velocity = 0;      // vertical velocity
    let initTime = Date.now()
    const interval = 20    // milliseconds per update
    const startTime = Date.now();

    let rotationTimer, currentRotation;
    let initRotation = 0;
    

    let gameStarted = false;

    let birdInitPos = 100;
    let birdBottom = birdInitPos;


    let score_counter = 0;

    function gameLoop() {
        let curTime = Date.now();
        let timeDiff = (curTime - initTime)/1000;

        if (birdBottom > 0 && gameStarted) birdBottom += (velocity * timeDiff) + (gravity * timeDiff**2)/2
        bird.style.bottom = birdBottom + 'px';
        
        // if (birdBottom === 0) break;
        document.addEventListener('keydown', jump);

        if (gameStarted) {
            checkCollision()
            score_counter += 1;
            if (score_counter === 50)
            {
                updateScore();
                score_counter = 0;
            }

            if ((startTime - curTime) % 2000 === 0) {
                wrapper.appendChild(new Obstacle());
            }
            console.log(currentRotation);
            checkCollision();
            if (birdBottom <= 0) gameOver();
        }
    }
    let timerId = setInterval(gameLoop, interval);


    function gameOver()
    {
        gameStarted = false;
        alert("Game Over!\nYou lost!");
        birdBottom = birdInitPos;
    }

    function checkCollision()
    {
        const obstacles = document.querySelectorAll('.obstacle');
        const bird_pos = document.querySelector('.bird');

        for (let obs of obstacles)
        {
            if (compare(bird_pos, obs)) {
                gameOver();
            }
        }
    }

    function compare(bird, obstacle)
    {
        const tolerance = 80;

        const bt = bird.getBoundingClientRect().top ;
        const bb = bird.getBoundingClientRect().bottom;
        const bl = bird.getBoundingClientRect().left;
        const br = bird.getBoundingClientRect().right;

        const ot = obstacle.getBoundingClientRect().top - tolerance;
        const ob = obstacle.getBoundingClientRect().bottom + tolerance;
        const ol = obstacle.getBoundingClientRect().left + tolerance;
        const or = obstacle.getBoundingClientRect().right - tolerance;

        return (!(bb < ot || br < ol || bl > or || bt > ob ));
    }

    function updateScore()
    {

        let current_score = document.getElementById("score").innerHTML.substr(12);
    let score = parseInt(current_score) + 1;
    let new_score = score.toFixed(0).toString();
    //let image_url = 'images/numbers/'+new_score+'.png';
    document.getElementById("score").innerHTML = "Your score: " + new_score;
    }

    function jump(e) {
        if (e.key == ' ') {
            if (!gameStarted) {
                gameStarted = true;
                document.querySelector('.start-game').style.display = 'none';
            }
            velocity = 55;
            initRotation = -45;

            rotationTimer = initTime;
            initTime = Date.now();

            currentRotation = ((115/1000)*(Math.floor(initTime - rotationTimer)));

            bird.style.bottom = birdBottom + 'px';

            // bird.animate({
            //     transform: [`rotate(${currentRotation}deg)`, `rotate(${initRotation}deg)`]
            // }, 100)

            bird.animate({
                transform: [`rotate(${currentRotation}deg)`, `rotate(${initRotation}deg)`, 'rotate(90deg)']
            }, {
                duration: 1000,
                easing: 'cubic-bezier(0,.8,.15,.6)'
            })
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
                transform: ['translateX(0px)', `translateX(-600px)`]
            }, 2000)
            
            obstacle.remove();
        }
    }
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
