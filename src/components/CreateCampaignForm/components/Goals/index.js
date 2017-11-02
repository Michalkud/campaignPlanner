import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Goals from './Goals';
// We use the gql tag to parse our query string into a query document
const allGoalsQuery = gql`
  query allGoalsQuery {
    allGoals {
      id,
      name
    }
  }
`;

export default graphql(allGoalsQuery)(Goals);
