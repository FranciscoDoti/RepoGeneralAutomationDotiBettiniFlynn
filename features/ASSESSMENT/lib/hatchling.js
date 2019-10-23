const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const createHatchlingEasyItem = async function (moduleType) {
  await pages.ams.click('Add Item', 'Easy');
  await pages.ams.click('Hatchling Item Option', moduleType);
  await pages.hatchlingItem.assertText('Dialog Title', `${moduleType} Question`);
}
const clickGenericFeedback = async function () {
  await pages.hatchlingItem.click('Button', 'Add Generic Feedback');
  await pages.hatchlingItem.click('Collapsible Title', 'Generic Feedback');
}
const populateHatchlingNEValues = async function (datatable) {
  let ans = datatable.hashes()[0];
  await pages.hatchlingItem.populate('target Value', ans['Correct Target Value']);
  await pages.hatchlingItem.populate('Measurement', ans.Measurement);
  await pages.hatchlingItem.click('Derivation Type', 'Number ∓');
  await pages.hatchlingItem.populate('Derivation Amount', ans['Acceptance Within']);
}
const populateHint = async function (datatable) {
  let hint = datatable.hashes()[0];
  await pages.hatchlingItem.click('Collapsible Title', 'Hint');
  await pages.hatchlingItem.populate('Hint and Generic Feedback', 'Hint', hint.Hint);
}
const populateStudentFeedback = async function (datatable) {
  let feedback = datatable.hashes()[0];
  await pages.hatchlingItem.click('Button', 'Add Feedback');
  await pages.hatchlingItem.populate('NE Student Feedback', 'Solution Explained', feedback['Solution Explained']);
  await pages.hatchlingItem.populate('NE Student Feedback', 'General Incorrect Feedback', feedback['General Incorrect Feedback']);
  await pages.hatchlingItem.click('Button', 'Save Feedback Changes');
}
module.exports = {
  createHatchlingEasyItem,
  clickGenericFeedback,
  populateHint,
  populateStudentFeedback,
  populateHatchlingNEValues
};