import {React, useState, useEffect} from 'react';
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

const HexColorDisplay = (props) => {
  const [rows, setrows] = useState([]);
  const [startIndexToUpdate, setstartIndexToUpdate] = useState(1);
  const [saveState, setSaveState] = useState(rows)
  
    let hexItemsList = [];
    let asciiItemsList = [];
    let saveHexItemsList = [];
    let saveAsciiItemsList = [];


  // used as a callback in item to update all other items

  // data is json struct that folds all offsets data.
  // buffer is the binary buffer.

  useEffect(() => {
    HexColorDisplay.propTypes = {
      bin: PropTypes.string.isRequired,
      offsets: PropTypes.number.isRequired,

    };
    const buffer = [];
    const { bin, offsets } = props;
    bin.forEach((item) => {
      buffer.push(item);
    });
    setItems(offsets, buffer);
    splitItemsList();
    saveHexItemsList = Array.from(hexItemsList);
    saveAsciiItemsList = Array.from(asciiItemsList);
  }, []);

  useEffect(() => {
    updateRowState(startIndexToUpdate);
  }),[startIndexToUpdate];

  useEffect(()=>{
    setSaveState(rows);
  },[rows])

  const updateItemStyle = (index, style) => {
    hexItemsList[index] = getItem(
      style,
      hexItemsList[index].props.iId,
      hexItemsList[index].props.gId,
      hexItemsList[index].props.byteString,
      hexItemsList[index].props.data,
      hexItemsList[index].props.indexInList,
      hexItemsList[index].props.color,
    );
    asciiItemsList[index] = getItem(
      style,
      asciiItemsList[index].props.iId,
      asciiItemsList[index].props.gId,
      asciiItemsList[index].props.byteString,
      asciiItemsList[index].props.data,
      asciiItemsList[index].props.indexInList,
      asciiItemsList[index].props.color,
    );
  };
  

  const updateItems = (index, gid) => {
    hexItemsList = Array.from(saveHexItemsList);
    asciiItemsList = Array.from(saveAsciiItemsList);
    let startIndexToUpdate = index; // to use later when updating rowState
    hexItemsList.slice(0, index).reverse().every((item) => {
      if (item.props.gId !== gid) {
        return false;
      }
      startIndexToUpdate -= 1;
      return true;
    });
    let groupFound = false;
    let style = 'item_disabled';
    hexItemsList.every((item, i) => {
      if (item.props.gId === gid && gid !== -1) {
        groupFound = true;
        if (index === i) {
          style = 'item_active';
        } else {
          style = 'item_part_of_group';
        }
      } else {
        style = 'item_disabled';
      }
      updateItemStyle(i, style);
      if (groupFound && item.props.gId !== gid) {
        return false;
      }
      return true;
    });

    setrows(saveState);
    setstartIndexToUpdate(startIndexToUpdate)
    // setState({
    //   rows: saveState,
    // }, () => updateRowState(startIndexToUpdate));
  };

  const updateRowState = (startIndexToUpdate) => {
    debugger
    let rowNumber = Math.floor(startIndexToUpdate / 16);
    const rowState = rows;
    const resoluton = 100;
    for (let i = 0; i < resoluton; i += 1) {
      const rowNumberToUpdate = ((rowNumber <= (resoluton / 2))
        ? i : (rowNumber - ((resoluton / 2)) + i));
      const startIndex = (rowNumberToUpdate * 16);
      if (startIndex >= hexItemsList.length) {
        break;
      }
      const hexArray = hexItemsList.slice(startIndex, startIndex + 16);
      const asciiArray = asciiItemsList.slice(startIndex, startIndex + 16);
      rowState[rowNumberToUpdate] = Row(hexArray, asciiArray, startIndex);
    }

    setrows(rowState);
  };

  const splitItemsList = () => {
    const arr = [];
    for (let i = 0; i < hexItemsList.length; i += 16) {
      const hexArray = hexItemsList.slice(i, i + 16);
      const asciiArray = asciiItemsList.slice(i, i + 16);
      for (let j = hexArray.length; j < 16; j += 1) {
        const item = getItem('item_disabled', -1, -1, '.', '', asciiArray.length, '');
        hexArray.push(item);
        asciiArray.push(item);
      }
      arr.push(Row(hexArray, asciiArray, i));
    }

    setrows(arr);
    // setSaveState(rows)
    // setState({
    //   rows: arr,
    // }, () => { saveState = rows; });
  };

  const getItem = (style, iid, gid, byteString, data, index, color, masterGid = null) => (
    <Item
      byteString={byteString}
      gId={gid}
      iId={iid}
      updateItemsStyle={updateItems}
      myStyle={style}
      data={data}
      indexInList={index}
      color={color}
      masterGid={masterGid}
    />
  );

  const updateItemInList = (iid, gid, byteString, data, color, masterGid = null) => {
    hexItemsList.push(
      getItem(
        'item_disabled',
        iid,
        gid,
        byteString.toString(16),
        data,
        hexItemsList.length,
        color,
        masterGid,
      ),
    );
    // Show just ascii characters
    const c = byteString < 127 && byteString > 31
      ? String.fromCharCode(byteString) : '.';

    asciiItemsList.push(
      getItem(
        'item_disabled',
        iid,
        gid,
        c,
        data,
        asciiItemsList.length,
        color,
        masterGid,
      ),
    );
  };

  const setChunk = (chunk, name, startIndex, gid) => {
    chunk.forEach((item, index) => {
      this.updateItemInList(`${startIndex} ${index}`, gid, item, name, '', null);
    });
  };

  const setItems = (data, buffer) => {
    let gid = 0;
    data.forEach((item) => {
      let startIndex = item.start;
      if (item.sublist.length > 0) {
        setChunk(
          buffer.slice(item.start, item.sublist[0].start),
          item.name,
          startIndex,
          gid,
        );
        item.sublist.forEach((element) => {
          setChunk(
            buffer.slice(element.start, element.end),
            element.name,
            startIndex,
            gid,
          );
          startIndex += element.end;
        });
      } else {
        setChunk(
          buffer.slice(item.start, item.end),
          item.name,
          startIndex,
          gid,
        );
      }
      gid += 1;
    });
    const endOfData = data[data.length - 1].end;
    setChunk(
      buffer.slice(endOfData, buffer.length),
      'unlabeled',
      endOfData,
      -1,
    );
  };

    const Header = title();
    return (
      <div>
        <ul>{Header}</ul>
        <ul>{rows}</ul>
      </div>
    );
}

export default HexColorDisplay;