const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { userlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I search for the user \"([^\"]*)\"$/, async function (username) {
    await pages.ams.click('AMS Tab', 'Users');
    await pages.ams.populate('User Filter', username);
    this.data.set('user', username)
});

When(/^I \"([^\"]*)\" the following permissions checkboxes$/, async function (status, datatable) {
    let user = this.data.get('user');
    await pages.ams.assertElementExists('searchedUser', user);
    await pages.ams.click('User Id');   
    for (let i = 0; i < datatable.rows().length; i++) {
        let checkbox = datatable.hashes()[i];
        await pages.ams.populate('User Permissions Checkbox', checkbox.Permission, status);
    }
    await userlib.save();
});

Then('I verify the following tabs are displayed on the top of the AMS Page', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let tab = datatable.hashes()[i];
        let actualTab = tab.TabName;
        await pages.ams.assertElementExists('AMS Tab', actualTab);
    }
});
Then('I verify the following tabs are not displayed on the top of the AMS Page', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let tab = datatable.hashes()[i];
        let actualTab = tab.TabName;
        await pages.ams.assertElementDoesNotExist('AMS Tab', actualTab);
    }

});
