'use strict';
const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { gradingSettingsLib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const { sleep } = require(`${process.cwd()}/app/driver`);


When (/^I set the grading setting name as "(.*)"$/, async function(policyName){
    await pages.gradingSettings.populate("Template Name", policyName + Date.now()); // PONERLE FECHA PARA HACERLO UNIQUE
});

When (/^I set a time limit to the policy with hours "(.*)" and minutes "(.*)"$/, async function(hours, minutes){
    await gradingSettingsLib.applyTimeLimit(hours, minutes);
});

When (/^I click on save on grading settins page$/, async function(){
    await pages.gradingSettings.click('Save Grading Setting');
    await pages.gradingSettings.click('Due Date Clock');
    await pages.gradingSettings.click('Due Date Clock Options',3);
    await pages.gradingSettings.click('Save');

});

