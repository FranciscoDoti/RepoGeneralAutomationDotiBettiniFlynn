const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const mathpages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const driver = require(`${process.cwd()}/app/driver.js`);
const { raptorlib, amslib, froalalib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I add the "(.*)" module with following details$/, async function (moduleType, dataTable) {
    await pages.ams.assertElementExists('Add Item', 'Easy');
    await pages.ams.click('Add Item', 'Raptor');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    await pages.raptor.click('Add Menu');
    await pages.raptor.click('Module Pallete', moduleType);
    await pages.raptor.click('Content Area');
    var rows = dataTable.hashes();
    await pages.raptor.populate('chemicalEquationPrefix', rows[0].value);
    await pages.raptor.click('Tab', 'correct');
    await pages.raptor.populate('chemicalEquationAnswerInput', rows[1].value);
});

When(/^I add the "(.*)" module "(.*)" times$/, async function (moduleType, times) {
    await pages.ams.click('Add Item', 'Raptor');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    let i = 0;
    while (i < times) {
        await pages.raptor.click('Add Menu');
        await pages.raptor.click('Module Pallete', moduleType);
        await pages.raptor.click('Content Area');
        i++;
    }
});

When(/^I add the "(.*)" module$/, async function (moduleType) {
    await pages.ams.assertElementExists('Add Item', 'Easy');
    await pages.ams.click('Add Item', 'Raptor');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    await pages.raptor.click('Add Menu');
    await pages.raptor.click('Module Pallete', moduleType);
    await pages.raptor.click('Content Area');
});

Then('I verify item has been created', async function () {
    let itemid = (await mathpages.ams.getText('getItemid')).split(":")[1];
    //below two steps need to be added to I add the "(.*)" module
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Save As Draft');
    await mathpages.raptorAms.switchToTab('Sapling Learning');
    await pages.raptor.assertElementExists('amsItemCreate', itemid.trim());
});

Then('I verify item has been created with following details', async function (dataTable) {
    let itemid = (await mathpages.ams.getText('getItemid')).split(":")[1].trim();
    //below two steps need to be added to I add the "(.*)" module
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Save As Draft');
    await mathpages.raptorAms.switchToTab('Sapling Learning');

    //code to check element should not be present
    await pages.ams.waitForElementInvisibility('Algolia is Processing');
    await pages.raptor.assertElementExists('amsItemCreate', itemid.trim());
    var rows = dataTable.hashes();
    for (let i = 0; i < dataTable.rows().length; i++) {
        let field = await rows[i].field;
        field = field.replace(' ', "_");
        let value = await rows[i].value;
        let modulelocator = field + "-" + itemid;
        await pages.raptor.assertText('raptormoduleType', modulelocator, value);
    }
});

When('I configure the following item details', async function (datatable) {
    await pages.raptor.click('More Menu');
    await pages.raptor.click('More Item Details');
    await pages.raptor.populate('Item Details Title', datatable.hashes()[0].Title);
    await pages.raptor.click('Item Details Done Button');
});

When('I add list variables', async function (datatable) {
    await pages.raptor.click('variablesChevron');
    await pages.raptor.click('addListVariableButton');

    for (let col = 1; col < datatable.rows()[0].length - 3; col++) {
        await pages.raptor.click('addColumnButton');
    }

    for (let row = 1; row < datatable.rows().length; row++) {
        await pages.raptor.click('addRowButton');
    }

    for (let i = 0; i < datatable.rows().length; i++) {
        await pages.raptor.populate('variableNameTextbox', i + 1, datatable.hashes()[i].Name);
        await pages.raptor.populate('variableValue1Textbox', i + 1, datatable.hashes()[i].Value1);
        await pages.raptor.populate('variableValue2Textbox', i + 1, datatable.hashes()[i].Value2);
        if (datatable.hashes()[i].Value3 !== undefined) {
            await pages.raptor.populate('variableValue3Textbox', i + 1, datatable.hashes()[i].Value3);
        }
        await pages.raptor.populate('variableTypeDropdown', i + 1, datatable.hashes()[i].Type);
    }
});

When('I add the following range algos', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        await pages.raptor.click('addRangeAlgoButton');
        await pages.raptor.populate('rangeNameTextbox', i * 2 + 1, '');
        await pages.raptor.populate('rangeNameTextbox', i * 2 + 1, datatable.hashes()[i].Name);
        await pages.raptor.populate('rangeMinimumTextbox', i * 2 + 1, datatable.hashes()[i].Minimum);
        await pages.raptor.populate('rangeMaximumTextbox', i * 2 + 1, datatable.hashes()[i].Maximum);
        await pages.raptor.populate('rangeIncrementTextbox', i * 2 + 1, datatable.hashes()[i].Increment);
    }
});

When('I add the following calculated algos', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        await pages.raptor.click('addCalculatedAlgoButton');
        await pages.raptor.populate('calculatedNameTextbox', i * 2 + 1, '');
        await pages.raptor.populate('calculatedNameTextbox', i * 2 + 1, datatable.hashes()[i].Name);
        await pages.raptor.populate('calculatedEquationTextbox', i * 2 + 1, datatable.hashes()[i].Equation);
    }
});

When(/^I set correct answer "(.*)" for NE "(.*)"$/, async function (value, position) {
    let selectedTabText = await pages.raptor.getText('Active Tab Edit Mode');
    if (selectedTabText !== "correct1") {
        await pages.raptor.click('Tab', 'correct');
    }
    await pages.numericEntry.click('Element', position);
    await pages.numericEntry.populate('Target Value', value);
});

When('I configure FR module', async function () {
    await pages.raptor.populate('Prompt', '<md-never><img src="http://www.filmbuffonline.com/FBOLNewsreel/wordpress/wp-content/uploads/2014/07/nic-cage.jpg" alt="" style="width: 100%"/></md-never>');
    await pages.freeResponse.populate('Min Character Count', '20');
    await pages.freeResponse.populate('Max Character Count', '40');
});

Then('I check NE answers', async function () {
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Check Answer Slider');
    await pages.numericEntry.populate('Numeric Entry 1', '.0258');
    await pages.numericEntry.populate('Numeric Entry 2', '-0.0258');
    await pages.raptor.click('Check Your Work Submit Button');
    await pages.raptor.assertText('activeTabTakeMode', 'correct1');
});

Then('I check FR answers', async function () {
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Save As Draft');
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Check Answer Slider');
    await pages.freeResponse.populate('Element Take Mode', '123456789012345678901');
    await pages.raptor.click('Check Your Work Submit Button');
    await pages.raptor.assertText('activeTabTakeMode', 'correct1');
});

When(/^I add the (.*) draft item in AMS with title (.*)$/, async function (moduleType, title) {
    await amslib.addRaptorItem();
    await raptorlib.addModule(moduleType);
    await raptorlib.addItemDetails({Title: title});
    let itemId = await raptorlib.saveItem();
    this.data.set("itemId", itemId);
});

When('I add the following feedbacks and save the item', async function (feedbackDetail) {
    await raptorlib.addContext('incorrect');
    for (let i = 0; i < feedbackDetail.rows().length; i++) {
        let data = feedbackDetail.hashes()[i];
        await raptorlib.selectFeedbackContext(data);
        await froalalib.addFeedback(data);
    }
    await raptorlib.saveItem();
});

Then(/^I verify the feedbacks in the following tabs$/, async function (datatable) {
    await amslib.waitAlgoliaProcess();
    await amslib.itemAction('preview', this.data.get("itemId"));
    await amslib.showFeedbackToggle();
    await amslib.verifyFeedback(datatable);
});