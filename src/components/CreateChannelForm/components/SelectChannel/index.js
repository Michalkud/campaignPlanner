import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import SelectChannel from './SelectChannel';
// We use the gql tag to parse our query string into a query document
// We use the gql tag to parse our query string into a query document
const currentCampaignQuery = gql`
query getCurrentCampaignWithChannels($selectedCampaignId: ID!) {
  Campaign(id: $selectedCampaignId) {
    id
    channelTypes {
      id
      color
      name
    }
  }
}
`;

export default withRouter(graphql(
currentCampaignQuery,
{
  skip: ({ match }) => !(match && match.params && match.params.id_campaign),
  options: ({ match }) => ({ variables: { selectedCampaignId : match && match.params && match.params.id_campaign } })
}
)(SelectChannel));
