const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const mathpages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const { getDriver, onWaitForElementToBeInvisible } = require(`${process.cwd()}/app/driver`);

When(/^I add the "(.*)" module with following details$/, async function (moduleType, dataTable) {
    await mathpages.ams.assertElementExists('raptorNewEasyItem');
    await mathpages.ams.click('raptorNewItem');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    await pages.raptor.click('addLink');
    await pages.raptor.click('modulePallete', moduleType);
    await pages.raptor.click('contentArea');
    var rows = dataTable.hashes();
    await pages.raptor.populate('chemicalEquationPrefix', rows[0].value);
    await pages.raptor.click('Correct Context');
    await pages.raptor.populate('chemicalEquationAnswerInput', rows[1].value);
});

When(/^I add the "(.*)" module "(.*)" times$/, async function (moduleType, times) {
    await mathpages.ams.click('raptorNewItem');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    let i = 0;
    while (i < times) {
        await pages.raptor.click('addLink');
        await pages.raptor.click('modulePallete', moduleType);
        await pages.raptor.click('contentArea');
        i++;
    }
});

When(/^I add the "(.*)" module$/, async function (moduleType) {
    await mathpages.ams.assertElementExists('raptorNewEasyItem');
    await mathpages.ams.click('raptorNewItem');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    await pages.raptor.click('addLink');
    await pages.raptor.click('modulePallete', moduleType);
    await pages.raptor.click('contentArea');
});

Then('I verify item has been created', async function () {
    let itemid = (await mathpages.ams.getText('getItemid')).split(":")[1];
    //below two steps need to be added to I add the "(.*)" module
    await pages.raptor.click('More Button');
    await pages.raptor.click('Save As Draft');
    await mathpages.raptorAms.switchToTab('Sapling Learning');
    await pages.raptor.assertElementExists('amsItemCreate', itemid.trim());
});

Then('I verify item has been created with following details', async function (dataTable) {
    let itemid = (await mathpages.ams.getText('getItemid')).split(":")[1].trim();
    //below two steps need to be added to I add the "(.*)" module
    await pages.raptor.click('More Button');
    await pages.raptor.click('Save As Draft');
    await mathpages.raptorAms.switchToTab('Sapling Learning');
    await getDriver().navigate().refresh();

    //code to check element should not be present
    await onWaitForElementToBeInvisible('algoliaProcessingText');
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
    await mathpages.raptorAms.click('menuBarMore');
    await mathpages.raptorAms.click('moreItemDetails');
    await pages.raptor.populate('itemDetailsTitle', datatable.hashes()[0].Title);
    await pages.raptor.click('itemDetailsDoneButton');
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
