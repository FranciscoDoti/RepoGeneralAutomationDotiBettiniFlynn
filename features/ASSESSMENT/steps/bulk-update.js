const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { raptorlib, amslib, updatelib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When('I create the following draft Raptor items in AMS', async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];

    await amslib.addRaptorItem();
    await raptorlib.addModule(item['Module Type']);
    await raptorlib.addItemDetails(item['Title']);

    let itemId = await raptorlib.saveItem();
    this.data.set(item.Title, "id", itemId);
    await pages.ams.closeTab('Raptor Authoring');
  }
});

When('I select the following items by title on AMS', async function (datatable) {
  await amslib.waitAlgoliaProcess();
  for (let i = 0; i < datatable.rows().length; i++) {
      let item = datatable.hashes()[i];
      await pages.ams.click('Select Checkbox', this.data.get(item.Title, "id"));
  }
});

When('I update the selected items with the following details', async function (datatable) {
  await amslib.update();
  for (let i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];

    await updatelib.setTopic(item);
    await updatelib.setTaxonomy(item);
    await updatelib.setDifficulty(item.Difficulty);
    await updatelib.setStatus(item.Status);
    await updatelib.setAccess(item.Access);
    await updatelib.save();
  }
  await amslib.done();
});

Then('I verify the details of the following items are displayed in AMS', async function (datatable) {
  await amslib.waitAlgoliaProcess();
  await pages.ams.switchToTab('Sapling Learning Author Management System');
  for (i = 0; i < datatable.rows().length; i++) {
      let item = datatable.hashes()[i];
      let itemId = this.data.get(item.Title, "id");
      await amslib.verifyItemDetails(item, itemId);
  }
});