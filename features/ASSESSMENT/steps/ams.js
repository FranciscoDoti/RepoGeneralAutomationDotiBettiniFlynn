const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { raptorlib, amslib, updatelib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When('I create the following draft Raptor items in AMS', async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];

    await amslib.addRaptorItem();
    await raptorlib.addModule(item['Module Type']);
    await raptorlib.addItemDetails(item);

    let itemId = await raptorlib.saveItem();
    this.data.set(item.Title, "id", itemId);
    await pages.ams.closeTab('Raptor Authoring');
  }
});

When('I select the following items by title in AMS', async function (datatable) {
  await amslib.waitAlgoliaProcess();
  for (let i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];
    await pages.ams.click('Select Checkbox', this.data.get(item.Title, "id"));
  }
});

When('I update the selected items with the following details', async function (datatable) {
  await amslib.openUpdateModal();
  for (let i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];

    await updatelib.setTopic(item);
    await updatelib.setTaxonomy(item);
    await updatelib.setDifficulty(item.Difficulty);
    await updatelib.setStatus(item.Status);
    await updatelib.setAccess(item.Access);
    await updatelib.save();
  }
  await amslib.updateDone();
});

When('I delete the selected items', async function () {
  let deletedItemsCount = await amslib.deleteItems();
  if (await expect(this.data.data.length).to.equal(parseInt(deletedItemsCount, 10))) {
    log.info(`Expected length is "${this.data.data.length}". Actual length is "${deletedItemsCount}". PASS`);
  };
});

When('I delete the following items in AMS', async function (datatable) {
  await amslib.waitAlgoliaProcess();
  for (i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];
    let itemId = this.data.get(item.Title, "id");
    await amslib.deleteItem(itemId);
  }
});

Then('I verify the details of the following items are displayed in AMS', async function (datatable) {
  await amslib.waitAlgoliaProcess();
  for (i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];
    let itemId = this.data.get(item.Title, "id");
    await amslib.verifyItemDetails(item, itemId);
  }
});

Then('I verify the deleted items are displayed in Deleted Items screen in AMS', async function (datatable) {
  await pages.ams.switchToTab('Sapling Learning Author Management System');
  await pages.ams.click('AMS Tab', 'Deleted Items');
  for (let i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];
    await pages.ams.assertElementExists('Item ID Link', this.data.get(item.Title, "id"));
  }
});

Then('I verify the deleted items are not displayed in AMS', async function (datatable) {
  await pages.ams.switchToTab('Sapling Learning Author Management System');
  await pages.ams.click('AMS Tab', 'Items');
  for (let i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];
    await pages.ams.assertElementDoesNotExist('Item ID Link', this.data.get(item.Title, "id"));
  }
});