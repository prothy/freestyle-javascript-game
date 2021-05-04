import number from './number.js'

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
    }
}

export default grid;