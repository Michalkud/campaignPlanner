import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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

export default graphql(
  currentCampaignQuery,
  {
    skip: ({ selectedCampaignId }) => !selectedCampaignId,
    options: ({ selectedCampaignId }) => ({ variables: { selectedCampaignId } })
  }
)(SiderMenu);
