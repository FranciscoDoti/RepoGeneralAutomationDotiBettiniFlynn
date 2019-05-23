// const {When, Then} = require('cucumber');
// const pages = require('../pages/.page.js').pages;
// const formatDate = require('dateformat');
// const csvToJson = require('csvtojson');
// const expect = require('chai').expect;


// // Then('I verify the following information is present', async function (data_table) {

// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     let create_account_element = await _.get(page, ['iam', 'create_account', data_table.hashes()[i].page_object]);
// await pages.undefined.elementExists('create_account_element, 5000');
// //   }
// // });

// // When('I fill the form to create account', async function (data_table) {

// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     let create_account_element = await _.get(page, ['iam', 'create_account', data_table.hashes()[i].page_object]);
// await pages.undefined.populate('create_account_element',  data_table.hashes()[i].value);
// //   }
// await pages.create_account.click('terms_of_service');
// await pages.create_account.click('signup_btn');
// // });

// // Then(/^I verify email notification is sent to "(.*)" user "(.*)" password$/, async function (user, password) {
// //   let qa = new selenium(this.deiver);
// //   await imap.connectClient(user, password, 'registration');
// // });

// // Then('I verify Manage roles is displayed', async function (data_table) {

// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     let PAGE = await _.get(page, ['course', 'admin_menu', data_table.hashes()[i].page_def]);
// await pages.undefined.elementExists('PAGE, 5000');
// //     // let enable = await _.get(page, ['course', 'admin_menu', data_table.hashes()[i].disabled]);
// //     // await qa.isEnabled(enable, 5000);
// //   }
// // })

// // When(/^I revoke "(.*)" of "(.*)"$/, async function (role, users) {

// //   let payload = require(`../../_data/user/${config.environment}/${users}.json`);
// //   await qa.sleep();
// await pages.admin_menu.populate('manage_role_email_input',  payload.username);
// await pages.admin_menu.populate('manage_role_select_list',  role);
// await pages.admin_menu.click('revokerole');
// // });

// // When(/^I grant "(.*)" to the "(.*)"$/, async function (role, users) {

// //   let payload = require(`../../_data/user/${config.environment}/${users}.json`);
// //   await qa.sleep();
// await pages.admin_menu.populate('manage_role_email_input',  payload.username);
// await pages.admin_menu.populate('manage_role_select_list',  role);
// await pages.admin_menu.click('grantrole');
// // });

// // When('I create custom made activity', async function (data_table) {

// await pages.course_page.click('course_planner');
// await pages.course_planner.click('custom_content_button');
// await pages.course_planner.click('New_custom');
// await pages.course_planner.click('assessment_button');
// //   await qa.sleep(config.sleep);
// //   await qa.switchFrame(0);
// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     let PAGE = await _.get(page, ['course', 'course_planner', data_table.hashes()[i].activity]);
// await pages.undefined.populate('PAGE',  data_table.hashes()[i].value);
// //   }
// await pages.course_planner.click('reset_model');
// await pages.course_planner.click('Question_bank');
// //   await qa.sleep(config.sleep);
// await pages.course_planner.click('Check_box_assignment');
// await pages.course_planner.click('Add_assignment_button');
// //   await qa.back();
// //   await qa.back();
// //   await qa.back();
// // });

// // Then(/^I verify that custom made "(.*)" is added $/, async function (identifier) {

// await pages.course_planner.elementExists('custom_activity_validation, identifier');
// // });

// // When('I add custom made activities in courseplanner', async function (data_table) {

// //   for (let i = 0; i < data_table.rows().length; i++) {
// await pages.course_planner.click('custom_content_button');
// await pages.course_planner.click('your_activity');
// await pages.course_planner.populate('library_search_input',  data_table.hashes()[i].activity);
// await pages.course_planner.click('library_search_input');
// await pages.course_planner.click('add_custom_activity');
// await pages.course_planner.click('close_courseplanner');
// //   }
// // });

// // When(/^I click on "(.*)" system "(.*)" feature "(.*)" element and grant roles$/, async function (system, feature, element) {

