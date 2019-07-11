const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
Given(/^I search for "(.*)" course$/, async function (input) {
  await pages.courseList.populate('search', input);
});

When('I close the popup message', async function () {
  await pages.home.click('closeAlert');
});
When('I click on course card', async function () {
  await pages.createCourse.click('courseCard');
});

When('I click on resource tab', async function () {
  await pages.coursePage.click('resources');
});
When('I click on home button to return to coursepage', async function () {
  await pages.home.click('achieveHome');
});

When(/^I click on search button and input "(.*)" to search the course$/, async function (CourseName) {
  await pages.courseList.populate('search', CourseName);
  await pages.createCourse.assertElementExists('courseCard', CourseName)
});
When('I verify that Quantitative Template{int} has created with the following data', function (int) {
});

When('I delete the courses', async function () {
  let elements = await pages.createCourse.getWebElements('courseCard');
  for (let x = 0; x <= elements.length; x++) {
    await pages.courseList.click('courseMenu');
    await pages.main.click('deleteCourse');
  }
});

When(/^I attempt "(.*)" learning curve activity$/, async function (activityName, data_table) {
  await pages.overview.click('activityName', activityName);
  await pages.overview.click('beginActivity');
  for (let i = 0; i < data_table.rows().length; i++) {
    while (true) {
      let assert = await pages.studentActivity.checkWebElementExists('quizComplete')
      if (assert === true) {
        await pages.studentActivity.click('backToStudyPlan');
      } else {
        let jsonObject = await pages.studentActivity.getText('activityQuestion');
        let split = jsonObject.split('}')[0] + '}';
        let finalResult = JSON.parse(split);
        let result = require(`${process.cwd()}/features/COURSE/auto_manuscript_1551301608988.json`)
        let answerKey = result.questions[finalResult.Id]
        switch (answerKey.Type) {
          case 'SC':
            let answerChoices = await pages.studentActivity.getWebElements('sentenceClickLc')
            for (let i = 0; i < answerChoices.length; i++) {
              let answerText = await pages.studentActivity.getText('');
              console.log(answerText);

            //   let split
            //   if (answerText === true)  {
            //     await pages
            //     break
            //   }
            }
            await pages.studentActivity.click('nextQuestion');
            break;

          case 'MC':
            console.log('enteres Mc')
            let ordered = answerKey.Ordered
            let answerList = await pages.studentActivity.getWebElements('mcAnswers')
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
            await pages.studentActivity.click('submit_button');
            await pages.studentActivity.click('next_question');
            break;
          case 'FB':
            console.log('entered fb')
            await pages.studentActivity.populate('fill_blank_lc', answerKey.Answer);
            await pages.studentActivity.click('next_question');
            break;
        }
      }
    }
  }
});

Then(/^I verify that "(.*)" is created with following data$/, async function (courseName, data_table) {
  // await pages.courseList.populate('search', courseName);
  this.data.set('course',courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.courseList.assertElementExists(data_table.hashes()[i].field, data_table.hashes()[i].value);
  }
});

When(/^I add URL link to "(.*)"$/, async function (courseName, data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('resources');
  await pages.resources.click('addActivity');
  await pages.resources.click('createCustomActivity');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('urlLink');
    await pages.resources.populate(data_table.hashes()[i].field, data_table.hashes()[i].link)
    await pages.resources.click('addUrlLink');
  }
});

When('I add URL activity in resource tab', async function (data_table) {
  await pages.resources.click('goToContent');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addCCButton', data_table.hashes()[i].activity)
  }
});

