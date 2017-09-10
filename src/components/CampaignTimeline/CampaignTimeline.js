import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import PropTypes from 'prop-types';

const propTypes = {
  campaigns: PropTypes.array
} 

class CampaignTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options : {
      }
    }
  }

  render() {
    console.log(this.props);

    return (
    <Timeline 
        items={this.props.campaigns.map( campaign => ({
          start: campaign.timeInterval[0],
          end: campaign.timeInterval[1],
          content: campaign.campaignName,
          group: 1
        }))}
      groups={[{
        id: 1,
        content: 'Group 1'
        // Optional: a field 'className', 'style', 'order', [properties]
      }]}
      options={this.state.options} />)
  }
}

CampaignTimeline.propTypes = propTypes;

export default CampaignTimeline;


