const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const saveAndContinue = async function () {
    if (await pages.update.getAttributeValue('Button', 'Save Changes', 'disabled')) {
        await pages.update.click('Button', 'Cancel');
    } else {
        await pages.update.click('Button', 'Save Changes');
    }

};

module.exports = {
    saveAndContinue
};