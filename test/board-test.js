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

    assert.equal(board.isValidCoordinate('A1'), true)
    assert.equal(board.isValidCoordinate('D4'), true)
    assert.equal(board.isValidCoordinate('A5'), false)
    assert.equal(board.isValidCoordinate('E1'), false)
    assert.equal(board.isValidCoordinate('A22'), false)
  })

  describe('validates the placement of a ship', () => {
    it('gets column keys out of coordinates', () => {
      const board = new Board();

      assert.deepEqual(board.getColumns(['A1', 'A2']), ['A', 'A'])
      assert.deepEqual(board.getColumns(['B1', 'C1', 'D1']), ['B', 'C', 'D'])
    })

    it('gets rows keys out of coordinates', () => {
      const board = new Board();

      assert.deepEqual(board.getRows(['A1', 'A2']), ['1', '2'])
      assert.deepEqual(board.getRows(['B1', 'C1', 'D1']), ['1', '1', '1'])
    })

    it('validates if coordinates are horizontal', () => {
      const board = new Board();

      assert.equal(board.isHorizontal(['A1', 'A2']), true)
      assert.equal(board.isHorizontal(['B1', 'C1', 'D1']), false)
    })

    it('validates if coordinates are vertical', () => {
      const board = new Board();

      assert.equal(board.isVertical(['A1', 'A2']), false)
      assert.equal(board.isVertical(['B1', 'C1', 'D1']), true)
    })

    it('validates number of coordinates matches ship length', () => {
      const board = new Board();
      const cruiser = new Ship('Cruiser', 3);
      const submarine = new Ship('Submarine', 2);

      assert.equal(board.itMatchesLength(cruiser, ['A1', 'A2']), false)
      assert.equal(board.itMatchesLength(submarine, ['A2', 'A3', 'A4']), false)
    })

    it('validates that the coordinates are consecutive', () => {
      const board = new Board();

      assert.equal(board.areConsecutive(['A1', 'A2', 'A4']), false)
      assert.equal(board.areConsecutive(['A1', 'C1']), false)
      assert.equal(board.areConsecutive(['A3', 'A2', 'A1']), false)
      assert.equal(board.areConsecutive(['C1', 'B1']), false)
    })

    it('validates distance between rows or columns based on charCode', () => {
      const board = new Board();

      assert.deepEqual(board.getDifference(['1', '2', '4']), [1, 2])
      assert.deepEqual(board.getDifference(['B', 'C', 'D']), [1, 1])
    })

    it('validates that the coordinates are not diagonal', () => {
      const board = new Board();

      assert.equal(board.isDiagonal(['A1', 'B2', 'C3']), false)
      assert.equal(board.isDiagonal(['C2', 'D3']), false)
    })

    it('validates all conditions to place a ship', () => {
      const board = new Board();
      const cruiser = new Ship('Cruiser', 3);
      const submarine = new Ship('Submarine', 2);
  
      //the number of coordinates in the array should be the same as the length of the ship
      assert.equal(board.isValidPlacement(cruiser, ['A1', 'A2']), false)
      assert.equal(board.isValidPlacement(submarine, ['A2', 'A3', 'A4']), false)
  
      //the coordinates are consecutive:
      assert.equal(board.isValidPlacement(cruiser, ['A1', 'A2', 'A4']), false)
      assert.equal(board.isValidPlacement(submarine, ['A1', 'C1']), false)
      assert.equal(board.isValidPlacement(cruiser, ['A3', 'A2', 'A1']), false)
      assert.equal(board.isValidPlacement(submarine, ['C1', 'B1']), false)
  
      //coordinates can’t be diagonal:
      assert.equal(board.isValidPlacement(cruiser, ['A1', 'B2', 'C3']), false)
      assert.equal(board.isValidPlacement(submarine, ['C2', 'D3']), false)
  
      //every case must pass
      assert.equal(board.isValidPlacement(submarine, ['A1', 'A2']), true)
      assert.equal(board.isValidPlacement(cruiser, ['B1', 'C1', 'D1']), true)
    })
  })

})