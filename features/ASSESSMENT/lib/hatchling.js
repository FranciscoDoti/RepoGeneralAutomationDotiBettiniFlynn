const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const createHatchlingEasyItem = async function (moduleType) {
    await pages.ams.click('Add Item', 'Easy');
    await pages.ams.click('Hatchling Item Option', moduleType);
    await pages.hatchlingItem.assertText('Dialog Title', 'Multiple Choice Question');
}
const clickGenericFeedback = async function () {
  await pages.hatchlingItem.click('Button', 'Add Generic Feedback');
  await pages.hatchlingItem.click('Collapsible Title', 'Generic Feedback');
}
module.exports = {
    createHatchlingEasyItem,
    clickGenericFeedback
};