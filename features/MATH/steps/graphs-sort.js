const { When, Then } = require('cucumber');
const chai = require('chai');
const expect = chai.expect;
//chai.use(require("chai-sorted"));
let columnCategories = [" ", " ", "Id", "Title", "Type"];


When(/^I click on the "(.*)" column name$/, async function (columnName) {
    let qa = new selenium(this.driver);
    
    switch (columnName) {
        case 'Id':
            await qa.click(page.math.graphTab.idColumnName);
            break;
        case 'Title':
            await qa.click(page.math.graphTab.titleColumnName);
            break;
        case 'Type':
            await qa.click(page.math.graphTab.typeColumnName);
            break;
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
        colArray.push(colCat[i].getText());
    }
    switch (sort) {
        case 'ascending':
            expect(colArray).to.be.sorted();
            await qa.exists(page.math.graphTab.sortAscendIcon);
            break;
        case 'descending':
            expect(colArray).to.be.sorted({ descending: true });
            await qa.exists(page.math.graphTab.sortDescendIcon);
            break;
        case 'unsorted':
            expect(colArray).to.be.sorted({ ascending: false });
            expect(colArray).to.be.sorted({ descending: false });
            break;
        default:
            expect(colArray).to.be.sorted();
    }
});

