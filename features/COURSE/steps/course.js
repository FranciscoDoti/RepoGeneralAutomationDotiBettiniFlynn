const {When, Then} = require('cucumber');
const _ = require('lodash');

Then('I verify the following information is present', async function (data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let create_account_element = await _.get(page, ['iam', 'create_account', data_table.hashes()[i].page_object]);
    await qa.exists(create_account_element, 5000);
  }
});

When('I fill the form to create account', async function (data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let create_account_element = await _.get(page, ['iam', 'create_account', data_table.hashes()[i].page_object]);
    await qa.input(create_account_element, data_table.hashes()[i].value);
  }
  await qa.click(page.iam.create_account.terms_of_service);
  await qa.click(page.iam.create_account.signup_btn);
});

Then(/^I verify email notification is sent to "(.*)" user "(.*)" password$/, async function (user, password) {
  let qa = new selenium(this.deiver);
  await imap.connectClient(user, password, 'registration');
});

Then('I verify Manage roles is displayed', async function (data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'admin_menu', data_table.hashes()[i].page_def]);
    await qa.exists(PAGE, 5000);
    // let enable = await _.get(page, ['course', 'admin_menu', data_table.hashes()[i].disabled]);
    // await qa.isEnabled(enable, 5000);
  }
})

When(/^I revoke "(.*)" of "(.*)"$/, async function (role, users) {
  let qa = new selenium(this.driver);
  let payload = require(`../../_data/user/${config.environment}/${users}.json`);
  await qa.sleep();
  await qa.input(page.course.admin_menu.manage_role_email_input, payload.username);
  await qa.input(page.course.admin_menu.manage_role_select_list, role);
  await qa.click(page.course.admin_menu.revokerole);
});

When(/^I grant "(.*)" to the "(.*)"$/, async function (role, users) {
  let qa = new selenium(this.driver);
  let payload = require(`../../_data/user/${config.environment}/${users}.json`);
  await qa.sleep();
  await qa.input(page.course.admin_menu.manage_role_email_input, payload.username, 'clear');
  await qa.input(page.course.admin_menu.manage_role_select_list, role);
  await qa.click(page.course.admin_menu.grantrole);
});

When('I create custom made activity', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.course_page.course_planner);
  await qa.click(page.course.course_planner.custom_content_button);
  await qa.click(page.course.course_planner.New_custom);
  await qa.click(page.course.course_planner.assessment_button);
  await qa.sleep(config.sleep);
  await qa.switchFrame(0);
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'course_planner', data_table.hashes()[i].activity]);
    await qa.input(PAGE, data_table.hashes()[i].value);
  }
  await qa.click(page.course.course_planner.reset_model);
  await qa.click(page.course.course_planner.Question_bank);
  await qa.sleep(config.sleep);
  await qa.click(page.course.course_planner.Check_box_assignment);
  await qa.click(page.course.course_planner.Add_assignment_button);
  await qa.back();
  await qa.back();
  await qa.back();
});

Then(/^I verify that custom made "(.*)" is added $/, async function (identifier) {
  let qa = new selenium(this.driver);
  await qa.exists(page.course.course_planner.custom_activity_validation, identifier);
});

When('I add custom made activities in courseplanner', async function (data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    await qa.click(page.course.course_planner.custom_content_button);
    await qa.click(page.course.course_planner.your_activity);
    await qa.input(page.course.course_planner.library_search_input, data_table.hashes()[i].activity, 'clear', 'enter_after');
    await qa.click(page.course.course_planner.library_search_input);
    await qa.click(page.course.course_planner.add_custom_activity);
    await qa.click(page.course.course_planner.close_courseplanner);
  }
});

When(/^I click on "(.*)" system "(.*)" feature "(.*)" element and grant roles$/, async function (system, feature, element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  await qa.click(page.course.home.toggler_menu);
  await qa.sleep()
  await qa.click(page.course.user.admin);
  await qa.sleep();
  await qa.click(PAGE);
});

When('I select template and create course with following details', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.create_course.plus_button);
  await qa.click(page.course.create_course.template);
  await qa.click(page.course.create_course.create_course);
  await qa.sleep(config.sleep);
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      let PAGE = await _.get(page, ['course', 'create_course', data_table.hashes()[i].page_object]);
      await qa.input(PAGE, data_table.hashes()[i].value, data_table.hashes()[i].clear);
    } else {
      let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
      await qa.click(page_format);
    }
  }
});

When('I generate access code', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.sleep(config.sleep);
  await qa.click(page.course.create_course.course_card);
  await qa.sleep();
  await qa.click(page.course.home.toggler_menu);
  await qa.sleep();
  await qa.click(page.course.user.admin);
  await qa.sleep();
  await qa.click(page.course.admin_menu.create_access_code);
  await qa.sleep(config.sleep);
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'home', data_table.hashes()[i].page_object]);
    await qa.input(PAGE, data_table.hashes()[i].value, 'clear');
  }
  await qa.click(page.course.home.generate_access_code);
  await qa.click(page.course.home.export_list);
});

When('I assign the activities in courseplanner', async function (data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let Elements = await qa.getArray(page.course.course_planner.assign_assignment_button);
    await qa.sleep(config.sleep);
    let countlinks = Elements.length;
    let x = countlinks - 1;
    while (x >= 0) {
      x--;
      await qa.click(page.course.course_planner.assign_assignment_button);
      await qa.click(page.course.course_planner.vissibility_button);
      await qa.sleep();
      await qa.input(page.course.course_planner.points_input, data_table.hashes()[i].Points);
      await qa.sleep();
      await qa.click(page.course.course_planner.assign_button);
      await qa.click(page.course.home.close_alert);
      break;
    }
    await qa.sleep();
  }
});

