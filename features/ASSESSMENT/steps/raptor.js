
const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const mathpages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const { getDriver, onWaitForElementToBeInvisible} = require(`${process.cwd()}/app/driver`);

When(/^I add the "(.*)" module with following details$/, async function (moduleType,dataTable) {
    await mathpages.ams.click('raptorNewItem');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    await pages.raptor.click('addLink');
    await pages.raptor.click('modulePallete', moduleType);
    await pages.raptor.click('contentArea');
    var rows = dataTable.hashes();
    await pages.raptor.populate('chemicalEquationPrefix',rows[0].value);
    await pages.raptor.click('correctContext');
    await pages.raptor.populate('chemicalEquationAnswerInput',rows[1].value);
});

Then(/^I verify item has been created$/, async function () {
    let itemid = (await mathpages.ams.getText('getItemid')).split(":")[1];
    //below two steps need to be added to I add the "(.*)" module
    await pages.raptor.click('More Button');
    await pages.raptor.click('Save As Draft');
    await mathpages.raptorAms.switchToTab('Sapling Learning');
    await pages.raptor.assertElementExists('amsItemCreate', itemid.trim());
});

Then(/^I verify item has been created with following details$/, async function (dataTable) {
    let itemid = (await mathpages.ams.getText('getItemid')).split(":")[1].trim();
    //below two steps need to be added to I add the "(.*)" module
    await pages.raptor.click('More Button');
    await pages.raptor.click('Save As Draft');
    await mathpages.raptorAms.switchToTab('Sapling Learning');
    await getDriver().navigate().refresh();

    //code to check element should not be present
    await onWaitForElementToBeInvisible('algoliaProcessingText');
    await pages.raptor.assertElementExists('amsItemCreate',itemid.trim());
    var rows = dataTable.hashes();
    for (let i = 0; i < dataTable.rows().length; i++) {
        let field=await rows[i].field;
        field=field.replace(' ',"_");
        let value=await rows[i].value;
        let modulelocator=field+"-"+itemid;
        await pages.raptor.assertText('raptormoduleType',modulelocator,value);
    }
});