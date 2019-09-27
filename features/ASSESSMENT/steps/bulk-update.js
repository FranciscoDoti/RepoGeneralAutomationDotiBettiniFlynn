const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
let itemIdList = [];

When('I add the following draft Raptor items in AMS', async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];
    await pages.ams.switchToTab('Sapling Learning Author Management System');
    await pages.ams.assertElementExists('Add Item', 'Easy');
    await pages.ams.click('Add Item', 'Raptor');
    await pages.ams.switchToTab('Raptor Authoring');
    await pages.raptor.click('Add Menu');
    await pages.raptor.waitForElementVisibility('Module Pallete', item.ModuleType);
    await pages.raptor.click('Module Pallete', item.ModuleType);
    await pages.raptor.waitForElementVisibility('Content Area');
    await pages.raptor.click('Content Area');
    itemIdList[i] = (await pages.raptor.getText('Item ID')).split(":")[1].trim();
    await pages.raptor.click('More Menu');
    await pages.raptor.click('More Item Details');
    await pages.raptor.populate('Item Details Title', item.Title);
    await pages.raptor.click('Item Details Done Button');
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Save As Draft');
    await pages.raptor.waitForElementInvisibility('Message', 'Saving');
    await pages.ams.closeTab('Raptor Authoring');
  }
});

When('I select the created items in AMS', async function () {
  await pages.ams.switchToTab('Sapling Learning Author Management System');
  await pages.ams.waitForElementInvisibility('Algolia is Processing');
  for (let i = 0; i < itemIdList.length; i++) {
    await pages.ams.click('Select Checkbox', itemIdList[i]);
  }
});

When('I update the selected items with the following details', async function (datatable) {
  await pages.ams.click('AMS Button', 'VIEW SELECTED ITEMS');
  await pages.ams.click('AMS Button', 'Select Action');
  await pages.ams.click('AMS Button', 'Update');
  for (let i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];

    await pages.update.click('Field', 'topic');
    await pages.update.click('Tree Element', item.TopicLevel1);
    await pages.update.click('Tree Element', item.TopicLevel2);
    await pages.update.click('Tree Element', item.TopicLevel3);
    await pages.update.click('Tree Element', item.TopicLevel4);
    await pages.update.click('Tree Element Leaf', item.TopicLevel5);
    await pages.update.click('Button', 'Confirm');

    await pages.update.click('Field', 'taxonomy');
    await pages.update.click('Tree Element Leaf', item.TaxonomyLevel2);
    await pages.update.click('Button', 'Confirm');

    await pages.update.click('Field', 'difficulty');
    await pages.update.click('Option', item.Difficulty);

    await pages.update.click('Field', 'status');
    await pages.update.click('Option', item.Status);

    await pages.update.click('Field', 'scope');
    await pages.update.click('Option', item.Access);

    await pages.update.click('Button', 'Save Changes');
  }
  await pages.ams.click('AMS Button', 'Select Action');
  await pages.ams.click('AMS Button', 'Done');
});

Then('I verify the items were updated in AMS', async function (datatable) {
  await pages.ams.waitForElementInvisibility('Algolia is Processing');
  for (i = 0; i < itemIdList.length; i++) {
    let itemId = itemIdList[i];
    let item = datatable.hashes()[i];
    if (item.AuthorMode !== undefined) {
      await pages.ams.assertText('Item Field', 'authoring-tool-' + itemId, item.AuthorMode);
    }
    if (item.Title !== undefined) {
      await pages.ams.assertText('Item Field', 'title-' + itemId, item.Title);
    }
    if (item.Topic !== undefined) {
      await pages.ams.assertText('Item Field', 'topic-' + itemId, item.Topic);
    }
    if (item.Taxonomy !== undefined) {
      await pages.ams.assertText('Item Field', 'taxonomy-' + itemId, item.Taxonomy);
    }
    if (item.Difficulty !== undefined) {
      await pages.ams.assertText('Item Field', 'difficulty-' + itemId, item.Difficulty);
    }
    if (item.Status !== undefined) {
      await pages.ams.assertText('Item Field', 'status-' + itemId, item.Status);
    }
    if (item.ModuleType !== undefined) {
      await pages.ams.assertText('Item Field', 'module_type-' + itemId, item.ModuleType);
    }
    if (item.Access !== undefined) {
      await pages.ams.assertText('Item Field', 'access_type-' + itemId, item.Access);
    }
  }
});