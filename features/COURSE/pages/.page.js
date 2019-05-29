const stepsPath = `${process.cwd()}/features/COURSE/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    main: new PageObject('main.json', stepsPath),
    home: new PageObject('home.json', stepsPath),
    course_list: new PageObject('course_list.json', stepsPath),
    create_course: new PageObject('create_course.json', stepsPath),
    course_page: new PageObject('course_page.json', stepsPath),
    resources_page: new PageObject('resources_page.json', stepsPath),
    overview: new PageObject('overview.json', stepsPath),
    resources: new PageObject('resources.json', stepsPath),
    student_view: new PageObject('student_view.json', stepsPath),
    student_activity: new PageObject('student_activity.json', stepsPath),
    course_planner: new PageObject('course_planner.json', stepsPath),
    user: new PageObject('user.json', stepsPath),
    admin_menu: new PageObject('admin_menu.json', stepsPath),
    third_party: new PageObject('third_party.json', stepsPath),
    gradebook: new PageObject('gradebook.json', stepsPath),
    editCourse: new PageObject('editCourse.json', stepsPath),
    copyCourse: new PageObject('copyCourse.json', stepsPath)
};

module.exports ={
    pages
};