const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { raptorlib, amslib, updatelib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

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

When('I select the following items by title on AMS', async function (datatable) {
  await pages.ams.switchToTab('Sapling Learning Author Management System');
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

When('I search for the following user to update his permissions', async function (datatable) {
  let username = datatable.hashes()[0];
  await pages.ams.click('AMS Tab', 'users');
  await pages.ams.populate('User Filter', username.User);

});

When('I click on UserId and un-check the following permissions checkboxes and save', async function (datatable) {
  await pages.ams.click('User Id');
  for (let i = 0; i < datatable.rows().length; i++) {
    let checkbox = datatable.hashes()[i];
    let checkboxStatus = await pages.wordAnswer.getAttributeValue('Grading Option Checkbox', checkbox.PermissionsCheckboxes, 'selected');
    if (checkboxStatus == true) {
      var YES = true;
      await pages.wordAnswer.click('Grading Option Checkbox', checkbox.PermissionsCheckboxes);
    } else {
      await updatelib.cancel();
      break;
    }
  } if (YES) {
    await updatelib.save();
  }
});

Then('I verify the following tabs are displayed on the top', async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    let tab = datatable.hashes()[i];
    let expectedTab = tab.TabName;
    let actualTab = tab.TabName.replace(/\s(.)/g, function (char) {
      return char.toUpperCase();
    })
      .replace(/\s/g, '')
      .replace(/^(.)/, function (char) {
        return char.toLowerCase();
      });
    console.log("====val===="+actualTab);
    await pages.ams.assertText('AMS Tab', actualTab+'Btn', expectedTab);
  }
});

When('I click on UserId and check the following permissions checkboxes and save', async function (datatable) {
  await pages.ams.click('User Id');
  for (let i = 0; i < datatable.rows().length; i++) {
    let checkbox = datatable.hashes()[i];
    let checkboxStatus = await pages.wordAnswer.getAttributeValue('Grading Option Checkbox', checkbox.PermissionsCheckboxes, 'selected');
    if (checkboxStatus == false) {
      var YES = true;
      await pages.wordAnswer.click('Grading Option Checkbox', checkbox.PermissionsCheckboxes);
    } else {
      await updatelib.cancel();
      break;
    }
  } if (YES) {
    await updatelib.save();
  }
});

