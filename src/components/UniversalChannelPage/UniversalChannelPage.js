import React, { Component } from 'react';
import { Form, Button, Row } from 'antd';
import gql from 'graphql-tag';

import CreateChannelForm from 'components/CreateChannelForm';
import ChannelText from './ChannelText';
import CampaignHeader from '../CampaignComponents/CampaignHeader';

class UniversalChannelPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  componentDidUpdate() {
    this._subscribeToNewChannels();
  }

  render() {
    const { data, match } = this.props;
    const channelId = match && match.params.id_channel;
    return (
      <div>
        {data &&
          data.Campaign && (
            <div className="universalChannel">
              <Row>
                <Form>
                  <CampaignHeader idCampaign={data.Campaign.id} />
                </Form>
              </Row>
              <Row>
                <CreateChannelForm
                  closeModal={() => this.setState({ modalVisible: false })}
                  modalVisible={this.state.modalVisible}
                  campaignId={data.Campaign.id}
                  channelTypeId={channelId}
                />
                <Button onClick={() => this.setState({ modalVisible: true })}>
                  Přidat nový kakál
                </Button>
              </Row>
              <Row gutter={16}>
                {data.Campaign.channels &&
                  data.Campaign.channels
                    .filter(channel => channel.channelType.id === channelId)
                    .map(channel => (
                      <ChannelText
                        key={channel.id}
                        name={channel.name}
                        text={channel.text}
                        id={channel.id}
                        startDate={channel.startDate}
                        endDate={channel.endDate}
                      />
                    ))}
              </Row>
            </div>
          )}
      </div>
    );
  }

  _subscribeToNewChannels = () => {
    if (this.props.data) {
      this.props.data.subscribeToMore({
        document: gql`
          subscription {
            Channel {
              node {
                id
                name
                startDate
                endDate
                text
                campaign {
                  id
                }
                channelType {
                  id
                  color
                }
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

export default UniversalChannelPage;
