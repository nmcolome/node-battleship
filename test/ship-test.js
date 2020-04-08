const assert = require('chai').assert;
const Ship = require('../lib/ship');

describe('Ship', () => {
  it('should be a function', () => {
    assert.isFunction(Ship);
  })

  it('should have a name', () => {
    const cruiser = Ship.new("Cruiser", 3);

    assert.equal(cruiser.name, 'Cruiser');
  })

  it('should have a length', () => {
    const cruiser = Ship.new("Cruiser", 3);

    assert.equal(cruiser.length, 3);
  })

  it('should have, by default, health points equal to length', () => {
    const cruiser = Ship.new("Cruiser", 3);

    assert.equal(cruiser.health, 3);
  })

  it('should not be sunk by default', () => {
    const cruiser = Ship.new("Cruiser", 3);

    assert.equal(cruiser.isSunk, false);
  })

  it('being hit reduces it\'s health by one', () => {
    const cruiser = Ship.new("Cruiser", 3);

    cruiser.hit()
    assert.equal(cruiser.health, 2)
  })

  it('sinks when it\'s health is reduced to zero', () => {
    const cruiser = Ship.new("Cruiser", 3);

    cruiser.hit()
    assert.equal(cruiser.isSunk, false);
    assert.equal(cruiser.health, 2)

    cruiser.hit()
    assert.equal(cruiser.isSunk, false);
    assert.equal(cruiser.health, 1)

    cruiser.hit()
    assert.equal(cruiser.isSunk, true);
  })
})
