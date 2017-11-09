import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Form, Input, DatePicker } from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const propTypes = {
  campaigns: PropTypes.array,
  editCampaignModalVisible: false
};

class CampaignTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCampaign: null
    };

    this.handleOnSelect = this.handleOnSelect.bind(this);
  }
  
  handleOnSelect = (selectedEntity) =>
    this.setState({
      selectedCampaign: this.props.data.allCampaigns.find( campaign => campaign.id === selectedEntity.id )
    });

  render() {
    const { data: { allCampaigns } } = this.props;
    const { selectedCampaign } = this.state;

    return (
      <div>
        { selectedCampaign &&
        <Form>
        <FormItem label="Název kampaně">
          <Input value={selectedCampaign.name} />
        </FormItem>
        <FormItem label="UTM_campaign">
          <Input value={selectedCampaign.utmCampaign} />
        </FormItem>
        <FormItem label="Motto">
          <TextArea
            placeholder="There is place for your motto"
            autosize={{ minRows: 2, maxRows: 2 }}
            value={selectedCampaign.motto}
          />
        </FormItem>
        <FormItem label="Trvání">
          <RangePicker value={[moment(selectedCampaign.startDate), moment(selectedCampaign.endDate)]} />
        </FormItem>
        </Form>
        }
        {allCampaigns && allCampaigns.length > 0 &&
          <BigCalendar
            selectable={true}
            onNavigate={console.log}
            onView={console.log}
            onSelecting={console.log}
            events={
              allCampaigns.map((campaign) => ({ start: campaign.startDate, end: campaign.endDate, title: campaign.name, id: campaign.id
            }))}
            defaultView="week"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={this.handleOnSelect}
            onSelectSlot={console.log}
          />
        }
      </div>
    );
  }
}

CampaignTimeline.propTypes = propTypes;

export default CampaignTimeline;
