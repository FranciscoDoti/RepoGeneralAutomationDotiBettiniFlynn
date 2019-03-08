const { Given, When, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const imap = require('../../../app/imap.js');
const page = require('../../master-page.js');
const config = require('../../../config.js');
const format = require('string-format');
const expect = require('chai').expect;
const _ = require('lodash');

When('I invite the students', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.course_list.course_menu);
  await qa.sleep(1);
  await qa.click(page.course.course_list.invite_students_button);
  await qa.sleep(1);
  await qa.click(page.course.create_course.send_email_invite);
  for (let i = 0; i < data_table.rows().length; i++) {
    await qa.click(page.course.create_course.Textbox_input);
    await qa.input(page.course.create_course.input_student_email, data_table.hashes()[i].username);
    await qa.input(page.course.create_course.input_student_email, ' ')
  }
  await qa.click(page.course.create_course.send_invite_button);
  await qa.click(page.course.create_course.send_invite_button);
});

When(/^I click on "(.*)" system "(.*)" feature "(.*)" element and reduce the activity points$/, async function (system, feature, element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  let page_format = format(PAGE);
  await qa.click(page_format);
  let booleanVal = await qa.exists(page.course.course_planner.edit_target);
  if (booleanVal === true) {
    console.log('it exists');
    await qa.click(page.course.course_planner.edit_target);
    await qa.input(page.course.course_planner.input_target_score, 'clear');
    await qa.input(page.course.course_planner.input_target_score, '5');
    await qa.click(page.course.course_planner.change_target_score);
    await qa.click(page.course.course_planner.very_short_time_button);
    await qa.click(page.course.course_planner.close_learning_curve);
  } else {
    await qa.click(page.course.course_planner.close_reading);
  }
});

Given(/^I generate access code for "(.*)"$/, async function (identifier) {
  let qa = new selenium(this.driver);

  await qa.input(page.course.course_list.search_for_course_name, identifier);
  await qa.sleep(1);
  await qa.click(page.course.create_course.course_card);
  await qa.click(page.course.home.toggler_menu);
  await qa.sleep(1);
  await qa.click(page.course.user.admin);
  await qa.click(page.course.admin_menu.create_access_code);
  await qa.click(page.course.course_page.generate_access_code);
  await qa.click(page.course.course_page.Export_access_code);
  await qa.click(page.course.course_page.close_access_code);
});

Given('I add the activities in courseplanner', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.create_course.course_card);
  await qa.click(page.course.course_page.course_planner);
  for (let i = 0; i < data_table.rows().length; i++) {
    await qa.click(page.course.course_planner.custom_content_button);
    await qa.input(page.course.course_planner.library_search_input, data_table.hashes()[i].activity, 'clear', 'enter_after');
    await qa.click(page.course.course_planner.library_search_input);
    await qa.click(page.course.course_planner.add_assignment_button);
    await qa.click(page.course.course_planner.close_courseplanner)
  }
});

Given('I enroll the student in the course', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.sleep(1);
  await qa.click(page.course.create_course.course_card);
  await qa.click(page.course.home.toggler_menu);
  await qa.sleep(1);
  await qa.click(page.course.user.admin);
  await qa.sleep(1)
  await qa.click(page.course.home.manage_enrollments);
  await qa.sleep(1);
  for (let i = 0; i < data_table.rows().length; i++) {
    await qa.input(page.course.home.manage_enrollements_input, data_table.hashes()[i].username);
    await qa.click(page.course.home.add_user_button);
  }
  await qa.click(page.course.home.close_manage_roles);
});
