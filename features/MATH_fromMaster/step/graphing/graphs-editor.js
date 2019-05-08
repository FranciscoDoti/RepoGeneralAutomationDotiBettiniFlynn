const { When, Then } = require('cucumber');
const selenium = require('../../../../app/selenium.js');
const page = require('../../../master-page.js');
const expect = require('chai').expect;


When(/^I click on new Graph button$/, async function () {
    let qa = new selenium(this.driver);
    await qa.click(page.math.graphTab.newGraphButton);
});

Then(/^I verify new graph editor opens in a new tab with that tab in focus$/, async function () {
    let qa = new selenium(this.driver);
    await qa.changeWindow(1);
    await qa.exists(page.math.graphEditor.title);
});

Then(/^I verify the graph editor "(.*)" has "(.*)" graph Id number$/, async function (element, exist) {
    let qa = new selenium(this.driver);

    let currentUrl = await qa.getUrl();
    let urlGraphId = currentUrl.split("/")[5];

    let graphIdText = await qa.getText(page.math.graphEditor.graphId);
    let num = graphIdText.split(" ")[1];

    // the code checks whether graph Id number is present in graph url and ID elements  
    switch (element) {
        case 'url':
            if (exist === 'no') {
                expect(urlGraphId).to.be.undefined;
            } else if (exist === 'a') {
                expect(num).to.be.eql(urlGraphId);
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
    let qa = new selenium(this.driver);

    if (icon === "window") {
        await qa.click(`${page.math.graphTab.itemWindow}${userGraphId}']`)
    } else if (icon === "preview") {
        await qa.click(`${page.math.graphTab.itemPreview}${userGraphId}']`)
    }

});

Then(/^I verify the graphId "(.*)" editor will open in a new tab in edit mode$/, async function (userGraphId) {
    let qa = new selenium(this.driver);

    await qa.changeWindow(1);

    // the element text value "-" is loading first (blank graph) and later graph Id number is loaded, so expect code is failing, 
    // for now sleep is temporarily used, the story task MTH-935 is looking into this issue
    await qa.sleep(2000)
    await qa.exists(page.math.graphEditor.graphId);
    let txt = await qa.getText(page.math.graphEditor.graphId);
    let graphIdText = txt.split(" ")[1];
    expect(graphIdText).to.be.eql(userGraphId);
});

Then(/^I verify all the page elements blank ID, untitled text, buttons and right hand and left hand expression panels$/, async function () {
    let qa = new selenium(this.driver);

    await qa.changeWindow(1);
    let txt1 = await qa.getText(page.math.graphEditor.graphId)
    let graphIdText = txt1.split(" ")[1];
    expect(graphIdText).to.be.eql("—");

    await qa.exists(page.math.graphEditor.title);
    let txt2 = await qa.getText(page.math.graphEditor.title)
    expect(txt2).to.be.eql("Untitled Graph");

    await qa.exists(page.math.graphEditor.editTitleButton);
    await qa.exists(page.math.graphEditor.previewButton);
    await qa.exists(page.math.graphEditor.saveButton);
    await qa.exists(page.math.graphEditor.outerPanel);
    await qa.exists(page.math.graphEditor.settings);
});

Then(/^I verify the graph editor will open in a new tab in student preview mode$/, async function () {
    let qa = new selenium(this.driver);

    await qa.changeWindow(1);

    // the element is taking time to load
    await qa.sleep(2000)
    await qa.exists(page.math.graphEditor.previewHeader);
});

Then(/^I verify the AMS Graph tab contains the new row for the graph with the new ID$/, async function () {
    let qa = new selenium(this.driver);

    let graphIdText = await qa.getText(page.math.graphEditor.graphId);
    let num = graphIdText.split(" ")[1];

    await qa.changeWindow(0);
    await qa.switchFrame('graphsFrame');

    await qa.exists(page.math.graphTab.id);
    let newGraphRowId = await qa.getText(page.math.graphTab.id);
    expect(newGraphRowId).to.eql(num);
});

When(/^I click on the title edit button$/, async function () {
    let qa = new selenium(this.driver);

    await qa.click(page.math.graphEditor.editTitleButton);
});

Then(/^the title input box is focused$/, async function () {
    let qa = new selenium(this.driver);

    await qa.exists(page.math.graphEditor.titleTextField);
});

Then(/^I can type in any character "(.*)"$/, async function (titleName) {
    let qa = new selenium(this.driver);

    await qa.input(page.math.graphEditor.titleTextField, titleName);
});

When(/^I click on the student preview button$/, async function () {
    let qa = new selenium(this.driver);

    await qa.click(page.math.graphEditor.previewButton);
});

Then(/^I verify right and left hand setting panels, edit and Save buttons are not visible and graph is displayed with "(.*)" in header bar$/, async function (preview) {
    let qa = new selenium(this.driver);

    await qa.doesNotExist(page.math.graphEditor.outerPanel);
    await qa.doesNotExist(page.math.graphEditor.settings);
    await qa.doesNotExist(page.math.graphEditor.editTitleButton);
    await qa.doesNotExist(page.math.graphEditor.previewButton);
    await qa.doesNotExist(page.math.graphEditor.saveButton);

    let str = await qa.getText(page.math.graphEditor.endPreview);
    expect(str).to.be.eql(preview);
});

When(/^I input "(.*)" title$/, async function (name) {
    let qa = new selenium(this.driver);

    await qa.click(page.math.graphEditor.editTitleButton);
    await qa.input(page.math.graphEditor.titleTextField, name);
});

When(/^I click the Save button$/, async function () {
    let qa = new selenium(this.driver);

    await qa.click(page.math.graphEditor.saveButton);
});

Then(/^the Save button text changes to Saved with a checkmark$/, async function () {
    let qa = new selenium(this.driver);

    await qa.click(page.math.graphEditor.isSavedButton);
});

When(/^I make any changes to title$/, async function () {
    let qa = new selenium(this.driver);

    await qa.click(page.math.graphEditor.editTitleButton);
    await qa.input(page.math.graphEditor.titleTextField, 'test1');
});

Then(/^I verify Save button text changes from Saved to Save$/, async function () {
    let qa = new selenium(this.driver);

    await qa.exists(page.math.graphEditor.saveButton);
});
