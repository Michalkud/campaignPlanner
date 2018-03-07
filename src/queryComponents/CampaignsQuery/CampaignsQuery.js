import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Spin } from 'antd';

const QUERY = gql`
  query allCampaignsQuery($userId: ID) {
    allCampaigns(filter: { user: { id: $userId } }) {
      id
      name
      motto
      description
      target
      budget
      startDate
      endDate
    }
  }
`;

class CampaignsQuery extends Component {
  componentDidUpdate() {
    this._subscribeToNewCampaigns();
  }

  render() {
    console.log(this.props);
    if (!this.props.data || this.props.data.loading || !this.props.data.allCampaigns) {
      return <Spin />;
    }
    return this.props.children(this.props.data);
  }

  _subscribeToNewCampaigns = () => {
    if (this.props.data) {
      this.props.data.subscribeToMore({
        document: gql`
          subscription {
            Campaign(filter: { mutation_in: [CREATED, UPDATED] }) {
              node {
                id
                name
                motto
                description
                target
                budget
                startDate
                endDate
              }
            }
          }
        `,
        updateQuery: (previous, { subscriptionData: { data: { Campaign } }, subscriptionData }) => {
          const campaignIndex =
            previous.allCampaigns &&
            previous.allCampaigns.findIndex(
              channel => channel.id === Campaign.node.id
            );
          if (campaignIndex !== -1) {
            const campaign = Campaign.node;
            const newAllCampaigns = previous.allCampaigns.slice();
            newAllCampaigns[campaignIndex] = campaign;
            return {
              ...previous,
              allCampaigns: newAllCampaigns
            };
          } else {
            return {
              ...previous,
              allCampaigns: [...previous.allCampaigns, Campaign.node]
            };
          }
        }
      });
    }
  };
}

export default graphql(QUERY, {
  skip: ({ user }) => !user,
  options: ({ user }) => ({ variables: { userId: user.id } })
})(CampaignsQuery);
