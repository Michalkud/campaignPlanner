import React, { Component } from 'react';
import { Form, Input, DatePicker, Button, Tabs } from 'antd';
import moment from 'moment';
import gql from 'graphql-tag';


import CreateChannelForm from 'components/CreateChannelForm';
import ChannelText from './ChannelText';


const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

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
        <Tabs>
        { data && data.allChannelTypes && data.allChannelTypes.map( (channelType, i) =>
            (<TabPane tab={channelType.name} key={i}>
              { data.Campaign.channels &&
                data.Campaign.channels
                  .filter(channel => channel.channelType.id === channelType.id )
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
            </TabPane>)
          )
        }
        </Tabs>
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
    });
  }
  }
}



export default UniversalChannelPage;
