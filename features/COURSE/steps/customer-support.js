const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;



Given('I assign Instructor to the course', async function (data_table) {


  for (let i = 0; i < data_table.rows().length; i++) {

await pages.course_list.click('course_menu');

await pages.course_list.click('Manage_instructor');

await pages.create_course.populate('add_instructor',  data_table.hashes()[i].username);
await pages.create_course.click('add_instructor_button');

await pages.create_course.click('add_instructor_close');

  }
});
