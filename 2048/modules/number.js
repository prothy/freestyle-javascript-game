const number = {
    numbers: [],
    getElements: function () {
        const numberOfElements = document.getElementsByClassName('number');

        for (let numberOfElement of numberOfElements) {
            this.numbers.push(numberOfElement);
        }
    },
    spawn: function () {
        const emptyCellIndex = grid.randomEmptyCellIndex();

    }
}