const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { updatelib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I search for the user \"([^\"]*)\"$/, async function (username) {
    await pages.ams.click('AMS Tab', 'Users');
    await pages.ams.populate('User Filter', username);
});

When(/^I \"([^\"]*)\" the following permissions checkboxes$/, async function (status, datatable) {
    await pages.ams.click('User Id');
    for (let i = 0; i < datatable.rows().length; i++) {
        let checkbox = datatable.hashes()[i];
        // let checkboxStatus = await pages.ams.getAttributeValue('User Permissions Checkbox', checkbox.Permission, 'selected');
        // if ((!checkboxStatus && status === 'check') || (checkboxStatus && status === 'uncheck')) {
        //     var save = true;
            await pages.ams.populate('User Permissions Checkbox', checkbox.Permission, status);
        // }
    }
    await updatelib.save();
    // save ? await updatelib.save() : await pages.update.click('Button', 'Cancel');
});

Then('I verify the following tabs are displayed on the top of the AMS Page', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let tab = datatable.hashes()[i];
        let actualTab = tab.TabName;
        await pages.ams.assertElementExists('AMS Tab', actualTab);
    }
});


