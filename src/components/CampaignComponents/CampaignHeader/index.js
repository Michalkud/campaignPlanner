import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
//import { selectors } from 'models/campaign';
import { withRouter } from 'react-router-dom';

import CampaignHeader from './CampaignHeader';

// We use the gql tag to parse our query string into a query document
const currentCampaignQuery = gql`
  query getCurrentCampaign($selectedCampaignId: ID!) {
    Campaign(id: $selectedCampaignId) {
      id
      name
      startDate
      endDate
      target
      goals {
        id
      }
      utmCampaign
    }
}
`;


export default withRouter(graphql(currentCampaignQuery, {
    skip: ({ match }) => !(match && match.params && match.params.id_campaign),
    options: ({ match }) => ({ variables: { selectedCampaignId : match && match.params && match.params.id_campaign } })
})(CampaignHeader));
