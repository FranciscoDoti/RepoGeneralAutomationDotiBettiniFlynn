const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { raptorlib, labelinglib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When('I add bins with the following bin names', async function (datatable) {
    await pages.canvasSorting.click('Canvas Button', 'Edit');
    for (let i = 0; i < datatable.rows().length; i++) {
        if (i > 1) {
            await pages.canvasSorting.click('Add Bin_Token Button', 'Add a Bin');
        }
        await pages.canvasSorting.populate('Bin Value Textbox', i, datatable.hashes()[i].Bin);
    }
})

When('I add tokens with the following token names', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        if (i > 3) {
            await pages.canvasSorting.click('Add Bin_Token Button', 'Add a Token');
        }
        await pages.canvasSorting.populate('Token Value Textbox', i, datatable.hashes()[i].Token);
    }
    await pages.canvasSorting.click('Done Button');
})

Then('I drag the following token into the following respetive bins', async function (datatable) {
    await pages.canvasSorting.click('Canvas Tab', 'correct');
    for (let i = 0; i < datatable.rows().length; i++) {
        await pages.canvasSorting.dragAndDrop('Drag Token', 'Drop Token', datatable.hashes()[i].Token, datatable.hashes()[i].Bin);
    }
    // await pages.canvasLabeling.dragAndDrop('Drag Token', 'Drop Token', token, '1');
    // await raptorlib.checkAnswerMode();
    // await pages.canvasLabeling.dragAndDrop('Drag Token', 'Drop Token', token, '1');
    // await pages.raptor.click('Check Your Work Submit Button');
    // await pages.raptor.assertText('activeTabTakeMode', 'correct1');
})
