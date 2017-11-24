import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Form, Input, DatePicker, Button } from 'antd';
import gql from 'graphql-tag';

import CreateChannelForm from 'components/CreateChannelForm';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


class CampaignTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChannel: null,
      modalVisible: false
    };

    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  componentDidUpdate() {
    this._subscribeToNewChannels();
  }

  
  handleOnSelect = (selectedEntity) =>
    this.setState({
      selectedChannel: this.props.campaignWithChannelsQuery.Campaign.channels.find( channel => channel.id === selectedEntity.id )
    });

  render() {
    const { campaignWithChannelsQuery } = this.props;

    return (
      <div>
        { campaignWithChannelsQuery && campaignWithChannelsQuery.Campaign &&
        <div>
          <Form>
          <FormItem label="Název kampaně">
            <Input value={campaignWithChannelsQuery.Campaign.name} />
          </FormItem>
          <FormItem label="Trvání">
            <RangePicker value={[moment(campaignWithChannelsQuery.Campaign.startDate), moment(campaignWithChannelsQuery.Campaign.endDate)]} />
          </FormItem>
          </Form>
          <CreateChannelForm 
            closeModal={() => this.setState({ modalVisible: false })} 
            modalVisible={this.state.modalVisible} 
            campaignId={campaignWithChannelsQuery.Campaign.id} 

          />
          <Button onClick={ () => this.setState({ modalVisible: true })}>Create channel</Button>
        </div>
        }

          <BigCalendar
            selectable={true}
            onNavigate={console.log}
            onView={console.log}
            onSelecting={console.log}
            events={
              campaignWithChannelsQuery &&
              campaignWithChannelsQuery.Campaign &&
              campaignWithChannelsQuery.Campaign.channels && 
              campaignWithChannelsQuery.Campaign.channels
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

  _subscribeToNewChannels = () => {
    if (this.props.campaignWithChannelsQuery) {
    this.props.campaignWithChannelsQuery.subscribeToMore({
      document: gql`
      subscription {
        Channel(
          filter: {
            mutation_in: [CREATED, UPDATED]
          }
        ) {
          node {
              id
              name
              startDate
              endDate
              campaign {
                id
              }
          }
        }
      }`,
      updateQuery: (previous, { subscriptionData : { Channel } }) => {
  
        const channelIndex = previous.Campaign && 
        previous.Campaign.channels &&
        previous.Campaign.channels.findIndex(channel => channel.id === Channel.node.id);
        if (channelIndex !== -1) {
          const channel = Channel.node;
          const newAllChannels = previous.Campaign.channels.slice();
          newAllChannels[channelIndex] = channel;
          return {
            ...previous,
            Campaign: {
              ...previous.Campaign,
              channels: newAllChannels
            }
          };
        } else if ( 
          Channel && 
          Channel.node.campaign && 
          Channel.node.campaign.id && 
          Channel.node.campaign.id === previous.Campaign.id 
        ) {
          return {
            ...previous,
            Campaign: {
              ...previous.Campaign,
              channels: [ ...previous.Campaign.channels, Channel.node]
            }
          };

        }
        return previous;
      }
    })
  }
  }
}

export default CampaignTimeline;
