const After = require('cucumber').After;
const pages = require('../pages/.page.js').pages;
const { Given, When, Then } = require('cucumber');

// async function deleteCourse (driver) {
//   let qa = new selenium(driver);
// await pages.course_list.click('course_menu');
// //   await qa.sleep(500);
// await pages.course_list.click('delete_course');
// //   await qa.sleep(500);
// await pages.course_list.click('confirm_delete');
// //   await qa.sleep(config.sleep);
// // }

// After('@delete-all-courses', async function () {

// @When('I sign out of Achieve');
// @Given('I login to Achieve-CW as "media_producer_1"');
//   let elements = await pages.create_course.getWebelements('course_card');
//   for (let i = 0; i < elements.length; i++) {
//     await deleteCourse(this.driver);
//   }
// });

// After('@delete-course', async function () {
//   await deleteCourse(this.driver);
// });
