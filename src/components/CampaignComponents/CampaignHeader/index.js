import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
//import { selectors } from 'models/campaign';

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


const mapStateToProps = (state, ownProps) => ({
  selectedCampaignId: ownProps.idCampaign
});

export default connect(mapStateToProps)(graphql(currentCampaignQuery,
  {
    skip: ({ selectedCampaignId }) => !selectedCampaignId,
  },
  {
  options: ({ selectedCampaignId }) => ({ variables: { selectedCampaignId } }),
})(CampaignHeader));
