import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, DatePicker, Input, Select, Button } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const propTypes = {
  domains: PropTypes.array,
  channels: PropTypes.array,

  addCampaign: PropTypes.func.isRequired
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class CreateCampaignForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      campaignName: '',
      timeInterval: [],
      domains: [],
      channels: [],
      motto: '',
      description: '',
      target: '',
      budget: ''
    };

    this.onInputsChange = this.onInputsChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addCampaign = this.addCampaign.bind(this);
  }

  onChange(name, value) {
    this.setState({ [name]: value });
  }

  addCampaign() {
    this.props.addCampaign(this.state);
  }

  onInputsChange = (e) => this.onChange(e.target.name, e.target.value)

  render() {
    return (
      <Form onChange={this.onInputsChange}>
        <FormItem {...formItemLayout} label="Campaign name">
          <Input name="campaignName" />
        </FormItem>
        <FormItem {...formItemLayout} label="Time">
          <RangePicker onChange={(val) => this.onChange('timeInterval', val)} showTime="true" name="fromTo" format="YYYY-MM-DD HH:mm:ss" />
        </FormItem>
        <FormItem {...formItemLayout} label="Domains">
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={[]}
            name="domains"

          >
            {
              this.props.domains.map((domain, i) =>
                (<Option key={`domains_${i}`}>{domain}</Option>)
              )
            }
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Channels">
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={[]}
            name="channels"

          >
            {
              this.props.channels.map((channel, i) =>
                (<Option key={`channels_${i}`}>{channel}</Option>)
              )
            }
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Motto">
          <Input name="motto" />
        </FormItem>
        <FormItem {...formItemLayout} label="Description">
          <Input name="description" />
        </FormItem>
        <FormItem {...formItemLayout} label="Target">
          <Input name="target" />
        </FormItem>
        <FormItem {...formItemLayout} label="Budget">
          <Input name="budget" />
        </FormItem>
        <Button onClick={this.addCampaign} icon="plus-circle-o">Add campaign</Button>
      </Form>
    );
  }
}

CreateCampaignForm.propTypes = propTypes;
CreateCampaignForm.defaultProps = {
  domains: ['seznam.cz', 'atlas.cz', 'yahoo.com', 'bing.com', 'google.com'],
  channels: ['i dont know 1', 'i dont know 2']
};

export default CreateCampaignForm;
