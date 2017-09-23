import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

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

    return (
      <div {...this.props}>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <BigCalendar
          selectable={true}
          onNavigate={console.log}
          onView={console.log}
          onSelecting={console.log}
          events={this.props.campaigns.map((campaign) => ({ start: campaign.timeInterval[0], end: campaign.timeInterval[1], title: campaign.campaignName }))}
          defaultView="week"
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={console.log}
          onSelectSlot={console.log}          
        />
      </div>
    )
  }
}

CampaignTimeline.propTypes = propTypes;

export default CampaignTimeline;


