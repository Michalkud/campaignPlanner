import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { selectors } from 'models/campaign'
import { selectors as channelTypeSelectors } from 'models/channelType';

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


const mapStateToProps = state => ({
  selectedCampaignId: selectors.selectedCampaignId(state),
  selectedChannelTypeId: channelTypeSelectors.selectedChannelTypeId(state)
});

export default connect(mapStateToProps)(graphql(currentCampaignQuery, 
  {
    skip: ({ selectedCampaignId }) => !selectedCampaignId,
  },
  {
  options: ({ selectedCampaignId }) => ({ variables: { selectedCampaignId } }),
})(UniversalChannelPage));
