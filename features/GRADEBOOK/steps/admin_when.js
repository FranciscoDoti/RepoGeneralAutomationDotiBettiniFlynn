const { When } = require('cucumber');
const coursePages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const gradebookPages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);
const driver = require(`${process.cwd()}/app/driver`);

When(/^I create an activated template called "(.*)" with the following data$/, async function (courseName, dataTable) {
  await coursePages.createCourse.click('plusButton');
  for (let i = 0; i < dataTable.rows().length; i++) {
    var c = dataTable.hashes()[i];
    this.data.set('code', c.courseCode);
    this.data.set('courseCode', c.courseCode);
    this.data.set('Number', c.isbnNumber);
    this.data.set('courseName', courseName);
    await coursePages.createCourse.assertElementExists('courseType');
    await coursePages.createCourse.populate('courseType', c.courseType)
    await coursePages.createCourse.assertElementExists('productModel');
    await coursePages.createCourse.populate('productModel', c.productModel)
    await coursePages.createCourse.assertElementExists('courseName');
    await coursePages.createCourse.populate('courseName', courseName)
    await coursePages.createCourse.assertElementExists('courseCode');
    await coursePages.createCourse.populate('courseCode', c.courseCode)
    await coursePages.createCourse.assertElementExists('isbnNumber');
    await coursePages.createCourse.populate('isbnNumber', c.isbnNumber)
    await coursePages.createCourse.assertElementExists('courseStatus');
    await coursePages.createCourse.populate('courseStatus', c.courseStatus);
  }

  await coursePages.createCourse.click('save');
  await coursePages.home.click('closeAlert');
  
  // Search for the course
  await sleep (500);
  await coursePages.courseList.waitForElementVisibility('courseTemplate', 'COURSE TEMPLATES');
  await coursePages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
  await coursePages.courseList.populate('search', courseName);
  await coursePages.createCourse.assertElementExists('courseCard', courseName)
  await coursePages.courseList.click('courseMenu', courseName);
  await coursePages.courseList.click('courseMenu', courseName)
  await coursePages.editCourse.click('editCourse');

  for (let i = 0; i < dataTable.rows().length; i++) {
    var c = dataTable.hashes()[i];
    await coursePages.editCourse.populate('courseName', courseName)
    await coursePages.editCourse.populate('courseCode', c.courseCode)
    await coursePages.editCourse.populate('templateStatus', 'Active On Date')
  }
  await coursePages.editCourse.click('save');
});

When(/^I add the following activities to my template$/, async function (dataTable) {
  const activities = []
  const courseName = this.data.get('courseName');
  await coursePages.createCourse.click('courseCard', courseName)
  await coursePages.coursePage.click('navigation', 'Production');
  await coursePages.coursePage.click('navigation', 'Search');
  await coursePages.coursePage.click('contentType', 'Keyword Search');
  for (let i = 0; i < dataTable.rows().length; i++) {
    const activity = dataTable.hashes()[i].activity
    await coursePages.coursePlanner.populate('librarySearchInput', activity);
    await coursePages.coursePlanner.click('librarySearchInput');
    await coursePages.resources.click('addResources', activity);
    activities.push(activity)
  }
  this.data.set('activities', activities);
  await coursePages.coursePage.click('navigation', 'Back to Course');
  await coursePages.home.click('achieveHome');
});

When(/^I add URL link to my course$/, async function (dataTable) {
  const courseName = this.data.get('courseName');
  await coursePages.courseList.waitForElementVisibility('courseTemplate', 'COURSE TEMPLATES');
  await coursePages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
  await coursePages.courseList.populate('search', courseName);
  await coursePages.createCourse.waitForElementVisibility('courseCard', courseName);
  await coursePages.createCourse.click('courseCard', courseName);
  await coursePages.coursePage.click('navigation', 'Production');
  await coursePages.coursePage.click('navigation', 'Create');
  await coursePages.createCourse.click('New');
  for (let i = 0; i < dataTable.rows().length; i++) {
    await coursePages.resources.click('urlLink');
    await coursePages.resources.populate('addUrlLinkinput', dataTable.hashes()[i].link)
    await coursePages.resources.click('addUrlLink');
  }
  await coursePages.resources.click('customActivityCloseButton');
  await coursePages.coursePage.click('navigation', 'Back to Course');
  await coursePages.home.click('achieveHome');
});

