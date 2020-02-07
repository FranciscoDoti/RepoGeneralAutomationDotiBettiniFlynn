const { When, Then } = require('cucumber');
const { Key } = require('selenium-webdriver');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const nonPalette = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "/", ",", "*", "−", "^", "∪", "."]
const trigPalette = ["sin", "cos", "tan", "sec", "csc", "cot", "sinh", "cosh", "tanh", "sech", "csch", "coth"]

/* Creating a new AMS raptor item for six Eval types: Relation, Expression, Point, Interval, Vector, Parametric */

When(/^I set Item Details name as "(.*)"$/, async function (name) {
  await pages.raptorAms.click('menuBarMore');
  await pages.raptorAms.click('moreItemDetails');
  await pages.raptorAms.populate('itemDetailsName', name);
  await pages.raptorAms.click('itemDetailsSubmit');
});

When(/^I add Math equation module$/, async function () {
  await pages.raptorAms.click('menuBarAdd');
  await pages.raptorAms.assertElementExists('addMathEquation');
  await pages.raptorAms.click('addMathEquation');
});

When(/^I click on the Question tab, and add an Answer field$/, async function () {
  await pages.raptorAms.assertElementExists('contextTab', 'correct');
  await pages.raptorAms.click('questionContent');
  await pages.raptorAms.assertElementExists('answerLabel');
});

