const { dataExample, raw } = require('./fixtures.js')
const as = require('../src/array_splitter');

describe("Test array splitter", () => {
  test("get 2 arrays for 2 sections", () => {
    let res = as.spllitArray(raw, dataExample);
    expect(res).toEqual(
      [
        [[0, 1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12], [13, 14, 15]],
        [[16, 17], [18, 19, 20, 21, 22, 23, 24], [25, 26, 27, 28, 29, 30, 31]],
        [[32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]],
        [[48, 49]]
      ]
    );
  });
  test("get map of splitted array", () => {
    let splited = as.spllitArray(raw, dataExample);
    let ret = as.getMap(splited, dataExample);
    expect(ret).toEqual(
      {
        0: [[0,0]], 1: [[0,1],[1,0]], 2: [[1,1]], 3: [[1,2],[2,0],[3,0]]
      }
    );
  });
});


