import ChannelText from './ChannelText';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const updateChannel = gql`
  mutation updateChannel(
    $id: ID!,
    $name: String,
    $text: String,
    $endDate: DateTime!,
    $startDate: DateTime!,
  ) {
    updateChannel(
      id: $id,
      name: $name,
      text: $text,
      startDate: $startDate,
      endDate: $endDate,
    ) {
      id,
      name,
      text,
      startDate,
      endDate,
      createdAt
    }
  }
`;

export default graphql(updateChannel)(ChannelText);
