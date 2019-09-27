const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

When('I add the following draft Raptor items in AMS', async function(datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let item = datatable.hashes()[i];
        await pages.ams.switchToTab('Sapling Learning Author Management System');
        await pages.ams.assertElementExists('Add Item', 'Easy');
        await pages.ams.click('Add Item', 'Raptor');
        await pages.ams.switchToTab('Raptor Authoring');
        await pages.raptor.click('addMenu');
        await pages.raptor.click('modulePallete', item.ModuleType);
        await pages.raptor.click('contentArea');
        await pages.raptor.click('moreMenu');
        await pages.raptor.click('saveAsDraftMenu');
    }
});

When('I select the following items in AMS', async function(datatable) {
    await pages.ams.switchToTab('Sapling Learning Author Management System');
    for (let i = 0; i < datatable.rows().length; i++) {
        let item = datatable.hashes()[i];
        await pages.ams.click('Select Checkbox', item.Title);
    }
});

When('I update the selected items with the following details', async function(datatable) {
    await pages.ams.click('View Selected Items Tab');
    await pages.ams.click('Select Action Dropdown');
    await pages.ams.click('Update Choice');
    for (let i = 0; i < datatable.rows().length; i++) {
        let item = datatable.hashes()[i];
        await pages.update.click('Topic Textbox');
        await pages.update.click('Topic', item.TopicLevel1);
        await pages.update.click('Topic', item.TopicLevel2);
        await pages.update.click('Topic', item.TopicLevel3);
        await pages.update.click('Topic', item.TopicLevel4);
        await pages.update.click('Topic', item.TopicLevel5);
        await pages.update.click('Confirm Button');
        await pages.update.click('Taxonomy Textbox');
        await pages.update.click('Taxonomy', item.TaxonomyLevel1);
        await pages.update.click('Taxonomy', item.TaxonomyLevel2);
        await pages.update.click('Confirm Button');
        await pages.update.click('Difficulty DropDown');
        await pages.update.click('Difficulty', item.Difficulty);
        await pages.update.click('Status DropDown');
        await pages.update.click('Status', item.Status);
        await pages.update.click('Access DropDown');
        await pages.update.click('Access', item.Access);
        await pages.update.click('Save Changes Button');
    }
    await pages.ams.click('Select Action Dropdown');
    await pages.ams.click('Done Choice');
});

Then('I verify the items were updated in AMS', async function(datatable) {

    // At this point we should wait until Algolia finishes processing
    await pages.raptor.waitForElementInvisibility('Algolia is Processing');

    for (let i = 0; i < datatable.rows().length; i++) {
        let item = datatable.hashes()[i];
        await pages.ams.assertText('Author Mode', item.Title, item["Author Mode"]);
        await pages.ams.assertText('Title', item.Title, item.Title);
        await pages.ams.assertText('Topic', item.Title, item.Topic);
        await pages.ams.assertText('Taxonomy', item.Title, item.Taxonomy);
        await pages.ams.assertText('Difficulty', item.Title, item.Difficulty);
        await pages.ams.assertText('ModuleType', item.Title, item["Module Type"]);
        await pages.ams.assertText('Status', item.Title, item.Status);
        await pages.ams.assertText('Access', item.Title, item.Access);
    }
});