const { Given, When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);

When(/^I activate "(.*)" course with following data$/, async function (courseName, data_table) {
  await pages.course_list.click('course_menu', courseName);
  await pages.editCourse.click('edit_course');

  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      await pages.editCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value);
    } else {
      await pages.create_course.populate('select_day', data_table.hashes()[i].value);
    }
  }
  await pages.course_list.click('end_date');
  await pages.course_list.click('next_month_button');
  await pages.course_list.click('next_month_button');
  await pages.course_list.click('select_date');
  await pages.editCourse.click('save_editcourse');
  await pages.home.click('close_alert');
});

When(/^I create custom made activity in "(.*)" with the following data$/, async function (courseName, data_table) {
  await pages.course_page.click('course_planner');
  await pages.course_planner.click('custom_content_button');
  await pages.course_planner.click('New_custom');
  await pages.course_planner.click('assessment_button');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.course_planner.populate(data_table.hashes()[i].activity, data_table.hashes()[i].value);
  }
  await pages.course_planner.click('reset_model');
  await pages.course_planner.click('Question_bank');
  await pages.course_planner.click('customQuestions');
  await pages.course_planner.click('AddAnothercustomQuestions');
  await pages.course_planner.click('NEcustomQuestions');
  await pages.course_planner.click('editQuestionTitleCQ')
  await pages.course_planner.assertElementExists('QuestionTitleCQ')
  await pages.course_planner.populate('QuestionTitleCQ', 'MC');
  await pages.course_planner.click('AnswerPromptCQ');
  await pages.course_planner.populate('enterAnswerCQ', '1')
  await pages.course_planner.assertElementExists('CreatecustomQuestionsbutton')
  await pages.course_planner.click('CreatecustomQuestionsbutton')
  await pages.course_planner.assertElementExists('Check_box_assignment')
  await pages.course_planner.click('Check_box_assignment');
  await pages.course_planner.click('Add_assignment_button');
  await pages.course_planner.click('close_assesment')
});

When(/^I add the activities in courseplanner to "(.*)" course$/, async function (courseName, data_table) {
  await pages.create_course.click('course_card', courseName);
  await pages.course_page.click('course_planner');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.course_planner.click('custom_content_button');
    await pages.course_planner.click('library_tab');
    await pages.course_planner.populate('library_search_input', data_table.hashes()[i].activity);
    await pages.course_planner.click('add_assignment_button', data_table.hashes()[i].activity);
    await pages.course_planner.click('close_courseplanner');
  }
});

When('I add custom made activities in courseplanner', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.course_planner.click('custom_content_button');
    await pages.course_planner.click('your_content');
    await pages.course_planner.populate('library_search_input', data_table.hashes()[i].activity);
    await pages.course_planner.click('add_custom_activity', data_table.hashes()[i].activity);
    await pages.course_planner.click('close_courseplanner');
  }
});

When('I assign the activities in courseplanner', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    let Elements = await pages.course_planner.getWebElements('assign_assignment_button');
    let countlinks = Elements.length;
    let x = countlinks - 1;
    while (x >= 0) {
      x--;
      await pages.course_planner.click('assign_assignment_button');
      await pages.course_planner.click('vissibility_button');
      await pages.course_planner.populate('points_input', data_table.hashes()[i].Points);
      await pages.course_planner.click('assign_button');
      await pages.home.click('close_alert');
      break;
    }
  }
});

When(/^I click on "(.*)"$/, async function (courseName) {
  await pages.create_course.click('course_card', courseName);
});
