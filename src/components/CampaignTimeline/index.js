import CampaignTimeline from './CampaignTimeline';
import { connect } from 'react-redux';

import { selectors } from 'models/campaign';

const mapStateToProps = state => ({
  campaigns: selectors.getCampaigns(state)
});

export default connect(mapStateToProps)(CampaignTimeline);
