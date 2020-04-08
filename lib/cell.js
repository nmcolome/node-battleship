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

  render(showShips = false) {
    if(showShips && !this.wasFiredUpon && this.ship) { return 'S'}
    if(this.wasFiredUpon && !this.ship) { return 'M' }
    if(this.wasFiredUpon && !this.ship.health) { return 'X' }
    if(this.wasFiredUpon && this.ship) { return 'H' }
    if(!this.wasFiredUpon) { return '.' }
  }
}

module.exports = Cell;
