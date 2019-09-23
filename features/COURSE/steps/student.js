const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const Pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const csvtojson = require('csvtojson');
const { getDriver, onWaitForElementToBeInvisible,sleep } = require(`${process.cwd()}/app/driver`);
const { assert, expect } = require('chai');
const IAMpages = require(`${process.cwd()}/features/IAM/pages/.pages.js`).pages;
const shared = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;

When('I complete the reading activity', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.click('activityName', data_table.hashes()[i].activity);
  }
  await pages.coursePlanner.click('close');
});

Then(/^I verify the activity status for the following activities in "(.*)"$/, async function (Tab, data_table) {
  await pages.coursePage.click('tab',Tab);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.assertTextIncludes('activityStatus', data_table.hashes()[i].activity, data_table.hashes()[i].status);
  }
});

When('I delete the courses', async function () {
  let elements = await pages.createCourse.getWebElements('courseCard');
  for (let x = 0; x <= elements.length; x++) {
    await pages.courseList.click('courseMenu');
    await pages.main.click('confirmDelete');
  }
});

When(/^I attempt "(.*)" premade assesment in "(.*)"$/, async function (activityName, courseName, data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('tab', 'ASSIGNMENTS')
  await pages.overview.click('activityName', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.studentActivity.click('assesmnetAnswer', data_table.hashes()[i].PremadeAssesmentKey);
    await pages.studentActivity.click('saveAnswer');
    await pages.studentActivity.click('nextAssesmentQuestion');
  }
  await pages.coursePlanner.click('close')
});

When(/^I attempt "(.*)" custom made assesment in "(.*)"$/, async function (activityName, courseName, data_table) {
  await pages.coursePage.click('overview')
  await pages.overview.click('activityName', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.studentActivity.click('assesmnetAnswer', data_table.hashes()[i].key);
    await pages.studentActivity.click('saveaAswer');
    await pages.studentActivity.click('nextAssesmentQuestion');
  }
  await pages.coursePlanner.click('close')
});


Then('I verify the assignmenent grades in gradebook for below assigned activities', async function (data_table) {
  await pages.coursePage.click('navigation','Gradebook');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.gradebook.assertTextIncludes('studentPercent', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextIncludes('studentAssignmentpoints', data_table.hashes()[i].activity, data_table.hashes()[i].points);
    await pages.gradebook.assertTextIncludes('studentPercenOfTotalGrades', data_table.hashes()[i].activity, data_table.hashes()[i].PercentOfTotalgrades)
  }
});

When(/^I enroll "(.*)" in the course using "(.*)"$/, async function (userType, courseName){
<<<<<<< HEAD
  await pages.createCourse.getText('courseShortId');
  let user = this.users[userType];
  let text = await pages.createCourse.getText('courseShortId');
  await Pages.login.click('togglerMenu');//togglerMenu is marked as undefined
  await Pages.login.click('signOut');
  await Pages.login.click('signinlink');
  await Pages.login.populate('username', user.username);
  await Pages.login.populate('password', user.password);
  await Pages.login.click('signin');
=======
  await pages.createCourse.getText('courseShortId', courseName);
  let user = this.users[userType];
  let text = await pages.createCourse.getText('courseShortId', courseName);
  await shared.login.click('togglerMenu');
  await shared.login.click('signOut');
  await shared.login.click('signinlink');
  await shared.login.populate('username', user.username);
  await shared.login.populate('password', user.password);
  await shared.login.click('signin');
>>>>>>> 07d44bb963883385d71649003a2f585f51dadf99
  await pages.coursePage.click('enroll');
  await pages.coursePage.populate('accessModelInput', text);
  await pages.coursePage.click('enter');
  let courseReport = `${this.downloadLocation}/achieveaccesscode_${courseName}.csv`;
  const data = await csvtojson().fromFile(courseReport);
  await pages.coursePage.populate('accessModelInput', data[0]["Access Code"]);
  await pages.coursePage.click('enter');
  await pages.coursePage.click('finishEnrollement');
});

