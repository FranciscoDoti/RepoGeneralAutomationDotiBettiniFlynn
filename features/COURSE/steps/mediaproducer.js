const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When('I create Course Template with the data', async function (data_table) {
  await pages.createCourse.click('createCourseButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.createCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
    } else {
      await pages.createCourse.click('selectDay', data_table.hashes()[i].value);
    }
  }

  await pages.createCourse.click('save');
  await pages.home.click('closeAlert');
});

When(/^I activate the "(.*)" template and add the following data$/, async function (courseName, data_table) {
  await pages.courseList.click('courseMenu', courseName);
  await pages.editCourse.click('editCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.editCourse.assertElementExists(data_table.hashes()[i].field)
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.editCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value);
    } else {
      await pages.createCourse.click('selectDay', data_table.hashes()[i].value);
    }
  }
  await pages.editCourse.click('save');
  await pages.home.click('closeAlert');
});

When(/^I add the activities in resources to "(.*)" template$/, async function (courseName, data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('resources');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addContent');
    await pages.resources.populate('searchBar', data_table.hashes()[i].activity);
    await pages.resources.click(data_table.hashes()[i].type, data_table.hashes()[i].activity);
    await pages.resources.click('closeResourceSearchNav');
  }
});

When(/^I copy course from the "(.*)" template with the following data$/, async function (courseName, data_table) {
  await pages.courseList.click('courseMenu', courseName);
  await pages.copyCourse.click('copyCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.copyCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await pages.copyCourse.click('save');
  await pages.home.click('closeAlert');
});

Then(/^I verify that "(.*)" message is displayed$/, async function (message) {
  await pages.home.assertTextIncludes('closeAlert', message);
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
      await pages.createCourse.click('selectDay', data_table.hashes()[i].value);
    }
  }
  await pages.createCourse.click('save');
});

When('I add folders in resource tab', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addFolde');
    await pages.resources.populate('folderName', data_table.hashes()[i].folder);
    await pages.resources.click('addFolderButton');
  }
});
