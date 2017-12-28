import React, { Component } from 'react';
import { Input, DatePicker, Row, Col } from 'antd';
import SelectGoals from '../GoalsSelect';
const { RangePicker } = DatePicker;
import moment from 'moment';

class CampaignHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      goalsIds: [],
      target: '',
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
    onInputsChange = (e) => this.onChange(e.target.name, e.target.value)

    componentWillReceiveProps(props) {
      if (props.data && props.data.Campaign) {
        const { data: { Campaign } } = props;
        this.setState({
          id: Campaign.id || null,
          name: Campaign.name || '',
          goalsIds: Campaign.goals && Campaign.goals.map(ct => ct.id) || [],
          target: Campaign.target || '',
          utmCampaign: Campaign.utmCampaign || '',
          startDate: Campaign.startDate || null,
          endDate: Campaign.endDate || null
        });
      } else {
        this.setState({
          name: '',
          goalsIds: [],
          target: '',
          utmCampaign: '',
          startDate: null,
          endDate: null
        });
      }
    }

    handleGoalChange = (id) => {
      this.setState({ goalsIds: id });
    };

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

  render() {
    const { goalsIds, name, startDate, endDate, utmCampaign } = this.state;
    return (
      <Row gutter={8} className="campaignFormHeader" >
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
      </Row>);
 }
}

export default CampaignHeader;