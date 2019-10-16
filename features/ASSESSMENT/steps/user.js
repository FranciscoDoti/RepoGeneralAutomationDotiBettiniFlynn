const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { raptorlib, amslib, updatelib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When('I search for the following user to update his permissions', async function (datatable) {
    let username = datatable.hashes()[0];
    await pages.ams.click('AMS Tab', 'Users');
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
        await pages.update.click('Button', 'Cancel');
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
      let actualTab = tab.TabName;
      await pages.ams.assertText('AMS Tab', actualTab, expectedTab);
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
        await pages.update.click('Button', 'Cancel');
        break;
      }
    } if (YES) {
      await updatelib.save();
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
  