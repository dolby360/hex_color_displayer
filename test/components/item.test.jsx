import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Item from '../../src/components/item';

jest.mock('@tippyjs/react', () => {
  const MockTippy = ({ children }) => <div>{children}</div>;
  return MockTippy;
});

describe('Item', () => {
  const defaultProps = {
    byteString: '4a',
    data: 'header',
    myStyle: 'item_disabled',
    color: '',
    onHover: jest.fn(),
  };

  test('renders byte string', () => {
    render(<Item {...defaultProps} />);
    expect(screen.getByText('4a')).toBeInTheDocument();
  });

  test('calls onHover on mouse over', () => {
    const onHover = jest.fn();
    render(<Item {...defaultProps} onHover={onHover} />);
    fireEvent.mouseOver(screen.getByText('4a'));
    expect(onHover).toHaveBeenCalledTimes(1);
  });

  test('applies active style with green background', () => {
    render(<Item {...defaultProps} myStyle="item_active" />);
    const li = screen.getByText('4a');
    expect(li).toHaveStyle({ backgroundColor: 'green', color: 'white' });
  });

  test('applies group style with default gray background', () => {
    render(<Item {...defaultProps} myStyle="item_part_of_group" />);
    const li = screen.getByText('4a');
    expect(li).toHaveStyle({ backgroundColor: '#C8C8C8', color: 'green' });
  });

  test('applies group style with custom color', () => {
    render(<Item {...defaultProps} myStyle="item_part_of_group" color="#FF0000" />);
    const li = screen.getByText('4a');
    expect(li).toHaveStyle({ backgroundColor: '#FF0000' });
  });

  test('applies disabled style with empty background', () => {
    render(<Item {...defaultProps} myStyle="item_disabled" />);
    const li = screen.getByText('4a');
    expect(li).toHaveStyle({ backgroundColor: '' });
  });
});
