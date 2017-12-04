import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, DatePicker, Select, Button, Row, Col } from 'antd';
import moment from 'moment';

import ChannelTypes from './components/ChannelTypes';
import Domains from './components/Domains';
//import Goals from './components/Goals';
import SelectGoals from './components/GoalsSelect';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const InputGroup = Input.Group;
const Option = Select.Option;

const propTypes = {
  domains: PropTypes.array,
  channels: PropTypes.array,

  //addCampaign: PropTypes.func.isRequired
};

class CreateCampaignForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      domainsIds: [],
      channelTypesIds: [],
      goalsIds: [],
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
  }

  onChange(name, value) {
    this.setState({ [name]: value });
  }

  componentWillReceiveProps(props) {
    if (props.queryData && props.queryData.Campaign) {
      const { queryData: { Campaign } } = props;
      this.setState({
        id: Campaign.id || null,
        name: Campaign.name || '',
        domainsIds: Campaign.domains && Campaign.domains.map(d => d.id) || [],
        channelTypesIds: Campaign.channelTypes && Campaign.channelTypes.map(ct => ct.id) || [],
        goalsIds: Campaign.goals && Campaign.goals.map(ct => ct.id) || [],
        motto: Campaign.motto || '',
        description: Campaign.description || '',
        target: Campaign.target || '',
        budget: Campaign.budget || {},
        utmCampaign: Campaign.utmCampaign || '',
        startDate: Campaign.startDate || null,
        endDate: Campaign.endDate || null
      });
    } else {
      this.setState({
        name: '',
        domainsIds: [],
        channelTypesIds: [],
        goalsIds: [],
        motto: '',
        description: '',
        target: '',
        budget: {},
        utmCampaign: '',
        startDate: null,
        endDate: null
      });
    }
  }

  onInputsChange = (e) => this.onChange(e.target.name, e.target.value)

  handleChannelTypesChange = (id, checked) => {
    const { channelTypesIds } = this.state;
    this.setState({ channelTypesIds: checked ?
      [...channelTypesIds, id] :
      channelTypesIds.filter( channelTypeId => channelTypeId !== id)
    });
  };

  handleDomainChange = (id, checked) => {
    const { domainsIds } = this.state;
    this.setState({ domainsIds: checked ?
      [...domainsIds, id] :
      domainsIds.filter( domainId => domainId !== id)
    });
  };


  handleGoalChange = (id) => {
    this.setState({ goalsIds: id });
  };

  handleCampaignCreate = () => {
    this.props.createCampaign({ variables : this.state }).then( (data) => (data));
  }

  handleCampaignUpdate = () => {
    this.props.updateCampaign({ variables : this.state });
  }

  render() {
    const { channelTypesIds, domainsIds, goalsIds, name, startDate, endDate, budget, motto, utmCampaign } = this.state;
    return (
      <Form>
      <Row gutter={8}>
        <Col md={6} lg={4}>
            <Input placeholder="Název kampaně" value={name} onChange={ (e) => this.setState({ name : e.target.value })} />
        </Col>
        <Col md={{ span:4 }} lg={4}>
            <SelectGoals checkedIds={goalsIds} onChange={this.handleGoalChange} />
        </Col>
        <Col md={{ span:6 }} lg={4}>
          <Input placeholder="Název UTM kampaně" value={utmCampaign} onChange={ (e) => this.setState({ utmCampaign : e.target.value })} />
        </Col>
        <Col md={{ span:8 }} lg={{ span:6, offset:4 }}>
          <RangePicker
              value={startDate && endDate && [moment(startDate), moment(endDate)]}
              onChange={(neco, dates) => this.setState({ startDate: dates[0], endDate: dates[1] })} />
        </Col>
    </Row>
    <Row>
      <Col md={16}>
        <Row>
          <Col md={24} lg={12}>
            <FormItem label="Kanály" >
              <ChannelTypes key="channelTypes" checkedIds={channelTypesIds} onChange={this.handleChannelTypesChange} />
            </FormItem>
          </Col>
          <Col md={24} lg={12}>
          <FormItem label="Domény">
            <Domains key="domains" checkedIds={domainsIds} onChange={this.handleDomainChange} />
          </FormItem>
          </Col>
        </Row>
      </Col>
      <Col md={8}>
      <FormItem label="Budget">
        <InputGroup compact={true} >
          <InputNumber
            value={budget && budget.amount}
            style={{ width: '100px' }} onChange={(value) => this.setState({ budget : { ...this.state.budget, amount: value } })}
          />
          <Select defaultValue="CZK" onChange={(value) => this.setState({ budget : { ...this.state.budget, currency: value } })} >
            <Option value="CZK">CZK</Option>
            <Option value="USD">USD</Option>
            <Option value="EUR">EUR</Option>
          </Select>
        </InputGroup>
      </FormItem>
      </Col>
    </Row>
    <Row>
      <Col>
        <FormItem label="Myšlenka kampaně">
          <TextArea
            value={motto}
            placeholder="There is place for your motto"
            autosize={{ minRows: 2, maxRows: 2 }}
            onChange={(e) => this.setState({ motto: e.target.value })}
          />
        </FormItem>
      </Col>
      <Col>
        <FormItem label="Popis kampaně">
          <TextArea
            value={motto}
            placeholder="There is place for your motto"
            autosize={{ minRows: 2, maxRows: 2 }}
            onChange={(e) => this.setState({ motto: e.target.value })}
          />
        </FormItem>
      </Col>
    </Row>
        { this.props.queryData && this.props.queryData.Campaign &&
            <Button onClick={this.handleCampaignUpdate}> Update </Button> ||
            <Button onClick={this.handleCampaignCreate}> Create </Button>
        }

      </Form>
    );
  }
}

CreateCampaignForm.propTypes = propTypes;

export default CreateCampaignForm;
