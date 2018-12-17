const { When, Then, After } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const format = require('string-format')
const _ = require('lodash');

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

When(/^I navigate to course "(.*)" "(.*)"$/, async function (type, identifier) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await qa.click(page_format);
});

//FIXME NEEDS IMPLEMENTED
When(/^I search for "(.*)" course$/, async function (search) {
  let qa = new selenium(this.driver);

  await qa.input(page.course.main.search, search);
});

//FIXME NEEDS IMPLEMENTED
When(/^I click on "(.*)" course menu$/, async function (course_name) {
  let qa = new selenium(this.driver);
  let page_format = format(page.course.course_list.menu_named_course, course_name);

  await qa.click(page_format);
});

//FIXME NEEDS IMPLEMENTED
When(/^I add "(.*)" instructor's email to the course$/, async function (instructor) {
  let qa = new selenium(this.driver);
  let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);

  await qa.input(page.course.create_course.add_instructor, instructor.email);
  await qa.click(page.course.create_course.add_instructor_button);
});

//FIXME NEEDS IMPLEMENTED
Then('I validate that the Course Specific Link opens the course named "(.*)"', async function (course_name) {
  let qa = new selenium(this.driver);

  //Click Copy button
  //Store clipboard to variable
  //Open new tab
  //Switch driver to new tab
  //Go to URL variable from clipboard
  //Get text on screen that has passed in string value
});

When('I fill out the form to edit a course', async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'create_course', data_table.hashes()[i].page_object]);
    await qa.input(PAGE, data_table.hashes()[i].value);
  }

  await qa.click(page.course.create_course.save);
});

When(/^I click on "(.*)" on the course_list menu$/, async function (page_object) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', page_object]);

  await qa.click(page.course.course_list.course_menu);
  await qa.sleep(1);
  await qa.click(PAGE);
});

When('I logout of the achieve system', async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.course.user.menu);
  await qa.click(page.course.user.sign_out);
});

// Assetions //
Then(/^I validate that the course "(.*)" "(.*)" is listed on the courses page$/, async function (type, identifier) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await qa.exists(page_format);
});

// FIXME Needs Implementation
Then('Then I validate data table courses populate the list', async function (data_table) {
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
  await qa.sleep(10);
  await qa.click(page.course.course_list.course_menu);
  await qa.sleep(1);
  await qa.click(page.course.course_list.delete_course);
  await qa.sleep(1);
  await qa.click(page.course.course_list.confirm_delete);
});
