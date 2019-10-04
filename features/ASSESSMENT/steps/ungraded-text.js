const { When } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { raptorlib, amslib, updatelib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);


When('I add the Ungraded text module with following details', async function (dataTable) {

    let item = dataTable.hashes()[0]; 
    await pages.raptor.click('UngradedText-EnterText');
    await pages.raptor.populate('UngradedText-EnterText Editor', " ");
    await pages.raptor.populate('UngradedText-EnterText Editor', item.Text);
    await pages.raptor.click('Editor Done');
    await raptorlib.addItemDetails(item);
    let itemId = await raptorlib.saveItem();
    this.data.set(item.Title, "id", itemId);
    await pages.ams.closeTab('Raptor Authoring');

});