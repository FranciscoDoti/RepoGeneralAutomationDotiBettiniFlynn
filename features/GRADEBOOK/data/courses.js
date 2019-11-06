const path = require('path');
const { config } = require(`${process.cwd()}/app/driver`);
const fs = require('fs');

let courses = null;

function getCourseData () {
  if (courses) {
    return courses;
  }
  courses = {};
  let folder = `${process.cwd()}/features/GRADEBOOK/data/courses/${config.environment}`;
  let files = fs.readdirSync(folder);
  files.forEach(file => {
    let filePath = `${folder}/${file}`
    let data = require(filePath);
    courses[`${path.parse(filePath).name}`] = data;
  });
  return courses;
}

module.exports = {
  getCourseData
};
