const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const addFeedback = async function(data){
        await pages.froala.waitForElementVisibility('Editor Title', 'Static Text');
        await pages.froala.populate('Feedback Textarea', data['Feedback Text']);
}

module.exports = {
    addFeedback
};