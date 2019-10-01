const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const addRaptorItem = async function () {
    await pages.ams.switchToTab('Sapling Learning Author Management System');
    await pages.ams.assertElementExists('Add Item', 'Easy');
    await pages.ams.click('Add Item', 'Raptor');
};

const addModule = async function (ModuleType) {
    await pages.ams.switchToTab('Raptor Authoring');
    await pages.raptor.click('Add Menu');
    await pages.raptor.waitForElementVisibility('Module Pallete', ModuleType);
    await pages.raptor.click('Module Pallete', ModuleType);
    await pages.raptor.waitForElementVisibility('Content Area');
    await pages.raptor.click('Content Area');
};

const addItemDetails = async function (Title) {
    await pages.raptor.click('More Menu');
    await pages.raptor.click('More Item Details');
    await pages.raptor.populate('Item Details Title', Title);
    await pages.raptor.click('Item Details Done Button');
};

const saveItem = async function () {
    //function to save open item and return item id
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Save As Draft');
    await pages.raptor.waitForElementInvisibility('Message', 'Saving');
    return (await pages.raptor.getText('Item ID')).split(":")[1].trim();
};

module.exports = {
    saveItem,
    addRaptorItem,
    addModule,
    addItemDetails
};