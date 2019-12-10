'use strict';
const { When, Then } = require('cucumber');
const ngaPages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;


When(/^I select \"([^\"]*)\" policy for the assessment and save$/, async function (policyname) {
  await ngaPages.settingsPage.click('Policy Options', policyname);
  await ngaPages.settingsPage.click('button', "Save");
});

Then(/^I see the policy "(.*)" mentioned with the assessment title$/, async function (policyname) {
  await ngaPages.assignmentTab.assertText('policy name', policyname);
});