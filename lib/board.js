const Cell = require('../lib/cell');

class Board {
  constructor() {
    this.abc = 'ABCDEFGHIJKLMONPQRSTUVWXYZ'.split('')
    this.cells = this.generateCells();
  }

  generateCells() {
    const cells = {};
    for(let i = 0; i < 4; i++) {
      for(let j = 1; j < 5; j++) {
        const coord = this.abc[i] + (j);
        cells[coord] = new Cell(coord);
      }
    }
    return cells;
  }
};

module.exports = Board;
