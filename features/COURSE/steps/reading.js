// const { When, Then, Given } = require('cucumber');
// const pages = require('../pages/.page.js').pages;
// const expect = require('chai').expect;

// Then(/^I verify the data in "(.*)"$/, async function (course, data_table) {

//   for (let i = 0; i < data_table.rows().length; i++) {
//     let PAGE = await _.get(page, ['course', course, data_table.hashes()[i].course_page]);
// await pages.undefined.assertElementExists('PAGE)');
//   }
// });

// When(/^I click on "(.*)" system "(.*)" feature "(.*)" element "(.*)" input$/, async function (system, feature, element, input) {

//   let PAGE = await _.get(page, [system, feature, element])
//   let page_format = format(PAGE)
// await pages.undefined.populate('page_format',  input);
// });

// When(/^I "(.*)" of Achieve$/, async function (element) {

//   let PAGE = await _.get(page, ['course', 'home', element])
//   let page_format = format(PAGE);

// await pages.home.click('toggler_menu');

// await pages.undefined.click('page_format');
// });


// Then(/^I verify that the course "(.*)" is "(.*)"$/, async function (identifier, activation) {

// await pages.course_list.assertElementExists('course_name, identifier');
// await pages.course_list.assertElementExists('course_activation, activation');
// });

 

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

// Then('I verify activity staus', async function (data_table) {

//   for (let i = 0; i < data_table.rows().length; i++) {
//     let activity_name = await qa.getText(page.course.course_planner.activity_validation);
//     if (activity_name === data_table.hashes()[i].Activity) {
//       await qa.getText(page.course.course_planner.activity_status, data_table.hashes()[i].Status);
//     }
//   }
// });

// When('I fill out the form to update the template from draft to Template', async function (data_table) {


// await pages.course_list.click('course_menu');
// await pages.course_list.click('edit_course');

//   for (let i = 0; i < data_table.rows().length; i++) {
//     if (data_table.hashes()[i].page_object != 'day') {
//       let PAGE = await _.get(page, ['course', 'course_list', data_table.hashes()[i].page_object]);
// await pages.undefined.populate('PAGE',  data_table.hashes()[i].value);
//     } else {
//       let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
// await pages.create_course.click('select_day');
//     }
//   }

// await pages.create_course.click('save_editcourse');
// });

// When('I fill out the form to update the status of course to active', async function (data_table) {


// await pages.course_list.click('course_menu');
// await pages.course_list.click('edit_course');

//   for (let i = 0; i < data_table.rows().length; i++) {
//     if (data_table.hashes()[i].page_object != 'day') {
//       let PAGE = await _.get(page, ['course', 'course_list', data_table.hashes()[i].page_object]);
// await pages.undefined.populate('PAGE',  data_table.hashes()[i].value);
//     } else {
//       let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
// await pages.undefined.click('page_format');
//     }
//   }
// await pages.course_list.click('end_date');
// await pages.course_list.click('next_month_button');
// await pages.course_list.click('next_month_button');
// await pages.course_list.click('select_date');
// await pages.create_course.click('save_editcourse');
// });

// When('I add the activities in courseplanner', async function (data_table) {

// await pages.create_course.click('course_card');


// await pages.course_page.click('course_planner');

//   for (let i = 0; i < data_table.rows().length; i++) {
// await pages.course_planner.click('custom_content_button');
// await pages.course_planner.populate('library_search_input',  data_table.hashes()[i].activity);
// await pages.course_planner.click('library_search_input');
// await pages.course_planner.click('add_assignment_button');
// await pages.course_planner.click('close_courseplanner');
//   }
// });

// When('I enroll the student in the course', async function (data_table) {


// await pages.create_course.click('course_card');

// await pages.home.click('toggler_menu');

// await pages.user.click('admin');

// await pages.home.click('manage_enrollments');

