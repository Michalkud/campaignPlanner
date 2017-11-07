import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const propTypes = {
  campaignId: PropTypes.number,
  start: PropTypes.object,
  end: PropTypes.object,
  visible: PropTypes.bool
};

class EditCampaignModal extends Component {

  render () {
    return (<Modal
      title="Basic Modal"
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
      {this.props.start && this.props.end &&
        <RangePicker
          onChange={console.log}
          defaultValue={[this.props.start, this.props.end]}
        />
      }
    </Modal>);

  }

}

EditCampaignModal.propTypes = propTypes;

export default EditCampaignModal;
