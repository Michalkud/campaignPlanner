import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from 'services/registerServiceWorker';
import store from './store';
import Application from 'components/Application';
import 'styles/main.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'antd/lib/locale-provider/style';
import 'antd/dist/antd.css'; 
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const Root = () => (
    <Provider store={store}>
      <LocaleProvider locale={enUS}>
        <MuiThemeProvider>  
          <Application />
        </MuiThemeProvider>
      </LocaleProvider>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
