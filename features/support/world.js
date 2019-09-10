const { setWorldConstructor, setDefaultTimeout, setDefinitionFunctionWrapper } = require('cucumber');
const { config, takeScreenshot } = require(`${process.cwd()}/app/driver`);
const fs = require('fs');
const path = require('path');
const { ScenarioData } = require(`${process.cwd()}/app/ScenarioData`);

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
  setDefaultTimeout(2*config.timeout);

  this.data = ScenarioData();
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

const users = function(){
  let that = {};
  let folder = `${process.cwd()}/features/shared/data/users/${config.environment}`;
  let files = fs.readdirSync(folder);
  files.forEach(file => {
    let filePath = `${folder}/${file}`
    let data = require(filePath);
    that[`${path.parse(filePath).name}`] = data;
  });
  return that;
};