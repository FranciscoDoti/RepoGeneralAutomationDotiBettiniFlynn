const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { updatelib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I search for the user \"([^\"]*)\" to update his permissions$/, async function (username) {
    await pages.ams.click('AMS Tab', 'Users');
    await pages.ams.populate('User Filter', username);
});

When('I click on UserId and un-check the following permissions checkboxes and save', async function (datatable) {
    await pages.ams.click('User Id');
    for (let i = 0; i < datatable.rows().length; i++) {
        let checkbox = datatable.hashes()[i];
        let checkboxStatus = await pages.ams.getAttributeValue('User Permissions Checkbox', checkbox.Permission, 'selected');
        if (checkboxStatus) {
            var save = true;
            await pages.ams.populate('User Permissions Checkbox', checkbox.Permission, checkbox.Status);
        }
    }
    save ? await updatelib.save() : await pages.update.click('Button', 'Cancel');
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
        let checkboxStatus = await pages.ams.getAttributeValue('User Permissions Checkbox', checkbox.Permission, 'selected');
        if (!checkboxStatus) {
            var save = true;
            await pages.ams.populate('User Permissions Checkbox', checkbox.Permission, checkbox.Status);
        }
    }
    save ? await updatelib.save() : await pages.update.click('Button', 'Cancel');
});


