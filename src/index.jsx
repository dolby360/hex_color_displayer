import React from 'react';
import './components/hex.css';

import PropTypes from 'prop-types';
import Item from './components/item';
import { spllitArray, getMap } from './array_splitter';

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

const createRows = (splited, mapOfgroups, offsets) => {
  let rows = []
  let row = []
  let asciiRow = []
  let len = 0;
  let numOfRows = 0;
  for(let k in mapOfgroups){
    let v = mapOfgroups[k];
    // Go over all arrays that belong to this group
    // I is a tuple of [row, column]
    for(let i of v){
      if (len < 16){
        let rowNumber = i[0]
        let subArray = i[1]
        len += splited[rowNumber][subArray].length;
        let iter = splited[rowNumber][subArray];
        for(let ind = 0; ind < iter.length; ind++){
          let num = iter[ind];
          const c = num < 127 && num > 31
            ? String.fromCharCode(num) : '.';
          row.push(
            <Item
              data={offsets[k].name}
              myStayle={'item_disabled'}
              byteString={num.toString(16)}
            />)
          asciiRow.push(
            <Item
              data={offsets[k].name}
              myStayle={'item_disabled'}
              byteString={c}
            />)
        }
      }else{
        rows.push(Row(row, asciiRow, numOfRows))
        row = [];
        asciiRow = [];
        len = 0;
        numOfRows++;
      }
    }
  }
  return rows;
}

const HexColorDisplay = ({
  rawData, offsets
}) => {
  const Header = title();

  let splited = spllitArray(rawData, offsets);
  let mapOfgroups = getMap(splited, offsets);
  let rows = createRows(splited, mapOfgroups, offsets);
  
  return (
    <div>
      <ul>{Header}</ul>
      <ul>{rows}</ul>
    </div>
  );
}

export default HexColorDisplay;
