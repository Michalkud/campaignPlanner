import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import DefaultLayout from 'components/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { Provider } from 'react-redux';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/cj7yfwulp1j710168atkx0492`,
  options: {
    reconnect: true
  }
});


const httpLink = createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cj7yfwulp1j710168atkx0492/api' });

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);


const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('auth0IdToken') ? `Bearer ${localStorage.getItem('auth0IdToken')}` : null,
    } 
  });
  return forward(operation);
});

const client = new ApolloClient({ link: concat(authMiddleware, link), cache: new InMemoryCache() });
const Root = () => (
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router path="access_token=:auth0IdToken" >
          <DefaultLayout />
        </Router>
      </ApolloProvider>
    </Provider>
  </LocaleProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
