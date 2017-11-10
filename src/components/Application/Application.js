import React, { Component } from 'react';
import CreateCampaignForm from 'components/CreateCampaignForm';
import CampaignTimeline from 'components/CampaignTimeline';
import { PropTypes } from 'prop-types';




class Application extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }


  render() {
    return (
        <div>
          <CreateCampaignForm />
          <CampaignTimeline />
        </div>
    );
  }

}

export default Application;
