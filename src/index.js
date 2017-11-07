import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import Application from 'components/Application';
import AdminUI from 'components/AdminUI';
import CreateUser from 'components/CreateUser';
import 'styles/main.scss';
import 'antd/lib/locale-provider/style';
import 'antd/dist/antd.css';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';



const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj7yfwulp1j710168atkx0492/api' });
const client = new ApolloClient({ networkInterface });
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`;
    }
    next();
  },
}]);

const Root = () => (
  <LocaleProvider locale={enUS}>
    <ApolloProvider store={store} client={client}>
      <Router>
        <div>
        <Route exact={true} path="/new-campaign" component={Application} />
        <Route exact={true} path="/" component={AdminUI} />
        <Route path="/signup" component={CreateUser} />
        </div>
      </Router>
    </ApolloProvider>
  </LocaleProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
