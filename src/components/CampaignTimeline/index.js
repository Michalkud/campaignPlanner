import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { selectors } from 'models/campaign'

import CampaignTimeline from './CampaignTimeline';

// We use the gql tag to parse our query string into a query document
const currentCampaignQuery = gql`
  query getCurrentCampaignAndTheirChannels($selectedCampaignId: ID!) {
    Campaign(id: $selectedCampaignId) {     
      id
      name
      startDate
      endDate
      motto
    }
    allChannels(
      filter: {
        campaign: {
          id: $selectedCampaignId
        }  
      }
    ) {
        id
        name
        startDate
        endDate
        campaign {
          id
        }
    }
}
`;

const channelsSubscription = gql`
subscription {
  Channel(
    filter: {
      mutation_in: [CREATED, UPDATED]
    }
  ) {
    node {
        id
        name
        startDate
        endDate
    }
  }
}`;


const mapStateToProps = state => ({
  selectedCampaignId: selectors.selectedCampaignId(state)
});

export default connect(mapStateToProps)(graphql(currentCampaignQuery, 
  {
    skip: ({ selectedCampaignId }) => !selectedCampaignId,
  },
  {
  options: ({ selectedCampaignId }) => ({ variables: { selectedCampaignId } }),
  props: props => {
    return {
        subscribeToNewChannels: params => {
          console.log(props, 'Just tryiing!!!')
            return props.allchannels.subscribeToMore({
                document: channelsSubscription,
                variables: {
                },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                        return prev;
                    }
                    console.log(subscriptionData.data);
                    /**
                    const newFeedItem = subscriptionData.data.commentAdded;

                    return Object.assign({}, prev, {
                        entry: {
                            comments: [newFeedItem, ...prev.entry.comments]
                        }
                    });
                    */
                }
            });
        }
    };
},
})(CampaignTimeline));
