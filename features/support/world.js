const { setWorldConstructor, setDefaultTimeout, setDefinitionFunctionWrapper } = require('cucumber');
const { config, takeScreenshot } = require(`${process.cwd()}/app/driver`);

function ThisWorld({ attach }) {
  this.environment = config.environment;
  this.mode = config.mode;
  this.browser = config.browser;
  this.screenshots = config.screenshots;
  this.headless = config.headless;

  this.attach = attach;
  this.downloadLocation = `${process.cwd()}/reports/downloads`;
  setDefaultTimeout(2*config.timeout);
};

setWorldConstructor(ThisWorld);

setDefinitionFunctionWrapper(function (fn) {
  return async function () {
    await fn.apply(this, arguments);
    try {
      if (this.screenshots.toLowerCase().includes("true")) {
        await this.attach(await takeScreenshot(), 'image/png');
      }
    } catch (err) {};
  };
});