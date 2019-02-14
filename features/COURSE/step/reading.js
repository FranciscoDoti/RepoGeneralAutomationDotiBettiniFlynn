const { When, Then, After } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const format = require('string-format');
const expect = require('chai').expect;
const _ = require('lodash');
const imap = require('../../../app/imap');

Then('I verify the data in course page', async function (data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'course_page', data_table.hashes()[i].course_page]);
    await qa.exists(PAGE)
  }
});

Then('I verify the data in resource page', async function (data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'resources', data_table.hashes()[i].course_page]);
    await qa.exists(PAGE);
  }
})

Then(/^I click on "(.*)" system "(.*)" feature "(.*)" element "(.*)" input$/, async function (system, feature, element, input) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element])
  let page_format = format(PAGE)
  await qa.input(page_format, input);
});

Then(/^I click on "(.*)" element to add$/, async function (element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', element]);
  let page_format = format(PAGE);
  await qa.sleep(2);
  await qa.click(page.course.course_list.course_menu);
  await qa.sleep(1);
  await qa.click(page_format);
});

Then('I assign Instructor to the course', async function (data_table) {
  let driver = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    await driver.sleep(1);
    await driver.click(page.course.course_list.course_menu);
    await driver.sleep();
    await driver.click(page.course.course_list.Manage_instructor);
    await driver.sleep();
    await driver.input(page.course.create_course.add_instructor, data_table.hashes()[i].username);
    await driver.click(page.course.create_course.add_instructor_button);
    await driver.click(page.course.create_course.add_instructor_close);
  }
});

Then(/^I "(.*)" of Achieve$/, async function (element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'home', element])
  let page_format = format(PAGE);
  await qa.click(page.course.home.toggler_menu);
  await qa.sleep(1);
  await qa.click(page_format);
});

Then(/^I click on "(.*)" system "(.*)" feature "(.*)" element input "(.*)" and enter date$/, async function (system, feature, element, input) {
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

Then(/^I verify that the course "(.*)" is "(.*)"$/, async function (identifier, activation) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', 'course_name']);
  let page_format = format(PAGE, identifier);
  await qa.exists(page_format);
  let PAGE_activation = await _.get(page, ['course', 'course_list', 'course_activation']);
  let Page_format = format(PAGE_activation, activation);
  await qa.exists(Page_format);
});

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
  await qa.sleep(1);
  await qa.click(page.course.create_course.send_invite_button);
});

When(/^I click on "(.*)" system "(.*)" feature "(.*)" elements$/, async function (system, feature, element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  let page_format = format(PAGE);
  await qa.clickElementInArray(page_format);
});

When(/^I click on "(.*)" system "(.*)" feature "(.*)" element and reduce the activity points$/, async function (system, feature, element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  let page_format = format(PAGE);
  await qa.clickElementInArray(page_format);
  let booleanVal = await qa.exists(page.course.courseplanner.edit_target);
  if (booleanVal === true) {
    console.log('it exists');
    await qa.click(page.course.courseplanner.edit_target);
    await qa.input(page.course.courseplanner.input_target_score, 'clear');
    await qa.input(page.course.courseplanner.input_target_score, '5');
    await qa.click(page.course.courseplanner.change_target_score);
    await qa.click(page.course.courseplanner.very_short_time_button);
    await qa.click(page.course.courseplanner.close_learning_curve);
  } else {
    console.log('it doesnt exists');
    await qa.click(page.course.courseplanner.close_reading);
  }
});

When(/^I click on "(.*)" system "(.*)" feature "(.*)" element and assign the activity$/, async function (system, feature, element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  let page_format = format(PAGE);
  await qa.sleep(1);
  await qa.clickElementInArray(page_format);
  await qa.sleep(1);
  await qa.input(page.course.courseplanner.points_input, '5');
  await qa.click(page.course.courseplanner.Assignment_date_picker);
  await qa.click(page.course.courseplanner.Assignment_start_date);
  await qa.click(page.course.create_course.save);
});

Then(/^I verify "(.*)" as open$/, async function (element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'courseplanner', element]);
  let page_format = format(PAGE);
  await qa.exists(page_format);
});

When(/^I generate access code for "(.*)"$/, async function (identifier) {
  let qa = new selenium(this.driver);
  let bollenvalue = await qa.hasText(page.course.create_course.course_tittle, identifier);
  if (bollenvalue === true) {
    await qa.click(page.course.home.toggler_menu);
    await qa.click(page.course.user.admin);
    await qa.click(page.course.course_page.generate_access_code);
    await qa.click(page.course.course_page.Export_access_code);
    await qa.click(page.course.course_page.close_access_code);
  }
});

When('I fill out the form to update the template from draft to Template', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.course_list.course_menu);
  await qa.click(page.course.course_list.edit_course);
  await qa.sleep(1);
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      let PAGE = await _.get(page, ['course', 'course_list', data_table.hashes()[i].page_object]);
      await qa.input(PAGE, data_table.hashes()[i].value, data_table.hashes()[i].clear);
    } else {
      let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
      await qa.click(page_format);
    }
  }

  await qa.click(page.course.create_course.save);
});

When('I fill out the form to copy a course', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.main.Achieve_home);
  await qa.click(page.course.course_list.course_menu);
  await qa.sleep();
  await qa.click(page.course.course_list.copy_course);
  await qa.sleep(1);
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      let PAGE = await _.get(page, ['course', 'create_course', data_table.hashes()[i].page_object]);
      await qa.input(PAGE, data_table.hashes()[i].value, data_table.hashes()[i].clear);
    } else {
      let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
      await qa.click(page_format);
    }
  }

  await qa.click(page.course.create_course.save);
});

When('I fill out the form to update the status of course to active', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.course_list.course_menu);
  await qa.click(page.course.course_list.edit_course);
  await qa.sleep(1);
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      let PAGE = await _.get(page, ['course', 'course_list', data_table.hashes()[i].page_object]);
      await qa.input(PAGE, data_table.hashes()[i].value, data_table.hashes()[i].clear);
    } else {
      let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
      await qa.click(page_format);
    }
  }
  await qa.click(page.course.course_list.end_date);
  await qa.click(page.course.course_list.next_month_button);
  await qa.click(page.course.course_list.next_month_button);
  await qa.click(page.course.course_list.select_date);
  await qa.click(page.course.create_course.save);
});

Then('I add the activities in courseplanner', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.create_course.course_card);
  await qa.click(page.course.course_page.course_planner);
  for (let i = 0; i < data_table.rows().length; i++) {
    await qa.click(page.course.courseplanner.custom_content_button);
    await qa.input(page.course.courseplanner.library_search_input, data_table.hashes()[i].activity, 'clear', 'enter_after');
    await qa.click(page.course.courseplanner.library_search_input);
    await qa.click(page.course.courseplanner.add_assignment_button);
    await qa.click(page.course.courseplanner.close_courseplanner);
  }
});
