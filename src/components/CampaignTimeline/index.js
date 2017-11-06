import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CampaignTimeline from './CampaignTimeline';

// We use the gql tag to parse our query string into a query document
const allCampaignsQuery = gql`
query allCampaignsQuery {
  allCampaigns {
    id
    name
    startDate
    endDate
  }
}`;

export default graphql(allCampaignsQuery)(CampaignTimeline);
