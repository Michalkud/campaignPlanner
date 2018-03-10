import CreateCampaignForm from './CampaignOverview';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

//import { selectors } from 'models/campaign';

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

const updateCampaignQuery = gql`
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

export default withRouter(compose(graphql(currentCampaignQuery, {
    name: 'queryData',
    skip: ({ match }) => !(match && match.params && match.params.id_campaign),
    options: ({ match }) => ({ variables: { selectedCampaignId : match && match.params && match.params.id_campaign } })
  }),
  graphql(createCampaign, {
    name: 'createCampaign'
  }),
  graphql(updateCampaignQuery, {
    name: 'updateCampaign'
  })
)(CreateCampaignForm));
