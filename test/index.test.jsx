import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HexColorDisplay from '../src/index';

jest.mock('@tippyjs/react', () => {
  const MockTippy = ({ children }) => <div>{children}</div>;
  return MockTippy;
});

jest.mock('react-window', () => ({
  List: ({ rowComponent: RowComponent, rowCount, rowProps }) => (
    <div>
      {Array.from({ length: rowCount }, (_, i) => (
        <RowComponent key={i} index={i} style={{}} {...rowProps} />
      ))}
    </div>
  ),
}));

const simpleOffsets = [
  { start: 0, end: 3, name: 'Header', color: '', sublist: [] },
];
const simpleBin = [65, 66, 67, 68, 69]; // A=0x41, B=0x42, C=0x43, D=0x44, E=0x45

describe('HexColorDisplay', () => {
  test('renders without crashing', () => {
    render(<HexColorDisplay bin={simpleBin} offsets={simpleOffsets} />);
  });

  test('displays hex values for the binary data', () => {
    render(<HexColorDisplay bin={simpleBin} offsets={simpleOffsets} />);
    expect(screen.getByText('41')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('43')).toBeInTheDocument();
  });

  test('displays ASCII characters', () => {
    render(<HexColorDisplay bin={simpleBin} offsets={simpleOffsets} />);
    expect(screen.getAllByText('A').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('B').length).toBeGreaterThanOrEqual(1);
  });

  test('displays address header', () => {
    render(<HexColorDisplay bin={simpleBin} offsets={simpleOffsets} />);
    expect(screen.getByText('Address:')).toBeInTheDocument();
  });

  test('displays hex column headers', () => {
    render(<HexColorDisplay bin={simpleBin} offsets={simpleOffsets} />);
    expect(screen.getByText('Dump')).toBeInTheDocument();
  });

  test('hovering an item highlights it as active', () => {
    render(<HexColorDisplay bin={simpleBin} offsets={simpleOffsets} />);
    const hexItem = screen.getByText('41');
    fireEvent.mouseOver(hexItem);
    expect(hexItem).toHaveStyle({ backgroundColor: 'green', color: 'white' });
  });

  test('hovering highlights other items in the same group', () => {
    render(<HexColorDisplay bin={simpleBin} offsets={simpleOffsets} />);
    const hexItem = screen.getByText('41');
    fireEvent.mouseOver(hexItem);
    const groupItem = screen.getByText('42');
    expect(groupItem).toHaveStyle({ backgroundColor: '#C8C8C8' });
  });

  test('renders with sublists', () => {
    const offsetsWithSub = [{
      start: 0,
      end: 6,
      name: 'parent',
      color: '',
      sublist: [
        { start: 0, end: 3, name: 'sub1', color: '', sublist: [] },
        { start: 3, end: 6, name: 'sub2', color: '', sublist: [] },
      ],
    }];
    const bin = [65, 66, 67, 68, 69, 70];
    render(<HexColorDisplay bin={bin} offsets={offsetsWithSub} />);
    expect(screen.getByText('41')).toBeInTheDocument();
    expect(screen.getByText('46')).toBeInTheDocument();
  });

  test('renders multiple sections', () => {
    const offsets = [
      { start: 0, end: 2, name: 'sec1', color: '', sublist: [] },
      { start: 2, end: 4, name: 'sec2', color: '', sublist: [] },
    ];
    const bin = [65, 66, 67, 68];
    render(<HexColorDisplay bin={bin} offsets={offsets} />);
    expect(screen.getByText('41')).toBeInTheDocument();
    expect(screen.getByText('44')).toBeInTheDocument();
  });
});
