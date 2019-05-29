const { setWorldConstructor, setDefaultTimeout, setDefinitionFunctionWrapper } = require('cucumber');
const { takeScreenshot } = require(`${process.cwd()}/app/driver`);
const config = require(`${process.cwd()}/config/config.json`);
const argv = require('minimist')(process.argv.slice(2));

function ThisWorld({ attach }) {
  this.environment = argv.env || config.environment;
  this.mode = argv.mode || config.mode;
  this.browser = argv.browser || config.browser;
  this.screenshots = argv.screenshots || config.screenshots;
  this.headless = argv.headless || config.headless;

  this.attach = attach;
  this.downloadLocation = process.cwd() + '/reports/downloads';
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