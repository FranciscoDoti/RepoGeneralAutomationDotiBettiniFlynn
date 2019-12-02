const { When } = require('cucumber');
const coursePages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const driver = require(`${process.cwd()}/app/driver`);
const { sleep } = require(`${process.cwd()}/app/driver`);

When('I toggle percents', async function () {
  await pages.gradebook.waitForElementVisibility('percentsToggleButton');
  await pages.gradebook.click('percentsToggleButton');
});

When('I toggle points', async function () {
  await pages.gradebook.waitForElementVisibility('pointsToggleButton');
  await pages.gradebook.click('pointsToggleButton');
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
    await coursePages.coursePlanner.click('vissibilityButton');
    await coursePages.coursePlanner.populate('pointsInput', dataTable.hashes()[i].points);
    
    await coursePages.coursePlanner.click('assignButton');
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
    await pages.gradebook.waitForElementVisibility(`editGradeButton`, `${row}_${column}`)
    await pages.gradebook.click(`editGradeButton`, `${row}_${column}`)
    await pages.gradebook.populate('gradeEditGradeOverride', grade);
    await pages.gradebook.populate('editGradeComment', feedback);
    await coursePages.gradebook.click('save', 'Save');
    await coursePages.home.click('closeAlert');
  }
  await sleep(2000);
});

When(/^I confirm assigned assignment "(.*)" is in my gradebook$/, async function (assignmentName) {
  await pages.gradebook.assertTextIncludes('studentGradebook', assignmentName);
});

When(/^I confirm unassigned assignment "(.*)" is not in my gradebook$/, async function (assignmentName) {
  await pages.gradebook.assertTextDoesNotInclude('studentGradebook', assignmentName);
});

When(/^I update category "(.*)" to drop "(.*)" grades$/, async function (categoryName, droppedGrades) {
  await pages.gradebook.click('settingsNav');
  await pages.gradebook.waitForElementVisibility('dropGradeDropdown');
  await pages.gradebook.populate('dropGradeDropdown', droppedGrades);
  await pages.gradebook.click('save', 'Save');
});
