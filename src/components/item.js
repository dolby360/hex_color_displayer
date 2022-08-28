import React from 'react';
import './hex.css'
import Tooltip from '@material-ui/core/Tooltip';

const getStyle = (style,props) => {
    let parthOfTheGroupStyle = {
        display : 'inline-block',
        margin : 0, padding : 0,
        width: "1.5em", textAlign : 'center',
        color: 'green',
        backgroundColor : '#C8C8C8'
    }
    switch (style) {
        case 'item_part_of_group':
            if(props.color !== ''){
                parthOfTheGroupStyle.backgroundColor = props.color;
            }
            return parthOfTheGroupStyle;
        case 'item_active':
            parthOfTheGroupStyle.font_weight = 'bold';
            parthOfTheGroupStyle.color = 'white';
            parthOfTheGroupStyle.backgroundColor = 'green';
            return parthOfTheGroupStyle;
        case 'item_disabled':
        default:
            parthOfTheGroupStyle.backgroundColor = '';
            parthOfTheGroupStyle.color = '';
            return parthOfTheGroupStyle;
    }
}

const mouseEvent = (props) =>{
    props.updateItemsStyle(props.indexInList, props.gId)
}

export const Item = (props) => {
    return(
        <Tooltip title={props.data}>
            <li style={getStyle(props.myStyle,props)}
                onMouseOver={ () => mouseEvent(props) } 
                >
                {props.byteString}
            </li>
        </Tooltip>
    )
}