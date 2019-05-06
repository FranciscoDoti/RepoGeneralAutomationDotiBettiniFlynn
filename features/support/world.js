const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const config = require('../../config/config.json');

function ThisWorld({attach}) {
  this.environment = config.environment;
  this.mode = config.executionMode;
  this.browser = config.browser;
  this.screenshots = config.screenshots;
  this.attach = attach;
  this.downloadLocation = process.cwd() + '/reports/downloads';
  setDefaultTimeout(config.timeout);
};

setWorldConstructor(ThisWorld);