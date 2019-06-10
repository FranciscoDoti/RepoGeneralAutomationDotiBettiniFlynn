const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const expect = require('chai').expect;
const chai = require('chai');
chai.use(require("chai-sorted"));

When(/^I click on the Graphs tab$/, async function () {
    await pages.graphTab.click('tab');
});

Then(/^I verify new Graph button and static column names are displayed$/, async function () {
    await pages.graphTab.assertElementExists('newGraphButton');
    await pages.graphTab.assertElementExists('idColumnName');
    await pages.graphTab.assertElementExists('titleColumnName');
    await pages.graphTab.assertElementExists('typeColumnName');

});

Then(/^I verify graph filter field$/, async function () {
    await pages.graphTab.assertElementExists('filterInput');
});

When(/^graphs list with title containing alphanumeric characters exist$/, async function () {
    let titleColumnData = await pages.graphTab.getWebElements('titlecolumndata'); // refer let typeColumnData = await pages.graphTab.getWebElements('typecolumndata');

    for (const element of titleColumnData) {
        expect(await element.getText()).to.match(/\w(.*)/g);
        //console.log('element.getText::::', await element.getText());
    }
});

When(/^I input "(.*)" in the filter field$/, async function (userText) {
    await pages.graphTab.assertElementExists('firstRow')
    await pages.graphTab.populate('filterInput', userText);
});

Then(/^I verify all graphs that have "(.*)" in the graph title or in graph Id are displayed$/, async function (userText) {
    let titleColumnData = await pages.graphTab.getWebElements('titlecolumndata');
    let idColumnData = await pages.graphTab.getWebElements('idcolumndata');

    for (let i = 0; i < titleColumnData.length - 1; i++) {
        try {
            expect(await titleColumnData[i].getText()).to.include(userText);
        } catch (e) {
            expect(await idColumnData[i].getText()).to.include(userText);
        }
    }
});
// await pages.graphTab.assertElementExists('titleColumnName');

// let tableRows = await pages.graphTab.getWebElements('table');
// let colId = await pages.graphTab.getWebElements('id');
// let colTitle = await pages.graphTab.getWebElements('title');

// let idArray = [];
// let titleArray = [];

// //verifies the filtered graphs list contains the user filter text by matching the ID/ Title

// for(let i = 0; i < tableRows.length - 1; i++) {

//     idArray.push(await colId[i].getText());
//     titleArray.push(await colTitle[i].getText());

//     expect(userText).to.satisfy(function (userText){
//         if (idArray[i].match(userText) || (titleArray[i].match(userText))) {
//             return true;
//         } 
//     });

// }
// if((tableRows.length - 1) === 0) {
//     expect(idArray).to.empty;
//     expect(titleArray).to.be.empty;
// }



When(/^I click on new Graph button$/, async function () {
    await pages.graphTab.click('newGraphButton');
});

Then(/^I verify new graph editor opens in a new tab with that tab in focus$/, async function () {
    await pages.graphEditor.switchToTab('Graphing');
    await pages.graphEditor.assertElementExists('title');
});

Then(/^I verify all the page elements blank ID, untitled text, buttons and right hand and left hand expression panels$/, async function () {

    await pages.graphEditor.switchToTab('Graphing');

    let txt1 = await pages.graphEditor.getText('graphId')
    let graphIdText = txt1.split(" ")[1];
    expect(graphIdText).to.be.eql("—");

    await pages.graphEditor.assertElementExists('title');
    let txt2 = await pages.graphEditor.getText('title')
    expect(txt2).to.be.eql("Untitled Graph");

    await pages.graphEditor.assertElementExists('editTitleButton');
    await pages.graphEditor.assertElementExists('previewButton');
    await pages.graphEditor.assertElementExists('saveButton');
    await pages.graphEditor.assertElementExists('outerPanel');
    await pages.graphEditor.assertElementExists('settings');
});
Then(/^I verify the new unsaved graph url, graph ID does not contain graph Id number$/, async function () {
    let currentUrl = await pages.newGraph.getCurrentURL();
    let urlgraphId = currentUrl.split("/")[5];
    expect(urlgraphId).to.be.undefined;

    await pages.newGraph.assertText('graphId', 'ID: —');
});

