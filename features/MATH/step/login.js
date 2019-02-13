const { Given, When } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const URL = require('../../_support/url.js');
const _ = require('lodash');
const config = require('../../../config.js')

/* Verifies Sapling login, AMS page and navigation to AuthorApp page by clicking new Raptor item link */

Given(/^I login to AMS/, async function() {
    const env = config.environment
    let qa = new selenium(this.driver);
    let url = await _.get(URL, ["math", env]);
    await qa.goTo(url);
    const user = require(`../_data/user.json`);
    await qa.input(page.math.login[env].username, user[env].username, true);
    await qa.input(page.math.login[env].password, user[env].password, true);
    await qa.click(page.math.login[env].submit);
    if (env === 'local') {
        await qa.click(page.math.login[env].amslink); 
    }
});

When(/^I click on the New Raptor item in the AMS page$/, async function () {
    let qa = new selenium(this.driver);
    await qa.click(page.math.raptorAms.raptorNewItem);
  });
  
  When(/^I navigate to AuthorApp tab$/, async function () {
    let qa = new selenium(this.driver);
    await qa.changeWindow(1);
    await qa.exists(page.math.raptorAms.titleName);
  });