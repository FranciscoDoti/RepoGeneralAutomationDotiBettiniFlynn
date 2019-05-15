// const After = require('cucumber').After;
// const pages = require('../pages/.page.js').pages;

// async function deleteCourse (driver) {
//   let qa = new selenium(driver);
// await pages.course_list.click('course_menu');
// //   await qa.sleep(500);
// await pages.course_list.click('delete_course');
// //   await qa.sleep(500);
// await pages.course_list.click('confirm_delete');
// //   await qa.sleep(config.sleep);
// // }

// // After('@delete-all-courses', async function () {

// //   let payload = require(`../../_data/user/${config.environment}/media_producer_2.json`);
// await pages.home.click('toggler_menu');
// //   await qa.sleep(config.sleep);
// await pages.home.click('sign_out');
// //   await qa.sleep(config.sleep);
// await pages.home.click('sign_in');
// await pages.login.populate('username',  payload.username);
// await pages.login.populate('password',  payload.password);
// await pages.login.click('sign_in');
//   let elements = await qa.getArray(page.course.create_course.course_card);
//   for (let i = 0; i < elements.length; i++) {
//     await deleteCourse(this.driver);
//   };
// });

// After('@delete-course', async function () {
//   await deleteCourse(this.driver);
// });
