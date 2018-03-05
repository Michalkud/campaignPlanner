# Campaign editor

 is a  react, redux, powered  campaign editor.

# Actual state

  - You can add campaigns to timeline from form

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
