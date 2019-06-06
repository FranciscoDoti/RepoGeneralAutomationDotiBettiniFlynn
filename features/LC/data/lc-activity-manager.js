const fs = require('fs');
const config = require(`${process.cwd()}/config/config.json`);

// lcType 'lc' or 'lcrp'
let getLcByName = function (activityName, lcType) {
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
  for (let key in keys) {
    if (activitiesList[key][lcType].achieve === activityName) {
      activityInfo.push(activitiesList[key])
      break
    }
  }
  if (activityInfo.length === 0) {
    throw new Error(`No LC activity matches ${activityName}`)
  }
  return activityInfo;
}

let getLcData = function (count) {
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
  for (let i = 0; i < count; i++) {
    activityInfo.push(activitiesList[keys[i]])
  }
  return activityInfo;
}

const loadKey = function (keyData) {
  let content = fs.readFileSync(keyData)
  return JSON.parse(content)
}

module.exports = {
  getLcData,
  loadKey,
  getLcByName
}
