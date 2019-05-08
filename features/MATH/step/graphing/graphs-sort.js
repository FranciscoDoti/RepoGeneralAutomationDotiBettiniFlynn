const { When, Then } = require('cucumber');
const selenium = require('../../../../app/selenium.js');
const page = require('../../../master-page.js');
const chai = require('chai');
const expect = chai.expect;
let columnCategories = [" ", " ", "Id", "Title", "Type"];


When(/^I click on the "(.*)" column name$/, async function (columnName) {
    let qa = new selenium(this.driver);

    switch (columnName) {
        case 'Title':
            await qa.click(page.math.graphTab.titleColumnName);
            break;
        case 'Type':
            await qa.click(page.math.graphTab.typeColumnName);
            break;
        case 'Id':
        default:
            await qa.click(page.math.graphTab.idColumnName);
    }
});

Then(/^I verify the graphs list is "(.*)" order of graph "(.*)" column name$/, async function (sort, columnName) {
    qa = new selenium(this.driver);

    let cnum = 0;
    cnum = columnCategories.indexOf(columnName);

    // locates and assigns element array of user requested columnName 
    let colCat = await this.driver.findElements(qa._locator(`table.graphList > tbody > tr > td[data-test-id]:nth-child(${cnum})`))

    let colArray = [];
    for (let i = 0; i < colCat.length; i++) {
        if (columnName === 'Id') {
            colArray.push(parseInt(await colCat[i].getText()));
        } else {
            colArray.push(await colCat[i].getText());
        }
    }
    switch (sort) {
        case 'ascending':
            if (columnName === 'Title') {
                expect(colArray).to.be.eql(colArray.sort());
            } else {
                expect(colArray).to.be.ascending;
            }
            await qa.exists(page.math.graphTab.sortAscendIcon);
            break;
        case 'descending':
            if (columnName === 'Title') {
                expect(colArray).to.be.eql(colArray.reverse());
            } else {
                expect(colArray).to.be.descending;
            }
            await qa.exists(page.math.graphTab.sortDescendIcon);
            break;
        case 'unsorted':
            expect(colArray).to.be.not.sorted();
            break;
        default:
            expect(colArray).to.be.sorted();
    }
});


