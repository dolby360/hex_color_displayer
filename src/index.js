import React from 'react';
import './components/hex.css'
import {Item} from './components/item'

var Row = (listOfItems,ascii_array,index) =>{
  var pad = "000000";
  var hexString = index.toString(16);
  var heading = ''+ hexString;
  heading = pad.substring(0, pad.length - heading.length) + heading;
  heading += ":";
  return (
      <div className="row">
          <div className="heading"> {heading} </div>
          <div className="hex_row">{listOfItems}</div>
          <div className="hex_row">{ascii_array}</div>
      </div>
  );
}

var title = () =>{
  var list = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'] 
  const listItems = list.map((item) =>
      <li className="header_item_disabled">{item}</li>
  );
  return(
      <div className="row">
          <div style={{ width: "4em", display: "inline-block"}}>Address:</div>
          <div className="hex_row">{listItems}</div>
          <div className="heading">Dump</div>
      </div>  
  );
}

class HexColorDisplay extends React.Component {
    constructor(props){
        super(props);
        this.hex_items_list = [];
        this.ascii_items_list = [];
        this.saveState = []
        this.save_hex_items_list = []
        this.save_ascii_items_list = []
        this.state = {
            rows : [],
          };
    }


    updateItemStyle = (index, style) => {
        this.hex_items_list[index] = this.getItem(style,
            this.hex_items_list[index].props.iId,
            this.hex_items_list[index].props.gId,
            this.hex_items_list[index].props.byteString,
            this.hex_items_list[index].props.data,
            this.hex_items_list[index].props.indexInList,
            this.hex_items_list[index].props.color
            );
        this.ascii_items_list[index] = this.getItem(style,
            this.ascii_items_list[index].props.iId,
            this.ascii_items_list[index].props.gId,
            this.ascii_items_list[index].props.byteString,
            this.ascii_items_list[index].props.data,
            this.ascii_items_list[index].props.indexInList,
            this.ascii_items_list[index].props.color
            );
    }

    // used as a callback in item to update all other items
    updateItems = (index, gid) => {
        this.hex_items_list = Array.from(this.save_hex_items_list);
        this.ascii_items_list = Array.from(this.save_ascii_items_list);
        var i = index;
        for( ; i > 0; i--){
            if(this.hex_items_list[i].props.gId !== gid){
                break;
            }
        }
        let startIndexToUpdate = i; // to use later when updating rowState
        let groupFound = false;
        let style = 'item_disabled'
        for(; i < this.hex_items_list.length; i++){
            if(this.hex_items_list[i].props.gId === gid && gid !== -1){
                groupFound = true;
                if(index === i){
                    style = 'item_active'
                }else{
                    style = 'item_part_of_group'
                }
            }else{
                style = 'item_disabled'
            }
            this.updateItemStyle(i,style)
            if(groupFound && this.hex_items_list[i].props.gId !== gid){
                break;
            }
        }
        this.setState({
            rows : this.saveState
        }, () =>  this.updateRowState(startIndexToUpdate) );
    }

    updateRowState = (startIndexToUpdate) => {
        let rowNumber = Math.floor(startIndexToUpdate / 16);
        let rowState = this.state.rows;
        let resoluton = 100;
        for(let i = 0; i < resoluton; i++){
            let rowNumberToUpdate = ((rowNumber <= (resoluton/2)) 
                ? i : (rowNumber - ((resoluton/2)) + i));           
            let startIndex = (rowNumberToUpdate * 16);
            if(startIndex >= this.hex_items_list.length){
                break;
            }
            let hex_array = this.hex_items_list.slice(startIndex,startIndex+16)
            let ascii_array = this.ascii_items_list.slice(startIndex,startIndex+16)
            rowState[rowNumberToUpdate] = Row(hex_array,ascii_array,startIndex) 
        }
        this.setState({
            rows : rowState
        })
    }

    splitItemsList = () => {
        let arr = []
        for(let i = 0; i < this.hex_items_list.length; i+=16){
            let hex_array = this.hex_items_list.slice(i,i+16)
            let ascii_array = this.ascii_items_list.slice(i,i+16)
            for(let j = hex_array.length; j < 16; j++){
                let item = this.getItem(
                    'item_disabled',-1,-1,'.','',ascii_array.length,''
                )
                hex_array.push(item);
                ascii_array.push(item);
            }
            arr.push(Row(hex_array,ascii_array,i))
        }
        this.setState({
            rows: arr,
        }, () =>
            this.saveState = this.state.rows
        )
    }

    getItem = (style, iid, gid, byteString, data, index, color, masterGid = null) => {
        return(
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
        )
    }

    updateItemInList = (iid, gid, byteString, data, color, masterGid = null) => {
        this.hex_items_list.push(
            this.getItem('item_disabled', iid, gid, byteString.toString(16),
                data, this.hex_items_list.length, color, masterGid)
        )
        // Show just ascii characters
        let c = byteString < 127 && byteString > 31 ? 
            String.fromCharCode(byteString) : '.';
        
        this.ascii_items_list.push(
            this.getItem('item_disabled', iid, gid, c, data, 
                this.ascii_items_list.length, color, masterGid)
        );
    }

    setChunk = (chunk, title, startIndex, gid) => {
        for(let i = 0; i < chunk.length; i++){
            this.updateItemInList(startIndex + i, gid, chunk[i], title, '', null);
        }
    }

    setItems = (data, buffer) => {
        let gid = 0;
        for(let i = 0; i < data.length; i++){
            let startIndex = data[i].start;
             
            if(data[i].sublist.length > 0){
                this.setChunk(
                    buffer.slice(data[i].start, data[i].sublist[0].start), 
                        data[i].name, startIndex, gid);
                for(let k = 0; k < data[i].sublist.length; k++){
                    this.setChunk(
                        buffer.slice(data[i].sublist[k].start, data[i].sublist[k].end), 
                        data[i].sublist[k].name, startIndex, gid);
                    startIndex += data[i].sublist[k].end;
                }
            }else{
                this.setChunk(
                    buffer.slice(data[i].start, data[i].end), 
                    data[i].name, startIndex, gid);
            }
            gid++;
        }
        let end_of_data = data[data.length - 1].end;
        this.setChunk(
            buffer.slice(end_of_data, buffer.length), 
            'unlabeled', end_of_data, -1);
    }

    componentDidMount = () => {
        var buffer = [];
		var bytes = this.props.bin.length;
		var i = 0;
        for (i = 0; i < bytes; i++) {
            buffer.push(this.props.bin[i]);
        }
        this.setItems(this.props.offsets, buffer);
        this.splitItemsList();
        this.initializationFinished = true;
        this.save_hex_items_list = Array.from(this.hex_items_list);
        this.save_ascii_items_list = Array.from(this.ascii_items_list);
    };
 
    render(){
        let Header = title();
        return (
            <div>
                <ul>{Header}</ul>
                <ul>{this.state.rows}</ul>
            </div>
        );
    }
}

export default HexColorDisplay;