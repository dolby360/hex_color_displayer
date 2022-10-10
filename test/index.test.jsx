import React from 'react';
import { render } from '@testing-library/react';
import HexColorDisplay from '../src/index';

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
];
const raw = [54, 22, 3, 6, 23, 6, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// ====================================
// Tests
// ====================================
// TODO: I actually don't know how I can test this.

describe("Dummy", () => {
  test("Dummy", () => {
    expect(1).toEqual(1);
  });
});
