const { Given, When } = require('cucumber');
const _ = require('lodash');

const urls = require('../../../config/urls.json');
const users = require('../_data/users.json');

const stepsPath = process.cwd() + '/features/MATH/_pages/';
const { PageObject } = require('../../../app/pageObject');

let pages = {
  login: new PageObject('login.json', stepsPath),
  ams: new PageObject('ams.json', stepsPath),
  raptorAms: new PageObject('raptorAms.json', stepsPath),
  graphTab: new PageObject('graphTab.json', stepsPath),
  newGraph: new PageObject('newGraph.json', stepsPath),
  paletteBasic: new PageObject('paletteBasic.json', stepsPath),
};

/* Verifies Sapling login, AMS page and navigation to AuthorApp page by clicking new Raptor item link */
Given(/^I login to AMS as "(.*)"/, async function (userType) {
  let url = await _.get(urls, ["sapling", this.environment]);
  let user = await _.get(users, [this.environment, userType]);

  await this.driver.get(url);

  await pages.login.populate(username, user.username);
  await pages.login.populate(password, user.password);

  //await pages.login.click(submit);
  // if (env === 'local') {
  //   await qa.click(page.math.login[env].amslink);
  // }
});

When(/^I click on the New Raptor item in the AMS page$/, async function () {
  await qa.click(page.math.ams.raptorNewItem);
});

When(/^I navigate to AuthorApp tab$/, async function () {
  await qa.changeWindow(1);
  await qa.exists(page.math.raptorAms.titleName);
});