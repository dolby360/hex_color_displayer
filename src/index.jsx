import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-window';
import Item from './components/item';
import {
  buildSectionIndex, lookupSection, getStyleForByte,
  getRowCount, getRowItems, formatAddress,
} from './utils/hexUtils';
import './components/hex.css';

const HEADER_LABELS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

const noop = () => {};

function Header() {
  return (
    <div className="row">
      <div style={{ width: '4em', display: 'inline-block' }}>Address:</div>
      <div className="hex_row">
        {HEADER_LABELS.map((label) => (
          <li key={label} className="header_item_disabled">{label}</li>
        ))}
      </div>
      <div className="heading">Dump</div>
    </div>
  );
}

function HexRow({
  rowItems, rowOffset, sectionIndex, hoveredIndex, hoveredGId, onItemHover,
}) {
  return (
    <div className="row">
      <div className="heading">
        {' '}
        {formatAddress(rowOffset)}
        {' '}
      </div>
      <div className="hex_row">
        {rowItems.map((item, i) => {
          const globalIndex = rowOffset + i;
          const style = item.isPadding
            ? 'item_disabled'
            : getStyleForByte(sectionIndex, hoveredIndex, hoveredGId, globalIndex);
          return (
            <Item
              key={`hex-${globalIndex}`}
              byteString={item.hexString}
              data={item.name}
              myStyle={style}
              color={item.color}
              onHover={item.isPadding ? noop : onItemHover(globalIndex)}
            />
          );
        })}
      </div>
      <div className="hex_row">
        {rowItems.map((item, i) => {
          const globalIndex = rowOffset + i;
          const style = item.isPadding
            ? 'item_disabled'
            : getStyleForByte(sectionIndex, hoveredIndex, hoveredGId, globalIndex);
          return (
            <Item
              key={`ascii-${globalIndex}`}
              byteString={item.asciiChar}
              data={item.name}
              myStyle={style}
              color={item.color}
              onHover={item.isPadding ? noop : onItemHover(globalIndex)}
            />
          );
        })}
      </div>
    </div>
  );
}

HexRow.propTypes = {
  rowItems: PropTypes.arrayOf(PropTypes.shape({
    hexString: PropTypes.string,
    asciiChar: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
  })).isRequired,
  rowOffset: PropTypes.number.isRequired,
  sectionIndex: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    gId: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string,
  })).isRequired,
  hoveredIndex: PropTypes.number,
  hoveredGId: PropTypes.number,
  onItemHover: PropTypes.func.isRequired,
};

HexRow.defaultProps = {
  hoveredIndex: null,
  hoveredGId: null,
};

const MemoizedHexRow = React.memo(HexRow);

function VirtualRow({
  index: rowIndex, style: rowStyle, bin, sectionIndex, hoveredIndex, hoveredGId, onItemHover,
}) {
  const rowOffset = rowIndex * 16;
  const rowItems = getRowItems(bin, sectionIndex, rowIndex);

  return (
    <div style={rowStyle}>
      <MemoizedHexRow
        rowItems={rowItems}
        rowOffset={rowOffset}
        sectionIndex={sectionIndex}
        hoveredIndex={hoveredIndex}
        hoveredGId={hoveredGId}
        onItemHover={onItemHover}
      />
    </div>
  );
}

VirtualRow.propTypes = {
  index: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object.isRequired,
  bin: PropTypes.arrayOf(PropTypes.number).isRequired,
  sectionIndex: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    gId: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string,
  })).isRequired,
  hoveredIndex: PropTypes.number,
  hoveredGId: PropTypes.number,
  onItemHover: PropTypes.func.isRequired,
};

VirtualRow.defaultProps = {
  hoveredIndex: null,
  hoveredGId: null,
};

function HexColorDisplay({ bin, offsets, height }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sectionIndex = useMemo(
    () => buildSectionIndex(offsets, bin.length),
    [offsets, bin.length],
  );

  const rowCount = useMemo(() => getRowCount(bin.length), [bin.length]);

  const hoveredGId = useMemo(() => {
    if (hoveredIndex == null) return null;
    return lookupSection(sectionIndex, hoveredIndex).gId;
  }, [sectionIndex, hoveredIndex]);

  const onItemHover = useCallback(
    (index) => () => setHoveredIndex(index),
    [],
  );

  const rowProps = useMemo(() => ({
    bin, sectionIndex, hoveredIndex, hoveredGId, onItemHover,
  }), [bin, sectionIndex, hoveredIndex, hoveredGId, onItemHover]);

  return (
    <div>
      <ul><Header /></ul>
      <List
        rowComponent={VirtualRow}
        rowCount={rowCount}
        rowHeight={25}
        rowProps={rowProps}
        style={{ height }}
      />
    </div>
  );
}

HexColorDisplay.propTypes = {
  bin: PropTypes.arrayOf(PropTypes.number).isRequired,
  offsets: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
      sublist: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.number,
        end: PropTypes.number,
        name: PropTypes.string,
      })),
    }),
  ).isRequired,
  height: PropTypes.number,
};

HexColorDisplay.defaultProps = {
  height: 600,
};

export default HexColorDisplay;
