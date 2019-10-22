const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const createHatchlingEasyItem = async function (moduleType) {
  await pages.ams.click('Add Item', 'Easy');
  await pages.ams.click('Hatchling Item Option', moduleType);
  if (moduleType === 'Multiple Choice') {
    await pages.hatchlingItem.assertText('Dialog Title', 'Multiple Choice Question');
  } else if (moduleType === 'Numeric Entry') {
    await pages.hatchlingItem.assertText('Dialog Title', 'Numeric Entry Question');
  }
}
const populateQuestionPrompt = async function (moduleType, q) {
  if (moduleType === 'Multiple Choice') {
    await pages.hatchlingItem.populate('Question Prompt MC', q.QuestionPrompt);
  } else if (moduleType === 'Numeric Entry') {
    await pages.hatchlingItem.populate('Question Prompt NE', q.QuestionPrompt);
  }
}
const clickGenericFeedback = async function () {
  await pages.hatchlingItem.click('Button', 'Add Generic Feedback');
  await pages.hatchlingItem.click('Collapsible Title', 'Generic Feedback');
}
const populateHint = async function (datatable) {
  let hint = datatable.hashes()[0];
  await pages.hatchlingItem.click('Collapsible Title', 'Hint');
  await pages.hatchlingItem.populate('Hint and Generic Feedback', 'Hint', hint.Hint);
}
const populateStudentFeedback = async function (datatable) {
  let feedback = datatable.hashes()[0];
  await pages.hatchlingItem.click('Button', 'Add Feedback');
  await pages.hatchlingItem.populate('NE Student Feedback', 'Solution Explained', feedback.SolutionExplained);
  await pages.hatchlingItem.populate('NE Student Feedback', 'General Incorrect Feedback', feedback.GeneralIncorrectFeedback);
  await pages.hatchlingItem.click('Button', 'Save Feedback Changes');
}
module.exports = {
  createHatchlingEasyItem,
  clickGenericFeedback,
  populateQuestionPrompt,
  populateHint,
  populateStudentFeedback
};