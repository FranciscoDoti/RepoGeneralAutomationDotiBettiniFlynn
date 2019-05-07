const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;
const course = page.course;

Then('I verify that a Unit Folder is added', async function () {
  let qa = new selenium(this.driver);
  let text = 'AT Unit Folder';

  await qa.exists(page.course.course_planner.unit_folder_course);
  await qa.click(page.course.course_planner.unit_folder_course);
  await qa.exists(page.course.course_page.course_planner);
  await qa.click(page.course.course_page.course_planner);
  await qa.exists(page.course.course_planner.add_unit_folder);
  await qa.click(page.course.course_planner.add_unit_folder);
  await qa.exists(page.course.course_planner.add_unit_modal);
  await qa.input(page.course.course_planner.unit_name_input, text);
  await qa.click(page.course.course_planner.unit_folder_button);
  await qa.click(page.course.course_planner.add_unit_button);
  await qa.exists(page.course.course_planner.unit_folder_name);
  let createdUnit = await qa.getText(page.course.course_planner.unit_folder_name);
  expect(createdUnit).to.contain(text);
});

Then('I verify that a Unit Folder is removed', async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.course.course_planner.unit_folder_action);
  await qa.exists(page.course.course_planner.remove_folder_action);
  await qa.click(page.course.course_planner.remove_folder_action);
  await qa.exists(page.course.course_planner.remove_folder_modal);
  await qa.click(page.course.course_planner.remove_folder_button);
  await qa.exists(page.course.course_planner.empty_assignments_view)
  await qa.click(page.course.main.achieve_home);
});

Then('I reorder the units under the course planner tab', async function() {
  let qa = new selenium(this.driver);
  await qa.exists(course.course_planner.unit_action_button, 100);
  
  await qa.click(course.course_planner.unit_action_button);
  await qa.exists(course.course_planner.unit_action_menu, 100);
  await qa.exists(course.course_planner.unit_action_items_reorder, 100);
  await qa.click(course.course_planner.unit_action_items_reorder);
  
  await qa.exists(course.course_planner.unit_reorder_modal);
  let secondLi = await qa.getText(course.course_planner.modal_reoreder_list_second_li);
  await qa.exists(course.course_planner.modal_reoreder_list_second_li, 100);
  await qa.sleep(1000)
  await qa.click(course.course_planner.modal_move_down_button);
  let thirdLi = await qa.getText(course.course_planner.modal_reoreder_list_third_li);
  expect(secondLi).to.contain(thirdLi);
  await qa.sleep(1000);

  await qa.click(course.course_planner.modal_move_up_button);
  await qa.sleep(1000);

  let afterClickUp = await qa.getText(course.course_planner.modal_reoreder_list_second_li);
  expect(secondLi).to.contain(afterClickUp);
  await qa.click(course.course_planner.modal_save_button);
  await qa.click(page.course.course_page.achieve_logo_link);

})
