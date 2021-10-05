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
    
    let obstacleSpawnInterval = 4000;

    let gameStarted = false;

    let birdInitPos = 100;
    let birdBottom = birdInitPos;


    let score_counter = 0;

    function gameLoop() {
        let curTime = Date.now();
        let timeDiff = (curTime - initTime)/1000;

        if (birdBottom > 0 && gameStarted) birdBottom += (velocity * timeDiff) + (gravity * timeDiff**2)/2
        bird.style.bottom = birdBottom + 'px';


        document.addEventListener('keydown', jump);

        if (gameStarted) {
            let timeCheck = startTime - curTime;
            if ((timeCheck) % 2000 === 0) wrapper.appendChild(new Obstacle());
            if ((timeCheck) % (Math.floor((Math.random() * 150))) === 0) wrapper.appendChild(new BackgroundObject());
            if ((timeCheck) % obstacleSpawnInterval === 0 && obstacleSpawnInterval > 1400) obstacleSpawnInterval -= 400;
            checkCollision()
            score_counter += 1;
            if (score_counter === 50)
            {
                updateScore();
                score_counter = 0;
            }
            console.log(currentRotation);
            if (birdBottom <= 0) gameOver();
        }
    }
    let timerId = setInterval(gameLoop, interval);


    function gameOver()
    {
        gameStarted = false;
        birdBottom = birdInitPos;
        currentRotation = 0;
        initRotation = 0;

        let score_str = document.getElementById('score').innerHTML;
        let score_int = parseInt(score_str.substr(12));
        let highscore = document.getElementById('highscore').innerHTML;
        let highscore_int = parseInt(highscore.substr(15));
        let message = "Press space to try again";

        if (score_int > highscore_int)
        {
            highscore = "Highest score: " + score_int.toString();
            document.getElementById("highscore").innerHTML = highscore;
            message = "New Record: " + score_int.toString() + "<br>" + "Press space to try again";
        }
        else
        {
            message =  score_str + '<br>' + "Press space to try again";
        }

        document.querySelector('.start-game').style.display = 'initial';
        document.getElementById('start').innerHTML = message;
        document.getElementById('score').innerHTML = 'Your score: 0';
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
        const tolerance = 10;

        const bt = bird.getBoundingClientRect().top;
        const bb = bird.getBoundingClientRect().bottom;
        const bl = bird.getBoundingClientRect().left;
        const br = bird.getBoundingClientRect().right;

        const ot = obstacle.getBoundingClientRect().top + tolerance;
        const ob = obstacle.getBoundingClientRect().bottom - tolerance;
        const ol = obstacle.getBoundingClientRect().left + tolerance;
        const or = obstacle.getBoundingClientRect().right - tolerance;

        return (!(bb < ot || br < ol || bl > or || bt > ob ));
    }

    function updateScore()
    {

        let current_score = document.getElementById("score").innerHTML.substr(12);
        let score = parseInt(current_score) + 1;
        let new_score = score.toFixed(0).toString();
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
            obstacle.style.left = `${wrapper.clientWidth}px`;
            obstacle.style.zIndex = '3';

            obstacle.animate({
                transform: ['translateX(0px)', `translateX(-2000px)`]
            }, obstacleSpawnInterval * 2)
            
            obstacle.remove();
        }
    }

    class BackgroundObject {
        constructor() {
            const bgObj = document.createElement('div');

            this.setProperties(bgObj);

            return bgObj;
        }

        setProperties(obj) {
            let randomY = Math.floor(Math.random() * wrapper.clientHeight);
            let randomSize = Math.floor(Math.random() * 15);


            obj.style.position = 'absolute';
            obj.style.top = `${randomY}px`;
            obj.style.left = `${wrapper.clientWidth}px`
            obj.style.width = `${randomSize}px`;
            obj.style.height = obj.style.width;
            obj.style.background = 'white';
            obj.style.borderRadius = '50%';
            obj.style.zIndex = '1';
            obj.style.filter = `opacity(${Math.random()/2 + 0.4})`

            obj.animate({
                transform: ['translateX(0px)', `translateX(-2000px)`]
            }, 4000)
            
            obj.remove();
        }
    }
}