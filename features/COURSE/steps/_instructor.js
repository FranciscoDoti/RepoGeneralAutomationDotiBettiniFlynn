// const { Given, When, Then } = require('cucumber');
// const pages = require('../pages/.page.js').pages;
// const expect = require('chai').expect;


// When('I invite the students', async function (data_table) {


// await pages.course_list.click('course_menu');

// await pages.course_list.click('invite_students_button');

// await pages.create_course.click('send_email_invite');
//   for (let i = 0; i < data_table.rows().length; i++) {
// await pages.create_course.click('textbox_input');
// await pages.create_course.populate('input_student_email',  data_table.hashes()[i].username);
//     await qa.seleniumKeys(page.course.create_course.input_student_email, 'enter');
//   }

// await pages.create_course.click('send_invite_button');
// await pages.create_course.click('send_invite_button');
// await pages.create_course.click('send_invite_button');
// });

// Given('I add the activities in course planner', async function (data_table) {



// await pages.create_course.click('course_card');
// await pages.course_page.click('course_planner');
//   for (let i = 0; i < data_table.rows().length; i++) {
// await pages.course_planner.click('custom_content_button');
// await pages.course_planner.populate('library_search_input',  data_table.hashes()[i].activity);
//     await qa.seleniumKeys(page.course.course_planner.library_search_input, 'enter')
// await pages.course_planner.click('library_search_input');
// await pages.course_planner.click('add_assignment_button');
// await pages.course_planner.click('close_courseplanner)');
//   }
// });

// Then('I verify activity list', async function (data_table) {


// await pages.course_list.click('course_menu');
// await pages.course_list.click('ed)');
// await pages.course_page.click('resources');
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let elementTextArray = await qa.getTextOfElementInArray(page.course.resources.activity);
//     let elementTextIncludes = elementTextArray.includes(data_table.hashes()[i].activity)
//     expect(elementTextIncludes).to.contain(data_table.hashes()[i].page);
//   }
// })

// When(/^I click on "(.*)" system "(.*)" feature "(.*)" element and reduce the activity points$/, async function (system, feature, element) {

//   let PAGE = await _.get(page, [system, feature, element]);
//   let page_format = format(PAGE);
// await pages.undefined.click('page_format');
// await pages.course_planner.assertElementExists('edit_target');
//   if (booleanVal === true) {
//     console.log('it exists');
// await pages.course_planner.click('edit_target');
// await pages.course_planner.populate('input_target_score',  'clear');
// await pages.course_planner.populate('input_target_score',  '5');
// await pages.course_planner.click('change_target_score');
// await pages.course_planner.click('very_short_time_button');
// await pages.course_planner.click('close_learning_curve');
//   } else {
// await pages.course_planner.click('close_reading');
//   }
// });

