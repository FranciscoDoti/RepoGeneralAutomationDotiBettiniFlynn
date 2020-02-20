const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const addMultipleLabelingTokens = async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        if (i > 0) {
            await pages.canvasLabeling.click('Add Bin_Token Button', 'Add a Token');
        }
        await pages.canvasLabeling.populate('Token Value Textbox', i + 1, datatable.hashes()[i].Token);
    }
    await pages.canvasLabeling.click('Done Button');
}
module.exports = {
    addMultipleLabelingTokens
};