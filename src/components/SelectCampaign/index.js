import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import SelectCampaign from './SelectCampaign';
import { selectors, actions } from 'models/campaign';

const allCampaignsQuery = gql`
query allCampaignsQuery {
  allCampaigns {
    id
    name
  }
}`;

const mapStateToProps = state => ({
  selectedCampaignId: selectors.selectedCampaignId(state)
});

const mapDispatchToProps = dispatch => ({
  selectCampaignId: (id) => dispatch(actions.selectCampaignId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(graphql(allCampaignsQuery)(SelectCampaign));
