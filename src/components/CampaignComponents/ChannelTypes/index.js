import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ChannelTypes from './ChannelsTypes';
// We use the gql tag to parse our query string into a query document
const allChannelsQuery = gql`
  query allChannelQuery {
    allChannelTypes {
      id
      name
      colorClass
    }
  }
`;

export default graphql(allChannelsQuery)(ChannelTypes);
