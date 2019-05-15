// // const { Given, When, Then } = require('cucumber');
// // const pages = require('../pages/.page.js').pages;
// // const expect = require('chai').expect;
// // const course = page.course;

// // Then('I verify that a Unit Folder is added', async function () {

// //   let text = 'AT Unit Folder';

// await pages.course_planner.elementExists('unit_folder_course');
// await pages.course_planner.click('unit_folder_course');
// await pages.course_page.elementExists('course_planner');
// await pages.course_page.click('course_planner');
// await pages.course_planner.elementExists('add_unit_folder');
// await pages.course_planner.click('add_unit_folder');
// await pages.course_planner.elementExists('add_unit_modal');
// await pages.course_planner.populate('unit_name_input',  text);
// await pages.course_planner.click('unit_folder_button');
// await pages.course_planner.click('add_unit_button');
// await pages.course_planner.elementExists('unit_folder_name');
// //   let createdUnit = await qa.getText(page.course.course_planner.unit_folder_name);
// //   expect(createdUnit).to.contain(text);
// // });

// // Then('I verify that a Unit Folder is removed', async function () {


// await pages.course_planner.click('unit_folder_action');
// await pages.course_planner.elementExists('remove_folder_action');
// await pages.course_planner.click('remove_folder_action');
// await pages.course_planner.elementExists('remove_folder_modal');
// await pages.course_planner.click('remove_folder_button');
// await pages.course_planner.elementExists('empty_assignments_view)');
// await pages.main.click('achieve_home');
// // });

// // Then('I reorder the units under the course planner tab', async function() {

// await pages.course_planner.elementExists('unit_action_button, 100');
  
// await pages.course_planner.click('unit_action_button');
// await pages.course_planner.elementExists('unit_action_menu, 100');
// await pages.course_planner.elementExists('unit_action_items_reorder, 100');
// await pages.course_planner.click('unit_action_items_reorder');
  
// await pages.course_planner.elementExists('unit_reorder_modal');
// //   let secondLi = await qa.getText(course.course_planner.modal_reoreder_list_second_li);
// await pages.course_planner.elementExists('modal_reoreder_list_second_li, 100');
// //   await qa.sleep(1000)
// await pages.course_planner.click('modal_move_down_button');
// //   let thirdLi = await qa.getText(course.course_planner.modal_reoreder_list_third_li);
// //   expect(secondLi).to.contain(thirdLi);
// //   await qa.sleep(1000);

// await pages.course_planner.click('modal_move_up_button');
// //   await qa.sleep(1000);

// //   let afterClickUp = await qa.getText(course.course_planner.modal_reoreder_list_second_li);
// //   expect(secondLi).to.contain(afterClickUp);
// await pages.course_planner.click('modal_save_button');
// await pages.course_page.click('achieve_logo_link');

// // })
