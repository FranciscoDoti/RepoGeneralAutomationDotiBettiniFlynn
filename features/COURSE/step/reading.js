// const { When, Then, Given } = require('cucumber');
// const _ = require('lodash');
// const expect = require('chai').expect;

// Then(/^I verify the data in "(.*)"$/, async function (course, data_table) {
//   let qa = new selenium(this.driver);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let PAGE = await _.get(page, ['course', course, data_table.hashes()[i].course_page]);
//     await qa.exists(PAGE)
//   }
// });

// When(/^I click on "(.*)" system "(.*)" feature "(.*)" element "(.*)" input$/, async function (system, feature, element, input) {
//   let qa = new selenium(this.driver);
//   let PAGE = await _.get(page, [system, feature, element])
//   let page_format = format(PAGE)
//   await qa.input(page_format, input, 'clear');
// });

// When(/^I "(.*)" of Achieve$/, async function (element) {
//   let qa = new selenium(this.driver);
//   let PAGE = await _.get(page, ['course', 'home', element])
//   let page_format = format(PAGE);
//   await qa.sleep();
//   await qa.click(page.course.home.toggler_menu);
//   await qa.sleep();
//   await qa.click(page_format);
// });


// Then(/^I verify that the course "(.*)" is "(.*)"$/, async function (identifier, activation) {
//   let qa = new selenium(this.driver);
//   await qa.exists(page.course.course_list.course_name, identifier);
//   await qa.exists(page.course.course_list.course_activation, activation);
// });

 

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

// Then('I verify activity staus', async function (data_table) {
//   let qa = new selenium(this.driver);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let activity_name = await qa.getText(page.course.course_planner.activity_validation);
//     if (activity_name === data_table.hashes()[i].Activity) {
//       await qa.getText(page.course.course_planner.activity_status, data_table.hashes()[i].Status);
//     }
//   }
// });

// When('I fill out the form to update the template from draft to Template', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.course_list.course_menu);
//   await qa.click(page.course.course_list.edit_course);
//   await qa.sleep(config.sleep);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     if (data_table.hashes()[i].page_object != 'day') {
//       let PAGE = await _.get(page, ['course', 'course_list', data_table.hashes()[i].page_object]);
//       await qa.input(PAGE, data_table.hashes()[i].value, data_table.hashes()[i].clear);
//     } else {
//       let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
//       await qa.click(page_format);
//     }
//   }

//   await qa.click(page.course.create_course.save_editcourse);
// });

// When('I fill out the form to update the status of course to active', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.course_list.course_menu);
//   await qa.click(page.course.course_list.edit_course);
//   await qa.sleep(config.sleep);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     if (data_table.hashes()[i].page_object != 'day') {
//       let PAGE = await _.get(page, ['course', 'course_list', data_table.hashes()[i].page_object]);
//       await qa.input(PAGE, data_table.hashes()[i].value, data_table.hashes()[i].clear);
//     } else {
//       let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
//       await qa.click(page_format);
//     }
//   }
//   await qa.click(page.course.course_list.end_date);
//   await qa.click(page.course.course_list.next_month_button);
//   await qa.click(page.course.course_list.next_month_button);
//   await qa.click(page.course.course_list.select_date);
//   await qa.click(page.course.create_course.save_editcourse);
// });

// When('I add the activities in courseplanner', async function (data_table) {
//   let qa = new selenium(this.driver);
//   // await qa.click(page.course.create_course.course_card);
//   await qa.sleep();

//   await qa.click(page.course.course_page.course_planner);
//   await qa.sleep(config.sleep);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     await qa.click(page.course.course_planner.custom_content_button);
//     await qa.input(page.course.course_planner.library_search_input, data_table.hashes()[i].activity, 'clear', 'enter_after');
//     await qa.click(page.course.course_planner.library_search_input);
//     await qa.click(page.course.course_planner.add_assignment_button);
//     await qa.click(page.course.course_planner.close_courseplanner);
//   }
// });

// When('I enroll the student in the course', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.create_course.course_card);
//   await qa.sleep();
//   await qa.click(page.course.home.toggler_menu);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.user.admin);
//   await qa.sleep(config.sleep)
//   await qa.click(page.course.home.manage_enrollments);
//   await qa.sleep(config.sleep);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     await qa.input(page.course.home.manage_enrollements_input, data_table.hashes()[i].username);
//     await qa.click(page.course.home.add_user_button);
//   }
//   await qa.click(page.course.home.close_manage_roles);
// });

