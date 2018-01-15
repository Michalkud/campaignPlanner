import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Select, Button, Row, Col } from 'antd';

import CampaignHeader from '../CampaignComponents/CampaignHeader';
import ChannelTypes from '../CampaignComponents/ChannelTypes';
import Domains from '../CampaignComponents/Domains';

const FormItem = Form.Item;
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



  handleCampaignCreate = () => {
    this.props.createCampaign({ variables : this.state }).then( (data) => (data));
  }

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

  handleCampaignUpdate = () => {
    this.props.updateCampaign({ variables : this.state });
  }

  handleChangeValue = e => {
    this.setState(e);
  };

  render() {
    const { channelTypesIds, domainsIds, budget, motto, description } = this.state;
    return (
      <Form className="campaign-overview">
      <CampaignHeader idCampaign={this.state.id} onValueChanged={this.handleChangeValue} />
    <Row gutter={16}>
      <Col md={16} className="gutter-row">
        <Row gutter={16}>
          <Col md={24} lg={12} className="card gutter-row">
            <FormItem label="Kanály" className="gutter-box card-green">
              <ChannelTypes key="channelTypes" checkedIds={channelTypesIds} onChange={this.handleChannelTypesChange} />
            </FormItem>
          </Col>
          <Col md={24} lg={12} className="card gutter-row">
          <FormItem label="Domény" className="gutter-box card-green">
            <Domains key="domains" checkedIds={domainsIds} onChange={this.handleDomainChange} />
          </FormItem>
          </Col>
        </Row>
      </Col>
      <Col md={8} className="gutter-row">
      <FormItem label="Rozpočet" className="gutter-box card-orange budget">
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
    <Row gutter={16}>
      <Col md={18} lg={12} className="gutter-row">
        <FormItem label="Myšlenka kampaně" className="gutter-box card-light-yellow">
          <TextArea
            value={motto}
            placeholder="There is place for your motto"
            autosize={{ minRows: 4, maxRows: 4 }}
            onChange={(e) => this.setState({ motto: e.target.value })}
          />
        </FormItem>
      </Col>
      <Col md={18} lg={12} className="card gutter-row">
        <FormItem label="Popis kampaně" className="gutter-box card-yellow">
          <TextArea
            value={description}
            placeholder="There is place for your description"
            autosize={{ minRows: 4, maxRows: 4 }}
            onChange={(e) => this.setState({ description: e.target.value })}
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
