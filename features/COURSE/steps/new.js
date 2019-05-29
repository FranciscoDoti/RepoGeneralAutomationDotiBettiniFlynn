const { Given, When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);

Given(/^I search for "(.*)" course$/, async function (input) {
  await pages.course_list.populate('search', input);
});

When('I close the popup message', async function () {
  await pages.home.click('close_alert');
});
When('I click on course card', async function () {
  await pages.create_course.click('course_card');
});

When('I click on resource tab', async function () {
  await pages.course_page.click('resources');
});
When('I click on home button to return to coursepage', async function () {
  await pages.main.click('achieve_home');
});
When('I sign out of Achieve', async function () {
  await pages.home.click('toggler_menu');
  await pages.home.click('sign_out');
});

When(/^I click on search button and input "(.*)" to search the course$/, async function (CourseName) {
  await pages.course_list.populate('search', CourseName)
});

When('I complete the reading activity', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.click('overviewtab_activity', data_table.hashes()[i].activity);
    await pages.overview.getAttributeValue('reading_verification', data_table.hashes()[i].activity);
  }
});

Then('I verify the activity status for the following activities', async function (data_table) {
  let elements = await pages.overview.getWebelements('overviewtab_activity_verification');
  for (let x = 0; x <= elements.length; x++) {
    for (let i = 0; i < data_table.rows().length; i++) {
      let verify = await pages.overview.assertTextinclude('overviewtab_activity_verification', data_table.hashes()[i].activity)
      if (verify == true) {
        await pages.overview.assertTextinclude('complete_status', data_table.hashes()[i].status)
      }
    }
  }
});

When('I delete the courses', async function () {
  let elements = await pages.create_course.getWebelements('course_card');
  for (let x = 0; x <= elements.length; x++) {
    await pages.course_list.click('course_menu');
    await pages.main.click('delete_course');
  }
});

When(/^I attempt "(.*)" learning curve activity$/, async function (activityName, data_table) {
  await pages.overview.click('overviewtab_activity', activityName);
  await pages.overview.click('Begin_activity');
  for (let i = 0; i < data_table.rows().length; i++) {
    while (true) {
      let assert = await pages.student_activity.checkWebElementExists('quiz_complete')
      if (assert === true) {
        await pages.student_activity.click('back_to_study_plan');
      } else {
        let jsonObject = await pages.student_activity.getText('activity_Question');
        let split = jsonObject.split('}')[0] + '}';
        let finalResult = JSON.parse(split);
        let result = require(`${process.cwd()}/features/COURSE/auto_manuscript_1551301608988.json`)
        let answerKey = result.questions[finalResult.Id]
        switch (answerKey.Type) {
          case 'SC':
            let answerChoices = await pages.student_activity.getWebElements('sentence_click_lc')
            for (let i = 0; i < answerChoices.length; i++) {
              let answerText = await pages.student_activity.getText('');
              console.log(answerText);

            //   let split
            //   if (answerText === true)  {
            //     await pages
            //     break
            //   }
            }
            await pages.student_activity.click('next_question');
            break;

          case 'MC':
            console.log('enteres Mc')
            let ordered = answerKey.Ordered
            let answerList = await pages.student_activity.getWebElements('mc_answers')
            for (let i = 0; i < answerList.length; i++) {
              let text = await answerList[i].getText()
              if (ordered) {
                assertTextIncludes(i.toString()) > -1, 'The index was not correct. \n Expected: ' + i + '\nActually: ' + text.charAt(text.length - 1)
              }
              if (assertTextIncludes(answer)) {
                await answerList[i].click()
                break
              }
            }
            await pages.student_activity.click('submit_button');
            await pages.student_activity.click('next_question');
            break;
          case 'FB':
            console.log('entered fb')
            await pages.student_activity.populate('fill_blank_lc', answerKey.Answer);
            await pages.student_activity.click('next_question');
            break;
        }
      }
    }
  }
});

When(/^I attempt "(.*)" premade assesment in "(.*)"$/, async function (activityName, courseName, data_table) {
  await pages.create_course.click('course_card', courseName);
  await pages.course_page.click('overview')
  await pages.overview.click('overviewtab_activity', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.student_activity.click('multiple_choice_assesment', data_table.hashes()[i].PremadeAssesmentKey);
    await pages.student_activity.click('save_answer');
    await pages.student_activity.click('Next_assesment_question');
  }
  await pages.course_planner.click('close_assesment')
});

When(/^I attempt "(.*)" custom made assesment in "(.*)"$/, async function (activityName, courseName, data_table) {
  await pages.course_page.click('overview')
  await pages.overview.click('overviewtab_activity', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.student_activity.click('multiple_choice_assesment', data_table.hashes()[i].key);
    await pages.student_activity.click('save_answer');
    await pages.student_activity.click('Next_assesment_question');
  }
  await pages.course_planner.click('close_assesment')
});

Then('I verify the assignmenent grades in gradebook for below assigned activities', async function (data_table) {
  await pages.course_page.click('gradebook');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.gradebook.assertTextinclude('studentPercent', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextinclue('studentAssignmentpoints', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextinclude('studentPercenOfTotalGrades', data_table.hashes()[i].activity, data_table.hashes()[i].PercentOfTotalgrades)
  }
});

Then(/^I verify that "(.*)" message is displayed$/, async function (message) {
  await pages.home.assertTextinclude('close_alert', message);
});

Then(/^I verify that "(.*)" has created with following "(.*)" number$/, async function (courseName, verifyNumber) {
  await pages.home.assertTextinclude('ISBNVerification', courseName, verifyNumber);
});

When(/^I create "(.*)" with the data$/, async function (courseName, data_table) {
  await pages.create_course.click('button');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.create_course.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
    } else {
      await pages.create_course.click('select_day', data_table.hashes()[i].value);
    }
  }
  await pages.create_course.click('save');
});

When(/^I click on "(.*)"$/, async function (courseName) {
  await pages.create_course.click('course_card', courseName);
});

When(/^I search for "(.*)" and click on course card$/, async function (courseName) {
  await pages.course_list.populate('search', courseName);
  await pages.course_list.assertElementExists('course_name', courseName);
  await pages.create_course.click('course_card', courseName);
});
