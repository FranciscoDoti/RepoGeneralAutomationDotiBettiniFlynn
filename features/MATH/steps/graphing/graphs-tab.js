const { Given, When, Then } = require('cucumber');
const selenium = require('../../../../app/selenium.js');
const assert_text = require('../../../../features/master-text.js');
const page = require('../../../master-page.js');
const expect = require('chai').expect;


When(/^I click on the Graphs Tab$/, async function () {
    let qa = new selenium(this.driver);
    await qa.click(page.math.graphTab.tab);
    await qa.switchFrame('graphsFrame');
});

Given(/^I verify the new Graphs tab exists$/, async function () {
    let qa = new selenium(this.driver);
    await qa.exists(page.math.ams.graphTab);
});

Given(/^I verify that Graphs tab does not exist$/, async function () {
    let qa = new selenium(this.driver);
    await qa.doesNotExist(page.math.ams.graphTab);

});

Then(/^I verify Graph button and static column names are displayed$/, async function () {
    let qa = new selenium(this.driver);
    // await qa.switchFrame("graphsFrame");

    //  Verify column names

    await qa.exists(page.math.graphTab.newGraphButton);
    await qa.exists(page.math.graphTab.idColumnName);
    await qa.exists(page.math.graphTab.titleColumnName);
    await qa.exists(page.math.graphTab.typeColumnName);
});

Then(/^I verify Graph type is Graded or Ungraded$/, async function () {
    let qa = new selenium(this.driver);
    let tablerows = await this.driver.findElements(qa._locator('#graph-panel > * tr'));
    let actualrows = tablerows.length - 1;

    for (let i = 1; i <= actualrows; i++) {
        let txt = await qa.getText(`table.graphList > tbody > tr:nth-child(${i}) > td:nth-child(4)`);
        expect(assert_text.math.graphType).to.include(txt);
    }
});

