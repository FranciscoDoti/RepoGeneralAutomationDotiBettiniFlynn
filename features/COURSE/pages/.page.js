const stepsPath = `${process.cwd()}/features/COURSE/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    home: new PageObject('home.json', stepsPath),
    courseList: new PageObject('courseList.json', stepsPath),
    createCourse: new PageObject('createCourse.json', stepsPath),
    coursePage: new PageObject('coursePage.json', stepsPath),
    overview: new PageObject('overview.json', stepsPath),
    resources: new PageObject('resources.json', stepsPath),
    studentActivity: new PageObject('studentActivity.json', stepsPath),
    coursePlanner: new PageObject('coursePlanner.json', stepsPath),
    adminMenu: new PageObject('adminMenu.json', stepsPath),
    gradebook: new PageObject('gradebook.json', stepsPath),
    editCourse: new PageObject('editCourse.json', stepsPath),
    copyCourse: new PageObject('copyCourse.json', stepsPath),
    eBook: new PageObject('eBook.json', stepsPath),
    productionPage: new PageObject('productionPage.json', stepsPath),
    people: new PageObject('people.json', stepsPath),
    masterSection: new PageObject('masterSection.json', stepsPath),
};

module.exports ={
    pages
};