When(/^I set the grade as "(.*)" type, with "(.*)", "(.*)", "(.*)" and input "(.*)"$/, async function (eval, endpoints, upperTolerance, lowerTolerance, eqn) {
  await pages.raptorAms.click('contextTab', 'correct');
  await pages.raptorAms.click('correctSetup');
  await pages.raptorAms.populate('mathGradeAs', eval);
  await pages.raptorAms.populate('mathEquationField', eqn);

  // by default the endpoints checkbox is checked for Interval equation
  if (endpoints === "unchecked") {
    await pages.mathModule.click('enforceEndpoints');
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
  await pages.raptorAms.assertElementDoesNotExist('saveMessage');
  await pages.raptorAms.click('menuBarMore');
  await pages.raptorAms.click('moreCheckYourWork');
});

When(/^I input the answer "(.*)"$/, async function (eqn) {
  // waits for the message box to disappear to execute next line: short cut keys for 'Check your work' mode
  // below line implements using the MacOS short cut keys 'CMD + \' for author student interface
  // replaces clicking the 'Check Your Work' from More menu
  await pages.raptorAms.click('checkYourWorkAnswerText1');

  for (let i = 0; i < eqn.length; i++) {
    let token = eqn.charAt(i);

    // for Vectors, insert '⟨' notation before start of the equation
    // for Vectors, insert '⟩' notation after end of the equation
    if (token === '⟨') {
      await pages.palette.click('basic', 'langle');
    } else if (token === '⟩') {
      await pages.palette.click('basic', 'rangle');
    } else if (nonPalette.includes(token) || token.match(/[a-zA-Z]/)) {
      // checks whether the token is a nonPalette char or a lowercase alphabet
      // if token is a nonPalette character or a lowercase alphabet, insert the value directly into input box
      await pages.raptorAms.populate('checkYourWorkAnswerText2', Key.ENTER);

      // if a comma is encountered in the equation, the rightArrow key is sent before the comma
      // this is required because the Math component is expecting a comma to signify the end of partial equation
      // also the below logic with 2 right and left key arrows was implemented to disable closing right brackets, especially when division involved 
      // that is auto triggered by the app after the expression
      // the check for previous character not equal to ')' is introduced as the ')' is part of the equation input and not auto triggered by app. 
      if (token === ',' && eqn.charAt(i-1) !== ')') {
        await pages.palette.click('rightArrow');
        await pages.palette.click('rightArrow');
        await pages.palette.click('leftArrow');
      }
      await pages.raptorAms.populate('checkYourWorkAnswerText2', token);
    } else {
      // if token is a Basic Palette character, click on the page object element
      await pages.palette.click('basic', `${token}`);
    }
  }
});


// the code below implements using trigonometric expression using basic and trigonometric menu on palette
// future work: when I take up refactoring greq-eval.feature I should be able to combine with above step function
// 'I input the correct answer-equation'

When(/^I input the correct equation "(.*)"$/, async function (equation) {
  const eqnlist = equation.split(' ');

  await pages.raptorAms.click('checkYourWorkAnswerText1');
  for (let i = 0; i < eqnlist.length; i++) {
    const item = eqnlist[i];
    
    if (nonPalette.includes(item)) {
      // if the trigonometric expression contains a nonPalette character, insert the value directly into input box
      await pages.raptorAms.populate('checkYourWorkAnswerText2', Key.ENTER);
      await pages.raptorAms.populate('checkYourWorkAnswerText2', item);
    }
    else if (trigPalette.includes(item)) {
      // checks for the expression containing trigonometric function and clicks the palette button
      await pages.palette.click('paletteHeader');
      await pages.palette.click('paletteMenu', 'TRIGONOMETRIC');
      await pages.palette.click('trigHyperbolic', `${item}`);
    } else {
      // checks for the expression containing basic palette variables and clicks the palette button 
      await pages.palette.click('paletteMenu', 'BASIC');
      await pages.palette.click('basic', `${item}`);
      await pages.palette.click('rightArrow');
    }
  }
});

When(/^I submit answer$/, async function () {
  await pages.raptorAms.click('submitAnswer');
});

Then(/^the answer is graded correct$/, async function () {
  await pages.raptorAms.assertElementExists('contextTab', 'correct');
  await pages.raptorAms.assertElementExists('correctAnswer');
});

Then(/^the answer is graded incorrect with "(.*)" from author$/, async function (authorInput) {
  await pages.raptorAms.assertElementExists('incorrectAnswer');
  await pages.raptorAms.assertElementExists('incorrectAnswerAlert');

  if (authorInput === 'feedback') {
    //checks if incorrect tab is trigerred
    await pages.raptorAms.assertElementExists('contextTab', 'incorrect');
  } else if (authorInput === 'no-feedback') {
    //checks if default tab is trigerred
    await pages.raptorAms.assertElementExists('contextTab', 'default');
  }
});

// The following steps are similar to greq-eval.feature but are broken down into simpler steps 
// Down the road aim to refactor the greq-eval.feature into separate scenarios for each eval and keep js step functions simpler
When(/^I set the grade as "(.*)" type$/, async function (gradeAsEval) {
  await pages.raptorAms.click('contextTab', 'correct');
  await pages.mathModule.click('answerTextField');
  await pages.raptorAms.click('correctSetup');
  await pages.raptorAms.populate('mathGradeAs', gradeAsEval);
  await pages.raptorAms.click('mathGradeAs');
});

When(/^I input author answer "(.*)"$/, async function (eqnQuestion) {
  await pages.mathModule.click('answerTextField'); 
  await pages.raptorAms.populate('mathEquationField', eqnQuestion);
});

When(/^I select Polar Coordinate checkbox$/, async function () {
  await pages.raptorAms.click('mathPolarCoordinate');
});

When(/^I navigate to AuthorApp clicking on Raptor item on AMS page$/, async function () {
  await pages.ams.click('raptorNewItem');
  await pages.raptorAms.switchToTab('Raptor Authoring');
  await pages.raptorAms.assertElementExists('menuBarMore');
});

When(/^I select Math Equation module, click on Question tab$/, async function () {
  await pages.raptorAms.click('menuBarAdd');
  await pages.raptorAms.click('addMathEquation');
  await pages.raptorAms.click('questionContent');
  await pages.raptorAms.assertElementExists('answerLabel');
});

Then(/^I verify default evaltype for GradeAs dropdown is Expression$/, async function () {
  await pages.raptorAms.click('correctSetup');
  await pages.raptorAms.assertElementExists('mathGradeAs');
  await pages.mathModule.assertElementExists('gradeAsExpression');
});

Then(/^I verify "(.*)" dropdown\(s\), checkbox\(es\) or radio button\(s\): "(.*)" on "(.*)" tab$/, async function (present, objects, contextType) {
  await pages.raptorAms.click('contextTab', contextType);
  await pages.mathModule.click('answerTextField');
  await pages.raptorAms.click('correctSetup');


  const elementList = objects.split(', ');
  for (let i = 0; i < elementList.length; i++) {
    const element = elementList[i]
    // temporary solution: if element check; until the raptorAms page is refactored by moving all the math prefixed elements into mathModule page
    switch (present) {
      case 'one or more':
        if (element === 'mathNumericTolerance' || element === 'mathPolarCoordinate') {
          await pages.raptorAms.assertElementExists(element)
        } else {

          await pages.mathModule.assertElementExists(element)
        }
        break;
      case 'there are no':
        if (element === 'mathNumericTolerance' || element === 'mathPolarCoordinate') {
          await pages.raptorAms.assertElementDoesNotExist(element)
        } else {
          await pages.mathModule.assertElementDoesNotExist(element)
        }
        break;
      default:
        await pages.raptorAms.assertElementExists('mathGradeAs');
    }
  }
});

When(/^I click on Question tab, select GradeAs dropdown "(.*)" evaltype$/, async function (gradeAsEval) {
  await pages.raptorAms.click('contextTab', 'question');
  await pages.mathModule.click('answerTextField');
  await pages.raptorAms.click('correctSetup');
  await pages.raptorAms.populate('mathGradeAs', gradeAsEval);
});

When(/^I select isList checkbox$/, async function () {
  await pages.mathModule.click('isList');
});

When(/^I unselect Enforce Endpoints checkbox$/, async function () {
  await pages.mathModule.click('enforceEndpoints');
});


When(/^I input upper numeric tolerance "(.*)" and lower numeric tolerance "(.*)"$/, async function (upperTolerance, lowerTolerance){
  await pages.raptorAms.click('mathNumericTolerance');
  await pages.raptorAms.populate('numericUpperTolerance', upperTolerance);
  await pages.raptorAms.populate('numericLowerTolerance', lowerTolerance);
});

