const { Given, When, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const imap = require('../../../app/imap.js');
const page = require('../../master-page.js');
const config = require('../../../config.js');
const format = require('string-format');
const expect = require('chai').expect;
const _ = require('lodash');

async function sucess (driver) {
  let qa = new selenium(driver);
  await qa.click(page.course.overview.multiple_choice);
  await qa.click(page.course.overview.submit_button);
}

Then('I verify the activity list', async function (data_table) {
  let qa = new selenium(this.driver)
  for (let i = 0; i < data_table.rows().length; i++) {
    let text = await qa.getText(page.course.course_planner.activity_validation);
    let verify = text === data_table.hashes()[i].activity
    if (verify === data_table.hashes()[i].clear) {
    }
  }
});
