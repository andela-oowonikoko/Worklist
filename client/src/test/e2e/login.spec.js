import config from './config';

module.exports = {
  'Login Users': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('Input[name=email]', 'seunowonikoko@gmail.com')
      .setValue('Input[name=password]', 'owonikoko')
      .click('#btnLogin')
      .pause(5000)
      .assert.urlEquals('http://localhost:4000/app/mylist')
      .end();
  },
  'Invalid user': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('Input[name=email]', 'invalid@gmail.com')
      .setValue('Input[name=password]', 'wrongpassword')
      .click('#btnLogin')
      .pause(2000)
      .assert.urlContains('login')
      .end();
  }
};
