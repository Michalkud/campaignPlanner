import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, Modal } from 'antd';
import moment from 'moment';

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
        id: null,
        name: '',
        channelTypeId: '',
        startDate: null,
        endDate: null,
        campaignId: props.campaignId
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      id: props.id || '',
      name: props.name || '',
      channelTypeId: props.channelType && props.channelType.id || '',
      startDate: props.startDate || null,
      endDate: props.endDate || null,
      campaignId: props.campaignId
    });
  }

  onChange(name, value) {
    this.setState({ [name]: value });
  }


  handleChannelCreate = () => {
    if (this.state.id) {
      //console.log(this.props);
      this.props.updateChannel({ variables : this.state });
    } else {
      this.props.createChannel({ variables : this.state });
    }
    this.props.closeModal();
  }

  render() {
    const { channelTypeId, startDate, endDate, name } = this.state;

    return (
      <Modal
        title="Nastavení kanálu"
        visible={this.props.modalVisible}
        onOk={this.handleChannelCreate}
        onCancel={this.props.closeModal}
      >
        <Form>
          <FormItem label="Název channelu">
            <Input value={name} onChange={ (e) => this.setState({ name : e.target.value })} />
          </FormItem>
          <FormItem label="Trvání">
            <RangePicker
              value={startDate && endDate && [moment(startDate), moment(endDate)]}
              onChange={(neco, dates) => this.setState({ startDate: dates[0], endDate: dates[1] })}
            />
          </FormItem>
          <FormItem label="Kanál" >
            <SelectChannel key="channelTypeId" selectedId={channelTypeId} onChange={(value) => this.setState({ channelTypeId : value })} />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

CreateCampaignForm.propTypes = propTypes;

export default CreateCampaignForm;
