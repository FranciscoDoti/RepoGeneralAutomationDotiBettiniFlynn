const { Given, When, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const imap = require('../../../app/imap.js');
const page = require('../../master-page.js');
const config = require('../../../config.js');
const format = require('string-format');
const expect = require('chai').expect;
const _ = require('lodash');
const URL = require('../../_support/url.js');




// Navigation
When(/^I navigate to course "(.*)" "(.*)"$/, async function (type, identifier) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await qa.click(page_format);
});

Given('I click login to the Achieve product', async function () {
  let qa = new selenium(this.driver);
  let url = await _.get(URL, ['achieve', 'login']);

  await qa.goTo(url);
  await qa.click(page.course.home.sign_in);
});

Given(/^I search for "(.*)" course$/, async function (input) {
  let qa = new selenium(this.driver);

  await qa.input(page.course.course_list.search, input);
});

// FIXME Needs Implementation
When(/^I add Activities to course "(.*)" "(.*)"$/, async function (type, identifier, data_table) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await qa.click(page_format);
  await qa.click(page.course.create_page.resources);
  await qa.click(page.course.create_page.add_activity);

  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'resources', 'search']);

    // INPUT SEARCH TERM
    // SELECT ADD BUTTON FROM LIST
    await qa.input(PAGE, data_table.hashes()[i].activity);
  }

  await qa.click(page.course.resources.add_activity, activity);
});


When('I click the Add course button', async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.course.create_course.button);
});

When(/^I click on "(.*)" on "(.*)" course menu$/, async function (page_object, course_name) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', page_object]);
  let page_format = format(page.course.course_list.course_name_menu, course_name);

  await qa.click(page.course.course_list.course_menu);
  await qa.sleep(config.sleep);
  await qa.click(PAGE);
});

// FIXME NEEDS IMPLEMENTED
When(/^I add "(.*)" instructor's email to the course$/, async function (instructor) {
  let qa = new selenium(this.driver);
  let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);

  await qa.input(page.course.create_course.add_instructor, instructor.email);
  await qa.click(page.course.create_course.add_instructor_button);
});

When('I logout of the achieve system', async function () {
  let qa = new selenium(this.driver);
    await qa.click(page.course.user.menu);
    await qa.sleep(config.sleep);
    await qa.click(page.course.user.sign_out);

});

// Assertions //
Then(/^I verify that the course "(.*)" "(.*)" is listed on the courses page$/, async function (type, identifier) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await qa.exists(page_format);
});

Then(/^I verify that the course's name "(.*)" is listed on the courses page$/, async function (identifier) {
  let qa = new selenium(this.driver);
  let page_format = format(page.course.course_list.course_name, identifier);

  await qa.exists(page_format);
});


Then('I verify the create_course data', async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'create_course', data_table.hashes()[i].page_object]);
    let page_format = await format(PAGE, data_table.hashes()[0].value);

    let text = await qa.getAttribute(page_format, 'value');
    expect(text).to.contain(data_table.hashes()[i].value);
  }
  // race condition, I have to wait for button to be visible
  await qa.sleep(3);
  await qa.click(page.course.create_course.cancel);
});

Then(/^I verify that it is redirected to "(.*)" course page$/, async function (course_page) {
  let qa = new selenium(this.driver);
  let course_page_element = await _.get(page, ['course', 'create_course', 'course_title']);

  let text = await qa.getText(course_page_element);
  expect(text).to.contain(course_page);
});


Then(/^I copy the invite link to open course with "(.*)"$/, async function (student_user_object) {
  let qa = new selenium(this.driver);
  let invite_link_element = page.course.create_course.students_invite_link;
  let invite_students_modal_close_element = page.course.create_course.invite_students_modal_close;
  let signout_button_element = page.course.home.sign_out;
  let toggler_menu_element = page.course.home.toggler_menu;
  let payload = require(`../../_data/user/${config.environment}/${student_user_object}.json`);

  await qa.sleep(1);
  let invite_link = await qa.getAttribute(invite_link_element, 'placeholder');
  await qa.click(invite_students_modal_close_element);
  await qa.click(toggler_menu_element);
  await qa.sleep(1);
  await qa.click(signout_button_element);
  await qa.click(page.course.home.sign_in);
  await qa.input(page.iam.login.username, payload.username, true);
  await qa.input(page.iam.login.password, payload.password, true);
  await qa.click(page.iam.login.sign_in);
  await qa.sleep(2);
  await qa.goTo(invite_link);
});

Then('I generate a course code to the current course', async function () {
  let qa = new selenium(this.driver);

  let toggler_menu_element = page.course.home.toggler_menu;
  let menu_user_admin_element = page.course.home.menu_user_admin;
  let create_access_code_element = page.course.home.create_access_code;
  let generate_access_code_element = page.course.home.generate_access_code;
  let access_code_element = page.course.home.access_code;
  let close_access_code_element = page.course.home.close_access_code;

  await qa.sleep(2);
  await qa.click(toggler_menu_element);
  await qa.sleep(1);
  await qa.click(menu_user_admin_element);
  await qa.sleep(1);
  await qa.click(create_access_code_element);
  await qa.sleep(1);
  await qa.click(generate_access_code_element);
  let access_code = await qa.getText(access_code_element);
  await qa.sleep(1);
  await qa.click(close_access_code_element);
})

Then(/^I validate the "(.*)" course is accessible to user$/, async function (course) {
  let qa = new selenium(this.driver);

  await qa.click(page.course.course_list.course_name);
})

