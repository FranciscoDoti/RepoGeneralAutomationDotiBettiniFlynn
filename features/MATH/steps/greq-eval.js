const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const expect = require('chai').expect;
const { Key } = require('selenium-webdriver');
const nonPalette = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "/", ",", "*", "−", "∪", "."]


/* Creating a new AMS raptor item for six Eval types: Relation, Expression, Point, Interval, Vector, Parametric */

When(/^I set Item Details name as "(.*)"$/, async function (name) {
  await pages.raptorAms.click('menuBarMore');
  await pages.raptorAms.click('moreItemDetails');
  await pages.raptorAms.populate('itemDetailsName', name);
  await pages.raptorAms.click('itemDetailsSubmit');
});

When(/^I add Math equation module$/, async function () {
  await pages.raptorAms.click('menuBarAdd');
  await pages.raptorAms.click('addMathEquation');
});

When(/^I click on the Question tab, and add an Answer field$/, async function () {
  await pages.raptorAms.click('questionContent');
  await pages.raptorAms.assertElementExists('answerLabel');
});

When(/^I set the grade as "(.*)" type, with "(.*)", "(.*)", "(.*)" and input "(.*)"$/, async function (eval, endpoints, upperTolerance, lowerTolerance, eqn) {
  await pages.raptorAms.click('correctTab');
  await pages.raptorAms.populate('mathGradeAs', eval);
  await pages.raptorAms.click('mathGradeAs');
  await pages.raptorAms.populate('mathEquationField', eqn);

  // by default the endpoints checkbox is checked for Interval equation
  if (endpoints === "unchecked") {
    await pages.raptorAms.click('mathEnforceEndpoints');
  }

  // Assumes Author always passes valid inputs -- 
  // either both tolerance limit fields have numeric input OR 
  // one of the tolerance limit field has numeric input with the other field left empty for infinite value
  if (upperTolerance || lowerTolerance) {
    await pages.raptorAms.click('mathNumericTolerance');
    await pages.raptorAms.populate('numericUpperTolerance', upperTolerance);
    await pages.raptorAms.populate('numericLowerTolerance', lowerTolerance);
  }
});

Then(/^I save the question$/, async function () {
  await pages.raptorAms.click('menuBarMore');
  await pages.raptorAms.click('moreSaveAsDraft');

});

When(/^I simulate student interface$/, async function () {
  // waits for the message box to disappear to execute next line: short cut keys for 'Check your work' mode
  await pages.raptorAms.click('menuBarMore');
  await pages.raptorAms.click('moreCheckYourWork');
});

When(/^I input the correct "(.*)"$/, async function (eqn) {
  // waits for the message box to disappear to execute next line: short cut keys for 'Check your work' mode
  // below line implements using the MacOS short cut keys 'CMD + \' for author student interface
  // replaces clicking the 'Check Your Work' from More menu
  await pages.raptorAms.click('checkYourWorkAnswerText1');

  for (let i = 0; i < eqn.length; i++) {
    let token = eqn.charAt(i);

    // for Vectors, insert '⟨' notation before start of the equation
    // for Vectors, insert '⟩' notation after end of the equation
    if (token === '⟨') {
      await pages.palette.click('langle');
    } else if (token === '⟩') {
      await pages.palette.click('rangle');
    }
    // check whether the token is in the palette or not
    else if (nonPalette.includes(token)) {
      // if token is a nonPalette character, insert the value directly into input box
      await pages.raptorAms.populate('checkYourWorkAnswerText2', Key.ENTER);

      // if a comma is encountered in the equation, the rightArrow key is sent before the comma
      // this is required because the Math component is expecting a comma to signify the end of partial equation
      // also the below logic with 2 right and left key arrows was implemented to disable closing right brackets 
      // that is auto triggered by the app after the expression
      if (token === ',') {
        await pages.palette.click('rightArrow');
        await pages.palette.click('rightArrow');
        await pages.palette.click('leftArrow');
      }
      await pages.raptorAms.populate('checkYourWorkAnswerText2', token);
    } else {
      // if token is a Palette character, click on the page object element
      await pages.palette.click(`${token}`);
    }
  }
});

When(/^I submit answer$/, async function () {
  await pages.raptorAms.click('checkYourWorkSubmit');
});

Then(/^My answer is graded correctly$/, async function () {
  await pages.raptorAms.assertElementExists('correctAnswer');
});