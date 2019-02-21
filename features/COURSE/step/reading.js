const { When, Then, Given } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const format = require('string-format');
const config = require('../../../config.js');
const _ = require('lodash');

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
  await qa.click(page.course.create_course.send_invite_button);
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
    console.log('it doesnt exists');
    await qa.click(page.course.course_planner.close_reading);
  }
});

When(/^I click on "(.*)" system "(.*)" feature "(.*)" element input '(.*)' and assign the activity$/, async function (system, feature, element, points) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  let page_format = format(PAGE);
  await qa.sleep(1);
  await qa.clickElementInArray(page_format);
  await qa.sleep(1);
  await qa.input(page.course.course_planner.points_input, points);
  await qa.click(page.course.course_planner.Assignment_date_picker);
  await qa.click(page.course.course_planner.Assignment_start_date);
  await qa.click(page.course.create_course.save);
});

Then(/^I verify "(.*)" as open$/, async function (element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_planner', element]);
  let page_format = format(PAGE);
  await qa.exists(page_format);
});

When(/^I generate access code for "(.*)"$/, async function (identifier) {
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
    await qa.click(page.course.course_planner.custom_content_button);
    await qa.input(page.course.course_planner.library_search_input, data_table.hashes()[i].activity, 'clear', 'enter_after');
    await qa.click(page.course.course_planner.library_search_input);
    await qa.click(page.course.course_planner.add_assignment_button);
    await qa.click(page.course.course_planner.close_courseplanner)
  }
});

Given(/^I log in as "(.*)"$/, async function (user) {
  let qa = new selenium(this.driver);
  let payload = require(`../../_data/user/${config.environment}/${user}.json`);
  await qa.input(page.course.third_party.user, payload.username);
  await qa.click(page.course.third_party.user_next);
  await qa.sleep(1);
  await qa.input(page.course.third_party.password, payload.password);
  await qa.click(page.course.third_party.password_next);
});

Then('I enroll the student in the course', async function (data_table) {
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
async function sucess (driver) {
  let qa = new selenium(driver);
  await qa.click(page.course.overview.multiple_choice);
  await qa.click(page.course.overview.submit_button);
}

When('I attempt the activity present in courseware', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.create_course.course_card);
  await qa.click(page.course.course_page.overview);
  // for (let i = 0; i < data_table.rows().length; i++) {
  // let text = await qa.getText(page.course.overview.Activity_link);
  // let verify = (text === data_table.hashes()[i].Activity);
  // while (verify === true) {
  await qa.sleep(1);
  await qa.click(page.course.overview.Activity_link);
  await qa.click(page.course.overview.resume_activity);
  await qa.sleep(1);
  await qa.click(page.course.overview.multiple_choice);
  await qa.click(page.course.overview.submit_button);
  await qa.sleep(1);
  let next = await qa.elementExists(page.course.overview.next_question_success);
  console.log(next + ' success');
  let slowdown = await qa.elementExists(page.course.overview.slowdownmodel);
  console.log(slowdown + ' slowdown')
  let congrats = await qa.elementExists(page.course.overview.congratulation_message);
  console.log(congrats + ' congrats');
  await qa.sleep(1);
  if (next === true) {
    console.log('entered sucess');
    await qa.click(page.course.overview.next_question_success)
    await qa.click(page.course.overview.multiple_choice);
    await qa.click(page.course.overview.submit_button);
    await qa.sleep(1);
  } else if (slowdown === true) {
    console.log('entered slow down')
    await qa.click(page.course.overview.slow_down_button);
    await qa.click(page.course.overview.show_answer);
    await qa.click(page.course.overview.next_question_success);
    await qa.click(page.course.overview.multiple_choice);
    await qa.click(page.course.overview.submit_button);
    await qa.sleep(1);
    // } else if (slowdown === false) {
    //   await qa.click(page.course.overview.multiple_choice);
    //   await qa.click(page.course.overview.submit_button);
    //   await qa.sleep(1);
  } else if (congrats === true) {
    await qa.click(page.course.overview.back_to_studyplan);
    await qa.click(page.course.overview.close_learnigcurve);
  }
  // }
  // }
});

Then('I verify the activity list', async function (data_table) {
  let qa = new selenium(this.driver)
  for (let i = 0; i < data_table.rows().length; i++) {
    let text = await qa.getText(page.course.course_planner.activity_validation);
    let verify = text === data_table.hashes()[i].activity
    if (verify === data_table.hashes()[i].clear) {
      console.log('the activity exists');
    }
  }
});
