// const { Given, When, Then } = require('cucumber');
// const expect = require('chai').expect;
// const _ = require('lodash');


// Given('I assign Instructor to the course', async function (data_table) {
//   let qa = new selenium(this.driver);

//   for (let i = 0; i < data_table.rows().length; i++) {
//     await qa.sleep(config.sleep);
//     await qa.click(page.course.course_list.course_menu);
//     await qa.sleep(config.sleep);
//     await qa.click(page.course.course_list.Manage_instructor);
//     await qa.sleep(config.sleep);
//     await qa.input(page.course.create_course.add_instructor, data_table.hashes()[i].username);
//     await qa.click(page.course.create_course.add_instructor_button);
//     await qa.sleep(4000);
//     await qa.click(page.course.create_course.add_instructor_close);
//     await qa.sleep(config.sleep);
//   }
// });
