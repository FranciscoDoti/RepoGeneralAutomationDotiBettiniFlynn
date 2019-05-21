const { Given, When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);


Given(/^I search for "(.*)" course$/, async function (input) {
  await pages.course_list.populate('search', input);
});

When('I create coourse with the data', async function (data_table) {
  await pages.create_course.click('button');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.create_course.populate(data_table.hashes()[i].page_object, data_table.hashes()[i].value)
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

When(/^I update the "(.*)" template from draft to active with the following data$/, async function (courseName, data_table) {
  await pages.course_list.click('course_menu', courseName);
  await pages.course_list.click('edit_course');

  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.course_list.populate(data_table.hashes()[i].page_object, data_table.hashes()[i].value);
    } else {
      await pages.create_course.click('select_day', data_table.hashes()[i].value);
    }
  }
  await pages.create_course.click('save_editcourse');
  await pages.home.click('close_alert');
});

When('I click on course card', async function () {
  await pages.create_course.click('course_card');
});

When('I click on resource tab', async function () {
  await pages.course_page.click('resources');
});

When(/^I add the activity to "(.*)" course under the resources tab$/, async function (courseName, data_table) {
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
  await pages.course_list.click('copy_course');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.create_course.populate(data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await pages.create_course.click('save_copycourse');
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

When(/^I update the "(.*)" course from draft to Active with following data$/, async function (courseName, data_table) {
  await pages.course_list.click('course_menu', courseName);
  await pages.course_list.click('edit_course');

  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      await pages.course_list.populate(data_table.hashes()[i].page_object, data_table.hashes()[i].value);
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
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.course_planner.populate(data_table.hashes()[i].activity, data_table.hashes()[i].value);
  }
  await pages.course_planner.click('reset_model');
  await pages.course_planner.click('Question_bank');
  await pages.course_planner.click('Check_box_assignment');
  await pages.course_planner.click('Add_assignment_button');
  await pages.course_planner.click('close_assesment')
  // await pages.course_planner.browserBack();
  // await pages.course_planner.browserBack();
  // await pages.course_planner.browserBack();
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

When('I attempt learning curve activity', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    let activityName = await page.overview.getText('learning_curve_activity');
    if (activityName === data_table.hashes()[i].activity) {
      await pages.overview.click('learning_curve_activity');
      await pages.overview.click('Begin_activity');
      let answerText = await pages.student_activity.getText('sentence_click_lc');
      console.log('answerText' + answerText)

      while (true) {
        if (await pages.student_activity.checkWebElementExists('quiz_complete') === true) {
          await pages.student_activity.click('back_to_study_plan');
        } else {
          let jsonObject = await pages.student_activity.getText('activity_Question');
          let split = jsonObject.split('}')[0] + '}';
          let finalResult = JSON.parse(split);
          console.log(finalResult);
          console.log(finalResult.Id);
          let answerKey = pages.result.questions[finalResult.Id]
          console.log('key:' + answerKey);
          console.log(answerKey.Type);
          console.log(answerKey.Answer);
          let answerText = await pages.student_activity.getText('sentence_click_lc');
          console.log('answerText' + answerText)
          switch (answerKey.Type) {
            case 'SC':
              console.log('entered sc')
              let answerText = await pages.student_activity.getText('sentence_click_lc');
              console.log('answerText' + answerText)
              await pages.student_activity.populate('sentence_click_lc', answerKey.Answer);
              //
              await pages.student_activity.click('next_question');
              break;
            case 'MC':
              console.log('enteres Mc')
              await pages.student_activity.populate('multiple_choice', answerKey.Answer);
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
  }
});

When(/^I attempt premade assesment in "(.*)"$/, async function (courseName, data_table) {
  await pages.create_course.click('course_card', courseName);
  await pages.course_page.click('overview')
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.click('overviewtab_activity', data_table.hashes()[i].Activity);
    // await pages.student_activity.click('questions_assesment', data_table.hashes()[i].Questions);
    await pages.student_activity.populate('multiple_choice_assesment', data_table.hashes()[i].PremadeAssesmentKey);
    await pages.student_activity.click('save_answer');
    await pages.student_activity.click('Next_assesment_question');
  }
  await pages.course_planner.click('close_assesment')
});
