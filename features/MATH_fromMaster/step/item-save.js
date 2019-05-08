const { Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const fs = require('fs');


/* Scenario 1: User creates and saves a new AMS raptor item and sets the item status to live */


Then(/^I note the item Id and save in a temp file$/, async function () {
  let qa = new selenium(this.driver);

  let itemid = await qa.getText(page.math.ams.getItemid);

  // writing item id number into a file
  let num = itemid.split(": ")[1]
  fs.writeFileSync('raptor-itemId.txt', num);
});
