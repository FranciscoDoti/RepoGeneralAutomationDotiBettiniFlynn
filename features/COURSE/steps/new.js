const { Given, When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);

Given(/^I search for "(.*)" course$/, async function (input) {
  await pages.course_list.populate('search', input);
});

When('I create Course Template with the data', async function (data_table) {
  await pages.create_course.click('button');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.create_course.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
    } else {
      await pages.create_course.click('select_day', data_table.hashes()[i].value);
    }
  }

  await pages.create_course.click('save');
  await pages.home.click('close_alert');
});

When('I close the popup message', async function () {
  await pages.home.click('close_alert');
});

When(/^I activate the "(.*)" template and add the following data$/, async function (courseName, data_table) {
  await pages.course_list.click('course_menu', courseName);
  await pages.editCourse.click('edit_course');

  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.editCourse.populate(data_table.hashes()[i].filed, data_table.hashes()[i].value);
    } else {
      await pages.create_course.click('select_day', data_table.hashes()[i].value);
    }
  }
  await pages.editCourse.click('save_editcourse');
  await pages.home.click('close_alert');
});

When('I click on course card', async function () {
  await pages.create_course.click('course_card');
});

When('I click on resource tab', async function () {
  await pages.course_page.click('resources');
});

When(/^I add the activities in resources to "(.*)" template$/, async function (courseName, data_table) {
  await pages.create_course.click('course_card', courseName);
  await pages.course_page.click('resources');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('add_content');
    await pages.resources.populate('search_bar', data_table.hashes()[i].activity);
    await pages.resources.click(data_table.hashes()[i].type, data_table.hashes()[i].activity);
    await pages.resources.click('close_resource_search_nav');
  }
});

When('I click on home button to return to coursepage', async function () {
  await pages.main.click('achieve_home');
});

When(/^I copy course from the "(.*)" template with the following data$/, async function (courseName, data_table) {
  await pages.course_list.click('course_menu', courseName);
  await pages.copyCourse.click('copy_course');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.copyCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await pages.copyCourse.click('save_copycourse');
  await pages.home.click('close_alert');
});

When('I sign out of Achieve', async function () {
  await pages.home.click('toggler_menu');
  await pages.home.click('sign_out');
});

When(/^I click on search button and input "(.*)" to search the course$/, async function (CourseName) {
  await pages.course_list.populate('search', CourseName)
});

When(/^I assign "(.*)" to the "(.*)" course$/, async function (userName, courseName) {
  let user = await _.get(users, [this.environment, userName]);
  await pages.course_list.populate('search', courseName);
  await pages.course_list.assertElementExists('course_name', courseName);
  await pages.course_list.click('course_menu', courseName);
  await pages.course_list.click('Manage_instructor');
  await pages.create_course.populate('add_instructor', user.username);
  await pages.create_course.click('add_instructor_button');
  await pages.create_course.click('add_instructor_close');
});

When(/^I activate "(.*)" course with following data $/, async function (courseName, data_table) {
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
  await pages.create_course.click('save_editcourse');
  await pages.home.click('close_alert');
});

When(/^I create custom made activity in "(.*)" with the following data$/, async function (courseName, data_table) {
  await pages.create_course.click('course_card', courseName);
  await pages.course_page.click('course_planner');
  await pages.course_planner.click('custom_content_button');
  await pages.course_planner.click('New_custom');
  await pages.course_planner.click('assessment_button');
  await pages.course_planner.assertElementExists('close_assesment');
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
  await pages.course_planner.click('CreatecustomQuestionsbutton')
  await pages.course_planner.click('Check_box_assignment');
  await pages.course_planner.click('Add_assignment_button');
  await pages.course_planner.click('close_assesment')
});

