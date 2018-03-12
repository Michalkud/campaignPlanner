import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import CampaignTimeline from './CampaignTimeline';

// We use the gql tag to parse our query string into a query document
const currentCampaignQuery = gql`
  query getCurrentCampaignWithChannels($selectedCampaignId: ID!) {
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
        channelType {
          id
          colorClass
        }
      }
      channelTypes {
        id
        colorClass
        name
      }
    }
  }
`;

export default withRouter(graphql(currentCampaignQuery, {
  name: 'queryData',
  skip: ({ match }) => !(match && match.params && match.params.id_campaign),
  options: ({ match }) => ({ variables: { selectedCampaignId : match && match.params && match.params.id_campaign } })
})(CampaignTimeline));
