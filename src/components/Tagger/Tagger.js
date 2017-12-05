import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag; 



class Tagger extends Component {

  propTypes = {
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
      })
    ),
    checkedIds: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func
  }

  render() {
    const { tags, checkedIds, onChange } = this.props;
    return (
      <div>
        {tags.map(tag => (
          <CheckableTag
            key={tag.id}
            checked={checkedIds.indexOf(tag.id) > -1}
            onChange={checked => onChange(tag.id, checked)}
          >
            {tag.name}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

export default Tagger;
