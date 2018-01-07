import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;



class Tagger extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: props.initialTags };
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
            className={tag.colorClass}
          >
            {tag.name}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

Tagger.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      colorClass: PropTypes.string,
    })
  ),
  checkedIds: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
};
Tagger.defaultProps = { initialTags: { tags: [], checkedIds: [] } };

export default Tagger;
