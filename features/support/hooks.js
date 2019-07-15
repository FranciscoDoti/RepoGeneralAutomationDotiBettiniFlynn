var { After, AfterAll } = require('cucumber');
const { closeBrowser, resetBrowser, takeScreenshot } = require(`${process.cwd()}/app/driver`);
const asmtpages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
/*
After(async function (scenario) {
  console.log(scenario.result.status);
  if (this.screenshots.toLowerCase().includes('onfail')
    && scenario.result.status.toLowerCase().includes('fail')) {
    await this.attach(await takeScreenshot(), 'image/png');
  }
  await resetBrowser();
});

AfterAll(async function () {
  await closeBrowser();
});

// Delete the newly created assessment
After('@assessmentCreation', async function () {
  await asmtpages.assignmentTab.click('course Name');
  await asmtpages.assignmentTab.click('list Assessments', "QAAssessment");
  await asmtpages.assignmentTab.click('list Assessments Delete', "QAAssessment");
  await asmtpages.hatchlingItem.click('Submit Yes');
});*/