Then('I enroll students to the current course', async function (data_table) {
  let qa = new selenium(this.driver);

  let toggler_menu_element = page.course.home.toggler_menu;
  let menu_user_admin_element = page.course.home.menu_user_admin;
  let manage_enrollments_element = page.course.home.manage_enrollments;
  let manage_enrollments_input_element = page.course.home.manage_enrollements_input;
  let add_user_button_element = page.course.home.add_user_button;
  let close_manage_roles_element = page.course.home.close_manage_roles;

  await qa.click(toggler_menu_element);
  await qa.sleep(1);
  await qa.click(menu_user_admin_element);
  await qa.sleep(1);
  await qa.click(manage_enrollments_element);
  await qa.sleep(1);

  for (let i = 0; i < data_table.rows().length; i++) {
    let payload = require(`../../_data/user/${config.environment}/${data_table.hashes()[i].Student}.json`);
    await qa.input(manage_enrollments_input_element, payload.username);
    await qa.click(add_user_button_element);
  }
  await qa.click(close_manage_roles_element);
  await qa.sleep(1);
});

Then('I click on the course planner to assign the activity and add points', async function (data_table) {
  let qa = new selenium(this.driver);

  await qa.click(page.course.course_page.course_planner);
  await qa.sleep(1);
  await qa.click(page.course.course_planner.assign_assignment_button);
  await qa.sleep(1);
  await qa.input(page.course.course_planner.points_input, data_table.hashes()[0].Points, 'clear');
  await qa.sleep(1);
  await qa.click(page.course.course_planner.assign_button);
  await qa.sleep(1);
  await qa.click(page.course.home.close_alert);
})

Then('I search for a course and click on the first course card that appears', async function (data_table) {
  let qa = new selenium(this.driver);
  let course_card_element = page.course.create_course.course_card;
  let course_search_element = page.course.course_list.search_for_course_name;
  await qa.input(course_search_element, data_table.hashes()[0].Course)
  await qa.sleep(2);
  await qa.click(course_card_element);
});

Then('I click on the first course card', async function () {
  let qa = new selenium(this.driver);
  let course_card_element = page.course.create_course.course_card;
  await qa.sleep(2);
  await qa.click(course_card_element);
});

Then('I add the activities to the course under the course planner tab', async function () {
  let qa = new selenium(this.driver);
  let course_planner_tab_element = course.course_page.course_planner;
  let custom_content_tab_element = course.course_planner.custom_content_tab;
  let add_assignment_element = course.course_planner.add_assignment;

  await qa.click(course_planner_tab_element);
  await qa.click(custom_content_tab_element);
  await qa.sleep(2);
  await qa.click(add_assignment_element);
})

Then ('I open the activity in the current course', async function(data_table) {
  let qa = new selenium(this.driver);
  let course_planner_tab_element = page.course.course_page.course_planner;
  let course_assignment_element = page.course.course_planner.course_assignment;
  let specific_course_assignment_element = format(course_assignment_element, data_table.hashes()[0].Activity);

  await qa.click(course_planner_tab_element);
  await qa.click(specific_course_assignment_element);
})

Then ('I attempt to answer the questions in the current activity assignment', async function(data_table) {
  let qa = new selenium(this.driver);
  await qa.sleep(2);
  await qa.switchFrame(0);

  for (let i = 0; i < data_table.rows().length; i++) {
    let multiple_select_answer_element = page.course.student_activity.multiple_select_answer;
    let current_question_element = page.course.student_activity.current_question;
    let multiple_select_answer_element_format = format(multiple_select_answer_element, data_table.hashes()[i].Answer);
    let current_question_element_format = format(current_question_element, data_table.hashes()[i].Question);

    await qa.click(current_question_element_format)
    await qa.click(multiple_select_answer_element_format);
    await qa.click(page.course.student_activity.button_check);

  }
  await qa.click(page.course.student_activity.close_activity);
  let activity_score = await qa.getText(page.course.student_activity.activity_score);
  console.log(activity_score, 'activity_score');


})

Then(/^Check email for "(.*)" user using "(.*)" password$/, async function(user, password) {
  // let qa = new selenium(this.driver);
  await imap.connectClient(user, password, 'registration')
});

Then(/^I verify the data in "(.*)"/, async function (feature, data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', feature, data_table.hashes()[i].course_page]);
    await qa.exists(PAGE)
  }
});

Given(/^I click the "(.*)" button on the user account menu$/, async function (element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'home', element])
  let page_format = format(PAGE);
  await qa.click(page.course.home.toggler_menu);
  await qa.sleep();
  await qa.click(page_format);
});

//FIXME Look into implementation and if it needs refactored
Given(/^I click on "(.*)" system "(.*)" feature "(.*)" element input "(.*)" and enter date$/, async function (system, feature, element, input) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  let page_format = format(PAGE);
  await qa.sleep(1);
  await qa.click(page_format);
  await qa.input(page_format, input);
  await qa.click(page.course.course_list.end_date);
  await qa.click(page.course.course_list.next_month_button);
  await qa.click(page.course.course_list.next_month_button);
  await qa.click(page.course.course_list.select_date);
  await qa.click(page.course.create_course.save);
});

//FIXME look into which permission level this applies to
Then(/^I verify activity staus as "(.*)"$/, async function (element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_planner', element]);
  let page_format = format(PAGE);
  await qa.getText(page.course.course_planner.activity_status, element);
});
