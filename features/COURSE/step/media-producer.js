// const { Given, When, Then } = require('cucumber');
// const _ = require('lodash');
// const expect = require('chai').expect;

// // Login Functionality //
// async function formFill (driver, feature, page_object, value, clear) {
//   let qa = new selenium(driver);

//   if (page_object != 'day') {
//     let PAGE = await _.get(page, ['course', feature, page_object]);
//     await qa.input(PAGE, value, clear);
//   } else {
//     let page_format = format(page.course.create_course.select_day, value);
//     await qa.click(page_format);
//   }

//   if (feature === 'create_course' && page_object === 'course_status' && value === 'Active On Date') {
//     await qa.click(page.course.course_list.create_end_date);
//     await qa.sleep(1000);
//     await qa.click(page.course.course_list.next_month_button);
//     await qa.sleep(1000);
//     await qa.click(page.course.course_list.select_date);
//   }
// };

// Given('I fill out the create course form', async function (data_table) {
//   let qa = new selenium(this.driver);

//   await qa.sleep(config.sleep);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     await formFill(this.driver, 'create_course', data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
//   };
//   await qa.click(page.course.create_course.save);
// });

// Given('I fill out the edit course form', async function (data_table) {
//   let qa = new selenium(this.driver);

//   await qa.click(page.course.course_list.course_menu);
//   await qa.click(page.course.course_list.edit_course);
//   await qa.sleep(config.sleep);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     await formFill(this.driver, 'course_list', data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
//   };
//   await qa.click(page.course.create_course.save);
// });

// Given("I select a day next month for the course's End Date", async function () {
//   let qa = new selenium(this.driver);

//   await qa.sleep(config.sleep);
//   await qa.click(page.course.course_list.end_date);
//   await qa.click(page.course.course_list.next_month_button);
//   await qa.click(page.course.course_list.select_date);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.create_course.save);
//   await qa.sleep(config.sleep);
// });

// When('I fill out the form to copy a course', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.click(page.course.course_list.course_menu);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.course_list.copy_course);
//   await qa.sleep(config.sleep);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     await formFill(this.driver, 'create_course', data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
//   };
//   await qa.click(page.course.create_course.save_copycourse);
// });



// Given(/^I navigate to the course page "(.*)" tab$/, async function (page_object) {
//   let qa = new selenium(this.driver);
//   let PAGE = await _.get(page, ['course', "course_page", page_object]);

//   await qa.click(page.course.create_course.course_card);
//   await qa.exists(page.course.course_page.overview);
//   await qa.click(PAGE);
// });

// Given('I add the activity to the course under the resources tab', async function (data_table) {
//   let qa = new selenium(this.driver);

//   for (let i = 0; i < data_table.rows().length; i++) {
//     let PAGE = await _.get(page, ['course', 'resources', data_table.hashes()[i].type]);

//     await qa.sleep(config.sleep);
//     await qa.click(page.course.resources.add_content);
//     await qa.input(page.course.resources.search_bar, data_table.hashes()[i].activity, true);
//     await qa.seleniumKeys(page.course.resources.search_bar, 'enter');
//     await qa.click(page.course.resources.search_bar);
//     await qa.click(PAGE);
//     await qa.sleep();
//     await qa.click(page.course.resources.close_resource_search_nav);
//   }
// });

// Then('I verify the course_list data', async function (data_table) {
//   let qa = new selenium(this.driver);
//   let text = await qa.getText(page.course.create_course.course_card);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     expect(text).to.contain(data_table.hashes()[i].value);
//   };
// });

