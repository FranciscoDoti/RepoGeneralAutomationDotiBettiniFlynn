const { When, Then, After } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const format = require('string-format');
const expect = require('chai').expect;
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

Then(/^I click on "(.*)" element to add instructor$/, async function (element) {
  let qa =new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', element]);
  let page_format = format(PAGE);
  await qa.sleep(1);
  await qa.click(page.course.course_list.course_menu);
  await qa.sleep(1);
  await qa.click(page_format);
});

Then(/^I click on "(.*)" system "(.*)" feature "(.*)" element "(.*)" email$/, async function (system, feature, element, email) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  let page_format = format(PAGE);
  await qa.sleep(1);
  await qa.input(page_format, email);
});

Then(/^I "(.*)" of Achieve$/, async function (element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'home', element])
  let page_format = format(PAGE)
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
});

Then(/^I verify that the course "(.*)" is "(.*)"$/, async function (identifier, activation) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', 'course_name']);
  let page_format = format(PAGE);
  await qa.exists(page_format, identifier);
  let PAGE_activation = await _.get(page, ['course', 'course_list', 'course_activation']);
  let Page_format = format(PAGE_activation);
  await qa.exists(Page_format, activation);
});

Then('I invite the students', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.course_list.course_menu)
  await qa.click(page.course.create_course.invite_students_button);
  await qa.click(page.course.create_course.send_email_invite);
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'create_course', 'input_student_email']);
    let page_format = format(PAGE);
    await qa.input(page_format, data_table.hashes()[i].username);
  }
  await qa.input(page_format, ' ');
  await qa.click(page.course.create_course.send_invite_button);

});