const path = require('path');
var Imap = require('imap')
var simpleParser = require("mailparser").simpleParser;
const { Given, When, Then, After } = require('cucumber');
const { loadConfig, loadLogin, loadData } = require('../../../app/util');
const expect = require('chai')
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const chromePath = require('chromedriver').path;
const { log } = require('../../../app/logger');
const { getDriver, getWebDriver, sleep } = require('../../../app/driver');
const { By, Key } = require('selenium-webdriver'); 
const config = loadConfig('config');


let pages = {
  raptorAMS: new PageObject('math-raptorAMS.json', stepsPath),
};

const driver = getDriver();

/* Scenario 1: Verify sapling AMS page is loaded and navigate to AuthorApp page by clicking new Raptor item link */


Given(/^AMS page is loaded and New Raptoritem button link exists$/, async function(){
  await sleep(1000);
  console.log('Verifying the raptor item');
  await pages.raptorAMS.checkWebElementExists('raptorNewItem');
  console.log('Verified checkWebElementExists');
} );

Then(/^Author clicks on the Raptor item and navigates to the AuthorApp page$/, async function(){
  await sleep(1000);
  await pages.raptorAMS.populate('raptorNewItem', 'click');
  await sleep(1000);
});

/* Scenario 2: Author creates a Graded equation module of eval type: Relation */

Given(/^AuthorApp page is loaded with focus on ItemDetails tab, saved as "(.*)"$/, async function(name){
 
  const handles = await getDriver().getAllWindowHandles();
  getDriver().switchTo().window(handles[1]);   
  await sleep(3000);
  console.log("test name" + name);  
  await pages.raptorAMS.checkWebElementExists('titleName');
  console.log("test name" + name);  
  await pages.raptorAMS.populate('titleName', name);
 });

 When(/^user clicks on the Module Tab, and selects the Graded equation$/, async function(){
   await sleep(1000);
  //  await pages.raptorAMS.checkWebElementExists('moduleTab');
   await pages.raptorAMS.populate('moduleTab', 'click');
   await sleep(1000);
   await pages.raptorAMS.checkWebElementExists('gradedEquationButtonlink');
   await pages.raptorAMS.populate('gradedEquationButtonlink','click');
 });

 Then(/^verify the Activity Editor opens up with focus on Question tab$/, async function(){
   await sleep(1000);
   await pages.raptorAMS.checkWebElementExists('questionTab');
 });

 Then(/^the user clicks on the Question tab, adding Answer text field to the tab$/, async function(){
   await sleep(1000);
   await pages.raptorAMS.populate('questionContent', 'click');
   await pages.raptorAMS.checkWebElementExists('answerText');
 });

 Then(/^the user clicks on correct tab, selects Grade As Relation type in Editor panel and inputs "(.*)" equation$/, async function(eval){
    await sleep(1000);
    await pages.raptorAMS.checkWebElementExists('correctTab');
    await pages.raptorAMS.populate('correctTab', 'click');
    const evalGrade = await loadLogin(eval);
   
    await pages.raptorAMS.populate('gradeAs', 'click');

    await pages.raptorAMS.populate('gradeAs', 'Relation');
    await sleep(1000);

    const textArea1 = await driver.findElement(getWebDriver().By.css('#module-edit-area > div > div > div.greq-edit-panel > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(2) > div > div > textarea'));
    await textArea1.sendKeys(Key.RETURN);
    await textArea1.sendKeys(Key.BACK_SPACE);
    await sleep(2000);
    driver.executeScript(`const ta=document.querySelectorAll('textarea.ace_text-input'); ta[1].value='${evalGrade.EvalQ1.Equation}'; ta[1].dispatchEvent(new Event('input'))`);
    const textArea2 = await driver.findElement(getWebDriver().By.css('#module-edit-area > div > div > div.greq-edit-panel > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > textarea'));
    await textArea2.sendKeys(Key.RETURN);
    driver.executeScript(`const ta=document.querySelectorAll('textarea.ace_text-input'); ta[0].value='${evalGrade.EvalQ1.Equation}'; ta[0].dispatchEvent(new Event('input'))`);
    await sleep(2000);

 });


/* Scenario 3: Author simulates the student Take mode and inputs correct answer  */

 Given(/^the author saves the question module$/, async function(){
  await pages.raptorAMS.checkWebElementExists('saveButton');
  await pages.raptorAMS.populate('saveButton', 'click');
  await sleep(1000);
 });

 Then(/^clicks on take mode button and inputs correct answer "(.*)" in the answer field$/, async function(eval){
  await sleep(1000);
  await pages.raptorAMS.checkWebElementExists('takeModeButton');
  await pages.raptorAMS.populate('takeModeButton', 'click');
  await sleep(1000);
  await pages.raptorAMS.checkWebElementExists('answerTextTakeMode');
  await pages.raptorAMS.populate('takeModeAnswerText', 'click');
  await sleep(1000);
  await pages.raptorAMS.populate('takemodeAnswer2', 'click');
  await sleep(1000);
  await pages.raptorAMS.populate('takemodeAnswerx', 'click');
  await sleep(1000);
  await pages.raptorAMS.populate('takemodeAnswerplus', 'click');
  await sleep(1000);
  await pages.raptorAMS.populate('takemodeAnswer2', 'click');
  await sleep(1000);
  await pages.raptorAMS.populate('takemodeAnswer6', 'click');
  await sleep(1000);
  await pages.raptorAMS.populate('takemodeAnswerequal', 'click');
  await sleep(1000);
  await pages.raptorAMS.populate('takemodeAnswer0', 'click');
  await sleep(1000);

 });

 When(/^clicks on simulate grading button, the answer is graded correct$/, async function(){
   await pages.raptorAMS.checkWebElementExists('simulateButton');
   await pages.raptorAMS.populate('simulateButton', 'click');
   await pages.raptorAMS.checkWebElementExists('gradedCorrect');
   await sleep(5000);
 });



