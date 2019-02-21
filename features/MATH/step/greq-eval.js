
const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');


/* Creating a new AMS raptor item for different Eval types: Relation, Expression, Point */


When(/^I select Graded equation and save as "(.*)"$/, async function (name) {
  let qa = new selenium(this.driver);
  await qa.input(page.math.raptorAms.titleName, name, true);
  await qa.click(page.math.raptorAms.moduleTab);
  await qa.click(page.math.raptorAms.gradedEquationButtonlink);
  await qa.exists(page.math.raptorAms.questionTab);
});

When(/^I click on the Question tab, and add an Answer field$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.questionContent);
});

When(/^I set the grade as "(.*)" type and input "(.*)"$/, async function (eval, eqn) {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.correctTab);
  await qa.input(page.math.raptorAms.gradeAs, eval);
  await qa.click(page.math.raptorAms.gradeAs);
  await qa.sendKeys(page.math.raptorAms.equationField, eqn);
});

When(/^I save the question$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.saveButton);
  // have to add sleep after save as wait time within click function is not helping
  // one technique is to verify the "Save popup" appeared and disappeared
  await qa.sleep(1);
});

When(/^I am in Take Mode and input the correct "(.*)"$/, async function (eqn) {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.takeModeButton);
  await qa.click(page.math.raptorAms.takeModeAnswerText1);
  for (let i = 0; i< eqn.length; i++) {
    const token = eqn.charAt(i);
    const exp = token === '+' ? 'add' : token === ',' ? 'comma' : token === '-' ? 'subtract' : token
    if(exp === 'comma') {
       await qa.click(page.math.paletteBasic.rightArrow);
    }
    await qa.click(page.math.paletteBasic[exp]);
  }
});

When(/^I simulate grading$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.simulateButton);
});

Then(/^My answer is graded correctly$/, async function () {
  let qa = new selenium(this.driver);
  await qa.doesNotExist('div#primary-content-area > section.red-border', 1000);
});