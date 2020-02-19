const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const addModule = async function (moduleType) {
    await pages.raptor.switchToTab('Raptor Authoring');
    await pages.raptor.waitForElementVisibility('Content Area');
    await pages.raptor.click('Add Menu');
    await pages.raptor.click('Module Pallete', moduleType);
    await pages.raptor.click('Content Area');
};

const addItemDetails = async function (item) {
    await pages.raptor.switchToTab('Raptor Authoring');
    await pages.raptor.waitForElementVisibility('Content Area');
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Item Details');
    if (item['Title'] !== undefined) {
        await pages.raptor.populate('Item Details Title', item['Title']);
    }
    if (item['Item Type'] !== undefined) {
        await pages.raptor.click('Item Details Item Type', item['Item Type']);
        if (item['Item Type'] !== 'Performance Item') {
            await pages.raptor.click('Item Type Confirmation Button', 'Yes');
        }
    }
    await pages.raptor.click('Item Details Done Button');
    await pages.raptor.waitForElementInvisibility('Item Details Done Button');
};

const saveItem = async function () {
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Save As Draft');
    await pages.raptor.waitForElementInvisibility('Message', 'Saving');
    await pages.raptor.assertElementExists('Item ID');
    let itemid = await pages.raptor.getText('Item ID');
    itemid = itemid.split(":")[1].trim();
    return itemid;
};

const addFeedbackModule = async function (tab, moduleType) {
    await pages.raptor.click('Answer Tab', tab.toLowerCase());
    await pages.raptor.click('Feedback Add Button');
    await pages.raptor.click('Feedback Module', moduleType);
    await pages.raptor.click('Feedback Context Area');
};

const checkAnswerMode = async function () {
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Check Answer Slider');
};

const submitAnswer = async function () {
    await pages.raptor.click('Check Your Work Submit Button');
};

const addHint = async function (moduleType, value) {
    await pages.raptor.click('Feedback Add Button');
    if (moduleType === 'Ungraded Text') {
        await pages.raptor.click('Feedback Add Element', moduleType);
        await pages.raptor.scrollElementIntoView('Feedback Context Area');
        await pages.raptor.click('Feedback Context Area');
        await pages.raptor.click('Feedback Ungraded Text Actions', 'Edit');
        await pages.raptor.populate('Feedback Ungraded Text Edit Input', value);
        await pages.raptor.click('Editor Panel Done Button');
    }
};

module.exports = {
    addItemDetails,
    addModule,
    saveItem,
    addFeedbackModule,
    checkAnswerMode,
    addHint,
    submitAnswer
};