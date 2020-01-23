const { When } = require('cucumber');
const coursePages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);

When(/^I assign "(.*)" to my course$/, async function (userKey) {
  const user = this.users[userKey];
  const courseName = this.data.get('courseName');
  await coursePages.courseList.click('courseTemplate', 'COURSES');
  await coursePages.courseList.populate('search', courseName);
  // TODO fix menu toggle defect, optimize menu rendering
  await coursePages.createCourse.waitForElementVisibility('courseCard', courseName);
  await coursePages.createCourse.assertElementExists('courseCard', courseName);
  await coursePages.courseList.assertElementExists('courseMenu', courseName);
  await coursePages.courseList.click('courseMenu', courseName);
  await coursePages.courseList.click('courseMenu', courseName);
  await coursePages.courseList.click('manageInstructor');
  await coursePages.courseList.waitPopulate('addInstructor', user.username);
  await coursePages.courseList.waitClick('addButton');
  await coursePages.courseList.assertElementExists('instructorClose');
  await coursePages.courseList.waitClick('instructorClose');
});

When(/^I enroll the following students in my course$/, async function (dataTable) {
  const courseName = this.data.get('courseName');
  await coursePages.courseList.populate('search', courseName);
  await coursePages.createCourse.waitForElementVisibility('courseCard', courseName);
  await coursePages.createCourse.click('courseCard', courseName);
  await coursePages.createCourse.waitForElementVisibility('courseTitle', 'E2E 301: ' + courseName)
  await coursePages.home.waitForElementVisibility('togglerMenu');
  await coursePages.home.click('togglerMenu');
  await coursePages.adminMenu.waitForElementVisibility('admin');
  await coursePages.adminMenu.click('admin');
  await coursePages.adminMenu.waitForElementVisibility('manageEnrollments');
  await coursePages.adminMenu.click('manageEnrollments');
  for (let i = 0; i < dataTable.rows().length; i++) {
    const user = this.users[dataTable.hashes()[i].student];
    await sleep(5000);
    await coursePages.adminMenu.populate('emailInput', user.username);
    await sleep(5000);
    await coursePages.adminMenu.click('addUserButton');
  }
  await coursePages.adminMenu.click('closeEnrollmentRoles');
  await coursePages.home.click('achieveHome')
});

When(/^I activate course "(.*)" with the following data$/, async function (courseName, dataTable) {
  for (let i = 0; i < dataTable.rows().length; i++) {
    var c = dataTable.hashes()[i];
    await coursePages.courseList.populate('search', courseName);
    await sleep(500);
    await coursePages.courseList.waitForElementVisibility('courseMenu', courseName);
    await coursePages.courseList.click('courseMenu', courseName);
    await coursePages.copyCourse.waitForElementVisibility('copyCourse');
    await coursePages.copyCourse.click('copyCourse');
    await coursePages.copyCourse.populate('courseName', c.courseName)
    await coursePages.copyCourse.populate('courseCode', c.courseCode)
    await coursePages.copyCourse.populate('copyCourseStatus', 'Active On Date');
    await coursePages.masterSection.click('courseEndDate');
    await coursePages.courseList.click('nextMonthButton');
    await coursePages.courseList.click('selectDate', '15');
    await coursePages.copyCourse.click('save');
    await coursePages.home.click('closeAlert');
    this.data.set('courseCode', c.courseCode);
    this.data.set('courseName', c.courseName);
  }
});

When(/^I create a Gradebook Category with dropped lowest grade policy$/, async function (dataTable) {
  for (let i = 0; i < dataTable.rows().length; i++) {
    const courseName = this.data.get('courseName');
    await coursePages.courseList.waitForElementVisibility('search', courseName);
    await coursePages.courseList.populate('search', courseName);
    await sleep(5000);
    await coursePages.createCourse.waitForElementVisibility('courseCard', courseName);
    await coursePages.createCourse.click('courseCard', courseName);
    await coursePages.coursePage.waitForElementVisibility('navigation', 'Gradebook');
    await coursePages.coursePage.click('navigation', 'Gradebook');
    await coursePages.gradebook.click('gradebookSettings');
    await coursePages.gradebook.click('gradeBookCategory', 'Add Category');
    await coursePages.gradebook.scrollElementIntoView('categoryName')
    await coursePages.gradebook.populate('categoryName', dataTable.hashes()[i].categoryName)
    await coursePages.gradebook.populate('dropLowestGrade', dataTable.hashes()[i].dropGrade);
    await coursePages.gradebook.click('save', 'Save');
  }
});
