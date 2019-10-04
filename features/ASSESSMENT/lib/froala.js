const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const addFeedback = async function(feedbackDetail){
    for (let i = 0; i < feedbackDetail.rows().length; i++) {
        let data = feedbackDetail.hashes()[i];
        await pages.raptor.click('Answer Tab', (data['Tab Name']).toLowerCase());
        await pages.raptor.click('Feedback Add Button');
        await pages.raptor.click('Feedback Module', 'Ungraded Text');
        await pages.raptor.click('Feedback Context Area');
        await pages.raptor.click('Feedback Text');
        await pages.raptor.waitForElementVisibility('Editor Title', 'Static Text');
        await pages.raptor.populate('Feedback Textarea', data['Feedback Text']);
    }
}

module.exports = {
    addFeedback
};