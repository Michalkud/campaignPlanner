import React from 'react';
import CreateCampaignForm from 'components/CreateCampaignForm';
import LeftPanel from 'components/LeftPanel';
import CampaignTimeline from 'components/CampaignTimeline';

const propTypes = {};

const Application = () => (
  <div>
    <LeftPanel />
    <CreateCampaignForm />
    <CampaignTimeline />
  </div>
);

Application.defaultProps = {};
Application.propTypes = propTypes;

export default Application;
