/**
 * http://usejsdoc.org/
 */
'use strict';

const HashTable = require('./hashtable');

const ScenarioData = function (ScenarioName) {
  let that = Object.assign({});

  that.data = new HashTable();

  let storeData = async function (key, value) {
    that.data.setItem(key, value);
  };

  let getData = async function (key) {
    return that.data.getItem(key);
  };

  let saveToFile = async function (scenarioFileName) {
    // Implement me!!!
  };
  let readFromFile = async function (scenarioFileName) {
    //Implement me!!!
  };

  that.storeData = storeData;
  that.get = getData;
  that.put = storeData;
  that.saveToFile = saveToFile;
  that.readFromFile = readFromFile;

  return that;
};

module.exports = ScenarioData;
