import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Projects from './Projects';
// We use the gql tag to parse our query string into a query document
const allProjectsQuery = gql`
  query allProjectsQuery {
    allProjects {
      id
      name
    }
  }
`;

export default graphql(allProjectsQuery)(Projects);
