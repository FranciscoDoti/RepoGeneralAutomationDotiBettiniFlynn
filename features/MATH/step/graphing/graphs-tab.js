const { Given, When, Then } = require('cucumber');
const selenium = require('../../../../app/selenium.js');
const assert_text = require('../../../../features/master-text.js');
const page = require('../../../master-page.js');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-match'));


When(/^I click on the Graphs tab$/, async function () {
    let qa = new selenium(this.driver);
    await qa.click(page.math.graphTab.tab);
    await qa.switchFrame('graphsFrame');
});

Given(/^I verify the Graphs tab exists$/, async function () {
    let qa = new selenium(this.driver);
    await qa.exists(page.math.ams.graphTab);
});

Given(/^I verify that Graphs tab does not exist$/, async function () {
    let qa = new selenium(this.driver);
    await qa.doesNotExist(page.math.ams.graphTab);

});

Then(/^I verify new Graph button and static column names are displayed$/, async function () {
    let qa = new selenium(this.driver);

    //  Verify button, column name elements
    await qa.exists(page.math.graphTab.newGraphButton);
    await qa.exists(page.math.graphTab.idColumnName);
    await qa.exists(page.math.graphTab.titleColumnName);
    await qa.exists(page.math.graphTab.typeColumnName);

});
Then(/^I verify graph filter field$/, async function () {
    let qa = new selenium(this.driver);

    await qa.switchDefaultContent();
    await qa.exists(page.math.graphTab.filterInput);
});


Then(/^I verify Graph type is Graded or Ungraded$/, async function () {
    let qa = new selenium(this.driver);

    let tableRows = await this.driver.findElements(qa._locator(page.math.graphTab.table));

    let txt = await this.driver.findElements(qa._locator(page.math.graphTab.type));
    let isGraded = [];
    for(let i = 0; i < tableRows.length - 1; i++) {
        isGraded.push(await txt[i].getText());
        expect(assert_text.math.graphType).to.include(isGraded[i]);
    }
});

When(/^graphs list with title containing alphanumeric characters exist$/, async function () {
    let qa = new selenium(this.driver);

    let tableRows = await this.driver.findElements(qa._locator(page.math.graphTab.table));

    let colTitle = await this.driver.findElements(qa._locator(page.math.graphTab.title))
    let titleArray = [];
    for(let i = 0; i < tableRows.length - 1; i++) {
        titleArray.push(await colTitle[i].getText());
        expect(titleArray[i]).to.match(/\w(.*)/g);
    }
});

When(/^I input "(.*)" in the filter field$/, async function (userText) {
    let qa = new selenium(this.driver);

    await qa.exists(page.math.graphTab.firstRow);

    await qa.switchDefaultContent();
    await qa.input(page.math.graphTab.filterInput, userText);
});

Then(/^I verify all graphs that have "(.*)" in the graph title or in graph Id are displayed$/, async function (userText) {
    let qa = new selenium(this.driver);

    await qa.switchFrame('graphsFrame');
    await qa.exists(page.math.graphTab.titleColumnName);

    let tableRows = await this.driver.findElements(qa._locator(page.math.graphTab.table));

    let colId = await this.driver.findElements(qa._locator(page.math.graphTab.id));
    let colTitle = await this.driver.findElements(qa._locator(page.math.graphTab.title));
    let idArray = [];
    let titleArray = [];

    //verifies the filtered graphs list contains the user filter text by matching the ID/ Title

    for(let i = 0; i < tableRows.length - 1; i++) {
        idArray.push(await colId[i].getText());
        titleArray.push(await colTitle[i].getText());
        expect(userText).to.satisfy(function (userText){
            if (idArray[i].match(userText) || (titleArray[i].match(userText))) {
                return true;
            } 
        });
        
    }
    if((tableRows.length - 1) === 0) {
        expect(idArray).to.empty;
        expect(titleArray).to.be.empty;
    }
});



