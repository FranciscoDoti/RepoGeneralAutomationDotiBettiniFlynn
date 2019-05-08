
const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const assert_text = require('../../../features/master-text.js');
const expect = require('chai').expect;
const { Key } = require('selenium-webdriver');

/* Creating a new AMS raptor item for six Eval types: Relation, Expression, Point, Interval, Vector, Parametric */

When(/^I set Item Details name as "(.*)"$/, async function (name) {
  let qa = new selenium(this.driver);

  await qa.click(page.math.raptorAms.moreMenuBar);
  await qa.click(page.math.raptorAms.moreItemDetails);
  await qa.input(page.math.raptorAms.itemDetailsName, name, true);
  await qa.click(page.math.raptorAms.itemDetailsSubmit);
});

When(/^I add Math equation module$/, async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.math.raptorAms.addMenuBar);
  await qa.click(page.math.raptorAms.mathEquation);
});

When(/^I click on the Question tab, and add an Answer field$/, async function () {
  let qa = new selenium(this.driver);

  await qa.exists(page.math.raptorAms.questionTab);
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
  if (endpoints === "unchecked") {
    await qa.click(page.math.raptorAms.enforceEndpoints);
  }

  // Assumes Author always passes valid inputs -- 
  // either both tolerance limit fields have numeric input OR 
  // one of the tolerance limit field has numeric input with the other field left empty for infinite value
  if (upperTolerance || lowerTolerance) {
    await qa.click(page.math.raptorAms.numericTolerance);
    await qa.input(page.math.raptorAms.upperTolerancePlus, upperTolerance)
    await qa.input(page.math.raptorAms.lowerToleranceMinus, lowerTolerance)
  }
});

Then(/^I save the question and verify saving message box$/, async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.math.raptorAms.moreMenuBar);

  //added Save modal message box for verification
  const msg = await qa.getText(page.math.raptorAms.saveMessage);
  expect(msg).to.equal(assert_text.math.messageWindow);
});

When(/^I simulate student interface and input the correct "(.*)"$/, async function (eqn) {
  let qa = new selenium(this.driver);

  // waits for the message box to disappear to execute next line: short cut keys for 'Check your work' mode
  await qa.doesNotExist(page.math.raptorAms.saveMessage);

  //below line implements using the MacOS short cut keys 'CMD + \' for author student interface
  //replaces clicking the 'Check Your Work' from More menu
  await this.driver.actions().keyDown(Key.COMMAND).sendKeys('\\').keyUp(Key.COMMAND).perform();

  await qa.click(page.math.raptorAms.takeModeAnswerText1);

  for (let i = 0; i < eqn.length; i++) {
    let token = eqn.charAt(i);

    await qa.sendKeys(page.math.raptorAms.takeModeAnswerText2, Key.ENTER);

    // for Vectors, insert '⟨' notation before start of the equation
    // for Vectors, insert '⟩' notation after end of the equation

    if (token === '⟨') {
      await qa.click(page.math.palette['langle']);
    } else if (token === '⟩') {
      await qa.click(page.math.palette['rangle']);
    } 
    // check whether the token is in the palette or not
    else if (page.math.nonPalette.includes(token)) {
      // if token is a nonPalette character, insert the value directly into input box
      await qa.sendKeys(page.math.raptorAms.takeModeAnswerText2, Key.ENTER);

      // if a comma is encountered in the equation, the rightArrow key is sent before the comma
      // this is required because the Math component is expecting a comma to signify the end of partial equation
      // also the below logic with 2 right and left key arrows was implemented to disable closing right brackets 
      // that is auto triggered by the app after the expression
      if (token === ',') {
        await qa.click(page.math.palette.rightArrow);
        await qa.click(page.math.palette.rightArrow);
        await qa.click(page.math.palette.leftArrow);
      }
      await qa.sendKeys(page.math.raptorAms.takeModeAnswerText2, token);
    } else {
      // if token is a Palette character, click on the page object element
      await qa.click(page.math.palette[token]);
    }
  }
});

When(/^I submit answer$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.submitAnswer);
});

Then(/^My answer is graded correctly$/, async function () {
  let qa = new selenium(this.driver);
  await qa.exists(page.math.raptorAms.correctAnswer);
});