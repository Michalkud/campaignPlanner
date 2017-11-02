import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Channels from './Channels';
// We use the gql tag to parse our query string into a query document
const allChannelsQuery = gql`
  query allChannelsQuery {
    allChannels {
      id,
      name
    }
  }
`;

export default graphql(allChannelsQuery)(Channels);
