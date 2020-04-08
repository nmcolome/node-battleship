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

  it('renders a ”.” if the cell has not been fired upon', () => {
    const cell = new Cell('B4');

    assert.equal(cell.render(), ".");
  })

  it('renders an “M” if the cell has been fired upon and it does not contain a ship (the shot was a miss)', () => {
    const cell = new Cell('B4');
    cell.fireUpon();

    assert.equal(cell.render(), "M");
  })

  it('renders an “H” if the cell has been fired upon and it contains a ship (the shot was a hit)', () => {
    const cell = new Cell('B4');
    const cruiser = new Ship("Cruiser", 3);

    cell.placeShip(cruiser);
    cell.fireUpon();

    assert.equal(cell.render(), "H");
  })

  it('renders an “X” if the cell has been fired upon and its ship has been sunk', () => {
    const cell = new Cell('B4');
    const cruiser = new Ship("Cruiser", 3);

    cell.placeShip(cruiser);
    cell.fireUpon();
    cell.fireUpon();
    cell.fireUpon();

    assert.equal(cell.render(), "X");
  })

  it('renders an “S” if the cell has not been fired upon and contains a ship when we pass a "true" argument to render', () => {
    const cell = new Cell('B4');
    const cruiser = new Ship("Cruiser", 3);

    cell.placeShip(cruiser);

    assert.equal(cell.render(true), "S");
  })

  it('test all renderings', () => {
    const cell = new Cell('B4');
    const cruiser = new Ship("Cruiser", 3);
    cell.placeShip(cruiser);

    assert.equal(cell.render(), ".");
    assert.equal(cell.render(true), "S");

    cell.fireUpon();
    assert.equal(cell.render(), "H");

    cell.fireUpon();
    cell.fireUpon();
    assert.equal(cell.ship.isSunk, true);
    assert.equal(cell.render(), "X");
  })
})
