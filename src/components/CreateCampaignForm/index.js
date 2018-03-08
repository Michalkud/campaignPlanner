import CreateCampaignForm from './CreateCampaignForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';

import { selectors, actions } from 'models/campaign';

const createCampaign = gql`
  mutation createCampaign(
    $channelTypesIds: [ID!],
    $domainsIds: [ID!],
    $goalsIds: [ID!],
    $motto: String,
    $name: String!,
    $target: String,
    $budget: Json,
    $description: String,
    $endDate: DateTime!,
    $startDate: DateTime!,
    $utmCampaign: String
  ) {
    createCampaign(
      name: $name,
      domainsIds: $domainsIds,
      channelTypesIds: $channelTypesIds,
      goalsIds: $goalsIds,
      motto: $motto,
      description: $description,
      target: $target,
      budget: $budget,
      startDate: $startDate,
      endDate: $endDate,
      utmCampaign: $utmCampaign,
    ) {
      createdAt
    }
  }
`;

const updateCampaign = gql`
mutation updateCampaign(
  $id : ID!
  $channelTypesIds: [ID!],
  $domainsIds: [ID!],
  $goalsIds: [ID!],
  $motto: String,
  $name: String!,
  $target: String,
  $budget: Json,
  $utmCampaign: String,
  $description: String,
  $endDate: DateTime!,
  $startDate: DateTime!,
) {
  updateCampaign(
    id: $id
    name: $name,
    domainsIds: $domainsIds,
    channelTypesIds: $channelTypesIds,
    goalsIds: $goalsIds,
    motto: $motto,
    description: $description,
    target: $target,
    budget: $budget,
    startDate: $startDate,
    endDate: $endDate,
    utmCampaign: $utmCampaign
  ) {
    id
    name
    startDate
    endDate
    motto
    description
    goals {
      id
    }
    budget
    utmCampaign
    channelTypes {
      id
    }
    domains {
      id
    }
    channels {
      id
      name
      startDate
      endDate
      channelType {
        id
        color
      }
    }
  }
}
`;

const currentCampaignQuery = gql`
query getCurrentCampaignWithChannels($selectedCampaignId: ID!) {
  Campaign(id: $selectedCampaignId) {
    id
    name
    startDate
    endDate
    motto
    description
    goals {
      id
    }
    budget
    channelTypes {
      id
    }
    domains {
      id
    }
    channels {
      id
      name
      startDate
      endDate
      channelType {
        id
        color
      }
    }
  }
}
`;

const userQuery = gql`
query {
  user {
    id
  }
}
`;

const mapStateToProps = state => ({
  selectedCampaignId: selectors.selectedCampaignId(state)
});

const mapDispatchToProps = dispatch => ({
  selectCampaignId: (id) => dispatch(actions.selectCampaignId(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(compose(graphql(currentCampaignQuery, {
    name: 'queryData',
    skip: ({ selectedCampaignId }) => !selectedCampaignId,
    options: ({ selectedCampaignId }) => ({ variables: { selectedCampaignId } })
  }),
  graphql(createCampaign, {
    name: 'createCampaign'
  }),
  graphql(updateCampaign, {
    name: 'updateCampaign'
  }),
  graphql(userQuery, {
    name: 'userData'
  })
)(CreateCampaignForm));
