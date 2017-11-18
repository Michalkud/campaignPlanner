import ChannelText from './ChannelText';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const updateChannel = gql`
  mutation updateChannel(
    $id: ID!,
    $text: String,
    $endDate: DateTime!,
    $startDate: DateTime!,
  ) {
    updateChannel(
      id: $id,
      text: $text,
      startDate: $startDate,
      endDate: $endDate,
    ) {
      createdAt
    }
  }
`; 

export default graphql(updateChannel)(ChannelText);
