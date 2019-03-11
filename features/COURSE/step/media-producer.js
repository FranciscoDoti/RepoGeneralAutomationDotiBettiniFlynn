const { Given, When, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const config = require('../../../config.js');
const _ = require('lodash');
const expect = require('chai').expect;

// Login Functionality //
async function formFill (driver, feature, page_object, value, clear) {
  let qa = new selenium(driver);

  if (page_object != 'day') {
    let PAGE = await _.get(page, ['course', feature, page_object]);
    await qa.input(PAGE, value, clear);
  } else {
    let page_format = format(page.course.create_course.select_day, value);
    await qa.click(page_format);
  }
};

Given('I fill out the create course form', async function (data_table) {
  let qa = new selenium(this.driver);

  await qa.sleep(config.sleep);
  for (let i = 0; i < data_table.rows().length; i++) {
    await formFill(this.driver, 'create_course', data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await qa.click(page.course.create_course.save);
});

Given('I fill out the edit course form', async function (data_table) {
  let qa = new selenium(this.driver);

  await qa.click(page.course.course_list.course_menu);
  await qa.click(page.course.course_list.edit_course);
  await qa.sleep(config.sleep);
  for (let i = 0; i < data_table.rows().length; i++) {
    await formFill(this.driver, 'course_list', data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await qa.click(page.course.create_course.save);
});


When('I fill out the form to copy a course', async function (data_table) {
  let qa = new selenium(this.driver);

  await qa.click(page.course.main.achieve_home);
  await qa.click(page.course.course_list.course_menu);
  await qa.sleep(config.sleep);
  await qa.click(page.course.course_list.copy_course);
  for (let i = 0; i < data_table.rows().length; i++) {
    await formFill(this.driver, 'create_course', data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await qa.click(page.course.create_course.save);
});



Given(/^I navigate to the course page "(.*)" tab$/, async function (page_object) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', "course_page", page_object]);

  await qa.click(page.course.create_course.course_card);
  await qa.exists(page.course.course_page.overview);
  await qa.click(PAGE);
});

Given('I add the activity to the course under the resources tab', async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'resources', data_table.hashes()[i].type]);

    await qa.sleep(config.sleep);
    await qa.click(page.course.resources.add_content);
    await qa.input(page.course.resources.search_bar, data_table.hashes()[i].activity, true);
    await qa.seleniumKeys(page.course.resources.search_bar, "enter");
    await qa.click(page.course.resources.search_bar);
    await qa.click(PAGE);
    await qa.sleep(config.sleep);
    await qa.click(page.course.resources.close_resource_search_nav);
  }
});






Given('I assign Instructor to the course', async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    // await qa.sleep(config.sleep);
    await qa.click(page.course.course_list.course_menu);
    // await qa.sleep(config.sleep);
    await qa.click(page.course.course_list.Manage_instructor);
    // await qa.sleep(config.sleep);
    await qa.input(page.course.create_course.add_instructor, data_table.hashes()[i].username);
    await qa.click(page.course.create_course.add_instructor_button);
    await qa.click(page.course.create_course.add_instructor_close);
  }
});




When('I do the other thing', async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.course.course_list.end_date);
  await qa.click(page.course.course_list.next_month_button);
  await qa.click(page.course.course_list.next_month_button);
  await qa.click(page.course.course_list.select_date);
  await qa.click(page.course.create_course.save);
});




Then('I verify the course_list data', async function (data_table) {
  let qa = new selenium(this.driver);

  let text = await qa.getText(page.course.create_course.course_card);
  for (let i = 0; i < data_table.rows().length; i++) {
    expect(text).to.contain(data_table.hashes()[i].value);
  };
});

Then('I verify the activity list', async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    let text = await qa.getText(page.course.course_planner.activity_validation);
    expect(text.toLowerCase()).to.include(data_table.hashes()[i].activity.toLowerCase());
  }
});
