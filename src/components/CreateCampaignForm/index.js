import CreateCampaignForm from './CreateCampaignForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';

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
    $userId: ID!
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
      userId: $userId
    ) {
      id
      createdAt
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

export default compose(
  graphql(createCampaign, {
    name: 'createCampaign'
  }),
  graphql(userQuery, {
    name: 'userData'
  })
)(CreateCampaignForm);
