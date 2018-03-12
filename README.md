# Campaign editor

 is a  react, redux, powered  campaign editor.

# Actual state

  - You can add campaigns to timeline from form

## App configuration setting
For each env is necessary create `config.<env>.js` in src folder. Webpack is looking in this configuration files a solve it dynamically.

Example of *config.dev.js*
```
export const clientId = '<clientId>';
export const domain = '<domain>.auth0.com';
export const redirect = 'http://localhost:3000/callback';
export const scope = 'openid email profile';
export const audience = 'https://<domain>.auth0.com/api/v2/';
```

## Setting test environment
```
yarn global add nightwatch
```

### Download and copy this to test/bin
  - https://selenium-release.storage.googleapis.com/3.9/selenium-server-standalone-3.9.1.jar
  - https://chromedriver.storage.googleapis.com/index.html?path=2.35/

### Creating config file for NightWatch scenarios
Create *config.js* file in location `test/e2e/config.js`
``` javascript
module.exports = {
  email:'mail@test.cz',
  badPassword:'mailBadPassword',
  password:'mailPassword'
};
```
### Running test
```
yarn run nw-test
```

Test reports will be in test/e2e/reports
