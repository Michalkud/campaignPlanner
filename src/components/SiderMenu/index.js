import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { selectors } from 'models/campaign';
import { actions } from 'models/channelType';
import SiderMenu from './SiderMenu';

// We use the gql tag to parse our query string into a query document
const currentCampaignQuery = gql`
  query getCurrentCampaignWithChannels($selectedCampaignId: ID!) {
    Campaign(id: $selectedCampaignId) {
      id
      name
      startDate
      endDate
      motto
      channelTypes {
        id
        name
      }
    }
  }
`;

const mapStateToProps = (state, ownProps) => ({
  selectedCampaignId: ownProps.campaignID || selectors.selectedCampaignId(state)
});

const mapDispatchToProps = dispatch => ({
  selectChannelTypeId: (id) => dispatch(actions.selectChannelTypeId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(graphql(
  currentCampaignQuery,
  {
    skip: ({ selectedCampaignId }) => !selectedCampaignId,
    options: ({ selectedCampaignId }) => ({ variables: { selectedCampaignId } })
  }
)(SiderMenu));
