import faker from 'faker';
import config from './config';

module.exports = {
  'Sign up': (browser) => {
    browser
      .url(config.url)
      .assert.containsText('.brand-logo', 'Worklist')
      .click('#signupForm')
      .pause(2000)
      .setValue('#signupEmail', faker.internet.email())
      .setValue('#signupPassword', 'mypassword')
      .click('#btnSignup')
      .pause(5000)
      .assert.urlEquals('http://localhost:4000/app/mylist')
      .end();
  }
};
