const { When, Then } = require('cucumber');
const expect = require('chai').expect;

When(/^I click on Graph button$/, async function () {
    let qa = new selenium(this.driver);
    await qa.click(page.math.graphTab.newGraphbutton);
});

Then(/^I verify new graph editor opens in a new tab with that tab in focus$/, async function () {
    let qa = new selenium(this.driver);
    await qa.changeWindow(1);
    await qa.exists(page.math.newGraph.title);
});

Then(/^I verify the new unsaved graph url, graph ID does not contain graph Id number$/, async function () {
    let qa = new selenium(this.driver);
    let currentUrl = await qa.getUrl();
    let urlgraphId = currentUrl.split("/")[5];
    let graphIdText= await qa.getText(page.math.newGraph.graphId);
    dash = graphIdText.split(" ")[1];
    expect(dash).to.be.eql('—');
    expect(urlgraphId).to.be.undefined;
});


