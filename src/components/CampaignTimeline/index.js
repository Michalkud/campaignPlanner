import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { selectors } from 'models/campaign'

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
    name: 'campaignWithChannelsQuery',
    options: ({ selectedCampaignId }) => ({ variables: { selectedCampaignId } })
  }
)(CampaignTimeline));
