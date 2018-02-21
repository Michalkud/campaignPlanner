import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Form, Input, DatePicker, Button, Row, Col } from 'antd';
import gql from 'graphql-tag';
import ChannelSelect from '../CampaignComponents/ChannelSelect';

import CreateChannelForm from 'components/CreateChannelForm';

//const FormItem = Form.Item;
const { RangePicker } = DatePicker;

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class CampaignTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChannel: null,
      modalVisible: false,
      filterState: []
    };

    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  componentDidUpdate() {
    this._subscribeToNewChannels();
  }

  handleOnSelect = selectedEntity =>
    this.setState(
      {
        selectedChannel: this.props.data.Campaign.channels.find(
          channel => channel.id === selectedEntity.id
        )
      },
      () => this.setState({ modalVisible: true })
    );

  eventStyleGetter = (event, start, end, isSelected) => {
    return {
      className:event.colorClass,
    };
  };

  render() {
    const { data } = this.props;

    return (
      <div>
        {data &&
          data.Campaign && (
            <div>
              <Form>
                <Row gutter={8} className="campaignFormHeader" >
                  <Col md={6} lg={4}>
                      <Input placeholder="Název kampaně" value={data.Campaign.name} />
                  </Col>
                  <Col md={{ span:8 }} lg={{ span:6, offset:4 }}>
                    <RangePicker
                        value={data.Campaign.startDate && data.Campaign.endDate && [moment(data.Campaign.startDate), moment(data.Campaign.endDate)]}
                        /*onChange={(neco, dates) => this.setState({ startDate: dates[0], endDate: dates[1] })}*/ />
                  </Col>
                </Row>
              </Form>
              <Row style={{ marginBottom: '15px' }}>
                <Col span={4}>
                  <CreateChannelForm
                    closeModal={() => this.setState({ modalVisible: false })}
                    modalVisible={this.state.modalVisible}
                    campaignId={data.Campaign.id}
                    {...this.state.selectedChannel}
                  />
                  <Button
                    onClick={() =>
                      this.setState({ selectedChannel: null }, () =>
                        this.setState({ modalVisible: true })
                      )
                    }
                  >
                    Create channel
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginBottom: '15px' }}>
                <Col span={24}>
                  {data.Campaign.channelTypes && (
                    <ChannelSelect
                      allChannelTypes={data.Campaign.channelTypes}
                      onChange={(newFilterState) => {
                        this.setState({ filterState: newFilterState })
                      }}
                      defaultValue={data.Campaign.channelTypes.map(
                        channelType => channelType.id
                      )}
                    />
                  )}
                </Col>
              </Row>
            </div>
          )}

        <BigCalendar
          selectable={true}
          /*onNavigate={}
            onView={}
            onSelecting={}*/
          views={['month', 'agenda']}
          events={
            (data &&
              data.Campaign &&
              data.Campaign.channels &&
              data.Campaign.channels
                .filter(
                  channel =>
                    this.state.filterState.indexOf(channel.channelType.id) !==
                    -1
                )
                .map(channel => ({
                  start: channel.startDate,
                  end: channel.endDate,
                  title: channel.name,
                  id: channel.id,
                  colorClass: channel.channelType.colorClass
                }))) ||
            []
          }
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={this.handleOnSelect}
          /*onSelectSlot={console.log}*/
          eventPropGetter={this.eventStyleGetter}
        />
      </div>
    );
  }

  _subscribeToNewChannels = () => {
    if (this.props.data) {
      this.props.data.subscribeToMore({
        document: gql`
          subscription {
            Channel(filter: { mutation_in: [CREATED, UPDATED] }) {
              node {
                id
                name
                startDate
                endDate
                campaign {
                  id
                }
                channelType {
                  id
                  colorClass
                }
              }
            }
          }
        `,
        updateQuery: (previous, { subscriptionData: { Channel } }) => {
          const channelIndex =
            previous.Campaign &&
            previous.Campaign.channels &&
            previous.Campaign.channels.findIndex(
              channel => channel.id === Channel.node.id
            );
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
                channels: [...previous.Campaign.channels, Channel.node]
              }
            };
          }
          return previous;
        }
      });
    }
  };
}

export default CampaignTimeline;
