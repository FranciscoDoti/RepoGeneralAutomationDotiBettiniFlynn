const { Given, When, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const imap = require('../../../app/imap.js');
const page = require('../../master-page.js');
const config = require('../../../config.js');
const format = require('string-format');
const expect = require('chai').expect;
const _ = require('lodash');

Given('I assign Instructor to the course', async function (data_table) {
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
