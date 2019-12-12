const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const addFeedback = async function(data){
        await pages.froala.click('Feedback edit btn');
        await pages.froala.waitForElementVisibility('Editor Title', 'Ungraded Text');
        await pages.froala.populate('Feedback Textarea', data['Feedback Text']);
        await pages.froala.click('Done');
}

module.exports = {
    addFeedback
};