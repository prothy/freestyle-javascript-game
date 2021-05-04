import number from './number.js';

const grid = {
    gridElement: document.getElementsByClassName('grid')[0],
    cells: [],
    playable: false,
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

        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].number === null) {
                emptyCells.push(i);
            }
        }

        //Game over condition:
        if(emptyCells.length === 0) {
            return false;
        }

        return emptyCells[Math.floor(Math.random() * emptyCells.length)]
    }
}

export default grid;