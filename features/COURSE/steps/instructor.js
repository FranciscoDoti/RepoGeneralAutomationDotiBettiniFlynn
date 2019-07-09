const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When(/^I activate "(.*)" course with following data$/, async function (courseName, data_table) {
  await pages.courseList.click('courseMenu', courseName);
  await pages.editCourse.click('editCourse');

  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      await pages.editCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value);
    } else {
      await pages.createCourse.populate('selectDay', data_table.hashes()[i].value);
    }
  }
  await pages.courseList.click('endDate');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('selectDate');
  await pages.editCourse.click('save');
  await pages.home.click('closeAlert');
});

When(/^I create custom made activity in "(.*)" with the following data$/, async function (courseName, data_table) {
  await pages.coursePage.click('coursePlanner');
  await pages.coursePlanner.click('customContentButton');
  await pages.coursePlanner.click('newCustom');
  await pages.coursePlanner.click('assessmentButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.populate(data_table.hashes()[i].activity, data_table.hashes()[i].value);
  }
  await pages.coursePlanner.click('resetModel');
  await pages.coursePlanner.click('questionBank');
  await pages.coursePlanner.click('customQuestions');
  await pages.coursePlanner.click('addAnotherCustomQuestions');
  await pages.coursePlanner.click('NEcustomQuestions');
  await pages.coursePlanner.click('editQuestionTitleCQ')
  await pages.coursePlanner.assertElementExists('QuestionTitleCQ')
  await pages.coursePlanner.populate('QuestionTitleCQ', 'MC');
  await pages.coursePlanner.click('AnswerPromptCQ');
  await pages.coursePlanner.populate('enterAnswerCQ', '1')
  await pages.coursePlanner.assertElementExists('CreatecustomQuestionsbutton')
  await pages.coursePlanner.click('CreatecustomQuestionsbutton')
  await pages.coursePlanner.assertElementExists('checkBoxAssignment')
  await pages.coursePlanner.click('checkBoxAssignment');
  await pages.coursePlanner.click('addAssignmentButton');
  await pages.coursePlanner.click('close')
});

When(/^I add the activities in courseplanner to "(.*)" course$/, async function (courseName, data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('coursePlanner');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('customContentButton');
    await pages.coursePlanner.click('libraryTab');
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('addAssignmentButton', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('closeCourseplanner');
  }
});

When('I add custom made activities in courseplanner', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('custom_content_button');
    await pages.coursePlanner.click('your_content');
    await pages.coursePlanner.populate('library_search_input', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('add_custom_activity', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('closeCourseplanner');
  }
});

When('I assign the activities in courseplanner', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    let Elements = await pages.coursePlanner.getWebElements('assignAssignmentButton');
    let countlinks = Elements.length;
    let x = countlinks - 1;
    while (x >= 0) {
      x--;
      await pages.coursePlanner.click('assignAssignmentButton');
      await pages.coursePlanner.click('vissibilityButton');
      await pages.coursePlanner.populate('pointsInput', data_table.hashes()[i].Points);
      await pages.coursePlanner.click('assignButton');
      await pages.home.click('closeAlert');
      break;
    }
  }
});

When(/^I click on "(.*)"$/, async function (courseName) {
  await pages.createCourse.click('courseCard', courseName);
});

Then(/^I verify that "(.*)" is assigned to "(.*)"$/, async function (courseName, userName){
  let payload = await _.get(users, [this.environment, userName]);
  await pages.home.click('signInLocal');
  await pages.home.populate('username', payload.username);
  await pages.home.populate('password', payload.password);
  await pages.home.click('signIn');
  await pages.courseList.assertElementExists('courseName', courseName);

});

Then('I verify that activities are assigned', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.assertTextIncludes('assignmentStatus', data_table.hashes()[i].activity, data_table.hashes()[i].Status)
  }
});

When(/^I add URL link to "(.*)" in coursePlanner$/, async function (courseName, data_table){
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('coursePlanner');
  await pages.coursePlanner.click('customContentButton');
  await pages.coursePlanner.click('newCustom');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('urlLink');
    await pages.resources.populate(data_table.hashes()[i].field, data_table.hashes()[i].link)
    await pages.resources.click('addUrlLink');
  }
});

When('I add url link in courseplanner', async function (data_table){
  await pages.resources.click('goToContent');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('yourContent');
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('addCustomActivity', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('closeCourseplanner');
  }
});

Then('I verify that activties are added in courseplanner', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.assertElementExists('activityName', data_table.hashes()[i].activity)
  }
});


