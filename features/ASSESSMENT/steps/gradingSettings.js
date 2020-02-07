'use strict';
const {  When  } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { gradingsettingslib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);



When (/^I set the grading setting name as "(.*)"$/, async function(policyName){
    await pages.gradingSettings.populate("Template Name", policyName + Date.now());
});

When (/^I set a time limit to the policy with hours "(.*)" and minutes "(.*)"$/, async function(hours, minutes){
    await gradingsettingslib.applyTimeLimit(hours, minutes);
});

When ("I click the Allow Late Submissions checkbox", async function(){
    await pages.gradingSettings.click('Allow Late Submissions');
});


When (/^I select "(.*)" % in Flat Penalty$/, async function(penaltyPercentage){
    await pages.gradingSettings.populate('Flat Penalty', penaltyPercentage);
});



When ("I click on save on grading settins page", async function(){
    await pages.gradingSettings.click('Grading Setting Button','Save Grading Settings');
    await pages.gradingSettings.click('Due Date Clock');
    await pages.gradingSettings.click('Due Date Clock Options',3);
    await pages.gradingSettings.click('Save');

});

