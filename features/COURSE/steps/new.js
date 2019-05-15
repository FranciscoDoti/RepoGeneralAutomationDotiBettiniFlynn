const { Given, When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;
const expect = require('chai').expect;

// Navigation
When(/^I navigate to course "(.*)" "(.*)"$/, async function (type, identifier) {
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await pages.undefined.click('page_format');
});

Given('I click login to the Achieve product', async function () {
  let url = await _.get(URL, ['achieve', 'login']);

  await qa.goTo(url);
  await pages.home.click('sign_in');
});

Given(/^I search for "(.*)" course$/, async function (input) {
  await pages.course_list.populate('search', input);
});

When('I fill out the form to create course', async function (data_table) {
  await pages.create_course.click('button');
  await pages.create_course.populate('course_type', 'Template');
  await pages.create_course.populate('product_model', '3');
  await pages.create_course.populate('learning_objective', 'Principles of Economics');
  await pages.create_course.populate('course_name', 'Quantitative testcoure');
  await pages.create_course.populate('course_code', 'E2e101');
  await pages.create_course.populate('isbn_number', '9039532676264');
  await pages.create_course.populate('course_status', 'draft');

 
//   for (let i = 0; i < data_table.rows().length; i++) {
//     if (data_table.hashes()[i].page_object != 'day') {
//       await pages.create_course.populate(data_table.hashes()[i].page_object, data_table.hashes()[i].value)
//     } else {
//       await pages.create_course.click('select_day', data_table.hashes()[i].value);
//     }
//   }

  await pages.create_course.click('save');
});

// FIXME Needs Implementation
When(/^I add Activities to course "(.*)" "(.*)"$/, async function (type, identifier, data_table) {
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await pages.undefined.click('page_format');
  await pages.create_page.click('resources');
  await pages.create_page.click('add_activity');

  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'resources', 'search']);

    // INPUT SEARCH TERM
    // SELECT ADD BUTTON FROM LIST
    await pages.undefined.populate('PAGE', data_table.hashes()[i].activity);
  }

  await pages.resources.click('add_activity, activity');
});

When('I click the Add course button', async function () {
  await pages.create_course.click('button');
});

When(/^I click on "(.*)" on "(.*)" course menu$/, async function (page_object, course_name) {
  let PAGE = await _.get(page, ['course', 'course_list', page_object]);
  let page_format = format(page.course.course_list.course_name_menu, course_name);
  await pages.course_list.click('course_menu');
  await qa.sleep(config.sleep);
  await pages.undefined.click('PAGE');
});

When('I logout of the achieve system', async function () {
  await pages.user.click('menu');
  await qa.sleep(config.sleep);
  await pages.user.click('sign_out');
});

// Assertions //
Then(/^I verify that the course "(.*)" "(.*)" is listed on the courses page$/, async function (type, identifier) {
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await pages.undefined.elementExists('page_format');
});

Then(/^I verify that the course's name "(.*)" is listed on the courses page$/, async function (identifier) {
  let page_format = format(page.course.course_list.course_name, identifier);

  await pages.undefined.elementExists('page_format');
});

Then('I verify the create_course data', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'create_course', data_table.hashes()[i].page_object]);
    let page_format = await format(PAGE, data_table.hashes()[0].value);

    let text = await qa.getAttribute(page_format, 'value');
    expect(text).to.contain(data_table.hashes()[i].value);
  }
  // race condition, I have to wait for button to be visible
  await qa.sleep(3);
  await pages.create_course.click('cancel');
});

Then(/^I verify that it is redirected to "(.*)" course page$/, async function (course_page) {
  let course_page_element = await _.get(page, ['course', 'create_course', 'course_title']);

  let text = await qa.getText(course_page_element);
  expect(text).to.contain(course_page);
});

