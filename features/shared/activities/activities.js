const config = require(`${process.cwd()}/config/config.json`);

let getActivities = function () {
  let activityList
  switch (config.environment) {
    case 'prod':
      activityList = require('./prod.json')
      break;
    case 'preprod':
      activityList = require('./preprod.json')
      break;
    case 'int':
    case 'uat':
      activityList = require('./int.json')
      break;
    default:
      activityList = require('./dev.json')
      break;
  }
  return activityList
}

module.exports = {
  getActivities
}
