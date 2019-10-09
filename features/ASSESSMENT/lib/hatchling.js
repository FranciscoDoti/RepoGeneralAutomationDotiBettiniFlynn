const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const createHatchlingEasyItem = async function (moduleType) {
    await pages.ams.click('Add Item', 'Easy');
    await pages.ams.click('Hatchling Item Option', moduleType);
}
const clickCorrectAnsFeedback = async function () {
    await pages.hatchlingItem.click('Collapsible Title', 'Correct Answer Feedback');
}
const clickHint = async function () {
    await pages.hatchlingItem.click('Collapsible Title', 'Hint');
}
const clickGenericFeedback = async function () {
    await pages.hatchlingItem.click('Button', 'Add Generic Feedback');
    await pages.hatchlingItem.click('Collapsible Title', 'Generic Feedback');
}
const clickSaveEasyItem = async function () {
    await pages.hatchlingItem.click('Button', 'Save');
}
module.exports = {
    createHatchlingEasyItem,
    clickCorrectAnsFeedback,
    clickHint,
    clickGenericFeedback,
    clickSaveEasyItem
};