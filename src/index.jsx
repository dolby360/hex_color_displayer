import React from 'react';
import './components/hex.css';

import Item from './components/item';

function Row(listOfItems, asciiArray, index) {
  const pad = '000000';
  const hexString = index.toString(16);
  let heading = `${hexString}`;

  heading = pad.substring(0, pad.length - heading.length) + heading;
  heading += ':';
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

class HexColorDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.hexItemsList = [];
    this.asciiItemsList = [];
    this.saveState = [];
    this.saveHexItemsList = [];
    this.saveAsciiItemsList = [];
    this.state = {
      rows: [],
    };
  }

  // used as a callback in item to update all other items

  // data is json struct that folds all offsets data.
  // buffer is the binary buffer.

  componentDidMount() {
    const buffer = [];
    const bytes = this.props.bin.length;
    let i = 0;

    for (i = 0; i < bytes; i += 1) {
      buffer.push(this.props.bin[i]);
    }
    this.setItems(this.props.offsets, buffer);
    this.splitItemsList();
    this.initializationFinished = true;
    this.saveHexItemsList = Array.from(this.hexItemsList);
    this.saveAsciiItemsList = Array.from(this.asciiItemsList);
  }

  updateItemStyle = (index, style) => {
    this.hexItemsList[index] = this.getItem(
      style,
      this.hexItemsList[index].props.iId,
      this.hexItemsList[index].props.gId,
      this.hexItemsList[index].props.byteString,
      this.hexItemsList[index].props.data,
      this.hexItemsList[index].props.indexInList,
      this.hexItemsList[index].props.color,
    );
    this.asciiItemsList[index] = this.getItem(
      style,
      this.asciiItemsList[index].props.iId,
      this.asciiItemsList[index].props.gId,
      this.asciiItemsList[index].props.byteString,
      this.asciiItemsList[index].props.data,
      this.asciiItemsList[index].props.indexInList,
      this.asciiItemsList[index].props.color,
    );
  };

  updateItems = (index, gid) => {
    this.hexItemsList = Array.from(this.saveHexItemsList);
    this.asciiItemsList = Array.from(this.saveAsciiItemsList);
    let i = index;

    for (; i > 0; i -= 1) {
      if (this.hexItemsList[i].props.gId !== gid) {
        break;
      }
    }

    const startIndexToUpdate = i; // to use later when updating rowState
    let groupFound = false;
    let style = 'item_disabled';
    for (; i < this.hexItemsList.length; i += 1) {
      if (this.hexItemsList[i].props.gId === gid && gid !== -1) {
        groupFound = true;
        if (index === i) {
          style = 'item_active';
        } else {
          style = 'item_part_of_group';
        }
      } else {
        style = 'item_disabled';
      }
      this.updateItemStyle(i, style);
      if (groupFound && this.hexItemsList[i].props.gId !== gid) {
        break;
      }
    }
    this.setState({
      rows: this.saveState,
    }, () => this.updateRowState(startIndexToUpdate));
  };

  updateRowState = (startIndexToUpdate) => {
    const rowNumber = Math.floor(startIndexToUpdate / 16);
    const rowState = this.state.rows;
    const resoluton = 100;
    for (let i = 0; i < resoluton; i += 1) {
      const rowNumberToUpdate = ((rowNumber <= (resoluton / 2))
        ? i : (rowNumber - ((resoluton / 2)) + i));
      const startIndex = (rowNumberToUpdate * 16);
      if (startIndex >= this.hexItemsList.length) {
        break;
      }
      const hexArray = this.hexItemsList.slice(startIndex, startIndex + 16);
      const asciiArray = this.asciiItemsList.slice(startIndex, startIndex + 16);
      rowState[rowNumberToUpdate] = Row(hexArray, asciiArray, startIndex);
    }
    this.setState({
      rows: rowState,
    });
  };

  splitItemsList = () => {
    const arr = [];
    for (let i = 0; i < this.hexItemsList.length; i += 16) {
      const hexArray = this.hexItemsList.slice(i, i + 16);
      const asciiArray = this.asciiItemsList.slice(i, i + 16);
      for (let j = hexArray.length; j < 16; j += 1) {
        const item = this.getItem('item_disabled', -1, -1, '.', '', asciiArray.length, '');
        hexArray.push(item);
        asciiArray.push(item);
      }
      arr.push(Row(hexArray, asciiArray, i));
    }
    this.setState({
      rows: arr,
    }, () => { this.saveState = this.state.rows; });
  };

  getItem = (style, iid, gid, byteString, data, index, color, masterGid = null) => (
    <Item
      byteString={byteString}
      gId={gid}
      iId={iid}
      updateItemsStyle={this.updateItems}
      myStyle={style}
      data={data}
      indexInList={index}
      color={color}
      masterGid={masterGid}
    />
  );

  updateItemInList = (iid, gid, byteString, data, color, masterGid = null) => {
    this.hexItemsList.push(
      this.getItem(
        'item_disabled',
        iid,
        gid,
        byteString.toString(16),
        data,
        this.hexItemsList.length,
        color,
        masterGid,
      ),
    );
    // Show just ascii characters
    const c = byteString < 127 && byteString > 31
      ? String.fromCharCode(byteString) : '.';

    this.asciiItemsList.push(
      this.getItem(
        'item_disabled',
        iid,
        gid,
        c,
        data,
        this.asciiItemsList.length,
        color,
        masterGid,
      ),
    );
  };

  setChunk = (chunk, name, startIndex, gid) => {
    for (let i = 0; i < chunk.length; i += 1) {
      this.updateItemInList(startIndex + i, gid, chunk[i], name, '', null);
    }
  };

  setItems = (data, buffer) => {
    let gid = 0;
    for (let i = 0; i < data.length; i += 1) {
      let startIndex = data[i].start;

      if (data[i].sublist.length > 0) {
        this.setChunk(
          buffer.slice(data[i].start, data[i].sublist[0].start),
          data[i].name,
          startIndex,
          gid,
        );
        for (let k = 0; k < data[i].sublist.length; k += 1) {
          this.setChunk(
            buffer.slice(data[i].sublist[k].start, data[i].sublist[k].end),
            data[i].sublist[k].name,
            startIndex,
            gid,
          );
          startIndex += data[i].sublist[k].end;
        }
      } else {
        this.setChunk(
          buffer.slice(data[i].start, data[i].end),
          data[i].name,
          startIndex,
          gid,
        );
      }
      gid += 1;
    }
    const endOfData = data[data.length - 1].end;
    this.setChunk(
      buffer.slice(endOfData, buffer.length),
      'unlabeled',
      endOfData,
      -1,
    );
  };

  render() {
    const Header = title();
    return (
      <div>
        <ul>{Header}</ul>
        <ul>{this.state.rows}</ul>
      </div>
    );
  }
}

export default HexColorDisplay;