When(/^I attempt "(.*)" Learning curve activity$/, async function (activityName){
  await pages.overview.click('activityName', activityName);
  await pages.overview.assertElementExists('beginActivity');
  await pages.overview.click('beginActivity');
      while(true){
      let scoreFinal = await pages.overview.getText('score')
      let x = eval(scoreFinal)
      let y = eval(610/600)
      let z = eval(325/600)
      let a = eval(300/600)
        if(x < y){
         
        let jsonObject = await pages.overview.getText('activityQuestion');
        let split = jsonObject.split('}')[0] + '}';
        console.log(split);
        let finalResult = JSON.parse(split);
        console.log(finalResult.Id);
        let result = require(`${process.cwd()}/features/shared/data/auto_manuscript_1551301608988.json`)
        let answerKey = result.questions[finalResult.Id]
        // console.log(answerKey);
        // console.log(answerKey.Type);
        let answer = answerKey.Answer
        switch (answerKey.Type) {
          case 'SC':
          console.log('Entered SC') 
            let answerChoices = await pages.overview.getWebElements('sentenceClickLc')
            console.log(answerChoices.length);
              for await(let choice of answerChoices) {
                let text = await choice.getText()
              if (text.includes(answer)) {
                await choice.click()
                break;
              }
            }
            await pages.overview.assertElementExists('nextQuestion')
            await pages.overview.click('nextQuestion');
            break

          case 'MC':
          console.log('Entered MC') 
            let ordered = answerKey.Ordered
            let answerList = await pages.overview.getWebElements('mcAnswers')
            for (let i = 0; i < answerList.length; i++) {
              let text = await answerList[i].getText()
              if (ordered) {
                assert(text.includes(i.toString()) > -1, 'The index was not correct. \n Expected: ' + i + '\nActually: ' + text.charAt(text.length - 1))
              }
              if (text.includes(answer)) {
                await answerList[i].click()
                break
              }
            }
            await pages.overview.click('submitButton');
            await pages.overview.click('nextQuestion');
            break;
          case 'FB':
          console.log('Entered FB')
            await pages.overview.populate('fillInTheBlank', answerKey.Answer);
            await pages.overview.click('submitButton');
            await pages.overview.click('nextQuestion');
            break
        }
      console.log('there is more'+(x-1) + "more to run")

      }
     if (x >= y){
       await pages.overview.assertElementExists('backToStudyPlan');
       await pages.overview.click('backToStudyPlan');
       break;
     }
    }
});

When(/^I attempt "(.*)" Read and Practice activity$/, async function (activityName) {
  await pages.overview.click('activityName', activityName);
  let answerChoices = await pages.overview.getWebElements('checkBox')
  for await(let choice of answerChoices) {
    await choice.click();
    break;
  }
 
});

When('I add the activities to the resource tab', async function (data_table) {
  await pages.resources.click('goToContent');
  await pages.resources.click('closeResourceSearchNav');
  await pages.resources.click('addContent');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.populate('searchBar', data_table.hashes()[i].activities);
    await pages.resources.assertElementExists(data_table.hashes()[i].type, data_table.hashes()[i].activities) 
    await pages.resources.click(data_table.hashes()[i].type, data_table.hashes()[i].activities);
  }
});

When(/^I attempt "(.*)" URL activity$/, async function (activityName){
  await pages.overview.click('activityName', activityName);
  await IAMpages.signIn.switchToTab('Macmillan Learning :: ');
});

When(/^I attempt "(.*)" File activity$/, async function(activityName) {
  await pages.overview.click('activityName', activityName);
});

Then('I verify Total Grades', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.gradebook.assertTextIncludes('TotalPercentage', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextIncludes('TotalPoints', data_table.hashes()[i].activity, data_table.hashes()[i].points);
    await pages.gradebook.assertTextIncludes('TotalPercentGrades', data_table.hashes()[i].activity, data_table.hashes()[i].PercentOfTotalgrades);
  }
});
