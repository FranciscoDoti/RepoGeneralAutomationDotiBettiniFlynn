const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const { setWorldConstructor, setDefaultTimeout, setDefinitionFunctionWrapper } = require('cucumber');
const argv = require('minimist')(process.argv.slice(2));

const rc = jsonfile.readFileSync(`${process.cwd()}/.test-automation-packrc.json`);
const testrail = require('test-automation-pack/testrailuploader');
const { fdate } = require('test-automation-pack/utils');
const { takeScreenshot } = require('test-automation-pack/driver');
const { log } = require('test-automation-pack/logger');
const config = require('test-automation-pack/config');
const defaults = require(`${process.cwd()}/config/config.json`);

const environment = (argv.env || rc.app.environment);
const stack = (argv.stack || rc.app.stack || argv.env || rc.app.environment);

const users = () => {
  const that = {};
  const folder = `${process.cwd()}/features/shared/data/users/${environment}`; //TODO: CORREGIR LA CARPETA DE USERS
  const files = fs.readdirSync(folder);
  files.forEach((file) => {
    const filepath = `${folder}/${file}`;
    that[`${path.parse(filepath).name}`] = jsonfile.readFileSync(filepath);
  });
  return that;
};

function ThisWorld({ attach }) {

  let config2 = {
    environment : argv.env || defaults.environment,
    mode : argv.mode || defaults.mode,
    browser : argv.browser || defaults.browser,
    screenshots : argv.screenshots || defaults.screenshots,
    headless : argv.h || (argv.headless === "true" ? true : false) || defaults.headless,
    timeout : defaults.timeout*1000,
    stack: argv.stack || defaults.stack || argv.env || defaults.environment,
    capabilities : undefined,
    datetime : new Date().toISOString()
  };
  this.environment = config2.environment;
  this.stack = config2.environment;

  this.urls = jsonfile.readFileSync(`${process.cwd()}/features/.urls/web.json`);
  this.endpoints = jsonfile.readFileSync(`${process.cwd()}/features/.urls/api.json`);
  this.users = users();
  this.url = null;
  this.apiserver = null;

  this.data = new Map();
  this.downloadLocation = `${process.cwd()}/reports/downloads`;

  setDefaultTimeout(40 * rc.cucumber.timeout * 1000);
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

function updateMetadata () {
  const reportPath = argv.f !== undefined ? (argv.f.indexOf('json:') > -1 ? (`${process.cwd()}/${(argv.f).split(':')[1]}`) : undefined) : undefined;
  if (reportPath !== undefined) {
    const metadata = {
      Browser: config.capabilities.get('browserName').toUpperCase(),
      'Browser Version': config.capabilities.get('browserVersion').toUpperCase(),
      Platform: config.capabilities.get('platformName').toUpperCase(),
      Environment: environment.toUpperCase(),
      Stack: stack.toUpperCase(),
      Grid: config.grid.toUpperCase(),
      'Date Time': `${config.datetime.split('T')[0]} ${config.datetime.split('T')[1].split('.')[0]}`,
    };
    const contents = jsonfile.readFileSync(reportPath);
    contents[0].metadata = metadata;
    jsonfile.writeFileSync(reportPath, contents);
  }
};

/*async function testRailUpload () {
  if(config.testrail.upload === true){
    const user = config.testrail.user;
    const report = `${process.cwd()}/reports/cucumber_report.json`;
    const suite = config.testrail.suite;
    const run = `Results: UI - Automation on ${fdate()} in environment ${stack}`;

    const uploader = testrail.cucumberToTestRail();
    await uploader.uploadCases(user, report, suite);
    await uploader.uploadResults(user, report, suite, run);
  }
};*/

process.once('beforeExit', async () => {
  updateMetadata();
  //testRailUpload();
});