Then('I verify the status of activities', async function (data_table) {
  let qa = new selenium(this.driver)
  for (let i = 0; i < data_table.rows().length; i++) {
    await qa.getAttribute(page.course.course_planner.activity_status, data_table.hashes()[i].verify);
  }
});

When('I attempt the Questions in quiz', async function (data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    await qa.click(page.course.student_activity.multiple_choice);
    await qa.input(page.course.student_activity, data_table.hashes()[i].Explanation);
    await qa.click(page.course.student_activity.save_answer);
    await qa.click(page.course.student_activity.question_2);
    await qa.click(page.course.student_activity.multiple_choice);
    await qa.input(page.course.student_activity, data_table.hashes()[i].Explanation);
    await qa.click(page.course.student_activity.save_answer);
    await qa.click(page.course.student_activity.question_3);
    await qa.click(page.course.student_activity.multiple_choice);
    await qa.input(page.course.student_activity, data_table.hashes()[i].Explanation);
    await qa.click(page.course.student_activity.save_answer);
    await qa.click(page.course.student_activity.question_4);
    await qa.click(page.course.student_activity.multiple_choice);
    await qa.input(page.course.student_activity, data_table.hashes()[i].Explanation);
    await qa.click(page.course.student_activity.save_answer);
    await qa.click(page.course.student_activity.question_5);
    await qa.click(page.course.student_activity.submit_all_questions);
  }
});

When('I click on reading activity', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.create_course.course_card);
  for (let i = 0; i < data_table.rows().length; i++) {
    let activityName = await qa.getText(page.course.overview.Activity_link);
    if (activityName === data_table.hashes()[i].activity) {
      await qa.click(page.course.overview.Activity_link);
    }
  }
});

Then('I verify reading activity has content to read', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.switchFrame(page.course.overview.frame_1_reading);
  await qa.switchFrame(page.course.overview.frame_2_reading);
  await qa.switchFrame(page.course.overview.frame_3_reading);
  for (let i = 0; i < data_table.rows().length; i++) {
    await qa.getAttribute(page.course.overview.reading_verification, data_table.hashes()[i].activity);
  }
});

When('I attempt learning curve activity', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.create_course.course_card);
  for (let i = 0; i < data_table.rows().length; i++) {
    let activityName = await qa.getText(page.course.overview.learning_curve_activity);
    if (activityName === data_table.hashes()[i].activity) {
      await qa.click(page.course.overview.learning_curve_activity);
      await qa.click(page.course.overview.Begin_activity);
      let answerText = await qa.getText(page.course.student_activity.sentence_click_lc);
      console.log('answerText' + answerText)

      while (true) {
        if (await qa.isDisplayed(page.course.student_activity.quiz_complete) === true) {
          await qa.click(page.course.student_activity.back_to_study_plan);
        } else {
          let jsonObject = await qa.getText(page.course.student_activity.activity_Question);
          let split = jsonObject.split('}')[0] + '}';
          let finalResult = JSON.parse(split);
          console.log(finalResult);
          console.log(finalResult.Id);
          let answerKey = page.result.questions[finalResult.Id]
          console.log('key:' + answerKey);
          console.log(answerKey.Type);
          console.log(answerKey.Answer);
          let answerText = await qa.getText(page.course.page.course.student_activity.sentence_click_lc);
          console.log('answerText' + answerText)
          switch (answerKey.Type) {
            case 'SC':
              console.log('entered sc')
              let answerText = await qa.getText(page.course.page.course.student_activity.sentence_click_lc);
              console.log('answerText' + answerText)
              await qa.input(page.course.student_activity.sentence_click_lc, answerKey.Answer);
              await qa.sleep();
              await qa.click(page.course.student_activity.next_question);
              break;
            case 'MC':
              console.log('enteres Mc')
              await qa.input(page.course.student_activity.multiple_choice, answerKey.Answer);
              await qa.click(page.course.student_activity.submit_button);
              await qa.sleep();
              await qa.click(page.course.student_activity.next_question);
              break;
            case 'FB':
              console.log('entered fb')
              await qa.input(page.course.student_activity.fill_blank_lc, answerKey.Answer);
              await qa.click(page.course.student_activity.submit_button);
              await qa.sleep();
              await qa.click(page.course.student_activity.next_question);
              break;
          }
        }
      }
    }
  }
});

When('I attempt Read and Practice activity', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.create_course.course_card);
  for (let i = 0; i < data_table.rows().length; i++) {
    await qa.click(page.course.student_activity.student_rp_activity);
    let elements = await qa.getArray(page.course.student_activity.reading_topics);
    for (let x = 0; x < elements.length; x++) {
      let element = elements[i];
      await qa.sleep(config.sleep);
      await qa.click(element);
    }
  }
});

When('I generate and export course report', async function () {
  await pages.home.click('toggler_menu');
  await pages.user.click('admin');
  await pages.admin_menu.click('course_report')
  await pages.admin_menu.click('generate_report');
  await pages.admin_menu.click('export_report');
});

Then('I verify the report has the following columns', async function (data_table) {
  var today = new Date();
  var year = today.getFullYear()
  var date = ('0' + today.getDate());
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var month = monthNames[today.getMonth()];

  let CSVFile = this.downloadLocation + `/features/reports/download/course_report_${month}-${date}-${year}.csv`;
  const csv = require('csvtojson')
  csv()
    .fromFile(CSVFile)
    .then((jsonObj) => {
      for (let e = 0; e < jsonObj.length; e++) {
        let row = jsonObj[e];
        for (let i = 0; i < data_table.rows().length; i++) {
          let columnName = row.hasOwnProperty(data_table.hashes()[i].ColumnNames);
          expect(columnName).to.be.oneOf(columnName);
        }
      }
    });
});