const HashTable = require(`${process.cwd()}/app/HashTable`);
//const ScenarioData = function (ScenarioName) {
const ScenarioData = function () {
  let that = Object.assign({});
  that.data = new HashTable();

  let storeData = function (key, value) {
    that.data.setItem(key, value);
  };

  let getData = function (key) {
    return that.data.getItem(key);
  };

  let saveToFile = function (scenarioFileName) {
    // Implement me!!!
  };
  let readFromFile = function (scenarioFileName) {
    //Implement me!!!
  };

  that.storeData = storeData;
  that.set = storeData;
  that.put = storeData;
  that.get = getData;
  that.getData = getData;
  that.saveToFile = saveToFile;
  that.readFromFile = readFromFile;
  return that;
}

module.exports = ScenarioData;