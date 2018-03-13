import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Form, Row, Col } from 'antd';
import gql from 'graphql-tag';
import ChannelSelect from '../CampaignComponents/ChannelSelect';
import CampaignHeader from '../CampaignComponents/CampaignHeader';
import CreateChannelForm from 'components/CreateChannelForm';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class CampaignTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChannel: null,
      modalVisible: false,
      filterState: [],
      visible: false
    };

    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  componentDidUpdate() {
    this._subscribeToNewChannels();
  }

  componentWillReceiveProps(props) {
    if (props.queryData && props.queryData.Campaign) {
      const { queryData: { Campaign } } = props;
      this.setState({
        id: Campaign.id || null,
        name: Campaign.name || '',
        domainsIds: (Campaign.domains && Campaign.domains.map(d => d.id)) || [],
        channelTypesIds:
          (Campaign.channelTypes && Campaign.channelTypes.map(ct => ct.id)) ||
          [],
        goalsIds: (Campaign.goals && Campaign.goals.map(ct => ct.id)) || [],
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

  handleOnSelect = selectedEntity =>
    this.setState(
      {
        selectedChannel: this.props.queryData.Campaign.channels.find(
          channel => channel.id === selectedEntity.id
        )
      },
      () => this.setState({ modalVisible: true })
    );

  eventStyleGetter = (event, start, end, isSelected) => {
    return {
      className: event.colorClass
    };
  };

  render() {
    const data = this.props.queryData;

    return (
      <div>
        {data &&
          data.Campaign && (
            <div>
              <Form>
                <CampaignHeader idCampaign={data.Campaign.id} />
              </Form>
              <Row style={{ marginBottom: '15px' }}>
                <Col span={20}>
                  {data.Campaign.channelTypes && (
                    <ChannelSelect
                      allChannelTypes={data.Campaign.channelTypes}
                      onChange={newFilterState =>
                        this.setState({ filterState: newFilterState })
                      }
                      defaultValue={data.Campaign.channelTypes.map(
                        channelType => channelType.id
                      )}
                    />
                  )}
                </Col>
                <Col span={4}>
                  <CreateChannelForm
                    closeModal={() => this.setState({ modalVisible: false })}
                    modalVisible={this.state.modalVisible}
                    startDate={
                      this.state.selectedInterval &&
                      this.state.selectedInterval.start
                    }
                    endDate={
                      this.state.selectedInterval &&
                      moment(this.state.selectedInterval.end)
                        .endOf('day')
                        .toDate()
                    }
                    campaignId={data.Campaign.id}
                    {...this.state.selectedChannel}
                  />
                </Col>
              </Row>
            </div>
          )}
        <BigCalendar
          selectable={true}
          onSelectSlot={selectedInterval => {
            this.setState({ selectedChannel: null }, () =>
              this.setState({ modalVisible: true, selectedInterval })
            );
          }}
          views={['month', 'day', 'agenda']}
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
                .map(channel => {
                  console.log(channel);
                  return {
                    start: new Date(channel.startDate),
                    end: new Date(channel.endDate),
                    title: channel.name,
                    id: channel.id,
                    colorClass: channel.channelType.colorClass
                  };
                })) ||
            []
          }
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={this.handleOnSelect}
          eventPropGetter={this.eventStyleGetter}
        />
      </div>
    );
  }

  _subscribeToNewChannels = () => {
    if (this.props.queryData) {
      this.props.queryData.subscribeToMore({
        document: gql`
          subscription {
            Channel {
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
              previousValues {
                id
              }
            }
          }
        `,
        updateQuery: (
          previous,
          { subscriptionData: { data: { Channel: { node, previousValues } } } }
        ) => {
          if (!node) {
            return {
              ...previous,
              Campaign: {
                ...previous.Campaign,
                channels: [
                  ...previous.Campaign.channels.filter(
                    c => c.id !== previousValues.id
                  )
                ]
              }
            };
          }
          const channelIndex =
            previous.Campaign &&
            previous.Campaign.channels &&
            previous.Campaign.channels.findIndex(
              channel => channel.id === node.id
            );
          if (channelIndex !== -1) {
            const channel = node;
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
            node.campaign &&
            node.campaign.id &&
            node.campaign.id === previous.Campaign.id
          ) {
            return {
              ...previous,
              Campaign: {
                ...previous.Campaign,
                channels: [...previous.Campaign.channels, node]
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
