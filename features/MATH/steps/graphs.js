const { When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;
const expect = require('chai').expect;
const chai = require('chai');
// chai.use(require("chai-sorted"));
let columnCategories = [" ", " ", "Id", "Title", "Type"];

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
    await pages.newGraph.switchToTab('Graphing');
    pages.graphTab.assertElementExists('newGraphButton');
    pages.graphTab.assertElementExists('idColumnName');
    pages.graphTab.assertElementExists('titleColumnName');
    pages.graphTab.assertElementExists('typeColumnName');
});

When(/^I click on the New Raptor item in the AMS page$/, async function () {
    await pages.ams.click('raptorNewItem');
});

When(/^I navigate to AuthorApp$/, async function () {
    await qa.changeWindow(1);
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
    
    
        let cnum = 0;
        cnum = columnCategories.indexOf(columnName);
    
        // locates and assigns element array of user requested columnName 
        let colCat = await this.driver.findElements(qa._locator(`table.graphList > tbody > tr > td[data-test-id]:nth-child(${cnum})`))
    
        let colArray = [];
        for (let i = 0; i < colCat.length; i++) {
            colArray.push(colCat[i].getText());
        }
        switch (sort) {
            case 'ascending':
                expect(colArray).to.be.sorted();
    await pages.graphTab.assertElementExists('sortAscendIcon');
                break;
            case 'descending':
                expect(colArray).to.be.sorted({ descending: true });
    await pages.graphTab.assertElementExists('sortDescendIcon');
                break;
            case 'unsorted':
                expect(colArray).to.be.sorted({ ascending: false });
                expect(colArray).to.be.sorted({ descending: false });
                break;
            default:
                expect(colArray).to.be.sorted();
        }
    });
    

    





    

    
    Then(/^I verify Graph type is Graded or Ungraded$/, async function () {
    
        let tablerows = await this.driver.findElements(qa._locator('#graph-panel > * tr'));
        let actualrows = tablerows.length - 1;
    
        for (let i = 1; i <= actualrows; i++) {
            let txt = await qa.getText(`table.graphList > tbody > tr:nth-child(${i}) > td:nth-child(4)`);
            expect(assert_text.math.graphType).to.include(txt);
        }
    });
    
    