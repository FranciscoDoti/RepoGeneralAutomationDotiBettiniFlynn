const stepsPath = `${process.cwd()}/features/COURSE/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    main: new PageObject('main.json', stepsPath),
    home: new PageObject('home.json', stepsPath),
    courseList: new PageObject('courseList.json', stepsPath),
    createCourse: new PageObject('createCourse.json', stepsPath),
    coursePage: new PageObject('coursePage.json', stepsPath),
    resources_page: new PageObject('resources_page.json', stepsPath),
    overview: new PageObject('overview.json', stepsPath),
    resources: new PageObject('resources.json', stepsPath),
    student_view: new PageObject('student_view.json', stepsPath),
    studentActivity: new PageObject('studentActivity.json', stepsPath),
    coursePlanner: new PageObject('coursePlanner.json', stepsPath),
    user: new PageObject('user.json', stepsPath),
    adminMenu: new PageObject('adminMenu.json', stepsPath),
    third_party: new PageObject('third_party.json', stepsPath),
    gradebook: new PageObject('gradebook.json', stepsPath),
    editCourse: new PageObject('editCourse.json', stepsPath),
    copyCourse: new PageObject('copyCourse.json', stepsPath)
};

module.exports ={
    pages
};