import React from 'react';
import './hex.css';
import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';

const BASE_STYLE = {
  display: 'inline-block',
  margin: 0,
  padding: 0,
  width: '1.5em',
  textAlign: 'center',
};

const getStyle = (style, color) => {
  switch (style) {
    case 'item_part_of_group':
      return {
        ...BASE_STYLE,
        color: 'green',
        backgroundColor: color || '#C8C8C8',
      };
    case 'item_active':
      return {
        ...BASE_STYLE,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'green',
      };
    case 'item_disabled':
    default:
      return {
        ...BASE_STYLE,
        backgroundColor: '',
        color: '',
      };
  }
};

function Item({
  byteString, data, myStyle, color, onHover,
}) {
  return (
    <Tippy content={<p className="tool_top_txt">{data}</p>}>
      <li
        style={getStyle(myStyle, color)}
        onMouseOver={onHover}
        onFocus={() => {}}
      >
        {byteString}
      </li>
    </Tippy>
  );
}

Item.propTypes = {
  byteString: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  myStyle: PropTypes.string.isRequired,
  color: PropTypes.string,
  onHover: PropTypes.func.isRequired,
};

Item.defaultProps = {
  color: '',
};

export default React.memo(Item);
