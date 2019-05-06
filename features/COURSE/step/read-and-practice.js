// const { When, Then, After } = require('cucumber');
// const expect = require('chai').expect;
// const _ = require('lodash');

// Then(/^I verify "(.*) system "(.*)" data$/, async function (system, feature, data_table) {
//   let qa = new selenium(this.driver);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let PAGE = await _.get(page, [system, feature, data_table.hashes()[i].course_page]);
//     let page_format = await format(PAGE, data_table.hashes()[0].value);
//     await qa.exists(page_format)
//   }
// });
