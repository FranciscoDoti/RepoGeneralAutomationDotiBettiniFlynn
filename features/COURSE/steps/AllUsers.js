const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

Given(/^I search for "(.*)" course$/, async function (input) {
  await pages.courseList.populate('search', input);
});

When('I close the popup message', async function () {
  await pages.home.click('closeAlert');
});
When('I click on course card', async function () {
  await pages.createCourse.click('courseCard');
});

When('I click on resource tab', async function () {
  await pages.coursePage.click('resources');
});
When('I click on home button to return to coursepage', async function () {
  await pages.home.click('achieveHome');
});

When(/^I click on search button and input "(.*)" to search the course$/, async function (CourseName) {
  await pages.courseList.click('courseTemplate', 'Course Templates');
  await pages.courseList.populate('search', CourseName);
  await pages.createCourse.assertElementExists('courseCard', CourseName)
});


When('I delete the courses', async function () {
  let elements = await pages.createCourse.getWebElements('courseCard');
  for (let x = 0; x <= elements.length; x++) {
    await pages.courseList.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.main.click('confirmDelete');
  }
});
Then(/^I verify that "(.*)" is created with following data$/, async function (courseName, data_table) {
  // await pages.courseList.populate('search', courseName);
  this.data.set('course', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.courseList.assertElementExists(data_table.hashes()[i].field, data_table.hashes()[i].value);
  }
});

When(/^I add URL link to "(.*)"$/, async function (data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation', 'Resources');
  await pages.resources.click('addActivity');
  await pages.resources.click('createCustomActivity');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('urlLink');
    await pages.resources.populate(data_table.hashes()[i].field, data_table.hashes()[i].link)
    await pages.resources.click('addUrlLink');
  }
});

When('I add URL activity in resource tab', async function (data_table) {
  await pages.resources.click('goToContent');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.populate('searchBar', data_table.hashes()[i].activity);
    await pages.resources.click('addCCButton', data_table.hashes()[i].activity)
  }
});

When('I close generate access code', async function () {
  await pages.adminMenu.click('closeExportList');
});

When(/^I clone content from "(.*)" template$/, async function (courseName) {
  await pages.coursePage.click('navigation', 'Resources');
  await pages.resources.click('importStructure');
  await pages.resources.click('importStructureSearchBar');
  await pages.resources.populate("importStructureSearchBar", courseName);
  await pages.resources.click('importStructureSelectButton');
  await pages.resources.click('importContentCheckboxContent');
  await pages.resources.click('importContentImportButton');
});

Then(/^I verify if content was imported successfully with message "(.*)"$/, async function (message) {
  await pages.home.assertTextIncludes('alert', message);
});
