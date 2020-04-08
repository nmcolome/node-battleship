const assert = require('chai').assert;
const Board = require('../lib/board');
const Cell = require('../lib/cell');

describe('Board', () => {
  it('should be a function', () => {
    assert.isFunction(Board);
  })

  it('is instantiated with 16 cells (4x4 board)', () => {
    board = new Board();
    console.log(board.cells)

    assert.equal(typeof board.cells, 'object');
    assert.equal(Object.keys(board.cells).length, 16);
    assert.instanceOf(Object.values(board.cells)[0], Cell);
  })
})