// ====================================
// Test Fixtures
// ====================================
const dataExample = [
    {
      start: 0,
      end: 13,
      name: 'Header',
      color: '', // Color feature has not yet implemented
      sublist: [],
    },
    {
      start: 13,
      end: 18,
      name: 'Header',
      color: '', // Color feature has not yet implemented
      sublist: [],
    },
    {
      start: 18,
      end: 25,
      name: 'Header',
      color: '', // Color feature has not yet implemented
      sublist: [],
    },
    {
      start: 25,
      end: 50,
      name: 'Header',
      color: '', // Color feature has not yet implemented
      sublist: [],
    },
  ];
const raw = [0, 1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 
            16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 
            32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 
            48, 49];
  
module.exports = { dataExample, raw };
