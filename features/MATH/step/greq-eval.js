
const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const assert_text = require('../../../features/master-text.js');
const expect = require('chai').expect;
const _ = require('lodash');


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
  await qa.exists(page.math.raptorAms.answerLabel);
});

When(/^I set the grade as "(.*)" type and input "(.*)"$/, async function (eval, eqn) {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.correctTab);
  await qa.input(page.math.raptorAms.gradeAs, eval);
  await qa.click(page.math.raptorAms.gradeAs);
  await qa.sendKeys(page.math.raptorAms.equationField, eqn);
});

Then(/^I save the question and verify saving message box$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.saveButton);
  // added Save modal message box for verification
  let getmssg = await qa.getText(page.math.raptorAms.saveMessage);
  expect(getmssg).to.equal(assert_text.math.messageWindow);
  // the automation is too fast and tries to click Take-mode element before element is present
  // tried the exists, isEnabled frame work functions
  // as last resort added 1 sec sleep after save
  await qa.sleep(1);
});

When(/^I am in Take Mode and input the correct "(.*)"$/, async function (eqn) {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.takeModeButton);
  await qa.click(page.math.raptorAms.takeModeAnswerText1);
  for (let i = 0; i< eqn.length; i++) {
    // each char (token) in the equation is a key in the paletteBasic json object
    const token = eqn.charAt(i);
    // json objects cannot have certain symbols as keys (+,- etc.)
    // so the keys are substituted with actual words
    const exp = token === '+' ? 'add' : token === ',' ? 'comma' : token === '-' ? 'subtract' : token
    // if a comma is encountered in the equation, the rightArrow key is sent before the comma
    // this is required because the Math component is expecting a comma to signify the end of partial equation
    // Note: the calculator palette is going through new requirement changes 
    // and there will be a task to update Answer text field with unique id
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
  await qa.exists(page.math.raptorAms.correctAnswer);
});