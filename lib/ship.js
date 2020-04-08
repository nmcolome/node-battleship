class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.health = length;
  }

  get isSunk() {
    return this.health === 0;
  }

  hit() {
    return --this.health;
  }
}

module.exports = Ship;
