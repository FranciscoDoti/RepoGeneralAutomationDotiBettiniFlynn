const { gradebook, courses } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const {
  coursePage,
  coursePlanner,
  courseList,
  home
} = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const { visitURL } = require(`${process.cwd()}/app/driver`);
const { getCourseData } = require('../data/courses');
const driver = require(`${process.cwd()}/app/driver`);
const { sleep } = driver;

async function viewCourse (course) {
  const courses = getCourseData();
  const currentURL = await gradebook.getCurrentURL();
  const urlSplit = currentURL.split('/');
  const baseURL = `${urlSplit[0]}//${urlSplit[2]}`;
  const courseURL = `${baseURL}/courses/${courses[course].courseId}/mycourse`;
  await visitURL(courseURL);
};

async function selectGradebookMenu () {
  await gradebook.waitForElementVisibility('mainNav');
  await gradebook.click('mainNav');
};

async function unassignStudents (activity) {
  await coursePage.waitClick('Tab', 'COURSE PLAN');
  await courses.waitClick('actionButton', activity);
  await courses.waitClick('removeButton', activity);
  if (await courses.checkElementExists('unassignItem')) {
    await courses.waitClick('unassignItem');
    await courses.waitClick('unassignConfirm');
    sleep(1000);
  }
}

async function assignStudents (dataTable) {
  await coursePage.waitClick('Tab', 'COURSE PLAN');
  for (let i = 0; i < dataTable.rows().length; i++) {
    const student = dataTable.hashes()[i].student
    const category = dataTable.hashes()[i].category
    const activity = dataTable.hashes()[i].activity
    const isPastDue = dataTable.hashes()[i].isPastDue === 'true'
    const exceptionStudent = dataTable.hashes()[i].exceptionStudent
    await coursePlanner.waitClick('assignGradebook', activity);
    await coursePlanner.waitClick('radioButtonAssignStudents');

    if (student !== 'Everyone') {
      const user = this.users[student];
      await coursePlanner.waitPopulate('assignmentModalRosterSearch', `${user.firstName} ${user.lastName}`);
    }
    await coursePlanner.waitPopulate('pointsInput', dataTable.hashes()[i].points);
    await coursePlanner.click('assignButton');
    await home.waitClick('closeAlert');

    await driver.getDriver().navigate().refresh();

    await coursePage.waitClick('Tab', 'COURSE PLAN')
    await coursePlanner.waitClick('assignGradebook', activity);
    await coursePlanner.waitClick('gradeBookCategory');
    await coursePlanner.waitPopulate('Category', category)

    if (exceptionStudent) {
      const exceptionUser = this.users[exceptionStudent];

      await coursePlanner.waitClick('addExceptionBtn');
      await coursePlanner.waitPopulate('studentSearchBox', `${exceptionUser.firstName} ${exceptionUser.lastName}`);
    }

    if (isPastDue) {
      await coursePlanner.waitClick('assignmentDueDate');
      await courseList.waitClick('previousMonthButton');
      await courseList.waitClick('selectDate', '15');
    } else {
      await coursePlanner.waitClick('assignmentDueDate');
      await courseList.waitClick('nextMonthButton');
      await courseList.waitClick('selectDate', '15');
    }

    await coursePlanner.waitClick('assignButton');
    await home.waitClick('closeAlert');
  }
}

module.exports = {
  viewCourse,
  selectGradebookMenu,
  assignStudents,
  unassignStudents
};
