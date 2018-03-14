import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, Modal, Button, Popconfirm } from 'antd';
import moment from 'moment';

import SelectChannel from './components/SelectChannel';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const propTypes = {
  domains: PropTypes.array,
  channels: PropTypes.array,
  channelTypeId: PropTypes.any
};

class CreateCampaignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      channelTypeId: '',
      startDate:
        (props.selectedInterval && props.selectedInterval.start) || null,
      endDate: (props.selectedInterval && props.selectedInterval.end) || null,
      campaignId: props.campaignId
    };

    this.onChange = this.onChange.bind(this);
  }

  
  
  _handleKeyDown = (event) => {
    const ENTER_KEY = 13;
    if (this.props.modalVisible) {
      switch ( event.keyCode ) {
          case ENTER_KEY:
              this.handleChannelCreate()
              break;
          default: 
              break;
      }
    }
  }
  
  
  componentWillMount() {
      document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }
  
  
  componentWillUnmount() {
      document.removeEventListener('keydown', this._handleKeyDown.bind(this));
  }

  componentWillReceiveProps(props) {
    this.setState({
      id: props.id || '',
      name: props.name || '',
      channelTypeId:
        props.channelTypeId ||
        (props.channelType && props.channelType.id) ||
        '',
      startDate: props.startDate || null,
      endDate: props.endDate || null,
      campaignId: props.campaignId
    });
  }

  onChange(name, value) {
    this.setState({ [name]: value });
  }

  deleteChannel = () => {
    this.props.deleteChannel({
      variables: { id: this.state.id }
    });
    this.props.closeModal();
  } 

  handleChannelCreate = () => {
    if (this.state.id) {
      //console.log(this.props);
      this.props.updateChannel({ variables: this.state });
    } else {
      this.props.createChannel({ variables: this.state });
    }
    this.props.closeModal();
  };

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
            <Input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </FormItem>
          <FormItem label="Trvání">
            <RangePicker
              value={
                startDate && endDate && [moment(startDate), moment(endDate)]
              }
              onChange={(neco, dates) =>
                this.setState({ startDate: dates[0], endDate: dates[1] })
              }
            />
          </FormItem>
          {!this.props.channelTypeId && (
            <FormItem label="Kanál">
              <SelectChannel
                key="channelTypeId"
                selectedId={channelTypeId}
                onChange={value => this.setState({ channelTypeId: value })}
              />
            </FormItem>
          )}
        </Form>
        {this.props.id && (
          <Popconfirm 
            placement="top" 
            title={'Opravdu chcete tento channel smazat?'} 
            onConfirm={this.deleteChannel} okText="Ano" cancelText="Ne">
            <Button type="danger">Smazat</Button>
          </Popconfirm>
        )}
      </Modal>
    );
  }
}

CreateCampaignForm.propTypes = propTypes;

export default CreateCampaignForm;
