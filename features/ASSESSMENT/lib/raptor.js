const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const addModule = async function (moduleType) {
    await pages.raptor.switchToTab('Raptor Authoring');
    await pages.raptor.waitForElementVisibility('Tab','question');
    await pages.raptor.click('Add Menu');
    await pages.raptor.click('Module Pallete', moduleType);
    await pages.raptor.click('Content Area');
};

const addItemDetails = async function (item) {
    await pages.raptor.click('More Menu');
    await pages.raptor.click('More Item Details');
    await pages.raptor.populate('Item Details Title', item.Title);
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
    await pages.raptor.click('Feedback Text');
};

module.exports = {
    addItemDetails,
    addModule,
    saveItem,
    addFeedbackModule
};