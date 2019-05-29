const { Given, When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);

When('I complete the reading activity', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.click('overviewtab_activity', data_table.hashes()[i].activity);
    await pages.overview.getAttributeValue('reading_verification', data_table.hashes()[i].activity);
  }
});

Then('I verify the activity status for the following activities', async function (data_table) {
  let elements = await pages.overview.getWebelements('overviewtab_activity_verification');
  for (let x = 0; x <= elements.length; x++) {
    for (let i = 0; i < data_table.rows().length; i++) {
      let verify = await pages.overview.assertTextinclude('overviewtab_activity_verification', data_table.hashes()[i].activity)
      if (verify == true) {
        await pages.overview.assertTextinclude('complete_status', data_table.hashes()[i].status)
      }
    }
  }
});

When('I delete the courses', async function () {
  let elements = await pages.create_course.getWebelements('course_card');
  for (let x = 0; x <= elements.length; x++) {
    await pages.course_list.click('course_menu');
    await pages.main.click('delete_course');
  }
});

When(/^I attempt "(.*)" premade assesment in "(.*)"$/, async function (activityName, courseName, data_table) {
  await pages.create_course.click('course_card', courseName);
  await pages.course_page.click('overview')
  await pages.overview.click('overviewtab_activity', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.student_activity.click('multiple_choice_assesment', data_table.hashes()[i].PremadeAssesmentKey);
    await pages.student_activity.click('save_answer');
    await pages.student_activity.click('Next_assesment_question');
  }
  await pages.course_planner.click('close_assesment')
});

When(/^I attempt "(.*)" custom made assesment in "(.*)"$/, async function (activityName, courseName, data_table) {
  await pages.course_page.click('overview')
  await pages.overview.click('overviewtab_activity', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.student_activity.click('multiple_choice_assesment', data_table.hashes()[i].key);
    await pages.student_activity.click('save_answer');
    await pages.student_activity.click('Next_assesment_question');
  }
  await pages.course_planner.click('close_assesment')
});

Then('I verify the assignmenent grades in gradebook for below assigned activities', async function (data_table) {
  await pages.course_page.click('gradebook');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.gradebook.assertTextinclude('studentPercent', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextinclue('studentAssignmentpoints', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextinclude('studentPercenOfTotalGrades', data_table.hashes()[i].activity, data_table.hashes()[i].PercentOfTotalgrades)
  }
});
