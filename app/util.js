const fs = require('fs');
const { log } = require(`${process.cwd()}/app/logger`);

const loadJSONFile = function (fullFileName) {
  try {
    //log.debug(`Reading file ${fullFileName}`);
    var contents = fs.readFileSync(fullFileName);
    var jsonContent = JSON.parse(contents);
    return jsonContent;
  } catch (err) {
    log.error(err);
    throw err;
  }
};

const getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
  loadJSONFile,
  getRandomInt
};