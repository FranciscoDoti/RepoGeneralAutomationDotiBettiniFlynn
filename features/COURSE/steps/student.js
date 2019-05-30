const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When('I complete the reading activity', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.click('overviewtab_activity', data_table.hashes()[i].activity);
    await pages.overview.getAttributeValue('reading_verification', data_table.hashes()[i].activity);
  }
  await pages.coursePlanner.click('close');
});

Then('I verify the activity status for the following activities', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.assertTextIncludes('activityStatus', data_table.hashes()[i].activity, data_table.hashes()[i].status);
  }
});

When('I delete the courses', async function () {
  let elements = await pages.createCourse.getWebElements('course_card');
  for (let x = 0; x <= elements.length; x++) {
    await pages.courseList.click('course_menu');
    await pages.main.click('delete_course');
  }
});

When(/^I attempt "(.*)" premade assesment in "(.*)"$/, async function (activityName, courseName, data_table) {
  await pages.createCourse.click('course_card', courseName);
  await pages.coursePage.click('overview')
  await pages.overview.click('overviewtab_activity', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.studentActivity.click('multiple_choice_assesment', data_table.hashes()[i].PremadeAssesmentKey);
    await pages.studentActivity.click('save_answer');
    await pages.studentActivity.click('Next_assesment_question');
  }
  await pages.coursePlanner.click('close')
});

When(/^I attempt "(.*)" custom made assesment in "(.*)"$/, async function (activityName, courseName, data_table) {
  await pages.coursePage.click('overview')
  await pages.overview.click('overviewtab_activity', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.studentActivity.click('multiple_choice_assesment', data_table.hashes()[i].key);
    await pages.studentActivity.click('save_answer');
    await pages.studentActivity.click('Next_assesment_question');
  }
  await pages.coursePlanner.click('close')
});

Then('I verify the assignmenent grades in gradebook for below assigned activities', async function (data_table) {
  await pages.coursePage.click('gradebook');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.gradebook.assertTextIncludes('studentPercent', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextinclue('studentAssignmentpoints', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextIncludes('studentPercenOfTotalGrades', data_table.hashes()[i].activity, data_table.hashes()[i].PercentOfTotalgrades)
  }
});
