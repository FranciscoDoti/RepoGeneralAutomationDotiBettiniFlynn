const {Then} = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const fs = require('fs');

/* Scenario 1: User creates and saves a new AMS raptor item and sets the item status to live */

Then(/^I create a new graded (".*") (".*") and save the question$/, async function (eval, eqn) {
  let qa = new selenium(this.driver);

  await qa.input(page.math.raptorAms.titleName, "itemlive", true);
  let itemid = await qa.getText(page.math.ams.getItemid);

  // writing item id number into a file
  let num = itemid.split(" / ")[0]
  fs.writeFileSync('raptor-itemId.txt', num);

  await qa.click(page.math.raptorAms.moduleTab);
  await qa.click(page.math.raptorAms.gradedEquationButtonlink);
  await qa.click(page.math.raptorAms.questionContent);
  await qa.click(page.math.raptorAms.correctTab);
  await qa.input(page.math.raptorAms.gradeAs, eval);
  await qa.click(page.math.raptorAms.gradeAs);
  await qa.sendKeys(page.math.raptorAms.equationField, eqn);
  await qa.click(page.math.raptorAms.saveButton, 1000);
});