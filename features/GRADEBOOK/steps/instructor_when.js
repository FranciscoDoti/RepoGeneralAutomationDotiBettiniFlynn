const { When } = require('cucumber');

const coursePages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const { gradebook } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const driver = require(`${process.cwd()}/app/driver`);
const { sleep } = require(`${process.cwd()}/app/driver`);

When('Instructor toggle percents', async function () {
  await gradebook.waitForElementVisibility('percentsToggleButton');
  await gradebook.click('percentsToggleButton');
});

When('Instructor toggle points', async function () {
  await gradebook.waitForElementVisibility('pointsToggleButton');
  await gradebook.click('pointsToggleButton');
});

When(/^I assign students to activities in courseplanner$/, async function (dataTable) {
  const courseName = this.data.get('courseName');
  await coursePages.createCourse.click('courseCard', courseName);
  await coursePages.coursePage.click('navigation', 'My Course');
  await coursePages.coursePage.click('Tab', 'COURSE PLAN')
  for (let i = 0; i < dataTable.rows().length; i++) {
    const student = dataTable.hashes()[i].student
    const category = dataTable.hashes()[i].category
    const activity = dataTable.hashes()[i].activity
    const isPastDue = dataTable.hashes()[i].isPastDue === 'true'
    const exceptionStudent = dataTable.hashes()[i].exceptionStudent
    await coursePages.coursePlanner.click('assignGradebook', activity);
    await coursePages.coursePlanner.waitForElementVisibility('radioButtonAssignStudents');
    await coursePages.coursePlanner.click('radioButtonAssignStudents');

    if (student !== 'Everyone') {
      const user = this.users[student];
      await coursePages.coursePlanner.populate('assignmentModalRosterSearch', `${user.firstName} ${user.lastName}`);
    }
    await coursePages.coursePlanner.waitForElementVisibility('pointsInput', dataTable.hashes()[i].points);
    await coursePages.coursePlanner.populate('pointsInput', dataTable.hashes()[i].points);

    await coursePages.coursePlanner.click('assignButton');
    await coursePages.home.waitForElementVisibility('closeAlert');
    await coursePages.home.click('closeAlert');

    await driver.getDriver().navigate().refresh();
    await coursePages.coursePage.click('Tab', 'COURSE PLAN')
    await coursePages.coursePlanner.click('assignGradebook', activity);

    await coursePages.coursePlanner.click('gradeBookCategory');
    await coursePages.coursePlanner.populate('Category', category)

    if (exceptionStudent) {
      const exceptionUser = this.users[exceptionStudent];
      await coursePages.coursePlanner.click('addExceptionBtn');
      await coursePages.coursePlanner.populate('studentSearchBox', `${exceptionUser.firstName} ${exceptionUser.lastName}`);
    }

    if (isPastDue) {
      await coursePages.coursePlanner.click('assignmentDueDate');
      await coursePages.courseList.click('previousMonthButton');
      await coursePages.courseList.click('selectDate', '15');
    } else {
      await coursePages.coursePlanner.click('assignmentDueDate');
      await coursePages.courseList.click('nextMonthButton');
      await coursePages.courseList.click('selectDate', '15');
    }

    await coursePages.coursePlanner.click('assignButton');
    await coursePages.home.click('closeAlert');
  }
});

When(/^I edit students grades$/, async function (dataTable) {
  await coursePages.coursePage.click('navigation', 'Gradebook');
  for (let i = 0; i < dataTable.rows().length; i++) {
    const row = dataTable.hashes()[i].row;
    const column = dataTable.hashes()[i].column;
    const grade = dataTable.hashes()[i].grade;
    const feedback = dataTable.hashes()[i].feedback;
    await gradebook.waitForElementVisibility(`editGradeButton`, `${row}_${column}`)
    await gradebook.click(`editGradeButton`, `${row}_${column}`)
    await gradebook.populate('gradeEditGradeOverride', grade);
    await gradebook.populate('editGradeComment', feedback);
    await coursePages.gradebook.click('save', 'Save');
    await coursePages.home.click('closeAlert');
  }
  await sleep(2000);
});

When(/^I confirm assigned assignment "(.*)" is in my gradebook$/, async function (assignmentName) {
  await gradebook.assertTextIncludes('studentGradebook', assignmentName);
});

When(/^I confirm unassigned assignment "(.*)" is not in my gradebook$/, async function (assignmentName) {
  await gradebook.assertTextDoesNotInclude('studentGradebook', assignmentName);
});

When(/^I update category "(.*)" to drop "(.*)" grades$/, async function (categoryName, droppedGrades) {
  await gradebook.click('settingsNav');
  await gradebook.waitForElementVisibility('dropGradeDropdown');
  await gradebook.populate('dropGradeDropdown', droppedGrades);
  await gradebook.click('save', 'Save');
});
