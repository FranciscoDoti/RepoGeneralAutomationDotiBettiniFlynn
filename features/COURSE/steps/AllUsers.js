const {Given, When, Then} = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const {sleep} = require(`${process.cwd()}/app/driver`);
const driver = require(`${process.cwd()}/app/driver.js`);
const { randomURL } = require(`${process.cwd()}/features/COURSE/helpers/dataGenerator`);

Given(/^I search for "(.*)" course$/, async function (input) {
  await pages.courseList.populate('search', input);
  await pages.createCourse.assertElementExists('courseCard', input)
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
When(/^I click on "(.*)" Button$/, async function (tab) {
  await pages.coursePage.click('navigation', tab);
});

When(/^I click on search button and input "(.*)" to search the course$/, async function (CourseName) {
  await pages.courseList.waitForElementVisibility('courseTemplate', 'COURSE TEMPLATES');
  await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
  await sleep(500);
  await pages.courseList.populate('search', CourseName);
  await sleep(500);
  await pages.courseList.assertElementExists('courseName', CourseName)
});

When(/^I activate "(.*)" template and add the following data$/, async function (courseName, data_table) {
  await pages.courseList.waitForElementVisibility('courseMenu', courseName);
  await sleep(500);
  await pages.courseList.click('courseMenuTemplate', courseName);
  await pages.editCourse.click('editCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    await pages.editCourse.populate('courseName', c.courseName)
    await pages.editCourse.populate('courseCode', c.courseCode)
    await pages.editCourse.populate('templateStatus', c.templateStatus)
  }
  await pages.editCourse.click('save');
  await pages.home.click('closeAlert');
});


When(/^I delete the "(.*)"$/, async function (courseName) {
  await pages.courseList.waitForElementVisibility('courseMenuTemplate', courseName);
  await sleep(500);
  await pages.courseList.click('courseMenu', courseName);
  await pages.courseList.click('deleteCourse');
  await pages.courseList.click('confirmDelete');
});
Then(/^I verify that "(.*)" is created with following data$/, async function (courseName, data_table) {
  // await pages.courseList.populate('search', courseName);
  this.data.set('course', courseName);
  await sleep(500);
  await pages.courseList.waitForElementVisibility('courseMenu', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    await pages.createCourse.assertTextIncludes('courseCard', courseName, c.CourseName);
    await pages.createCourse.assertTextIncludes('Status', courseName, c.Status);
  }
});
Then(/^I verify that "(.*)" is activated with following data$/, async function (courseName, data_table) {
  await pages.courseList.populate('search', courseName);
  await pages.courseList.waitForElementVisibility('courseMenu', courseName);
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    await pages.courseList.assertTextIncludes('courseName', courseName, c.CourseName)
    await pages.createCourse.assertTextIncludes('ISBNVerification', courseName, c.ISBN)
    await pages.courseList.assertTextIncludes('courseStatus', courseName, c.Status)
  }
});

When(/^I add URL link to "(.*)"$/, async function (tabName, data_table) {
  await pages.coursePage.click('navigation', tabName);
  await pages.createCourse.click('New');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('urlLink');
    let link = data_table.hashes()[i].link == "randomURL" ? randomURL : data_table.hashes()[i].link;
    await pages.resources.populate(data_table.hashes()[i].field, link)
    await pages.resources.click('nextStepUrlLink');
    await pages.resources.click('addUrlLink');
    await pages.resources.click('goToContent', 'Go to Your Content');
  }
});
When('I click on go to your content', async function () {
  await pages.resources.click('goToContent', 'Go to Your Content');
});

When('I close generate access code', async function () {
  await pages.adminMenu.click('closeExportList');
});

When(/^I click on "(.*)" tab$/, async function (tab) {
  await pages.courseList.click('courseTemplate', tab);
})
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

When('I click on back to course', async function () {
  await pages.coursePage.click('navigation', 'Back to Course');
});

Then(/^I verify that "(.*)" is deleted$/, async function (courseName) {
  await driver.getDriver().navigate().refresh();
  await pages.courseList.assertElementDoesNotExist('cousreMenu', courseName)
});

When('I refresh the browser', async function () {
  await driver.getDriver().navigate().refresh();
});