// //   let PAGE = await _.get(page, [system, feature, element]);
// await pages.home.click('toggler_menu');
// //   await qa.sleep()
// await pages.user.click('admin');
// //   await qa.sleep();
// await pages.undefined.click('PAGE');
// // });

// // When('I select template and create course with following details', async function (data_table) {

// await pages.create_course.click('plus_button');
// await pages.create_course.click('template');
// await pages.create_course.click('create_course');
// //   await qa.sleep(config.sleep);
// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     if (data_table.hashes()[i].page_object != 'day') {
// //       let PAGE = await _.get(page, ['course', 'create_course', data_table.hashes()[i].page_object]);
// await pages.undefined.populate('PAGE',  data_table.hashes()[i].value);
// //     } else {
// //       let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
// await pages.undefined.click('page_format');
// //     }
// //   }
// // });

// // When('I generate access code', async function (data_table) {

// //   await qa.sleep(config.sleep);
// await pages.create_course.click('course_card');
// //   await qa.sleep();
// await pages.home.click('toggler_menu');
// //   await qa.sleep();
// await pages.user.click('admin');
// //   await qa.sleep();
// await pages.admin_menu.click('create_access_code');
// //   await qa.sleep(config.sleep);
// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     let PAGE = await _.get(page, ['course', 'home', data_table.hashes()[i].page_object]);
// await pages.undefined.populate('PAGE',  data_table.hashes()[i].value);
// //   }
// await pages.home.click('generate_access_code');
// await pages.home.click('export_list');
// // });

// // When('I assign the activities in courseplanner', async function (data_table) {

// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     let Elements = await qa.getArray(page.course.course_planner.assign_assignment_button);
// //     await qa.sleep(config.sleep);
// //     let countlinks = Elements.length;
// //     let x = countlinks - 1;
// //     while (x >= 0) {
// //       x--;
// await pages.course_planner.click('assign_assignment_button');
// await pages.course_planner.click('vissibility_button');
// //       await qa.sleep();
// await pages.course_planner.populate('points_input',  data_table.hashes()[i].Points);
// //       await qa.sleep();
// await pages.course_planner.click('assign_button');
// await pages.home.click('close_alert');
// //       break;
// //     }
// //     await qa.sleep();
// //   }
// // });

// // Then('I verify the status of activities', async function (data_table) {

// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     await qa.getAttribute(page.course.course_planner.activity_status, data_table.hashes()[i].verify);
// //   }
// // });

// // When('I attempt the Questions in quiz', async function (data_table) {

// //   for (let i = 0; i < data_table.rows().length; i++) {
// await pages.student_activity.click('multiple_choice');
// await pages.course.populate('student_activity',  data_table.hashes()[i].Explanation);
// await pages.student_activity.click('save_answer');
// await pages.student_activity.click('question_2');
// await pages.student_activity.click('multiple_choice');
// await pages.course.populate('student_activity',  data_table.hashes()[i].Explanation);
// await pages.student_activity.click('save_answer');
// await pages.student_activity.click('question_3');
// await pages.student_activity.click('multiple_choice');
// await pages.course.populate('student_activity',  data_table.hashes()[i].Explanation);
// await pages.student_activity.click('save_answer');
// await pages.student_activity.click('question_4');
// await pages.student_activity.click('multiple_choice');
// await pages.course.populate('student_activity',  data_table.hashes()[i].Explanation);
// await pages.student_activity.click('save_answer');
// await pages.student_activity.click('question_5');
// await pages.student_activity.click('submit_all_questions');
// //   }
// // });

// // When('I click on reading activity', async function (data_table) {

// await pages.create_course.click('course_card');
// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     let activityName = await qa.getText(page.course.overview.Activity_link);
// //     if (activityName === data_table.hashes()[i].activity) {
// await pages.overview.click('Activity_link');
// //     }
// //   }
// // });

// // Then('I verify reading activity has content to read', async function (data_table) {

