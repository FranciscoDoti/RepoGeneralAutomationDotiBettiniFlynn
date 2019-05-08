const { When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;
const expect = require('chai').expect;
const chai = require('chai');
chai.use(require("chai-sorted"));

When(/^I click on the Graphs Tab$/, async function () {
    await pages.graphTab.click('tab');
});

When(/^I click on Graph button$/, async function () {
    await pages.graphTab.click('newGraphButton');
});

Then(/^I verify new graph editor opens in a new tab with that tab in focus$/, async function () {
    await pages.newGraph.switchToTab('Graphing');
    await pages.newGraph.assertElementExists('title');
});
    
Then(/^I verify the new unsaved graph url, graph ID does not contain graph Id number$/, async function () {
    let currentUrl = await pages.newGraph.getCurrentURL();
    let urlgraphId = currentUrl.split("/")[5];
    expect(urlgraphId).to.be.undefined;

    await pages.newGraph.assertText('graphId','ID: —');
});

Then(/^I verify the new Graphs tab exists$/, async function () {
    await pages.ams.assertElementExists('graphTab');
});

Then(/^I verify that Graphs tab does not exist$/, async function () {
    await pages.ams.assertElementDoesNotExist('graphTab');
});

Then(/^I verify Graph button and static column names are displayed$/, async function () {
    await pages.graphTab.assertElementExists('newGraphButton');
    await pages.graphTab.assertElementExists('idColumnName');
    await pages.graphTab.assertElementExists('titleColumnName');
    await pages.graphTab.assertElementExists('typeColumnName');
});

Then(/^I verify Graph type is Graded or Ungraded$/, async function () {
    let typeColumnData = await pages.graphTab.getWebElements('typecolumndata');

    for (const element of typeColumnData) {
        expect(await element.getText()).to.be.oneOf(['Graded','Ungraded']); 
    }
});

When(/^I click on the New Raptor item in the AMS page$/, async function () {
    await pages.ams.click('raptorNewItem');
});

When(/^I navigate to AuthorApp tab$/, async function () {
    await pages.raptorAms.switchToTab('Raptor Authoring');
    await pages.raptorAms.assertElementExists('addMenuBar');
});

When(/^I click on the "(.*)" column name$/, async function (columnName) {
    switch (columnName) {
        case 'Id':
            await pages.graphTab.click('idColumnName');
            break;
        case 'Title':
            await pages.graphTab.click('titleColumnName');
            break;
        case 'Type':
            await pages.graphTab.click('typeColumnName');
            break;
        default:
            await pages.graphTab.click('idColumnName');
    }
});
    
Then(/^I verify the graphs list is "(.*)" order of graph "(.*)" column name$/, async function (sort, columnName) {
    let columnElements;
    
    switch (columnName) {
        case 'Id':
            columnElements = await pages.graphTab.getWebElements('idcolumndata');
            break;
        case 'Title':
            columnElements = await pages.graphTab.getWebElements('titlecolumndata');
            break;
        case 'Type':
            columnElements = await pages.graphTab.getWebElements('typecolumndata');
            break;
        default:
            columnElements = await pages.graphTab.getWebElements('idcolumndata');
    }

    let dataArray = [];
    for (let i = 0; i < dataArray.length; i++) {
        dataArray.push(columnElements[i].getText());
    }
    switch (sort) {
        case 'ascending':
            expect(dataArray).to.be.sorted();
            await pages.graphTab.assertElementExists('sortAscendIcon');
            break;
        case 'descending':
            expect(dataArray).to.be.sorted({
                descending: true
            });
            await pages.graphTab.assertElementExists('sortDescendIcon');
            break;
        case 'unsorted':
            expect(dataArray).to.be.sorted({
                ascending: false
            });
            expect(dataArray).to.be.sorted({
                descending: false
            });
            break;
        default:
            expect(dataArray).to.be.sorted();
    }
});
