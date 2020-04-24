const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const { setWorldConstructor, setDefaultTimeout, setDefinitionFunctionWrapper } = require('cucumber');
const { takeScreenshot } = require('test-automation-pack/driver');
const { log } = require('test-automation-pack/logger');
const seleniumConfig = require('test-automation-pack/config');
const argv = require('minimist')(process.argv.slice(2));
const rc = jsonfile.readFileSync(`${process.cwd()}/.test-automation-packrc.json`);

const environment = (argv.env || rc.app.environment);
const stack = (argv.stack || rc.app.stack || argv.env || rc.app.environment);

const users = () => {
  const that = {};
  const folder = `${process.cwd()}/features/shared/data/users/${environment}`;
  const files = fs.readdirSync(folder);
  files.forEach((file) => {
    const filepath = `${folder}/${file}`;
    that[`${path.parse(filepath).name}`] = jsonfile.readFileSync(filepath);
  });
  return that;
};

function ThisWorld({ attach }) {
  this.environment = environment;
  this.stack = stack;

  this.urls = jsonfile.readFileSync(`${process.cwd()}/features/.urls/web.json`);
  this.endpoints = jsonfile.readFileSync(`${process.cwd()}/features/.urls/api.json`);
  this.users = users();
  this.url;
  this.apiserver;

  this.data = new Map();
  this.downloadLocation = `${process.cwd()}/reports/downloads`;

  setDefaultTimeout(10 * rc.cucumber.timeout * 1000);
  this.screenshots = rc.cucumber.screenshots;
  this.attach = attach;
}

setWorldConstructor(ThisWorld);

setDefinitionFunctionWrapper((fn) => {
  return async function () {
    await fn.apply(this, arguments);
    if (this.screenshots !== undefined && this.screenshots.toLowerCase().includes("always")) {
      try {
        await this.attach(await takeScreenshot(), "image/png");
      } catch (ex) {
        log.error(ex);
      }
    }
  };
});

process.on('exit', () => {
  const reportPath = argv.f !== undefined ? (argv.f.indexOf('json:') > -1 ? (`${process.cwd()}/${(argv.f).split(':')[1]}`) : undefined) : undefined;
  if (reportPath !== undefined) {
    const metadata = {
      Browser: seleniumConfig.capabilities.get('browserName').toUpperCase(),
      'Browser Version': seleniumConfig.capabilities.get('browserVersion').toUpperCase(),
      Platform: seleniumConfig.capabilities.get('platformName').toUpperCase(),
      Environment: environment.toUpperCase(),
      Stack: stack.toUpperCase(),
      Grid: seleniumConfig.grid.toUpperCase(),
      'Date Time': `${seleniumConfig.datetime.split('T')[0]} ${seleniumConfig.datetime.split('T')[1].split('.')[0]}`,
    };
    const contents = jsonfile.readFileSync(reportPath);
    contents[0].metadata = metadata;
    jsonfile.writeFileSync(reportPath, contents);
  }
});