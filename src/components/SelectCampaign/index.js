import { connect } from 'react-redux';

import SelectCampaign from './SelectCampaign';
import { selectors, actions } from 'models/campaign';


const mapStateToProps = state => ({
  selectedCampaignId: selectors.selectedCampaignId(state)
});

const mapDispatchToProps = dispatch => ({
  selectCampaignId: (id) => dispatch(actions.selectCampaignId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCampaign);
