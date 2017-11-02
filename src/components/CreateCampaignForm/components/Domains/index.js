import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Domains from './Domains';
// We use the gql tag to parse our query string into a query document
const allDomainsQuery = gql`
  query allDomainsQuery {
    allDomains {
      id,
      name
    }
  }
`;

export default graphql(allDomainsQuery)(Domains);
