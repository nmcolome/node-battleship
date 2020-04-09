const assert = require('chai').assert;
const Board = require('../lib/board');
const Cell = require('../lib/cell');
const Ship = require('../lib/ship');

describe('Board', () => {
  it('should be a function', () => {
    assert.isFunction(Board);
  })

  it('is instantiated with 16 cells (4x4 board)', () => {
    const board = new Board();

    assert.equal(typeof board.cells, 'object');
    assert.equal(Object.keys(board.cells).length, 16);
    assert.equal(Object.keys(board.cells)[0], 'A1');
    assert.instanceOf(Object.values(board.cells)[0], Cell);
  })

  it('validates if a coordinate exists on the board or not', () => {
    const board = new Board();

    assert.equal(board.isValidCoordinate("A1"), true)
    assert.equal(board.isValidCoordinate("D4"), true)
    assert.equal(board.isValidCoordinate("A5"), false)
    assert.equal(board.isValidCoordinate("E1"), false)
    assert.equal(board.isValidCoordinate("A22"), false)
  })

  describe('validates the placement of a ship', () => {
    it('validates number of coordinates matches ship length', () => {
      const board = new Board();
      const cruiser = new Ship("Cruiser", 3);
      const submarine = new Ship("Submarine", 2);

      assert.equal(board.itMatchesLength(cruiser, ["A1", "A2"]), false)
      assert.equal(board.itMatchesLength(submarine, ["A2", "A3", "A4"]), false)
    })

    it('validates that the coordinates are consecutive', () => {
      const board = new Board();
      const cruiser = new Ship("Cruiser", 3);
      const submarine = new Ship("Submarine", 2);

      assert.equal(board.areConsecutive(cruiser, ["A1", "A2", "A4"]), false)
      assert.equal(board.areConsecutive(submarine, ["A1", "C1"]), false)
      assert.equal(board.areConsecutive(cruiser, ["A3", "A2", "A1"]), false)
      assert.equal(board.areConsecutive(submarine, ["C1", "B1"]), false)
    })

    it('validates that the coordinates are not diagonal', () => {
      const board = new Board();
      const cruiser = new Ship("Cruiser", 3);
      const submarine = new Ship("Submarine", 2);

      assert.equal(board.isDiagonal(cruiser, ["A1", "B2", "C3"]), false)
      assert.equal(board.isDiagonal(submarine, ["C2", "D3"]), false)
    })

    it('validates all conditions to place a ship', () => {
      const board = new Board();
      const cruiser = new Ship("Cruiser", 3);
      const submarine = new Ship("Submarine", 2);
  
      //the number of coordinates in the array should be the same as the length of the ship
      assert.equal(board.isValidPlacement(cruiser, ["A1", "A2"]), false)
      assert.equal(board.isValidPlacement(submarine, ["A2", "A3", "A4"]), false)
  
      //the coordinates are consecutive:
      assert.equal(board.isValidPlacement(cruiser, ["A1", "A2", "A4"]), false)
      assert.equal(board.isValidPlacement(submarine, ["A1", "C1"]), false)
      assert.equal(board.isValidPlacement(cruiser, ["A3", "A2", "A1"]), false)
      assert.equal(board.isValidPlacement(submarine, ["C1", "B1"]), false)
  
      //coordinates can’t be diagonal:
      assert.equal(board.isValidPlacement(cruiser, ["A1", "B2", "C3"]), false)
      assert.equal(board.isValidPlacement(submarine, ["C2", "D3"]), false)
  
      //every case must pass
      assert.equal(board.isValidPlacement(submarine, ["A1", "A2"]), true)
      assert.equal(board.isValidPlacement(cruiser, ["B1", "C1", "D1"]), true)
    })
  })

})