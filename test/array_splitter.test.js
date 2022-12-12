const { dataExample, raw } = require('./fixtures.js')
import spllitArray from '../src/array_splitter';

describe("Test array splitter", () => {
  test("get 2 arrays for 2 sections", () => {
    spllitArray(dataExample, raw)
  });
});
