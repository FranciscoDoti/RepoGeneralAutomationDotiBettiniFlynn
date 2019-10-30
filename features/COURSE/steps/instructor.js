const { When, Then } = require('cucumber');
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
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('selectDate', '15');
  await pages.editCourse.click('save');
  await pages.home.click('closeAlert');
});

When(/^I create custom made activity in "(.*)" with the following data$/, async function (courseName, data_table) {
  await pages.coursePage.click('tab', 'COURSE PLAN');
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
  await pages.coursePage.click('navigation','Browse');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('addAssignmentButton', data_table.hashes()[i].activity);
    if(i===0) {
      await pages.coursePlanner.click('addingContent');
      await pages.coursePlanner.click('continue');
      await pages.home.click('closeAlert');
    }
  }
});

When('I assign the activities in courseplanner', async function (data_table) {
  await pages.coursePage.click('navigation', 'My Course');
  await pages.home.click('closeAlert');//added
  await pages.coursePage.click('tab', 'COURSE PLAN')
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

When('I create Course Template by coping from {string} template', async function (string) {
  await pages.createCourse.click('createCourseButton');
  await pages.createCourse.click('template');
  await pages.createCourse.click('selectedTemplateBtn');
});

When(/^Instructor copy course from the "(.*)" template with the following data$/, async function (courseName, data_table) {
/*  await pages.courseList.click('courseMenu', courseName);
  await pages.copyCourse.click('copyCourse'); */
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.copyCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await pages.copyCourse.click('save');
  await pages.home.click('closeAlert');
});
  
   
  

Then(/^I verify that "(.*)" is assigned to "(.*)"$/, async function (courseName, userType){
  let user = this.users[userType];
  await pages.home.click('signInLocal');
  await pages.home.populate('username', user.username);
  await pages.home.populate('password', user.password);
  await pages.home.click('signIn');
  await pages.createCourse.assertElementExists('courseCard', courseName);

});

Then('I verify that activities are assigned', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.assertTextIncludes('assignmentStatus', data_table.hashes()[i].activity, data_table.hashes()[i].Status)
  }
});

When(/^I add URL link to "(.*)" in coursePlanner$/, async function (courseName, data_table){
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation','Browse');
  await pages.coursePage.click('tab', 'MY CONTENT');
  await pages.coursePlanner.click('customContentButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('urlLink');
    await pages.resources.populate(data_table.hashes()[i].field, data_table.hashes()[i].link)
    await pages.resources.click('addUrlLink');
  }
});

When('I add url link in courseplanner', async function (data_table){
  await pages.resources.click('goToContent');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('addCustomActivity', data_table.hashes()[i].activity); 
  }
});

Then('I verify that activties are added in courseplanner', async function (data_table){
  await pages.coursePage.click('navigation', 'My Course');
  await pages.coursePage.click('tab', 'COURSE PLAN');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.assertElementExists('activityName', data_table.hashes()[i].activity)
  }
});

When(/^I create a course "(.*)" with the following data$/, async function (courseName, data_table){
await pages.courseList.click('courseMenu', courseName);
await pages.copyCourse.click('copyCourse');
for (let i = 0; i < data_table.rows().length; i++) {
 await pages.copyCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i]. value)
}
await pages.copyCourse.click('save');
});

When(/^I click on "(.*)"$/, async function (courseName){
  await pages.createCourse.click('courseCard', courseName);
})

When(/^I create Gradebook Category for student and assign that to "(.*)" activity$/, async function (activity, data_table) {
  await pages.coursePage.click('navigation','Gradebook');
  await pages.gradebook.click('gradebookSettings')
  await pages.gradebook.click('gradeBookCategory','Add Category');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.gradebook.scrollElementIntoView('categoryName')
    await pages.gradebook.populate('categoryName', data_table.hashes()[i].CategoryName)
    await pages.gradebook.populate('dropLowestGrade', data_table.hashes()[i].DropGrade);
    await pages.gradebook.click('save','Save');
  }
  await pages.coursePage.click('navigation','My Course');
  await pages.coursePage.click('tab', 'COURSE PLAN');
  await pages.coursePlanner.click('assignGradebook', activity);
  await pages.coursePlanner.click('gradeBookCategory');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.populate('Category', data_table.hashes()[i].GradebookCategory)
    await pages.coursePlanner.click('assignButton');
  }
});

Then(/^I verify that "(.*)" is created$/, async function (courseName){
  this.data.set('course', courseName);
    await pages.createCourse.assertTextIncludes('courseCard',courseName,courseName);

});

When(/^I edit student grade in "(.*)"$/, async function (courseName,data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation','Gradebook');
  for (let i = 0; i < data_table.rows().length; i++) {
    let user = this.users[data_table.hashes()[i].Students];
  await pages.gradebook.click('editTotal',user.firstName)
  await pages.gradebook.populate('editGrade', data_table.hashes()[i].editGrade);
  await pages.gradebook.click('save', 'Save');
    }
});

Then('I verify the Grades', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    let user = this.users[data_table.hashes()[i].Students];
    await pages.gradebook.assertTextIncludes('courseTotal', user.firstName, data_table.hashes()[i].CourseTotal);
    await pages.gradebook.assertTextIncludes('studentcourseTotal', user.firstName, data_table.hashes()[i].Google);
    await pages.gradebook.assertTextIncludes('studentCategoryTotal', user.firstName, data_table.hashes()[i].CategoryTotal)
  }
});

Then('I drop', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    let user = this.users[data_table.hashes()[i].Students];
    await pages.coursePage.click('navigation','People');
    await pages.people.populate('searchbox', user.username);
    await pages.people.click('checkbox', user.username);
    await pages.people.click('DropStudents');
    await pages.people.click('Yes,Drop');
  }
});

When('I navigate to gradebook and verify grades', async function (data_table) {
  await pages.coursePage.click('navigation','My Course');
  await pages.gradebook.assertText('checkActivityCompletion', data_table.hashes()[0].activity, data_table.hashes()[0].percent)
});