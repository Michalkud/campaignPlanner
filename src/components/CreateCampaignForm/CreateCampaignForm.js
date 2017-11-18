import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, DatePicker, Select, Button } from 'antd';

import ChannelTypes from './components/ChannelTypes';
import Domains from './components/Domains';
import Goals from './components/Goals';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const InputGroup = Input.Group;
const Option = Select.Option;

const propTypes = {
  domains: PropTypes.array,
  channels: PropTypes.array,

  addCampaign: PropTypes.func.isRequired
};

class CreateCampaignForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      domains: [],
      channels: [],
      goals: [],
      motto: '',
      description: '',
      target: '',
      budget: {},
      utmCampaign: '',
      startDate: null,
      endDate: null
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

  handleChannelChange = (id, checked) => {
    const { channels } = this.state;
    this.setState({ channels: checked ? 
      [...channels, id] :
      channels.filter( channelId => channelId !== id)
    });
  };

  handleDomainChange = (id, checked) => {
    const { domains } = this.state;
    this.setState({ domains: checked ?
      [...domains, id] :
      domains.filter( domainId => domainId !== id)
    });
  };


  handleGoalChange = (id, checked) => {
    const { goals } = this.state;
    this.setState({ goals: checked ?
      [...goals, id] :
      goals.filter( goalId => goalId !== id)
    });
  };

  handleCampaignCreate = () => {

    this.props.mutate({ variables : this.state });

  }

  render() {
    const { channels, domains, goals } = this.state;

    return (
      <Form>
        <FormItem label="Název kampaně">
          <Input onChange={ (e) => this.setState({ name : e.target.value })} />
        </FormItem>
        <FormItem label="Trvání">
          <RangePicker onChange={(neco, dates) => this.setState({ startDate: dates[0], endDate: dates[1] })} />
        </FormItem>
        <FormItem label="UTM_campaign">
          <Input placeholder="Název utm kampaně" onChange={ (e) => this.setState({ utmCampaign : e.target.value })} />
        </FormItem>
        <FormItem label="Kanály" >
          <ChannelTypes key="channels" checkedIds={channels} onChange={this.handleChannelChange} />
        </FormItem>
        <FormItem label="Domény">
          <Domains key="domains" checkedIds={domains} onChange={this.handleDomainChange} />
        </FormItem>
        <FormItem label="Motto">
          <TextArea
            placeholder="There is place for your motto"
            autosize={{ minRows: 2, maxRows: 2 }}
            onChange={(e) => this.setState({ motto: e.target.value })}
          />
        </FormItem>
        <FormItem label="Budget">
          <InputGroup compact={true} >
            <InputNumber style={{ width: '20%' }} onChange={(value) => this.setState({ budget : { ...this.state.budget, amnout: value } })} />
            <Select defaultValue="CZK" onChange={(value) => this.setState({ budget : { ...this.state.budget, currency: value } })} >
              <Option value="CZK">CZK</Option>
              <Option value="USD">USD</Option>
              <Option value="EUR">EUR</Option>
            </Select>
          </InputGroup>
        </FormItem>
        <FormItem label="Cíl" >
          <Goals checkedIds={goals} onChange={this.handleGoalChange} />
        </FormItem>
        <Button onClick={this.handleCampaignCreate}> Add </Button>
      </Form>
    );
  }
}

CreateCampaignForm.propTypes = propTypes;

export default CreateCampaignForm;
