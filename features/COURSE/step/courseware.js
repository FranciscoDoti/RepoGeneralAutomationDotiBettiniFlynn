const { When, Then, After } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const format = require('string-format');
const expect = require('chai').expect;
const _ = require('lodash');

// Navigation
When(/^I navigate to course "(.*)" "(.*)"$/, async function (type, identifier) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await qa.click(page_format);
});

When(/^I click on "(.*)" course card$/, async function (name) {
  let qa = new selenium(this.driver);
  let page_format = format(page.course.course_list.course_name, name);

  await qa.click(page_format);
});

When('I fill out the form to edit a course', async function (data_table) {
  let qa = new selenium(this.driver);

  await qa.sleep(1);
  for (let i = 0; i < data_table.rows().length; i++) {
    if(data_table.hashes()[i].page_object != 'day') {
      let PAGE = await _.get(page, ['course', 'create_course', data_table.hashes()[i].page_object]);
      await qa.input(PAGE, data_table.hashes()[i].value, data_table.hashes()[i].clear);
    } else {
      let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
      await qa.click(page_format);
    }
  }

  await qa.click(page.course.create_course.save);
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

// FIXME NEEDS IMPLEMENTED
When(/^I search for "(.*)" course$/, async function (search) {
  let qa = new selenium(this.driver);

  await qa.input(page.course.main.search, search);
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
  await qa.sleep(1);
  await qa.click(PAGE);
});

// FIXME NEEDS IMPLEMENTED
When(/^I add "(.*)" instructor's email to the course$/, async function (instructor) {
  let qa = new selenium(this.driver);
  let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);

  await qa.input(page.course.create_course.add_instructor, instructor.email);
  await qa.click(page.course.create_course.add_instructor_button);
});

// FIXME NEEDS IMPLEMENTED
Then('I verify that the Course Specific Link opens the course named "(.*)"', async function (course_name) {
  let qa = new selenium(this.driver);

  // Click Copy button
  // Store clipboard to variable
  // Open new tab
  // Switch driver to new tab
  // Go to URL variable from clipboard
  // Get text on screen that has passed in string value
});

When('I logout of the achieve system', async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.course.user.menu);
  await qa.click(page.course.user.sign_out);
});

// Assetions //
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

Then("I verify the course_list data", async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'course_list', data_table.hashes()[i].page_object]);
    let page_format = await format(PAGE, data_table.hashes()[0].value);

    let text = await qa.getText(page_format);
    expect(text).to.contain(data_table.hashes()[i].value);
  }
});

// FIXME Needs Implementation
Then('Then I verify data table courses populate the list', async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    // data_table.hashes()[i].activity
    let PAGE = await _.get(page, ['course', 'resources', 'list']);

    // VERIFY ACTIVITES HAVE BEEN ADD
    await qa.exists(page_format);
  }
});

// Cleanup //
After('@delete-course', async function () {
  let qa = new selenium(this.driver);
  await qa.sleep(1);
  await qa.click(page.course.course_list.course_menu);
  await qa.sleep(1);
  await qa.click(page.course.course_list.delete_course);
  await qa.sleep(1);
  await qa.click(page.course.course_list.confirm_delete);
  await qa.sleep(2);
});
