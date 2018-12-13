const { When, Then, After } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const format = require('string-format')
const _ = require('lodash');

When('I fill out the form to create a new course', async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'create_course', data_table.hashes()[i].page_object]);
    await qa.input(PAGE, data_table.hashes()[i].value);
  }

  await qa.click(page.course.create_course.save);
});

// Assetions //
Then(/^I validate that the course "(.*)" "(.*)" is listed on the courses page$/, async function (type, identifier) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await qa.exists(page_format);
});

// Cleanup //
After('@delete-course', async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.course.course_list.course_menu);
  await qa.click(page.course.course_list.delete_course);
  await qa.click(page.course.course_list.confirm_delete);
});
