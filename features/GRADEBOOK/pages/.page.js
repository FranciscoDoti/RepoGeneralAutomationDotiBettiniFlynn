const stepsPath = `${process.cwd()}/features/GRADEBOOK/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    gradebook: new PageObject('gradebook.json', stepsPath),
    settings:  new PageObject('settings.json', stepsPath),
    courses: new PageObject('courses.json', stepsPath),
    iclickerConnect: new PageObject('iclicker_connect.json', stepsPath)
};

module.exports ={
    pages
};
