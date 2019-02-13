const process = require("process");
const minimist = require("minimist");
let argv = minimist(process.argv.slice(2));

module.exports = {
  mode: argv.mode || "local",
  environment: argv.env || "int",
  sapling_assignment: argv.sapling_assignment || "674846",
  timeout: argv.timeout || 10000,
  sleep: argv.sleep || 1000,
  headless: argv.headless || false,
  capabilities: {
    "browserName": argv.browser || "chrome",
    "version": argv.version,
    "takesScreenshot": true,
    "browserstack": {
      "user": argv.user,
      "key": argv.key
    }
  },
  headers: {
    'Accept': 'application/json',
    'Accept-Charset': 'UTF-8',
    'Content-Type': 'application/json',
  }
};
