import React from 'react';
import './hex.css'
import Tooltip from '@material-ui/core/Tooltip';

const get_style = (style,props) => {
    let part_of_the_group_style = {
        display : 'inline-block',
        margin : 0, padding : 0,
        width: "1.5em", textAlign : 'center',
        color: 'green',
        backgroundColor : '#C8C8C8'
    }
    switch (style) {
        case 'item_part_of_group':
            if(props.color !== ''){
                part_of_the_group_style.backgroundColor = props.color;
            }
            return part_of_the_group_style;
        case 'item_active':
            part_of_the_group_style.font_weight = 'bold';
            part_of_the_group_style.color = 'white';
            part_of_the_group_style.backgroundColor = 'green';
            return part_of_the_group_style;
        case 'item_disabled':
        default:
            part_of_the_group_style.backgroundColor = '';
            part_of_the_group_style.color = '';
            return part_of_the_group_style;
    }
}

const mouseEvent = (props) =>{
    props.updateItemsStyle(props.indexInList, props.gId)
}

export const Item = (props) => {
    return(
        <Tooltip title={props.data}>
            <li style={get_style(props.myStyle,props)} 
                onMouseOver={ () => mouseEvent(props) } 
                >
                {props.byteString}
            </li>
        </Tooltip>
    )
}