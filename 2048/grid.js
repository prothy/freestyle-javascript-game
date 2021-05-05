import number from './number.js';

const grid = {
    gridElement: document.getElementsByClassName('grid')[0],
    cells: [],
    playable: false,
    directionRoots: {
        //Stores the first row's and column's indexes according to the swipe:
        'UP': [1, 2, 3, 4],
        'RIGHT': [4, 8, 12, 16],
        'DOWN': [13, 14, 15, 16],
        'LEFT': [1, 5, 9, 13]
    },
    init: function () {
        const cellElements = document.getElementsByClassName('cell');
        let cellIndex = 1;

        for(let cellElement of cellElements) {
            grid.cells[cellIndex] = {
                element: cellElement,
                top: cellElement.offsetTop,
                left: cellElement.offsetLeft,
                number: null
            }

            cellIndex++;
        }

        //Create the first number and start the game:
        number.spawn();
        this.playable = true;
    },
    randomEmptyCellIndex: function () {
        let emptyCells = [];

        for (let i = 1; i < this.cells.length; i++) {
            if (this.cells[i].number === null) {
                emptyCells.push(i);
            }
        }

        //Game over condition:
        if(emptyCells.length === 0) {
            return false;
        }

        return emptyCells[Math.floor(Math.random() * emptyCells.length)]
    },
    slide: function (direction) {
        if (!this.playable) {
            return false;
        }
        this.playable = false;

        //Define the direction's original indexes:
        const roots = this.directionRoots[direction];

        // Change the indexes according to the direction:
        // If the direction of the swipe is right or down change the index by -1 else 1.
        let increment = (direction === 'RIGHT' || direction === 'DOWN') ? -1 : 1
        // If the direction is UP or DOWN increment the position by the cells else stay in place.
        increment *= (direction === 'UP' || direction === 'DOWN') ? 4 : 1;

        for (let i = 0; i < roots.length; i++) {
            const root = roots[i];
        }
    }
}

export default grid;