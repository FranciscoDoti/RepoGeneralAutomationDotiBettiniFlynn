// const { Given, When, Then } = require('cucumber');
// const expect = require('chai').expect;
// const _ = require('lodash');

// When('I invite the students', async function (data_table) {
//   let qa = new selenium(this.driver);

//   await qa.click(page.course.course_list.course_menu);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.course_list.invite_students_button);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.create_course.send_email_invite);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     await qa.click(page.course.create_course.textbox_input);
//     await qa.input(page.course.create_course.input_student_email, data_table.hashes()[i].username);
//     await qa.seleniumKeys(page.course.create_course.input_student_email, 'enter');
//   }
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.create_course.send_invite_button);
//   await qa.click(page.course.create_course.send_invite_button);
//   await qa.click(page.course.create_course.send_invite_button);
// });

// Given('I add the activities in course planner', async function (data_table) {
//   let qa = new selenium(this.driver);

//   await qa.sleep(config.sleep);
//   await qa.click(page.course.create_course.course_card);
//   await qa.click(page.course.course_page.course_planner);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     await qa.click(page.course.course_planner.custom_content_button);
//     await qa.input(page.course.course_planner.library_search_input, data_table.hashes()[i].activity, 'clear');
//     await qa.seleniumKeys(page.course.course_planner.library_search_input, 'enter')
//     await qa.click(page.course.course_planner.library_search_input);
//     await qa.click(page.course.course_planner.add_assignment_button);
//     await qa.click(page.course.course_planner.close_courseplanner)
//   }
// });

// Then('I verify activity list', async function (data_table) {
//   let qa = new selenium(this.driver);

//   await qa.click(page.course.course_list.course_menu);
//   await qa.click(page.course.course_list.ed)
//   await qa.click(page.course.course_page.resources);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let elementTextArray = await qa.getTextOfElementInArray(page.course.resources.activity);
//     let elementTextIncludes = elementTextArray.includes(data_table.hashes()[i].activity)
//     expect(elementTextIncludes).to.contain(data_table.hashes()[i].page);
//   }
// })

// When(/^I click on "(.*)" system "(.*)" feature "(.*)" element and reduce the activity points$/, async function (system, feature, element) {
//   let qa = new selenium(this.driver);
//   let PAGE = await _.get(page, [system, feature, element]);
//   let page_format = format(PAGE);
//   await qa.click(page_format);
//   let booleanVal = await qa.exists(page.course.course_planner.edit_target);
//   if (booleanVal === true) {
//     console.log('it exists');
//     await qa.click(page.course.course_planner.edit_target);
//     await qa.input(page.course.course_planner.input_target_score, 'clear');
//     await qa.input(page.course.course_planner.input_target_score, '5');
//     await qa.click(page.course.course_planner.change_target_score);
//     await qa.click(page.course.course_planner.very_short_time_button);
//     await qa.click(page.course.course_planner.close_learning_curve);
//   } else {
//     await qa.click(page.course.course_planner.close_reading);
//   }
// });