// //   await qa.switchFrame(page.course.overview.frame_1_reading);
// //   await qa.switchFrame(page.course.overview.frame_2_reading);
// //   await qa.switchFrame(page.course.overview.frame_3_reading);
// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     await qa.getAttribute(page.course.overview.reading_verification, data_table.hashes()[i].activity);
// //   }
// // });

// // When('I attempt learning curve activity', async function (data_table) {

// await pages.create_course.click('course_card');
// //   for (let i = 0; i < data_table.rows().length; i++) {
// //     let activityName = await qa.getText(page.course.overview.learning_curve_activity);
// //     if (activityName === data_table.hashes()[i].activity) {
// await pages.overview.click('learning_curve_activity');
// await pages.overview.click('Begin_activity');
// //       let answerText = await qa.getText(page.course.student_activity.sentence_click_lc);
// //       console.log('answerText' + answerText)

// //       while (true) {
// //         if (await qa.isDisplayed(page.course.student_activity.quiz_complete) === true) {
// await pages.student_activity.click('back_to_study_plan');
// //         } else {
// //           let jsonObject = await qa.getText(page.course.student_activity.activity_Question);
// //           let split = jsonObject.split('}')[0] + '}';
// //           let finalResult = JSON.parse(split);
// //           console.log(finalResult);
// //           console.log(finalResult.Id);
// //           let answerKey = page.result.questions[finalResult.Id]
// //           console.log('key:' + answerKey);
// //           console.log(answerKey.Type);
// //           console.log(answerKey.Answer);
// //           let answerText = await qa.getText(page.course.page.course.student_activity.sentence_click_lc);
// //           console.log('answerText' + answerText)
// //           switch (answerKey.Type) {
// //             case 'SC':
// //               console.log('entered sc')
// //               let answerText = await qa.getText(page.course.page.course.student_activity.sentence_click_lc);
// //               console.log('answerText' + answerText)
// await pages.student_activity.populate('sentence_click_lc',  answerKey.Answer);
// //               await qa.sleep();
// await pages.student_activity.click('next_question');
// //               break;
// //             case 'MC':
// //               console.log('enteres Mc')
// await pages.student_activity.populate('multiple_choice',  answerKey.Answer);
// await pages.student_activity.click('submit_button');
// //               await qa.sleep();
// await pages.student_activity.click('next_question');
// //               break;
// //             case 'FB':
// //               console.log('entered fb')
// await pages.student_activity.populate('fill_blank_lc',  answerKey.Answer);
// await pages.student_activity.click('submit_button');
// //               await qa.sleep();
// await pages.student_activity.click('next_question');
// //               break;
// //           }
// //         }
// //       }
// //     }
// //   }
// // });

// // When('I attempt Read and Practice activity', async function (data_table) {

// await pages.create_course.click('course_card');
// //   for (let i = 0; i < data_table.rows().length; i++) {
// await pages.student_activity.click('student_rp_activity');
// //     let elements = await qa.getArray(page.course.student_activity.reading_topics);
// //     for (let x = 0; x < elements.length; x++) {
// //       let element = elements[i];
// //       await qa.sleep(config.sleep);
// await pages.undefined.click('element');
// //     }
// //   }
// // });

// When('I generate and export course report', async function () {
//   await pages.home.click('toggler_menu');
//   await pages.user.click('admin');
//   await pages.admin_menu.click('course_report')
//   await pages.admin_menu.click('generate_report');
//   await pages.admin_menu.click('export_report');
// });

// Then('I verify the report has the following columns', async function (dataTable) {
//   let CSVFile = this.downloadLocation + `/course_report_${formatDate(new Date(), 'mmm-dd-yyyy')}.csv`;
//   var jsonData = await csvToJson().fromFile(CSVFile);
//   var actualColumnNames = [];

//   for(var key in jsonData[Object.keys(jsonData)[0]]){
//     actualColumnNames.push(key);
//   }
//   console.log(`Column names in CSV file --> ${actualColumnNames}`);

//   for (let i = 0; i < dataTable.rows().length; i++) {
//     let expectedColumnName = dataTable.hashes()[i].ColumnName.trim();
//     expect(expectedColumnName).to.be.oneOf(actualColumnNames);
//   }
// });