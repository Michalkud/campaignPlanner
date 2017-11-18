import React, { Component } from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import moment from 'moment';


import CreateChannelForm from 'components/CreateChannelForm';
import ChannelText from './ChannelText';


const FormItem = Form.Item;
const { RangePicker } = DatePicker;


class UniversalChannelPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
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
        { data.Campaign.channels &&
          data.Campaign.channels.map((channel, i) => (
            <ChannelText 
              key={i}
              name={channel.name}
              text={channel.text} 
              id={channel.id} 
              channelTypeName={channel.channelType.name} 
              startDate={channel.startDate}
              endDate={channel.endDate}
            />
          ))      
        }
          <CreateChannelForm closeModal={() => this.setState({ modalVisible: false })} modalVisible={this.state.modalVisible} campaignId={data.Campaign.id} />
          <Button onClick={ () => this.setState({ modalVisible: true })}>Create channel</Button>
      </div>
      
    }
    </div>)
    ;
  }
}



export default UniversalChannelPage;
