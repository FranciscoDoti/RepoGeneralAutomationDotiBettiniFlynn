const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const createHatchlingEasyItem = async function (moduleType) {
  await pages.ams.click('Add Item', 'Easy');
  await pages.ams.click('Hatchling Item Option', moduleType);
  await pages.hatchlingItem.assertText('Dialog Title', `${moduleType} Question`);
}
const populateQuestion = async function (question, type) {
  let code = Date.now();
  QuestionTitle = question['Question Title'] + " " + code;
  if (type === 'AMS') {
    await pages.hatchlingItem.populate('Question Title', QuestionTitle);
    await pages.hatchlingItem.populate('Question Prompt', question['Question Prompt']);
    return QuestionTitle;
  } else if (type === 'AE') {
    await pages.hatchlingItemFrame.populate('Question Title', QuestionTitle);
    await pages.hatchlingItemFrame.populate('Question Prompt', question['Question Prompt']);
    return QuestionTitle;
  }
}
const clickGenericFeedback = async function (moduleType) {
  if (moduleType === 'AMS') {
    await pages.hatchlingItem.click('Button', 'Add Generic Feedback');
    await pages.hatchlingItem.click('Collapsible Title', 'Generic Feedback');
  } else if (moduleType === 'AE') {
    await pages.hatchlingItemFrame.click('Button', 'Add Generic Feedback');
    await pages.hatchlingItemFrame.click('Collapsible Title', 'Generic Feedback');
  }
}
const populateNEvalues = async function (item) {
  await pages.hatchlingItem.populate('Target Value', item['Correct Target Value']);
  await pages.hatchlingItem.populate('Measurement', item['Measurement']);
  await pages.hatchlingItem.click('Derivation Type', item['Derivation Type']);
  await pages.hatchlingItem.populate('Derivation Amount', item['Acceptance Within']);
}
const populateHint = async function (moduleType, hint) {
  if (moduleType === 'AMS') {
    await pages.hatchlingItem.click('Collapsible Title', 'Hint');
    await pages.hatchlingItem.populate('Hint and Generic Feedback', 'Hint', hint.Hint);
  } else if (moduleType === 'AE') {
    await pages.hatchlingItemFrame.click('Collapsible Title', 'Hint');
    await pages.hatchlingItemFrame.populate('Hint and Generic Feedback', 'Hint', hint.Hint);
  }
}
const populateStudentFeedback = async function (studentFeedback) {
  await pages.hatchlingItem.click('Button', 'Add Feedback');
  await pages.hatchlingItem.populate('NE Student Feedback', 'Solution Explained', studentFeedback['Solution Explained']);
  await pages.hatchlingItem.populate('NE Student Feedback', 'General Incorrect Feedback', studentFeedback['General Incorrect Feedback']);
  await pages.hatchlingItem.click('Button', 'Save Feedback Changes');
}
module.exports = {
  createHatchlingEasyItem,
  clickGenericFeedback,
  populateHint,
  populateStudentFeedback,
  populateNEvalues,
  populateQuestion
};