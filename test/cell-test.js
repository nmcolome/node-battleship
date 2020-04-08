const assert = require('chai').assert;
const Cell = require('../lib/cell')
const Ship = require('../lib/ship')

describe('Cell', () => {
  it('should be a function', () => {
    assert.isFunction(Cell);
  })

  it('should have a coordinate', () => {
    const cell = new Cell('B4');

    assert.equal(cell.coordinate, 'B4');
  })

  it('should not contain a ship by default', () => {
    const cell = new Cell('B4');

    assert.equal(cell.ship, null);
  })

  it('should be empty by default', () => {
    const cell = new Cell('B4');

    assert.equal(cell.isEmpty, true);
  })

  it('places a ship, cell is no longer empty and it contains a ship', () => {
    const cell = new Cell('B4');
    const cruiser = new Ship("Cruiser", 3);

    cell.placeShip(cruiser);
    assert.equal(cell.isEmpty, false);
    assert.equal(cell.ship, cruiser);
  })

  it('knows when it has been fired upon', () => {
    const cell = new Cell('B4');
    const cruiser = new Ship("Cruiser", 3);

    cell.placeShip(cruiser);
    assert.equal(cell.wasFiredUpon, false);

    cell.fireUpon();
    assert.equal(cell.ship.health, 2);
    assert.equal(cell.wasFiredUpon, true);
  })
})
