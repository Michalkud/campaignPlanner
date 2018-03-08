import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

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

const mapStateToProps = (state, ownProps) => ({
  selectedCampaignId: ownProps.match.params.id_campaign
});

export default connect(mapStateToProps)(
  graphql(currentCampaignQuery, {
    name: 'queryData',
    skip: ({ selectedCampaignId }) => !selectedCampaignId,
    options: ({ selectedCampaignId }) => ({ variables: { selectedCampaignId } })
  })(CampaignTimeline)
);
