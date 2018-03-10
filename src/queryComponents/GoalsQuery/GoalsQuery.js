import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Spin } from 'antd';

class GoalsQuery extends Component {
  render() {
    if (!this.props.data || this.props.data.loading || !this.props.data.allGoals) {
      return <Spin />;
    }
    return this.props.children(this.props.data);
  }
}

const allGoalsQuery = gql`
  query allGoalsQuery {
    allGoals {
      id
      name
    }
  }
`;

export default graphql(allGoalsQuery)(GoalsQuery);
