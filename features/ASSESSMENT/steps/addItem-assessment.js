const { Given, When, Then}=require('cucumber');
const ngaPages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const { visitURL, sleep, getTitle, getDriver} = require(`${process.cwd()}/app/driver`);
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const { assert, expect } = require('chai');


// When(/^I add the "(.*)" module$/, async function (moduleType) {
//     await mathpages.ams.click('raptorNewItem');
//     await mathpages.raptorAms.switchToTab('Raptor Authoring');
//     await mathpages.raptorAms.assertElementExists('menuBarAdd');
//     await pages.raptor.click('addLink');
//     await pages.raptor.click('modulePallete',moduleType);
//     await pages.raptor.click('contentArea');
// });

Given(/^I login to an existing course as "(.*)"$/, async function (userType){
    let url = await _.get(urls, ['IBISCMS-Roadshow', this.environment]);
    let user = await _.get(users, [this.environment, userType]);

  await visitURL(url);
  if (this.environment == 'local') {
    await pages.login.populate('username-local', user.username);
    await pages.login.populate('password-local', user.password);
    await pages.login.click('submit-local')
  } else {
    await pages.login.populate('username', user.username);
    await pages.login.populate('password', user.password);
    await pages.login.click('submit')
  };
});


Given('I create a new assessment with its necessary details', async function () {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var assessment_name = "QAAssessment" + time;
    await ngaPages.assessmentListPage.scrollElementIntoView('addAssessment');
    await assert.include(await getTitle(), "Roadshow", "Title is same!"); 
    await ngaPages.assessmentListPage.populate("addAssessment", "Assessment");
    //add asseesment details
    await ngaPages.createAssessment.populate("assessmentName", assessment_name);
    await ngaPages.createAssessment.click("saveAndContinue");
    await ngaPages.newAssessmentModal.click('assessmentModalButtons', 'assignment-create-actions-question-bank');
});


When(/^I have added "(.*)" random item to assessment$/, async function (count) {
// Write code here that turns the phrase above into concrete actions
    for (let i= 1; i <= count ; i++){
      await ngaPages.questionBank.click("QBitemsCheckbox", i);
    }
    let actionBarButtonsLabel = await ngaPages.questionBank.getWebElements('QBActionBarButtonsLabel');
    let actionBarButtons = await ngaPages.questionBank.getWebElements('QBActionBarButtons');
    for (let i = 0; i < actionBarButtonsLabel.length; i++) {
      let buttonText = await actionBarButtonsLabel[i].getText();
      if (buttonText==="ADD"){
        await actionBarButtons[i].click();
        break;
      }
    }
    await ngaPages.assignmentTab.click('AssignmentTab');
});



Then('I see the item present in the assessment', function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});