When(/^I copy the invite link to open course with "(.*)"$/, async function (student_user_object) {
  let invite_link_element = page.course.create_course.students_invite_link;
  let invite_students_modal_close_element = page.course.create_course.invite_students_modal_close;
  let signout_button_element = page.course.home.sign_out;
  let toggler_menu_element = page.course.home.toggler_menu;
  let payload = require(`../../_data/user/${config.environment}/${student_user_object}.json`);

  await qa.sleep(1);
  let invite_link = await qa.getAttribute(invite_link_element, 'placeholder');
  await pages.undefined.click('invite_students_modal_close_element');
  await pages.undefined.click('toggler_menu_element');
  await qa.sleep(1);
  await pages.undefined.click('signout_button_element');
  await pages.home.click('sign_in');
  await pages.login.populate('username', payload.username);
  await pages.login.populate('password', payload.password);
  await pages.login.click('sign_in');
  await qa.sleep(2);
  await qa.goTo(invite_link);
});

Then('I generate a course code to the current course', async function () {
  let toggler_menu_element = page.course.home.toggler_menu;
  let menu_user_admin_element = page.course.home.menu_user_admin;
  let create_access_code_element = page.course.home.create_access_code;
  let generate_access_code_element = page.course.home.generate_access_code;
  let access_code_element = page.course.home.access_code;
  let close_access_code_element = page.course.home.close_access_code;

  await qa.sleep(2);
  await pages.undefined.click('toggler_menu_element');
  await qa.sleep(1);
  await pages.undefined.click('menu_user_admin_element');
  await qa.sleep(1);
  await pages.undefined.click('create_access_code_element');
  await qa.sleep(1);
  await pages.undefined.click('generate_access_code_element');
  let access_code = await qa.getText(access_code_element);
  await qa.sleep(1);
  await pages.undefined.click('close_access_code_element');
})

Then(/^I validate the "(.*)" course is accessible to user$/, async function (course) {
  await pages.course_list.click('course_name');
})

When('I enroll students to the current course', async function (data_table) {
  let toggler_menu_element = page.course.home.toggler_menu;
  let menu_user_admin_element = page.course.home.menu_user_admin;
  let manage_enrollments_element = page.course.home.manage_enrollments;
  let manage_enrollments_input_element = page.course.home.manage_enrollements_input;
  let add_user_button_element = page.course.home.add_user_button;
  let close_manage_roles_element = page.course.home.close_manage_roles;

  await pages.undefined.click('toggler_menu_element');
  await qa.sleep(1);
  await pages.undefined.click('menu_user_admin_element');
  await qa.sleep(1);
  await pages.undefined.click('manage_enrollments_element');
  await qa.sleep(1);

  for (let i = 0; i < data_table.rows().length; i++) {
    let payload = require(`../../_data/user/${config.environment}/${data_table.hashes()[i].Student}.json`);
    await pages.undefined.populate('manage_enrollments_input_element', payload.username);
    await pages.undefined.click('add_user_button_element');
  }
  await pages.undefined.click('close_manage_roles_element');
  await qa.sleep(1);
});

When('I click on the course planner to assign the activity and add points', async function (data_table) {
  await pages.course_page.click('course_planner');
  await qa.sleep(config.sleep);
  await pages.course_planner.click('assign_assignment_button');
  await qa.sleep(config.sleep);
  await pages.course_planner.populate('points_input', data_table.hashes()[0].Points);
  await qa.sleep(config.sleep);
  await pages.course_planner.click('assign_button');
  await qa.sleep(config.sleep);
  await pages.home.click('close_alert');
})

When('I search for a course and click on the first course card that appears', async function (data_table) {
  let course_card_element = page.course.create_course.course_card;
  let course_search_element = page.course.course_list.search;
  await pages.undefined.populate('course_search_element', data_table.hashes()[0].Course);
  await qa.sleep(2);
  await pages.undefined.click('course_card_element');
});

When('I click on the first course card', async function () {
  let course_card_element = page.course.create_course.course_card;
  await qa.sleep(2);
  await pages.undefined.click('course_card_element');
});

When('I add the activities to the course under the course planner tab', async function () {
  let course_planner_tab_element = course.course_page.course_planner;
  let custom_content_tab_element = course.course_planner.custom_content_tab;
  let add_assignment_element = course.course_planner.add_assignment;

  await pages.undefined.click('course_planner_tab_element');
  await pages.undefined.click('custom_content_tab_element');
  await qa.sleep(2);
  await pages.undefined.click('add_assignment_element');
})

