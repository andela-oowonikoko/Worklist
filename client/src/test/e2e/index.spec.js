import config from './config';

module.exports = {
  'Go to login page': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.title('Worklist')
      .end();
  }
};
