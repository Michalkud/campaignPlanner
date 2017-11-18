import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import SelectChannel from './SelectChannel';
// We use the gql tag to parse our query string into a query document
const allChannelTypesQuery = gql`
  query allChannelTypesQuery {
    allChannelTypes {
      id
      name
    }
  }
`;

export default graphql(allChannelTypesQuery)(SelectChannel);
