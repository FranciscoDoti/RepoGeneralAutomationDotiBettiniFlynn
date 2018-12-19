const config = require('../../../config.js');
const Promise = require('bluebird');

module.exports.getUser = function(user_object) {
  let payload = require(`./${config.environment}/${user_object}.json`);
  return Promise.resolve(payload);
};
