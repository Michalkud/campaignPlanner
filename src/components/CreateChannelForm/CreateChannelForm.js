import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, Modal } from 'antd';

import SelectChannel from './components/SelectChannel';


const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const propTypes = {
  domains: PropTypes.array,
  channels: PropTypes.array,

  addCampaign: PropTypes.func.isRequired
};

class CreateCampaignForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
        id: props.id || '',
        name: props.name || '',
        channeTypeId: props.ChannelTypeId || '',
        startDate: props.startDate || null,
        endDate: props.endDate || null,
        campaignId: props.campaignId
    };

    this.onChange = this.onChange.bind(this);
    this.addChannel = this.addChannel.bind(this);
  }

  onChange(name, value) {
    this.setState({ [name]: value });
  }

  addChannel() {
    this.props.addCampaign(this.state);
   
  }

  handleChannelCreate = () => {

    this.props.mutate({ variables : this.state });
    this.props.closeModal();
    console.log('iam here');
  }

  render() {
    const { channelId } = this.state;

    return (
      <Modal
        title="Basic Modal"
        visible={this.props.modalVisible}
        onOk={this.handleChannelCreate}
        onCancel={this.props.closeModal}
      >
        <Form>
          <FormItem label="Název channelu">
            <Input onChange={ (e) => this.setState({ name : e.target.value })} />
          </FormItem>
          <FormItem label="Trvání">
            <RangePicker onChange={(neco, dates) => this.setState({ startDate: dates[0], endDate: dates[1] })} />
          </FormItem>
          <FormItem label="Kanál" >
            <SelectChannel key="channelTypeId" selectedId={channelId} onChange={(value) => this.setState({ channelTypeId : value })} />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

CreateCampaignForm.propTypes = propTypes;

export default CreateCampaignForm;
