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
    const { data } = this.props;
    return (<div>
    { data && data.Campaign &&
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
            channelTypeId={this.props.selectedChannelTypeId}
          />
          <Button onClick={ () => this.setState({ modalVisible: true })}>
            Přidat nový kakál
          </Button>
        </Row>
        <Row gutter={16}>
        { data.Campaign.channels &&
          data.Campaign.channels
            .filter(channel => channel.channelType.id === this.props.selectedChannelTypeId )
            .map((channel, y) => (
              <ChannelText
                key={y}
                name={channel.name}
                text={channel.text}
                id={channel.id}
                startDate={channel.startDate}
                endDate={channel.endDate}
              />
          ))
        }
        </Row>
      </div>

    }
    </div>)
    ;
  }

  _subscribeToNewChannels = () => {
    if (this.props.data) {
    this.props.data.subscribeToMore({
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
      }`,
      updateQuery: (previous, { subscriptionData : { data: { Channel } } }) => {
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
              channels: [...previous.Campaign.channels, Channel.node]
            }
          };

        }
        return previous;
      }
    });
  }
  }
}



export default UniversalChannelPage;
