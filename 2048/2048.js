const game = {
    gridDisplay: null,
    scoreDisplay: null,
    resultDisplay: null,
    highScoreDisplay: null,
    boardWidth: 4,
    squares: [],
    score: 0,


    init: function () {
        this.gridDisplay = document.querySelector('.grid');
        this.scoreDisplay = document.querySelector('#score');
        this.resultDisplay = document.querySelector('#result');
        this.highScoreDisplay = document.querySelector('#high-score');

        this.highScoreDisplay.textContent = localStorage.getItem("highScore") ? JSON.parse(localStorage.getItem("highScore")) : 0;

        this.createBoard();
        document.addEventListener('keyup', handler = (event) => this.keyBoardControl(event));

    },

    createBoard: function () {
        for (let i = 0; i < this.boardWidth * this.boardWidth; i++) {
            const square = document.createElement('div');
            square.textContent = '0';
            this.gridDisplay.appendChild(square);
            this.squares.push(square);
        }
        //Generate two random number in the beginning of the game:
        this.generate();
        this.generate();
    },

    generate: function () {
        let randomNumber = Math.floor(Math.random() * this.squares.length)
        if (this.squares[randomNumber].textContent === '0') {
            this.squares[randomNumber].textContent = '2';
            this.checkForGameOver();
        } else this.generate();
        this.updateColors();
    },

    moveHorizontal: function (direction) {
        const rowStartIndices = [0, 4, 8, 12];
        for (let i of rowStartIndices) {
            const rowIndices = [i, i + 1, i + 2, i + 3];
            const row = rowIndices.map(index => this.squares[index]);
            const rowContents = row.map(square => parseInt(square.textContent));

            const nonZeroSquares = rowContents.filter(num => num);
            const zeroes = Array(this.boardWidth - nonZeroSquares.length).fill(0);
            const newRow = direction === "right" ? zeroes.concat(nonZeroSquares) : nonZeroSquares.concat(zeroes);

            row.map((square, i) => square.textContent = newRow[i].toString());
        }

    },

    moveVertical: function (direction) {
        const colStartIndices = [0, 1, 2, 3];
        for (let i of colStartIndices) {
            const colIndices = [i, i + this.boardWidth, i + (this.boardWidth * 2), i + (this.boardWidth * 3)];
            const col = colIndices.map(index => this.squares[index]);
            const colContents = col.map(square => parseInt(square.textContent));

            const nonZeroSquares = colContents.filter(num => num);
            const zeroes = Array(this.boardWidth - nonZeroSquares.length).fill(0);
            const newCol = direction === "down" ? zeroes.concat(nonZeroSquares) : nonZeroSquares.concat(zeroes);

            col.map((square, i) => square.textContent = newCol[i].toString());
        }
    },

    combineRow: function () {
        for (let i = 0; i < 15; i++) {
            const firstSquare = this.squares[i];
            const secondSquare = this.squares[i + 1];

            this.combine(firstSquare, secondSquare);

        }
        this.checkForWin();
    },

    combineColumn: function () {
        for (let i = 0; i < 12; i++) {
            const firstSquare = this.squares[i];
            const secondSquare = this.squares[i + this.boardWidth];

            this.combine(firstSquare, secondSquare);

        }
        this.checkForWin();
    },

    combine: function (firstSquare, secondSquare) {
        if (firstSquare.textContent === secondSquare.textContent) {
            const combinedTotal = parseInt(firstSquare.textContent) + parseInt(secondSquare.textContent)
            firstSquare.textContent = combinedTotal.toString();
            secondSquare.textContent = "0";
            this.score += combinedTotal;
            this.scoreDisplay.textContent = this.score.toString();

            // store score to local storage if higher
            this.updateLocalScore();
        }
        this.updateColors();
    },

    // Assign the defined function
    keyBoardControl: function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.moveHorizontal("left");
                this.combineRow();
                this.moveHorizontal("left");
                this.generate();
                break;
            case "ArrowRight":
                this.moveHorizontal("right");
                this.combineRow();
                this.moveHorizontal("right");
                this.generate();
                break;
            case "ArrowUp":
                this.moveVertical("up");
                this.combineColumn();
                this.moveVertical("up");
                this.generate();
                break;
            case "ArrowDown":
                this.moveVertical("down");
                this.combineColumn();
                this.moveVertical("down");
                this.generate();
                break;
        }
    },

    // Look for the number 2048 in the array to invoke the win condition:
    checkForWin: function () {
        const winningSquares = this.squares.some(square => square.textContent === "2048");
        if (winningSquares) {
            this.resultDisplay.textContent = "You have won the game! Congratulations!";
            document.removeEventListener('keyup', handler);
        }
    },

    // Looks for the zeros on the board for lose condition:
    checkForGameOver: function () {
        const zeroes = this.squares.filter(square => square.textContent === "0");
        if (!zeroes.length) {
            this.resultDisplay.textContent = 'You lose. Better luck new time.';
            document.removeEventListener('keyup', handler);
        }

    },

    updateColors: function () {
        const colorLookup = {
            "0": "rgb(175,161,146)",
            "2": "rgb(238,228,218)",
            "4": "rgb(237,224,200)",
            "8": "rgb(242,177,121)",
            "16": "rgb(255,206,164)",
            "32": "rgb(232,192,100)",
            "64": "rgb(255,171,110)",
            "128": "rgb(253,153,130)",
            "256": "rgb(234,215,156)",
            "512": "rgb(118,218,255)",
            "2048": "rgb(215,212,240)",
            "1024": "rgb(190,234,165)",
        }

        for (let square of this.squares) {
            square.style.backgroundColor = colorLookup[square.textContent];
        }
    },

    updateLocalScore: function () {
        if (this.score > parseInt(this.highScoreDisplay.textContent)) {
            localStorage.setItem("highScore", JSON.stringify(this.score))

        }
        console.log("high score: ", localStorage.getItem("highScore"));
    }
}


document.addEventListener('DOMContentLoaded', () => {
    game.init();
})