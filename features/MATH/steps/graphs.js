const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const expect = require('chai').expect;
const chai = require('chai');
const _= require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const {visitURL} = require(`${process.cwd()}/app/driver`)
chai.use(require('chai-sorted'));

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
  let graphIdText = txt1.split(' ')[1];
  expect(graphIdText).to.be.eql('—');

  await pages.graphEditor.assertElementExists('title');
  let txt2 = await pages.graphEditor.getText('title')
  expect(txt2).to.be.eql('Untitled Graph');

  await pages.graphEditor.assertElementExists('editTitleButton');
  await pages.graphEditor.assertElementExists('previewButton');
  await pages.graphEditor.assertElementExists('saveButton');
  await pages.graphEditor.assertElementExists('outerPanel');
  await pages.graphEditor.assertElementExists('settingsIcon');
});

Then(/^I verify the new unsaved graph url, graph ID does not contain graph Id number$/, async function () {
  let currentUrl = await pages.newGraph.getCurrentURL();
  let urlgraphId = currentUrl.split('/')[5];
  expect(urlgraphId).to.be.undefined;

  await pages.newGraph.assertText('graphId', 'ID: —');
});

Then(/^I verify the graph editor "(.*)" has "(.*)" graph Id number$/, async function (element, exist) {
  let currentUrl = await pages.graphEditor.getCurrentURL();
  let urlGraphId = currentUrl.split('/')[5];
  let checkPrw = currentUrl.split('/')[6];
  let num;
  if (checkPrw !== 'preview') {
    let graphIdText = await pages.graphEditor.getText('graphId');
    num = graphIdText.split(' ')[1];
  }

  // the code checks whether graph Id number is present in graph url and ID elements
  switch (element) {
    case 'url':
      if (exist === 'no') {
        expect(urlGraphId).to.be.undefined;
      } else if (exist === 'a') {
        if (checkPrw !== 'preview') {
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
  if (icon === 'window') {
    await pages.graphTab.click('itemWindow', userGraphId);
    await pages.graphEditor.switchToTab('Graphing');
  } else if (icon === 'preview') {
    await pages.graphTab.click('itemPreview', userGraphId);
    await pages.graphEditor.switchToTab('Graphing');
  }
});

Then(/^I verify the graphId "(.*)" editor will open in a new tab in edit mode$/, async function (userGraphId) {
  await pages.graphEditor.switchToTab('Graphing');

  await pages.graphEditor.assertElementExists('graphId');
  let txt = await pages.graphEditor.getText('graphId');
  let graphIdText = txt.split(' ')[1];
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
  await pages.graphEditor.assertElementExists('titleTextField');
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

Then(/^I verify author panels and controls not visible and graph is displayed with student header bar$/, async function () {
  await pages.graphEditor.assertElementDoesNotExist('outerPanel');
  // TODO: Only do one assertDoesNotExist because the logic of how it is implemented is flawed
  // await pages.graphEditor.assertElementDoesNotExist('settingsIcon');
  // await pages.graphEditor.assertElementDoesNotExist('editTitleButton');
  // await pages.graphEditor.assertElementDoesNotExist('previewButton');
  // await pages.graphEditor.assertElementDoesNotExist('saveButton');
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
  let num = graphIdText.split(' ')[1];

  await pages.graphEditor.switchToTab('Sapling')
  // await pages.graphTab.assertElementExists('id');

  let newGraphRowId = await pages.graphTab.getText('id');
  expect(newGraphRowId).to.eql(num);
});

When(/^I make any changes to title "(.*)"$/, async function (updateTitle) {
  await pages.graphEditor.click('editTitleButton');
  await pages.graphEditor.populate('titleTextField', updateTitle);
});

Then(/^I verify Save button text changes from Saved to Save$/, async function () {
  await pages.graphEditor.assertElementExists('saveButton');
});

When(/^I navigate to AuthorApp$/, async function () {
  await pages.raptorAms.switchToTab('Raptor Authoring');
  await pages.raptorAms.assertElementExists('menuBarAdd');
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

Then(/^I go back to sapling page and logout$/, async function(){
let url = await _.get(urls, ['sapling', this.environment]);
await pages.saplingLearning.switchToTab('Sapling');
await visitURL(url);
await pages.saplingLearning.click('RaptorAdmin');
await pages.saplingLearning.click('logout');
});

When(/^I try to save the previously opened graph editor$/, async function(){
  await pages.graphEditor.switchToTab('Graphing');
  await pages.graphEditor.click('saveButton');
});

Then(/^the unauthorized error message pops up$/, async function(){
  const driver = pages.graphEditor.getDriver()
  await driver.sleep(1000)
  try {
    const alert = await driver.switchTo().alert();
    const text = await alert.getText()
    expect(text).to.be.eql('Error: Unauthorized, please log in and try again.');
    alert.accept()
  } catch (err) {
  }
});

Then(/^the error message to contact an Assessments representative pops up$/, async function(){
  const driver = pages.graphEditor.getDriver()
  await driver.sleep(1000)
  try {
    const alert = await driver.switchTo().alert();
    const text = await alert.getText()
    expect(text).to.be.eql('Error: An error occurred. Please try again or contact an Assessments representative.');
    alert.accept()
  } catch (err) {
  }
});

Then(/^the alert message to refresh your AMS tab pops up$/, async function(){
  const driver = pages.graphEditor.getDriver()
  await driver.sleep(1000)
  try {
    const alert = await driver.switchTo().alert();
    const text = await alert.getText();
    expect(text).to.be.eql('Graph saved. You may need to refresh your AMS tab to see the changes.');
    alert.accept()
  } catch (err) {
  }
});

When(/^I input non-existing graphid in the graph editor url$/, async function(){
let url = await _.get(urls, ['graph', this.environment]);
await visitURL(url, Key.ENTER);
await pages.graphEditor.click('saveButton');

})