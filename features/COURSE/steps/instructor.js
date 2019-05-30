const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When(/^I activate "(.*)" course with following data$/, async function (courseName, data_table) {
  await pages.courseList.click('course_menu', courseName);
  await pages.editCourse.click('edit_course');

  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      await pages.editCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value);
    } else {
      await pages.createCourse.populate('select_day', data_table.hashes()[i].value);
    }
  }
  await pages.courseList.click('end_date');
  await pages.courseList.click('next_month_button');
  await pages.courseList.click('next_month_button');
  await pages.courseList.click('select_date');
  await pages.editCourse.click('save_editcourse');
  await pages.home.click('close_alert');
});

When(/^I create custom made activity in "(.*)" with the following data$/, async function (courseName, data_table) {
  await pages.coursePage.click('coursePlanner');
  await pages.coursePlanner.click('custom_content_button');
  await pages.coursePlanner.click('New_custom');
  await pages.coursePlanner.click('assessment_button');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.populate(data_table.hashes()[i].activity, data_table.hashes()[i].value);
  }
  await pages.coursePlanner.click('reset_model');
  await pages.coursePlanner.click('Question_bank');
  await pages.coursePlanner.click('customQuestions');
  await pages.coursePlanner.click('AddAnothercustomQuestions');
  await pages.coursePlanner.click('NEcustomQuestions');
  await pages.coursePlanner.click('editQuestionTitleCQ')
  await pages.coursePlanner.assertElementExists('QuestionTitleCQ')
  await pages.coursePlanner.populate('QuestionTitleCQ', 'MC');
  await pages.coursePlanner.click('AnswerPromptCQ');
  await pages.coursePlanner.populate('enterAnswerCQ', '1')
  await pages.coursePlanner.assertElementExists('CreatecustomQuestionsbutton')
  await pages.coursePlanner.click('CreatecustomQuestionsbutton')
  await pages.coursePlanner.assertElementExists('Check_box_assignment')
  await pages.coursePlanner.click('Check_box_assignment');
  await pages.coursePlanner.click('Add_assignment_button');
  await pages.coursePlanner.click('close')
});

When(/^I add the activities in courseplanner to "(.*)" course$/, async function (courseName, data_table) {
  await pages.createCourse.click('course_card', courseName);
  await pages.coursePage.click('coursePlanner');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('custom_content_button');
    await pages.coursePlanner.click('library_tab');
    await pages.coursePlanner.populate('library_search_input', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('add_assignment_button', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('close_courseplanner');
  }
});

When('I add custom made activities in courseplanner', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('custom_content_button');
    await pages.coursePlanner.click('your_content');
    await pages.coursePlanner.populate('library_search_input', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('add_custom_activity', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('close_courseplanner');
  }
});

When('I assign the activities in courseplanner', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    let Elements = await pages.coursePlanner.getWebElements('assign_assignment_button');
    let countlinks = Elements.length;
    let x = countlinks - 1;
    while (x >= 0) {
      x--;
      await pages.coursePlanner.click('assign_assignment_button');
      await pages.coursePlanner.click('vissibility_button');
      await pages.coursePlanner.populate('points_input', data_table.hashes()[i].Points);
      await pages.coursePlanner.click('assign_button');
      await pages.home.click('close_alert');
      break;
    }
  }
});

When(/^I click on "(.*)"$/, async function (courseName) {
  await pages.createCourse.click('course_card', courseName);
});
