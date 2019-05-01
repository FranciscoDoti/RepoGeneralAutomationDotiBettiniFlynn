const { When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;

const chai = require('chai');
const expect = chai.expect;
// chai.use(require("chai-sorted"));
let columnCategories = [" ", " ", "Id", "Title", "Type"];


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
await pages.graphTab.elementExists('sortAscendIcon');
            break;
        case 'descending':
            expect(colArray).to.be.sorted({ descending: true });
await pages.graphTab.elementExists('sortDescendIcon');
            break;
        case 'unsorted':
            expect(colArray).to.be.sorted({ ascending: false });
            expect(colArray).to.be.sorted({ descending: false });
            break;
        default:
            expect(colArray).to.be.sorted();
    }
});