When(/^I assign "(.*)" to my course$/, async function (userKey) {
  const user = this.users[userKey];
  const courseName = this.data.get('courseName');
  await coursePages.courseList.click('courseTemplate', 'COURSES');
  await coursePages.courseList.populate('search', courseName);
  await coursePages.createCourse.waitForElementVisibility('courseCard', courseName);
  await coursePages.createCourse.assertElementExists('courseCard', courseName);
  await coursePages.courseList.assertElementExists('courseMenu', courseName); 
  await coursePages.courseList.click('courseMenu', courseName); 
  await coursePages.courseList.click('courseMenu', courseName);
  await coursePages.courseList.click('manageInstructor');
  await coursePages.courseList.populate('addInstructor', user.username);
  await coursePages.courseList.click('addButton');
  await coursePages.courseList.assertElementExists('instructorClose');
  await coursePages.courseList.click('instructorClose');
});

When(/^I enroll the following students in my course$/, async function (dataTable) {
  const courseName = this.data.get('courseName');
  await coursePages.courseList.populate('search', courseName);
  await coursePages.createCourse.waitForElementVisibility('courseCard', courseName);
  await coursePages.createCourse.assertElementExists('courseCard', courseName);
  await coursePages.createCourse.click('courseCard', courseName);
  await driver.getDriver().navigate().refresh();
  await coursePages.createCourse.assertElementExists('courseTitle', 'E2E 301: ' + courseName)
  await coursePages.home.scrollElementIntoView('togglerMenu');
  await coursePages.home.assertElementExists('togglerMenu');
  await coursePages.home.click('togglerMenu');
  await coursePages.adminMenu.waitForElementVisibility('admin');
  await coursePages.adminMenu.assertElementExists('admin');
  await sleep (500);
  await coursePages.adminMenu.click('admin');
  await coursePages.adminMenu.click('admin');
  await coursePages.adminMenu.click('manageEnrollments');
  for (let i = 0; i < dataTable.rows().length; i++) {
    const user = this.users[dataTable.hashes()[i].student];
    await coursePages.adminMenu.populate('emailInput', user.username);
    await coursePages.adminMenu.click('addUserButton');
    await sleep (1000);
  }
  await coursePages.adminMenu.click('closeManageRoles');
  await coursePages.home.click('achieveHome');
});

When('I activate my course', async function () {
  const courseName = this.data.get('courseName');
  await coursePages.courseList.click('courseMenu', courseName);
  await coursePages.editCourse.click('editCourse');
  await coursePages.editCourse.populate('templateStatus', 'Active On Date');
  await coursePages.courseList.click('endDate');
  await coursePages.courseList.click('nextMonthButton');
  await coursePages.courseList.click('nextMonthButton');
  await coursePages.courseList.click('nextMonthButton');
  await coursePages.courseList.click('nextMonthButton');
  await coursePages.courseList.click('selectDate', '15');
  await coursePages.editCourse.click('save');
  await coursePages.home.click('closeAlert');
});

When(/^I activate course "(.*)" with the following data$/, async function (courseName, dataTable) {
  for (let i = 0; i < dataTable.rows().length; i++) {
    var c = dataTable.hashes()[i];
    await coursePages.courseList.populate('search', courseName);
    await sleep(500);
    await coursePages.courseList.waitForElementVisibility('courseMenu', courseName);
    await coursePages.courseList.click('courseMenu', courseName);
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
    await coursePages.courseList.populate('search', courseName);
    await coursePages.createCourse.waitForElementVisibility('courseCard', courseName);
    await coursePages.createCourse.assertElementExists('courseCard', courseName);
    await coursePages.createCourse.click('courseCard', courseName);
    await coursePages.coursePage.click('navigation', 'Gradebook');
    await coursePages.gradebook.click('gradebookSettings')
    await coursePages.gradebook.click('gradeBookCategory','Add Category');
    await coursePages.gradebook.scrollElementIntoView('categoryName')
    await coursePages.gradebook.populate('categoryName', dataTable.hashes()[i].categoryName)
    await coursePages.gradebook.populate('dropLowestGrade', dataTable.hashes()[i].dropGrade);
    await coursePages.gradebook.click('save','Save');
  }
});

When('I convert my template into a course', async function () {
  const courseName = this.data.get('courseName');
  const courseCode = this.data.get('courseCode');
  await coursePages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
  await coursePages.courseList.populate('search', courseName);
  await coursePages.courseList.assertElementExists('courseMenu', courseName);
  await sleep(500);
  await coursePages.courseList.click('courseMenu', courseName);
  await coursePages.copyCourse.click('copyCourse');
  
  // Make sure the input is cleared out
  await coursePages.copyCourse.populate('courseName', '')
  await sleep(500);

  await coursePages.copyCourse.populate('courseName', courseName)
  await coursePages.copyCourse.populate('courseCode', courseCode)
  await coursePages.copyCourse.click('save');
  await coursePages.home.click('closeAlert');
});