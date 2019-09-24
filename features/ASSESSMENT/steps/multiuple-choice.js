const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { log } = require(`${process.cwd()}/app/logger`);

When(/^I set the number "(.*)" as the correct answwer$/, async function (correctAnswer) {
  await pages.raptor.click('Tab', 'correct');
  await pages.multipleChoice.scrollElementIntoView('Answer Radio Button ' + correctAnswer);
  await pages.multipleChoice.click('Answer Radio Button ' + correctAnswer);
});

Then('The variable values are displayed as choices', async function () {
  await pages.raptor.click('Cycle Variables Button');
  await pages.raptor.click('More Button');
  await pages.raptor.click('Save As Draft');
  let text = await pages.multipleSelect.getText('Choice Text 1');
  switch (text) {
    case "oak":
    case "pine":
    case "beech":
      log.info(`Correct value rendered "${text}". PASS`);
      break;
  }
});

When('I add hatchling item as {string} with following details', async function (string, datatable) {
  await pages.ams.click('raptorNewEasyItem');
  await pages.ams.click('easyItemMultipleChoice');
  for (let i = 0; i < datatable.rows().length; i++) {
  await pages.hatchlingItem.populate('Question Title', i + 1, datatable.hashes()[i].QuestionTitle);
  await pages.hatchlingItem.populate('Question Prompt', i + 2, datatable.hashes()[i].QuestionPrompt);
  }
});

Then(/^I verify the items were updated in AMS$/, async function () {
  
});

When('I add answers for Hatchling Multiple Choice module with following details', async function (datatable) {
  await pages.hatchlingItem.populate('MCCorrectAnswerTextbox', datatable.hashes()[0].CorrectAnswer);
  for(let i=0; i<=3;i++){
    await pages.hatchlingItem.click('addAnswerButton');
  }
    await pages.ams.populate('MCIncorrectAnswerTxtBx1', datatable.hashes()[0].IncorrectAnswer1);
    await pages.ams.populate('MCIncorrectAnswerTxtBx2', datatable.hashes()[0].IncorrectAnswer2);
    await pages.ams.populate('MCIncorrectAnswerTxtBx3', datatable.hashes()[0].IncorrectAnswer3);
   
  
 
});

When(/^I set feedback for Hatchling Multiple Choice module with following details$/, async function () {
  driver.findElements(By.className("message_body")).then(function(elements){
    elements.forEach(function (element) {
        element.getText().then(function(text){
            console.log(text);
        });
    });
});
});

When(/^I set hint and generic feedback with following details and save$/,async function () {
  
});