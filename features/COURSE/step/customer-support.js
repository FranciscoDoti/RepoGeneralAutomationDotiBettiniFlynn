const { Given, When, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const config = require('../../../config.js');
const format = require('string-format');
const expect = require('chai').expect;
const _ = require('lodash');


Given('I assign Instructor to the course', async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    await qa.sleep(config.sleep);
    await qa.click(page.course.course_list.course_menu);
    await qa.sleep(config.sleep);
    await qa.click(page.course.course_list.Manage_instructor);
    await qa.sleep(config.sleep);
    await qa.input(page.course.create_course.add_instructor, data_table.hashes()[i].username);
    await qa.click(page.course.create_course.add_instructor_button);
    await qa.click(page.course.create_course.add_instructor_close);
    await qa.sleep(5000)
  }
});
