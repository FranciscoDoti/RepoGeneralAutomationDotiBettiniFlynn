const {Then} = require('cucumber');
const pages = require('../pages/.page.js').pages;

const fs = require('fs');

/* Scenario 1: User creates and saves a new AMS raptor item and sets the item status to live */

Then(/^I create a new graded (".*") (".*") and save the question$/, async function (eval, eqn) {


await pages.raptorAms.populate('titleName',  "itemlive");
  let itemid = await qa.getText(page.math.ams.getItemid);

  // writing item id number into a file
  let num = itemid.split(" / ")[0]
  fs.writeFileSync('raptor-itemId.txt', num);

await pages.raptorAms.click('moduleTab');
await pages.raptorAms.click('gradedEquationButtonlink');
await pages.raptorAms.click('questionContent');
await pages.raptorAms.click('correctTab');
await pages.raptorAms.populate('gradeAs',  eval);
await pages.raptorAms.click('gradeAs');
await pages.raptorAms.sendKeys('equationField',  eqn);
await pages.raptorAms.click('saveButton, 1000');
});