const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const createHatchlingEasyItem = async function (moduleType) {
  await pages.ams.click('Add Item', 'Easy');
  await pages.ams.click('Hatchling Item Option', moduleType);
  await pages.hatchlingItem.assertText('Dialog Title', `${moduleType} Question`);
}
const populateQuestion = async function (question) {
  let code = Date.now();
  question.QuestionTitle = question['Question Title'] + " " + code;
  await pages.hatchlingItem.populate('Question Title', question.QuestionTitle);
  await pages.hatchlingItem.populate('Question Prompt', question['Question Prompt']);
}
const clickGenericFeedback = async function () {
  await pages.hatchlingItem.click('Button', 'Add Generic Feedback');
  await pages.hatchlingItem.click('Collapsible Title', 'Generic Feedback');
}
const populateNEvalues = async function (item) {
  await pages.hatchlingItem.populate('Target Value', item['Correct Target Value']);
  await pages.hatchlingItem.populate('Measurement', item['Measurement']);
  await pages.hatchlingItem.click('Derivation Type', item['Derivation Type']);
  await pages.hatchlingItem.populate('Derivation Amount', item['Acceptance Within']);
}
const populateHint = async function (hint) {
  await pages.hatchlingItem.click('Collapsible Title', 'Hint');
  await pages.hatchlingItem.populate('Hint and Generic Feedback', 'Hint', hint.Hint);
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