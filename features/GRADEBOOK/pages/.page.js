const stepsPath = `${process.cwd()}/features/GRADEBOOK/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    gradebook: new PageObject('gradebook.json', stepsPath),
    settings:  new PageObject('settings.json', stepsPath),
    courses: new PageObject('courses.json', stepsPath),
    iclicker: new PageObject('iclicker.json', stepsPath)
};

module.exports ={
    pages
};
