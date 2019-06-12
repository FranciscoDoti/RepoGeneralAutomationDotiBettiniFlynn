
const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const mathpages =require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const { getDriver,sleep } = require(`${process.cwd()}/app/driver`);


When(/^I add the "(.*)" module$/, async function (moduleType) {
    await mathpages.ams.click('raptorNewItem');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    await pages.raptor.click('addLink');
    await pages.raptor.click('modulePallete', moduleType);
    await pages.raptor.click('contentArea');
    await pages.raptor.populate('chemicalEquationPrefix',"Photosynthesis");
    await pages.raptor.click('correctContext');
    await pages.raptor.populate('chemicalEquationAnswerInput',"6 CO2 + 6 H2O → C6H12O6 + 6 O2")
});

Then(/^I verify item has been created with following details$/, async function (data_table) {
    let itemid = (await mathpages.ams.getText('getItemid')).split(":")[1].trim();
    //below two steps need to be added to I add the "(.*)" module
    await pages.raptor.click('moreButton');
    await pages.raptor.click('saveAsDraft');
    await mathpages.raptorAms.switchToTab('Sapling Learning');
    await sleep(5000);
    await getDriver().navigate().refresh();
    await pages.raptor.assertElementExists('amsItemCreate',itemid.trim());
    var rows = data_table.hashes();
    for (let i = 0; i < data_table.rows().length; i++) {
        let field=await rows[i].field;
        let value=await rows[i].value;
        let modulelocator=field+"-"+itemid;
        await pages.raptor.assertText('raptormoduleType',modulelocator,value);
    }
});