const stepsPath = process.cwd() + '/features/COURSE/pages/';
const { PageObject } = require('../../../app/pageObject');

let pages = {
    course: new PageObject('course.json', stepsPath),
};

module.exports ={
    pages
};