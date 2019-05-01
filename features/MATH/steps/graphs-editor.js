const { When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;

const expect = require('chai').expect;


When(/^I click on Graph button$/, async function () {

await pages.graphTab.click('newGraphbutton');
});

Then(/^I verify new graph editor opens in a new tab with that tab in focus$/, async function () {

    await qa.changeWindow(1);
await pages.newGraph.elementExists('title');
});

Then(/^I verify the new unsaved graph url, graph ID does not contain graph Id number$/, async function () {

    let currentUrl = await qa.getUrl();
    let urlgraphId = currentUrl.split("/")[5];
    let graphIdText= await qa.getText(page.math.newGraph.graphId);
    dash = graphIdText.split(" ")[1];
    expect(dash).to.be.eql('—');
    expect(urlgraphId).to.be.undefined;
});


