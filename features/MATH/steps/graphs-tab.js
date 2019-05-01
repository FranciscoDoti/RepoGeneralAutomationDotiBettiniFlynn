const { Given, When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;


const expect = require('chai').expect;


When(/^I click on the Graphs Tab$/, async function () {

await pages.graphTab.click('tab');
    await qa.switchFrame('graphsFrame');
});

Given(/^I verify the new Graphs tab exists$/, async function () {

await pages.ams.elementExists('graphTab');
});

Given(/^I verify that Graphs tab does not exist$/, async function () {

    await qa.doesNotExist(page.math.ams.graphTab);

});

Then(/^I verify Graph button and static column names are displayed$/, async function () {

    // await qa.switchFrame("graphsFrame");

    //  Verify column names

await pages.graphTab.elementExists('newGraphButton');
await pages.graphTab.elementExists('idColumnName');
await pages.graphTab.elementExists('titleColumnName');
await pages.graphTab.elementExists('typeColumnName');
});

Then(/^I verify Graph type is Graded or Ungraded$/, async function () {

    let tablerows = await this.driver.findElements(qa._locator('#graph-panel > * tr'));
    let actualrows = tablerows.length - 1;

    for (let i = 1; i <= actualrows; i++) {
        let txt = await qa.getText(`table.graphList > tbody > tr:nth-child(${i}) > td:nth-child(4)`);
        expect(assert_text.math.graphType).to.include(txt);
    }
});

When(/^I click on the New Raptor item in the AMS page$/, async function () {

    await pages.ams.click('raptorNewItem');
    });
    
    When(/^I navigate to AuthorApp$/, async function () {
    
      await qa.changeWindow(1);
    await pages.raptorAms.elementExists('addMenuBar');
    });

