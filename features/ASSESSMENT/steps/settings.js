'use strict';
const { When, Then } = require('cucumber');
const ngaPages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;


When(/^I select "(.*)" policy for the assessment$/, async function (policyname) {
    let policyList = await ngaPages.settingsPage.getWebElements('policy options list');
    for(let i=1; i< policyList.length; i++){
        if(policyname === await ngaPages.settingsPage.getAttributeValue('policy options name',i, 'name')){
            await ngaPages.settingsPage.click('policy options',i);
        }
    }
    
});

When('save the changes', async function () {
  await ngaPages.settingsPage.click('button', "Save");
});

Then(/^I see the policy "(.*)" mentioned with the assessment title$/, async function (policyname) {
  await ngaPages.assignmentTab.assertText('policy name', policyname);
});