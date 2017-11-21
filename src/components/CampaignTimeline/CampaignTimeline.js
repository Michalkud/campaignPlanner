import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Form, Input, DatePicker, Button } from 'antd';

import CreateChannelForm from 'components/CreateChannelForm';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

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
      selectedCampaign: null,
      modalVisible: false
    };

    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  
  handleOnSelect = (selectedEntity) =>
    this.setState({
      selectedCampaign: this.props.data.allCampaigns.find( campaign => campaign.id === selectedEntity.id )
    });

  render() {
    const { data } = this.props;
    console.log(this.props);
    return (
      <div>
        { data && data.Campaign &&
        <div>
          <Form>
          <FormItem label="Název kampaně">
            <Input value={data.Campaign.name} />
          </FormItem>
          <FormItem label="Trvání">
            <RangePicker value={[moment(data.Campaign.startDate), moment(data.Campaign.endDate)]} />
          </FormItem>
          </Form>
          <CreateChannelForm closeModal={() => this.setState({ modalVisible: false })} modalVisible={this.state.modalVisible} campaignId={data.Campaign.id} />
          <Button onClick={ () => this.setState({ modalVisible: true })}>Create channel</Button>
        </div>
        }

          <BigCalendar
            selectable={true}
            onNavigate={console.log}
            onView={console.log}
            onSelecting={console.log}
            events={
              data &&
              data.allChannels && 
              data.allChannels
                .map((campaign) => (
                  { 
                    start: campaign.startDate, 
                    end: campaign.endDate, 
                    title: campaign.name, 
                    id: campaign.id
                  })) || []} 
            defaultView="week"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={this.handleOnSelect}
            onSelectSlot={console.log}
          />
      </div>
    );
  }
}

CampaignTimeline.propTypes = propTypes;

export default CampaignTimeline;
