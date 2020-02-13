const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const addMultipleSortingBins = async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        if (i > 1) {
            await pages.canvasSorting.click('Add Bin_Token Button', 'Add a Bin');
        }
        await pages.canvasSorting.populate('Bin Value Textbox', i, datatable.hashes()[i].Bin);
    }
}
const addMultipleSortingTokens = async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        if (i > 3) {
            await pages.canvasSorting.click('Add Bin_Token Button', 'Add a Token');
        }
        await pages.canvasSorting.populate('Token Value Textbox', i, datatable.hashes()[i].Token);
    }
}
const dragAndDropTokensToBins = async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        await pages.canvasSorting.dragAndDrop('Drag Token', 'Drop Token', datatable.hashes()[i].Token, datatable.hashes()[i].Bin);
    }
}
module.exports = {
    addMultipleSortingBins,
    addMultipleSortingTokens,
    dragAndDropTokensToBins
};