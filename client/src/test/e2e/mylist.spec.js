import config from './config';

module.exports = {
  'All Lists': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('Input[name=email]', 'seunowonikoko@gmail.com')
      .setValue('Input[name=password]', 'owonikoko')
      .click('#btnLogin')
      .pause(5000)
      .assert.urlEquals('http://localhost:4000/app/mylist')
      .waitForElementVisible('body')
      .assert.elementPresent('.myLists')
      .end();
  },
  'All Task': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('Input[name=email]', 'seunowonikoko@gmail.com')
      .setValue('Input[name=password]', 'owonikoko')
      .click('#btnLogin')
      .pause(5000)
      .assert.urlEquals('http://localhost:4000/app/mylist')
      .waitForElementVisible('body')
      .assert.elementPresent('#btnAddTask')
      .end();
  }
};
