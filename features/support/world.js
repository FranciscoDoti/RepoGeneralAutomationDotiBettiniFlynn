const { setWorldConstructor, setDefaultTimeout, setDefinitionFunctionWrapper } = require('cucumber');
const { config, takeScreenshot } = require(`${process.cwd()}/app/driver`);
const { log } = require(`${process.cwd()}/app/logger`);
const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

const users = () => {
  const that = {};
  const folder = `${process.cwd()}/features/shared/data/users/${config.environment}`;
  const files = fs.readdirSync(folder);
  files.forEach((file) => {
    const filepath = `${folder}/${file}`;
    that[`${path.parse(filepath).name}`] = jsonfile.readFileSync(filepath);
  });
  return that;
};

function ThisWorld({ attach }) {
  this.environment = config.environment;
  this.mode = config.mode;
  this.browser = config.browser;
  this.screenshots = config.screenshots;
  this.headless = config.headless;
  this.stack = config.stack;
  this.users = users();
  this.attach = attach;
  this.downloadLocation = `${process.cwd()}/reports/downloads`;
  setDefaultTimeout(10 * config.timeout * 1000);
  this.data = new Map();
}

setWorldConstructor(ThisWorld);

setDefinitionFunctionWrapper((fn) => {
  return async function () {
    await fn.apply(this, arguments);
    try {
      if (this.screenshots.toLowerCase().includes('true')) {
        await this.attach(await takeScreenshot(), 'image/png');
      }
    } catch (err) {
      log.error("Error while taking screenshot after step execution");
      log.error(err);
    };
  };
});
