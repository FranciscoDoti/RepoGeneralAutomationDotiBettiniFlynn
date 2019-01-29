const { When, Then, After } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const format = require('string-format');
const expect = require('chai').expect;
const _ = require('lodash');

Then(/^I verify "(.*) system "(.*)" data$/, async function (system, feature, data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, [system, feature, data_table.hashes()[i].course_page]);
    await qa.exists(PAGE)
  }
});
