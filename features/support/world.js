const { setWorldConstructor, setDefaultTimeout, setDefinitionFunctionWrapper } = require('cucumber');
const { takeScreenshot } = require(`${process.cwd()}/app/driver`);
const config = require(`${process.cwd()}/config/config.json`);

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

setDefinitionFunctionWrapper(function (fn) {
  return async function() {
    await fn.apply(this, arguments);
    try{
      var screenshot = await takeScreenshot();
      await this.attach(screenshot, 'image/png'); 
      }catch{};
  }
});