// Then('I verify the activity list in resource tab', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.sleep(config.sleep);
//   let activity_element = page.course.resources.activity;
//   let elementTextArray = await qa.getTextOfElementInArray(activity_element);
//   console.log(elementTextArray);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let elementTextIncludes = elementTextArray.includes(data_table.hashes()[i].activity)
//     expect(elementTextIncludes).to.equal(true);
//   }
// });

// When('I click on create custom button to add URL link', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.click(page.course.create_course.course_card);
//   await qa.click(page.course.course_page.resources)
//   await qa.click(page.course.resources.add_content);
//   await qa.scrollByPages(page.course.resources_page.create_custom_activity);
//   await qa.click(page.course.resources_page.create_custom_activity);
//   await qa.click(page.course.resources_page.url_link)
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let PAGE = await _.get(page, ['course', 'resources_page', data_table.hashes()[i].Pagedef]);
//     await qa.input(PAGE, data_table.hashes()[i].link, data_table.hashes()[i].clear);
//   }
//   await qa.click(page.course.resources_page.add_url);
// });

// When('I add custom made activities in resource tab', async function (data_table) {
//   let qa = new selenium(this.driver);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     await qa.input(page.course.resources.library_search_bar, data_table.hashes()[i].activity, 'clear', 'enter_after');
//     await qa.click(page.course.resources.library_search_bar);
//     await qa.click(page.course.course_planner.add_custom_activity);
//     await qa.click(page.course.resources.close_resource_search_nav);
//   }
// });

// Then('I verify that custom activity is present in courseplanner your content section', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.click(page.course.course_page.course_planner);
//   await qa.click(page.course.course_planner.custom_content_button);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let text = await qa.getText(page.course.course_planner.your_content_validation);
//     console.log(text);
//     expect(text).to.contain(data_table.hashes()[i].activity);
//   }
// });

// When('I click on create custom button to add URL link in courseplanner', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.create_course.course_card);
//   await qa.click(page.course.course_page.course_planner)
//   await qa.click(page.course.course_planner.custom_content_button);
//   await qa.click(page.course.course_planner.New_custom);
//   await qa.click(page.course.resources_page.url_link)
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let PAGE = await _.get(page, ['course', 'resources_page', data_table.hashes()[i].Pagedef]);
//     await qa.input(PAGE, data_table.hashes()[i].link, data_table.hashes()[i].clear);
//   }
//   await qa.click(page.course.resources_page.add_url);
// });

// When('I assign the activities in courseplanner and add the afer 7 days', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.click(page.course.course_page.course_planner);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let Elements = await qa.getArray(page.course.course_planner.assign_assignment_button);
//     await qa.sleep(config.sleep);
//     let countlinks = Elements.length;
//     let x = countlinks - 1;
//     while (x >= 0) {
//       x--;
//       await qa.click(page.course.course_planner.assign_assignment_button);
//       await qa.click(page.course.course_planner.vissibility_button);
//       await qa.sleep();
//       await qa.input(page.course.course_planner.points_input, data_table.hashes()[i].Points);
//       await qa.sleep();
//       await qa.click(page.course.course_planner.assignment_dueDate);
//       await qa.click(page.course.course_list.next_month_button);
//       await qa.click(page.course.course_list.next_month_button);
//       await qa.click(page.course.course_planner.date);
//       await qa.sleep();
//       await qa.click(page.course.course_planner.assign_button);
//       await qa.click(page.course.home.close_alert);
//       break;
//     }
//     await qa.sleep();
//   }
// });

// Then('I verify the activities in overview Tab', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.course_page.overview);
//   let activity_element = page.course.overview.overview_verification;
//   let elementTextArray = await qa.getTextOfElementInArray(activity_element);
//   for (let i = 0; i < data_table.rows().length; i++) {
//     let elementTextIncludes = elementTextArray.includes(data_table.hashes()[i].activity)
//     expect(elementTextIncludes).to.equal(true);
//   }
// });

// Then('I verify that activities are not listed in overview Tab', async function (data_table) {
//   let qa = new selenium(this.driver);
//   await qa.sleep(config.sleep);
//   await qa.click(page.course.course_page.overview);
//   let activity_element = page.course.overview.overview_verification;
//   await qa.doesNotExist(activity_element);
// });