When('I add the activities in courseplanner', async function (data_table) {
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

When(/^I enroll the "(.*)" in "(.*)" course$/, async function (user, courseName) {
  let payload = await _.get(users, [this.environment, user]);
  await pages.course_list.populate('search', courseName);
  await pages.course_list.assertElementExists('course_name', courseName);
  await pages.create_course.click('course_card', courseName);
  await pages.home.click('toggler_menu');
  await pages.user.assertElementExists('admin');
  await pages.user.click('admin');
  await pages.home.click('manage_enrollments');
  await pages.home.populate('manage_enrollements_input', payload.username);
  await pages.home.click('add_user_button');
  await pages.home.click('close_manage_roles');
});

When('I click on reading activity', async function (data_table) {
  await pages.create_course.click('course_card');
  for (let i = 0; i < data_table.rows().length; i++) {
    let activityName = await pages.overview.getText('Activity_link');
    if (activityName === data_table.hashes()[i].activity) {
      await pages.overview.click('Activity_link');
    }
  }
});

Then('I verify reading activity has content to read', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.getAttributeValue('reading_verification', data_table.hashes()[i].activity);
  }
});

Then('I verify the activity status as completed once the student attempt the activities', async function (data_table) {
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

When(/^I attempt "(.*)" learning curve activity$/, async function (activityName, data_table) {
  await pages.overview.click('overviewtab_activity', activityName);
  await pages.overview.click('Begin_activity');
  for (let i = 0; i < data_table.rows().length; i++) {
    while (true) {
      let assert = await pages.student_activity.checkWebElementExists('quiz_complete')
      if (assert === true) {
        await pages.student_activity.click('back_to_study_plan');
      } else {
        let jsonObject = await pages.student_activity.getText('activity_Question');
        let split = jsonObject.split('}')[0] + '}';
        let finalResult = JSON.parse(split);
        let result = require(`${process.cwd()}/features/COURSE/auto_manuscript_1551301608988.json`)
        let answerKey = result.questions[finalResult.Id]
        switch (answerKey.Type) {
          case 'SC':
            let answerChoices = await pages.student_activity.getWebElements('sentence_click_lc')
            for (let i = 0; i < answerChoices.length; i++) {
              let answerText = await pages.student_activity.getText('');
              console.log(answerText);

            //   let split
            //   if (answerText === true)  {
            //     await pages
            //     break
            //   }
            }
            await pages.student_activity.click('next_question');
            break;

          case 'MC':
            console.log('enteres Mc')
            let ordered = answerKey.Ordered
            let answerList = await pages.student_activity.getWebElements('mc_answers')
            for (let i = 0; i < answerList.length; i++) {
              let text = await answerList[i].getText()
              if (ordered) {
                assertTextIncludes(i.toString()) > -1, 'The index was not correct. \n Expected: ' + i + '\nActually: ' + text.charAt(text.length - 1)
              }
              if (assertTextIncludes(answer)) {
                await answerList[i].click()
                break
              }
            }
            await pages.student_activity.click('submit_button');
            await pages.student_activity.click('next_question');
            break;
          case 'FB':
            console.log('entered fb')
            await pages.student_activity.populate('fill_blank_lc', answerKey.Answer);
            await pages.student_activity.click('next_question');
            break;
        }
      }
    }
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

Then(/^I verify the assignmenent grades in gradebook for below assigned activities in "(.*)"$/, async function (courseName, data_table) {
  await pages.course_page.click('gradebook');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.gradebook.assertTextinclude('studentPercent', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextinclue('studentAssignmentpoints', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextinclude('studentPercenOfTotalGrades', data_table.hashes()[i].activit, data_table.hashes()[i].PercentOfTotalgrades)
  }
});

Then(/^I verify that "(.*)" message is displayed$/, async function (message) {
  await pages.home.assertTextinclude('close_alert', message);
});

Then(/^I verify that "(.*)" has created with following "(.*)" number$/, async function (courseName, verifyNumber) {
  await pages.home.assertTextinclude('ISBNVerification', courseName, verifyNumber);
});

When(/^I create "(.*)" with the data$/, async function (courseName, data_table) {
  await pages.create_course.click('button');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.create_course.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
    } else {
      await pages.create_course.click('select_day', data_table.hashes()[i].value);
    }
  }
  await pages.create_course.click('save');
});
