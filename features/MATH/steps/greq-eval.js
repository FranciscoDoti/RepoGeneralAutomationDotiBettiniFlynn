const { When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;


const expect = require('chai').expect;


/* Creating a new AMS raptor item for six Eval types: Relation, Expression, Point, Interval, Vector, Parametric */

When(/^I set Item Details name as "(.*)"$/, async function (name) {


await pages.raptorAms.click('moreMenuBar');
await pages.raptorAms.click('moreItemDetails');
await pages.raptorAms.populate('itemDetailsName',  name);
await pages.raptorAms.click('itemDetailsSubmit');
});

When(/^I add Math equation module$/, async function () {


await pages.raptorAms.click('addMenuBar');
await pages.raptorAms.click('mathEquation');
});

When(/^I click on the Question tab, and add an Answer field$/, async function () {


await pages.raptorAms.elementExists('questionTab');
await pages.raptorAms.click('questionContent');
await pages.raptorAms.elementExists('answerLabel');
});

When(/^I set the grade as "(.*)" type, with "(.*)", "(.*)", "(.*)" and input "(.*)"$/, async function (eval, endpoints, upperTolerance, lowerTolerance, eqn) {


await pages.raptorAms.click('correctTab');
await pages.raptorAms.populate('gradeAs',  eval);
await pages.raptorAms.click('gradeAs');
await pages.raptorAms.sendKeys('equationField',  eqn);

  // by default the endpoints checkbox is checked for Interval equation
  if (endpoints === "unchecked") {
await pages.raptorAms.click('enforceEndpoints');
  }

  // Assumes Author always passes valid inputs -- 
  // either both tolerance limit fields have numeric input OR 
  // one of the tolerance limit field has numeric input with the other field left empty for infinite value
  if (upperTolerance || lowerTolerance) {
await pages.raptorAms.click('numericTolerance');
await pages.raptorAms.populate('upperTolerancePlus',  upperTolerance);
await pages.raptorAms.populate('lowerToleranceMinus',  lowerTolerance);
  }
});

Then(/^I save the question and verify saving message box$/, async function () {


await pages.raptorAms.click('moreMenuBar');

  //added Save modal message box for verification
  const msg = await qa.getText(page.math.raptorAms.saveMessage);
  expect(msg).to.equal(assert_text.math.messageWindow);
});

When(/^I simulate student interface and input the correct "(.*)"$/, async function (eqn) {


  // waits for the message box to disappear to execute next line: short cut keys for 'Check your work' mode
  await qa.doesNotExist(page.math.raptorAms.saveMessage);

  //below line implements using the MacOS short cut keys 'CMD + \' for author student interface
  //replaces clicking the 'Check Your Work' from More menu

//  await pages.COMMAND).sendKeys('perform(', undefined);

await pages.raptorAms.click('takeModeAnswerText1');

  for (let i = 0; i < eqn.length; i++) {
    let token = eqn.charAt(i);

await pages.raptorAms.sendKeys('takeModeAnswerText2',  Key.ENTER);

    // for Vectors, insert '⟨' notation before start of the equation
    // for Vectors, insert '⟩' notation after end of the equation

    if (token === '⟨') {
//await pages.math.click('palette['langle']');
    } else if (token === '⟩') {
//await pages.math.click('palette['rangle']');
    } 
    // check whether the token is in the palette or not
    else if (page.math.nonPalette.includes(token)) {
      // if token is a nonPalette character, insert the value directly into input box
await pages.raptorAms.sendKeys('takeModeAnswerText2',  Key.ENTER);

      // if a comma is encountered in the equation, the rightArrow key is sent before the comma
      // this is required because the Math component is expecting a comma to signify the end of partial equation
      // also the below logic with 2 right and left key arrows was implemented to disable closing right brackets 
      // that is auto triggered by the app after the expression
      if (token === ',') {
await pages.palette.click('rightArrow');
await pages.palette.click('rightArrow');
await pages.palette.click('leftArrow');
      }
await pages.raptorAms.sendKeys('takeModeAnswerText2',  token);
    } else {
      // if token is a Palette character, click on the page object element
await pages.math.click('palette[token]');
    }
  }
});

When(/^I submit answer$/, async function () {

await pages.raptorAms.click('submitAnswer');
});

Then(/^My answer is graded correctly$/, async function () {

await pages.raptorAms.elementExists('correctAnswer');
});