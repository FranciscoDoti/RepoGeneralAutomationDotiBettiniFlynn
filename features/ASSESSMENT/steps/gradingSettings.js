'use strict';
const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);


When (/^I set the grading setting name as "(.*)"$/, async function(policyName){
    await pages.gradingSettings.populate("Template Name", policyName);
});

When (/^I set a time limit to the policy with hours "(.*)" and minutes "(.*)"$/, async function(hours, minutes){
    await pages.gradingSettings.applyTimeLimit(hours, minutes);
});

When (/^I click on save on grading settins page$/, async function(){
    await pages.gradingSettings.click('Save Button');
});