When('I open the activity in the current course', async function (data_table) {
  let course_planner_tab_element = page.course.course_page.course_planner;
  let course_assignment_element = page.course.course_planner.course_assignment;
  await pages.create_course.click('course_card');
  await pages.undefined.click('course_planner_tab_element');
  for (let i = 0; i < data_table.rows().length; i++) {
    let specific_course_assignment_element = format(course_assignment_element, data_table.hashes()[i].Activity);
    await pages.undefined.click('specific_course_assignment_element');
    await qa.sleep(config.sleep);
    let displayed = await qa.isDisplayed(page.course.student_activity.result_bar)
    if (data_table.hashes()[0].Activity === 'Qual Test') {
      await qa.switchFrame(0);
      await pages.student_activity.populate('assement_quiz_answer', data_table.hashes()[i].customMadeActivity);
      await pages.student_activity.click('submit_all_questions');
    } else {
      console.log('enteredif');
      await qa.switchFrame(0);
      await pages.student_activity.populate('assement_quiz_answer', data_table.hashes()[i].PremadeAssesmentKey);
      await pages.student_activity.click('save_answer');
      await pages.student_activity.click('Next_assesment_question');
    }
  }
});

When('I attempt to answer the questions in the current activity assignment', async function (data_table) {
  await qa.sleep(2);
  await qa.switchFrame(0);

  for (let i = 0; i < data_table.rows().length; i++) {
    let multiple_select_answer_element = page.course.student_activity.multiple_select_answer;
    let current_question_element = page.course.student_activity.current_question;
    let multiple_select_answer_element_format = format(multiple_select_answer_element, data_table.hashes()[i].Answer);
    let current_question_element_format = format(current_question_element, data_table.hashes()[i].Question);

    await pages.undefined.click('current_question_element_format)');
    await pages.undefined.click('multiple_select_answer_element_format');
    await pages.student_activity.click('button_check');
  }
  await pages.student_activity.click('close_activity');
  let activity_score = await qa.getText(page.course.student_activity.activity_score);
  console.log(activity_score, 'activity_score');
})

Then(/^Check email for "(.*)" user using "(.*)" password$/, async function (user, password) {
  await imap.connectClient(user, password, 'registration')
});

Then(/^I verify the data in "(.*)"/, async function (feature, data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', feature, data_table.hashes()[i].course_page]);
    await pages.undefined.elementExists('PAGE)');
  }
});

Given(/^I click the "(.*)" button on the user account menu$/, async function (element) {
  let PAGE = await _.get(page, ['course', 'home', element])
  let page_format = format(PAGE);
  await pages.home.click('toggler_menu');
  await qa.sleep();
  await pages.undefined.click('page_format');
});

// FIXME look into which permission level this applies to
Then(/^I verify activity staus as "(.*)"$/, async function (element) {
  let PAGE = await _.get(page, ['course', 'course_planner', element]);
  let page_format = format(PAGE);
  await qa.getText(page.course.course_planner.activity_status, element);
});

When(/^I assign "(.*)" to the course$/, async function (user) {
  let payload = require(`../../_data/user/${config.environment}/${user}.json`);

  await qa.sleep(config.sleep);
  await pages.course_list.click('course_menu');
  await qa.sleep(config.sleep);
  await pages.course_list.click('Manage_instructor');
  await pages.create_course.populate('add_instructor', payload.username);
  await pages.create_course.click('add_instructor_button');
  await pages.create_course.click('add_instructor_close');
  await qa.sleep(config.sleep);
});

When(/^I enroll the "(.*)" in the course$/, async function (user) {
  let payload = require(`../../_data/user/${config.environment}/${user}.json`);

  await qa.sleep(config.sleep);
  await pages.create_course.click('course_card');
  await qa.sleep();
  await pages.home.click('toggler_menu');
  await qa.sleep(config.sleep);
  await pages.user.click('admin');
  await qa.sleep(config.sleep)
  await pages.home.click('manage_enrollments');
  await qa.sleep(config.sleep);
  await pages.home.populate('manage_enrollements_input', payload.username);
  await pages.home.click('add_user_button');
  await pages.home.click('close_manage_roles');
});
