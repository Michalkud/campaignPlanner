import CreateChannelForm from './CreateChannelForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo'

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

const updateChannel = gql`
  mutation updateChannel(
    $id: ID!,
    $channelTypeId: ID!,
    $name: String!,
    $endDate: DateTime!,
    $startDate: DateTime!,
    $campaignId: ID!
  ) {
    updateChannel(
      id: $id,
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

export default compose(
  graphql(updateChannel, {
    name : 'updateChannel'
  }),
  graphql(createChannel, {
    name: 'createChannel'
  })
)(CreateChannelForm);
