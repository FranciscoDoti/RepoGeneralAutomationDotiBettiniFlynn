
const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const assert_text = require('../../../features/master-text.js');
const expect = require('chai').expect;

/* Creating a new AMS raptor item for different Eval types: Relation, Expression, Point, Interval, Vector, Parametric */


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

When(/^I set the grade as "(.*)" type, with "(.*)", "(.*)", "(.*)" and input "(.*)"$/, async function (eval, endpoints, upperTolerance, lowerTolerance, eqn) {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.correctTab);
  await qa.input(page.math.raptorAms.gradeAs, eval);
  await qa.click(page.math.raptorAms.gradeAs);
  await qa.sendKeys(page.math.raptorAms.equationField, eqn);

  // by default the endpoints checkbox is checked for Interval equation
  
  if(endpoints === "unchecked") {
    await qa.click(page.math.raptorAms.enforceEndpoints);
  } 

  // Assumes Author always passes valid inputs -- 
  // either both tolerance limits have numeric values OR at the least one tolerance limit has numeric value with other empty
    
  if(upperTolerance || lowerTolerance){
    await qa.click(page.math.raptorAms.toleranceNumeric);
    await qa.input(page.math.raptorAms.tolerancePlus, tolplus)
    await qa.input(page.math.raptorAms.toleranceMinus, tolminus)
   }

   });

Then(/^I save the question and verify saving message box$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.saveButton);
  
  // added Save modal message box for verification
  
  const msg = await qa.getText(page.math.raptorAms.saveMessage);
  expect(msg).to.equal(assert_text.math.messageWindow);
 
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

    // json objects cannot have certain symbols as keys (+,∪ etc.)
    // so the keys are substituted with actual words
    
    const exp = token === '+' ? 'add' : token === ',' ? 'comma' : token === '∪' ? 'union' : token

    // Note: the calculator palette is going through new requirement changes 
    // and there will be a task to update Answer text field with unique id
    // if a comma is encountered in the equation, the rightArrow key is sent before the comma
    // this is required because the Math component is expecting a comma to signify the end of partial equation
    // also the below logic with 2 right and left key arrows was implemented to disable closing right brackets 
    // that is auto triggered by the app after the expression

    if(exp === 'comma') {
      await qa.click(page.math.paletteBasic.rightArrow);
      await qa.click(page.math.paletteBasic.rightArrow);
      await qa.click(page.math.paletteBasic.leftArrow)
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