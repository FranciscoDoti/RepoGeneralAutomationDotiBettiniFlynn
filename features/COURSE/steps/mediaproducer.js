const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When('I create Course Template with the data', async function (data_table) {
  await pages.createCourse.click('button');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.createCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
    } else {
      await pages.createCourse.click('select_day', data_table.hashes()[i].value);
    }
  }

  await pages.createCourse.click('save');
  await pages.home.click('close_alert');
});

When(/^I activate the "(.*)" template and add the following data$/, async function (courseName, data_table) {
  await pages.courseList.click('course_menu', courseName);
  await pages.editCourse.click('edit_course');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.editCourse.assertElementExists(data_table.hashes()[i].field)
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.editCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value);
    } else {
      await pages.createCourse.click('select_day', data_table.hashes()[i].value);
    }
  }
  await pages.editCourse.click('save_editcourse');
  await pages.home.click('close_alert');
});

When(/^I add the activities in resources to "(.*)" template$/, async function (courseName, data_table) {
  await pages.createCourse.click('course_card', courseName);
  await pages.coursePage.click('resources');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('add_content');
    await pages.resources.populate('search_bar', data_table.hashes()[i].activity);
    await pages.resources.click(data_table.hashes()[i].type, data_table.hashes()[i].activity);
    await pages.resources.click('close_resource_search_nav');
  }
});

When(/^I copy course from the "(.*)" template with the following data$/, async function (courseName, data_table) {
  await pages.courseList.click('course_menu', courseName);
  await pages.copyCourse.click('copy_course');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.copyCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await pages.copyCourse.click('save_copycourse');
  await pages.home.click('close_alert');
});

Then(/^I verify that "(.*)" message is displayed$/, async function (message) {
  await pages.home.assertTextIncludes('close_alert', message);
});

Then(/^I verify that "(.*)" has created with following "(.*)" number$/, async function (courseName, verifyNumber) {
  await pages.home.assertTextIncludes('ISBNVerification', courseName, verifyNumber);
});

When(/^I create "(.*)" with the data$/, async function (courseName, data_table) {
  await pages.createCourse.click('button');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.createCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
    } else {
      await pages.createCourse.click('select_day', data_table.hashes()[i].value);
    }
  }
  await pages.createCourse.click('save');
});
