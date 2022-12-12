import React from 'react';
import './components/hex.css';

import PropTypes from 'prop-types';
import Item from './components/item';

function Row(listOfItems, asciiArray, index) {
  const pad = '000000';
  const hexString = index.toString(16);
  let heading = `${hexString}`;

  heading = `${pad.substring(0, pad.length - heading.length)} ${heading} :`;
  return (
    <div className="row">
      <div className="heading">
        {' '}
        {heading}
        {' '}
      </div>
      <div className="hex_row">{listOfItems}</div>
      <div className="hex_row">{asciiArray}</div>
    </div>
  );
}

const title = () => {
  const list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  const listItems = list.map((item) => <li className="header_item_disabled">{item}</li>);
  return (
    <div className="row">
      <div style={{ width: '4em', display: 'inline-block' }}>Address:</div>
      <div className="hex_row">{listItems}</div>
      <div className="heading">Dump</div>
    </div>
  );
};

const HexColorDisplay = ({
  bin, offsets
}) => {
  const Header = title();
  return (
    <div>
      <ul>{Header}</ul>
    </div>
  );
}

export default HexColorDisplay;
