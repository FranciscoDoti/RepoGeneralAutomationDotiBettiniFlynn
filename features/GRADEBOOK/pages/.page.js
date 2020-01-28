const stepsPath = `${process.cwd()}/features/GRADEBOOK/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    gradebook: new PageObject('gradebook.json', stepsPath),
    settings:  new PageObject('settings.json', stepsPath),
    filter:  new PageObject('filter.json', stepsPath),
    courses: new PageObject('courses.json', stepsPath),
    iclicker: new PageObject('iclicker.json', stepsPath),
    iclickerCourses: new PageObject('iclicker_courses.json', stepsPath),
};

module.exports ={
    pages
};