//   for (let i = 0; i < data_table.rows().length; i++) {
// await pages.home.populate('manage_enrollements_input',  data_table.hashes()[i].username);
// await pages.home.click('add_user_button');
//   }
// await pages.home.click('close_manage_roles');
// });

// Then('I verify the activity list in resource tab', async function (data_table) {


//   let activity_element = page.course.resources.activity;
//   let elementTextArray = await qa.getTextOfElementInArray(activity_element);
//   console.log(elementTextArray);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let elementTextIncludes = elementTextArray.includes(data_table.hashes()[i].activity)
//     expect(elementTextIncludes).to.equal(true);
//   }
// });

// When('I click on create custom button to add URL link', async function (data_table) {

// await pages.create_course.click('course_card');
// await pages.course_page.click('resources)');
// await pages.resources.click('add_content');
//   await qa.scrollByPages(page.course.resources_page.create_custom_activity);
// await pages.resources_page.click('create_custom_activity');
// await pages.resources_page.click('url_link)');
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let PAGE = await _.get(page, ['course', 'resources_page', data_table.hashes()[i].Pagedef]);
// await pages.undefined.populate('PAGE',  data_table.hashes()[i].link);
//   }
// await pages.resources_page.click('add_url');
// });

// When('I add custom made activities in resource tab', async function (data_table) {

//   for (let i = 0; i < data_table.rows().length; i++) {
// await pages.resources.populate('library_search_bar',  data_table.hashes()[i].activity);
// await pages.resources.click('library_search_bar');
// await pages.course_planner.click('add_custom_activity');
// await pages.resources.click('close_resource_search_nav');
//   }
// });

// Then('I verify that custom activity is present in courseplanner your content section', async function (data_table) {

// await pages.course_page.click('course_planner');
// await pages.course_planner.click('custom_content_button');
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let text = await qa.getText(page.course.course_planner.your_content_validation);
//     console.log(text);
//     expect(text).to.contain(data_table.hashes()[i].activity);
//   }
// });

// When('I click on create custom button to add URL link in courseplanner', async function (data_table) {


// await pages.create_course.click('course_card');
// await pages.course_page.click('course_planner)');
// await pages.course_planner.click('custom_content_button');
// await pages.course_planner.click('New_custom');
// await pages.resources_page.click('url_link)');
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let PAGE = await _.get(page, ['course', 'resources_page', data_table.hashes()[i].Pagedef]);
// await pages.undefined.populate('PAGE',  data_table.hashes()[i].link);
//   }
// await pages.resources_page.click('add_url');
// });

// When('I assign the activities in courseplanner and add the afer 7 days', async function (data_table) {

// await pages.course_page.click('course_planner');
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let Elements = await qa.getArray(page.course.course_planner.assign_assignment_button);

//     let countlinks = Elements.length;
//     let x = countlinks - 1;
//     while (x >= 0) {
//       x--;
// await pages.course_planner.click('assign_assignment_button');
// await pages.course_planner.click('vissibility_button');

// await pages.course_planner.populate('points_input',  data_table.hashes()[i].Points);

// await pages.course_planner.click('assignment_dueDate');
// await pages.course_list.click('next_month_button');
// await pages.course_list.click('next_month_button');
// await pages.course_planner.click('date');

// await pages.course_planner.click('assign_button');
// await pages.home.click('close_alert');
//       break;
//     }

//   }
// });

// Then('I verify the activities in overview Tab', async function (data_table) {


// await pages.course_page.click('overview');
//   let elementTextArray = await qa.getTextOfElementInArray(page.course.overview.overview_verification);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let elementTextIncludes = elementTextArray.includes(data_table.hashes()[i].activity)
//     expect(elementTextIncludes).to.equal(true);
//   }
// });

// Then('I verify that activities are not listed in overview Tab', async function (data_table) {


// await pages.course_page.click('overview');
// await pages.overview.assertElementDoesNotExist('overview_verification');
// });