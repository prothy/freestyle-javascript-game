import grid from './grid.js';

grid.init();

document.addEventListener('keyup', function (event) {
    let direction = null;

    if (event.key === 'ArrowUp') {
        direction = 'UP';
    } else if (event.key === 'ArrowRight') {
        direction = 'RIGHT';
    } else if (event.key === 'ArrowLeft') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowDown') {
        direction = 'DOWN';
    }

    if (direction !== null) {
        grid.slide(direction);
    }

    return false;
});
