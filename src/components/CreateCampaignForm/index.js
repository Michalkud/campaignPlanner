import CreateCampaignForm from './CreateCampaignForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const createCampaign = gql`
  mutation createCampaign(
    $channelsIds: [ID!],
    $domainsIds: [ID!],
    $goalsIds: [ID!],
    $motto: String,
    $name: String!,
    $target: String,
    $budget: Json,
    $description: String,
    $endDate: DateTime!,
    $startDate: DateTime!,
  ) {
    createCampaign(
      name: $name,
      domainsIds: $domainsIds,
      channelsIds: $channelsIds,
      goalsIds: $goalsIds,
      motto: $motto,
      description: $description,
      target: $target,
      budget: $budget,
      startDate: $startDate,
      endDate: $endDate
    ) {
      createdAt
    }
  }
`; 

export default graphql(createCampaign)(CreateCampaignForm);
