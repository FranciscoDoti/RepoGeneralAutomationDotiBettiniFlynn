const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const saveItem = async function () {
    //function to save open item and return item id
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Save As Draft');
    await pages.raptor.waitForElementInvisibility('Message', 'Saving');
    return (await pages.raptor.getText('Item ID')).split(":")[1].trim();
};

module.exports = {
    saveItem
};