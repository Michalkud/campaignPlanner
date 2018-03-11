var config = require('../config.js');

module.exports = {
  'Login page - succesful login' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.containsText('h1', 'Marketing')
      .waitForElementVisible('button[name=btnLogin]', 1000)
      .click('button[name=btnLogin]')
      .waitForElementVisible('.auth0-lock-view-content input[name=email]', 10000)
      .setValue('.auth0-lock-view-content input[name=email]', config.email)
      .setValue('.auth0-lock-view-content input[name=password]', config.password)
      .click('button[class=auth0-lock-submit]')
      .waitForElementVisible('li.ant-menu-item', 15000)
      .assert.containsText('a.new-campaign', 'Create')
      .end();
  }
};
