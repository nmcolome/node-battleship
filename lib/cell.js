class Cell {
  constructor(coordinate) {
    this.coordinate = coordinate;
    this.ship = null;
    this.wasFiredUpon = false;
  }

  get isEmpty() {
    return this.ship === null;
  }

  placeShip(ship) {
    this.ship = ship;
  }

  fireUpon() {
    this.wasFiredUpon = true;
    if (this.ship) { this.ship.hit() };
  }
}

module.exports = Cell;