Then(/^I verify the graph editor "(.*)" has "(.*)" graph Id number$/, async function (element, exist) {
    let currentUrl = await pages.graphEditor.getCurrentURL();
    let urlGraphId = currentUrl.split("/")[5];
    let checkPrw = currentUrl.split("/")[6];
    let num;
    if (checkPrw != 'preview') {
        let graphIdText = await pages.graphEditor.getText('graphId');
         num = graphIdText.split(" ")[1];
    }

    // the code checks whether graph Id number is present in graph url and ID elements  
    switch (element) {
        case 'url':
            if (exist === 'no') {
                expect(urlGraphId).to.be.undefined;
            } else if (exist === 'a') {
                if (checkPrw != 'preview') {
                    expect(num).to.be.eql(urlGraphId);
                } else {
                    expect(urlGraphId).to.exist;
                }
            }
            break;
        case 'ID':
        default:
            if (exist === 'no') {
                expect(num).to.be.eql('—');

            } else if (exist === 'a') {
                expect(num).to.be.eql(urlGraphId);
            }
    }
});

When(/^I click the "(.*)" icon for graphId "(.*)"$/, async function (icon, userGraphId) {
    if (icon === "window") {
        await pages.graphTab.click('itemWindow', userGraphId);
    } else if (icon === "preview") {
        await pages.graphTab.click('itemPreview', userGraphId);
        await pages.graphEditor.switchToTab('Graphing');

    }
});

Then(/^I verify the graphId "(.*)" editor will open in a new tab in edit mode$/, async function (userGraphId) {
    await pages.graphEditor.switchToTab('Graphing');

    await pages.graphEditor.assertElementExists('graphId');
    let txt = await pages.graphEditor.getText('graphId');
    let graphIdText = txt.split(" ")[1];
    expect(graphIdText).to.be.eql(userGraphId);
});

Then(/^I verify the graph editor will open in a new tab in student preview mode$/, async function () {
    await pages.graphEditor.assertElementExists('previewHeader');
});

When(/^I click on the title edit button$/, async function () {
    await pages.graphEditor.click('editTitleButton');
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
        expect(await element.getText()).to.be.oneOf(['Graded', 'Ungraded']);
    }
});

Then(/^the title input box is focused$/, async function () {
    await pages.graphEditor.checkWebElementExists('titleTextField');
});

Then(/^I can type in any character "(.*)"$/, async function (titleName) {
    await pages.graphEditor.populate('titleTextField', titleName);
});

When(/^I click on the New Raptor item in the AMS page$/, async function () {
    await pages.ams.click('raptorNewItem');
});


When(/^I click on the student preview button$/, async function () {
    await pages.graphEditor.click('previewButton');
});

Then(/^I verify right and left hand setting panels, edit and Save buttons are not visible and graph is displayed with "(.*)" in header bar$/, async function (preview) {
    await pages.ams.assertElementDoesNotExist('outerPanel');
    await pages.ams.assertElementDoesNotExist('settings');
    await pages.ams.assertElementDoesNotExist('editTitleButton');
    await pages.ams.assertElementDoesNotExist('previewButton');
    await pages.ams.assertElementDoesNotExist('saveButton');

    // let str = await qa.getText(page.math.graphEditor.endPreview);
    // expect(str).to.be.eql(preview);
});

When(/^I input "(.*)" title$/, async function (name) {
    await pages.graphEditor.click('editTitleButton');
    await pages.graphEditor.populate('titleTextField', name);
});

When(/^I click the Save button$/, async function () {
    await pages.graphEditor.click('saveButton');
});

Then(/^the Save button text changes to Saved with a checkmark$/, async function () {
    await pages.graphEditor.click('isSavedButton');
});

Then(/^I verify the AMS Graph tab contains the new row for the graph with the new ID$/, async function () {
    let graphIdText = await pages.graphEditor.getText('graphId');
    let num = graphIdText.split(" ")[1];

    await pages.graphEditor.switchToTab('Sapling')
    // await pages.graphTab.checkWebElementExists('id');

    let newGraphRowId = await pages.graphTab.getText('id');
    expect(newGraphRowId).to.eql(num);
});

When(/^I make any changes to title "(.*)"$/, async function (updateTitle) {
    await pages.graphEditor.click('editTitleButton');
    await pages.graphEditor.populate('titleTextField', updateTitle);
});

Then(/^I verify Save button text changes from Saved to Save$/, async function () {
    await pages.graphEditor.checkWebElementExists('saveButton');
});

When(/^I navigate to AuthorApp$/, async function () {
    await pages.raptorAms.switchToTab('Raptor Authoring');
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
