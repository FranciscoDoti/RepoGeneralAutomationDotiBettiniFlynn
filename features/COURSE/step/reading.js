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
