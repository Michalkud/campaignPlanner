import CreateCampaignForm from './CreateCampaignForm';
import { connect } from 'react-redux';
import { actions } from 'models/campaign';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  addCampaign: (campaign) => dispatch(actions.addCampaign(campaign))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaignForm);
