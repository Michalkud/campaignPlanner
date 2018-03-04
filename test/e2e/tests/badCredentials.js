var config = require('../config.js');

module.exports = {
  'Login page - bad credentials' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.containsText('h1', 'Marketing')
      .waitForElementVisible('button[name=btnLogin]', 1000)
      .click('button[name=btnLogin]')
      .waitForElementVisible('.auth0-lock-view-content input[name=email]', 10000)
      .setValue('.auth0-lock-view-content input[name=email]', config.email)
      .setValue('.auth0-lock-view-content input[name=password]', config.badPassword)
      .click('button[class=auth0-lock-submit]')
      .waitForElementVisible('div.auth0-global-message-error', 2000)
      .pause(1000)
      .assert.containsText('div.auth0-global-message-error span.fadeInUp span', 'WRONG EMAIL OR PASSWORD.')
      .end();
  }
};
