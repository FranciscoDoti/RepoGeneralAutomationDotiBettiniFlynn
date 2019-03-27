const fs = require('fs');
const config = require('../../../config.js');

let getLcFiles = function (count) {
  if (count === undefined || count < 1) {
    count = 1;
  }
  let content = fs.readFileSync('./features/LC/_data/activities.json')
  let activities = JSON.parse(content)
  let activitiesList;
  switch (config.environment) {
    case 'prod':
      activitiesList = activities.prod
      break;
    default:
      activitiesList = activities.default
      break;
  }
  let activityInfo = []
  let keys = Object.keys(activitiesList)
  if (count > keys.length) {
    throw new Error('Not Enough Resources \nWanted: ' + count + '\nFound: ' + keys.length)
  }
  for (let i = 0; i < keys.length || i < count; i++) {
    activityInfo.push(activitiesList[keys[i]])
  }
  return activityInfo;
}

const loadKey = function (keyData) {
  let content = fs.readFileSync(keyData)
  return JSON.parse(content)
}

module.exports = {
  getLcFiles,
  loadKey
}
