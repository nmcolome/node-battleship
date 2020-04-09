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

  isValidCoordinate(coord) {
    return Object.keys(this.cells).includes(coord)
  }

  itMatchesLength(ship, coordinates) {
    return ship.length === coordinates.length
  }

  getColumns(coordinates) {
    return coordinates.map(coord => coord[0]);
  }

  getRows(coordinates) {
    return coordinates.map(coord => coord[1]);
  }

  isHorizontal(coordinates) {
    const columns = this.getColumns(coordinates)
    return columns.every(e => e === columns[0]);
  }

  isVertical(coordinates) {
    const rows = this.getRows(coordinates);
    return rows.every(e => e === rows[0]);
  }

  areConsecutive(coordinates) {
    if(this.isHorizontal(coordinates)) {
      return this.getDifference(this.getRows(coordinates)).every(e => e === 1);
    }
    return this.getDifference(this.getColumns(coordinates)).every(e => e === 1);
  }

  getDifference(collection) {
    const diff = [];
    for(let i = 0; i < collection.length - 1; i++) {
      diff.push(collection[i + 1].charCodeAt(0) - collection[i].charCodeAt(0))
    }
    return diff;
  }

  isDiagonal(coordinates) {
    return this.isHorizontal(coordinates) || this.isVertical(coordinates);
  }

  noOverlap(coordinates) {
    return coordinates.every(coord => this.cells[coord].isEmpty === true);
  }

  isValidPlacement(ship, coord) {
    return this.itMatchesLength(ship, coord) && this.areConsecutive(coord) && this.isDiagonal(coord) && this.noOverlap(coord)
  }
};

module.exports = Board;
