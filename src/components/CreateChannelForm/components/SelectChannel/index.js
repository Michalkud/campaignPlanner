import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { selectors } from 'models/campaign';

import SelectChannel from './SelectChannel';
// We use the gql tag to parse our query string into a query document
// We use the gql tag to parse our query string into a query document
const currentCampaignQuery = gql`
query getCurrentCampaignWithChannels($selectedCampaignId: ID!) {
  Campaign(id: $selectedCampaignId) {
    channelTypes {
      id
      color
      name
    }
  }
}
`;



const mapStateToProps = state => ({
selectedCampaignId: selectors.selectedCampaignId(state)
});

export default connect(mapStateToProps)(graphql(
currentCampaignQuery,
{
  skip: ({ selectedCampaignId }) => !selectedCampaignId,
  options: ({ selectedCampaignId }) => ({ variables: { selectedCampaignId } })
}
)(SelectChannel));
