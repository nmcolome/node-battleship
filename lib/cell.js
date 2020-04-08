class Cell {
  constructor(coordinate) {
    this.coordinate = coordinate;
    this.ship = null;
  }

  get isEmpty() {
    return this.ship === null;
  }

  placeShip(ship) {
    this.ship = ship;
  }
}

module.exports = Cell;
