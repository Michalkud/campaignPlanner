import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import UniversalChannelPage from './UniversalChannelPage';

// We use the gql tag to parse our query string into a query document
const currentCampaignQuery = gql`
  query getCurrentCampaignAndTheirChannels($selectedCampaignId: ID!) {
    Campaign(id: $selectedCampaignId) {
      id
      name
      startDate
      endDate
      motto
      channels {
        id
        name
        startDate
        endDate
        text
        channelType {
          name
          id
          color
        }
      }
    }
    allChannelTypes {
      id
      color
      name
    }
}
`;

export default withRouter(graphql(currentCampaignQuery,
  {
    skip: ({ match }) => !(match && match.params && match.params.id_campaign),
    options: ({ match }) => ({ variables: { selectedCampaignId : match && match.params && match.params.id_campaign } })
  })(UniversalChannelPage));
