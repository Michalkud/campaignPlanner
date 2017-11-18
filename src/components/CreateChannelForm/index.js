import CreateChannelForm from './CreateChannelForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const createChannel = gql`
  mutation createChannel(
    $channelTypeId: ID!,
    $name: String!,
    $endDate: DateTime!,
    $startDate: DateTime!,
    $campaignId: ID!
  ) {
    createChannel(
      channelTypeId: $channelTypeId,
      name: $name,
      startDate: $startDate,
      endDate: $endDate,
      campaignId: $campaignId
    ) {
      createdAt
    }
  }
`; 

export default graphql(createChannel)(CreateChannelForm);
