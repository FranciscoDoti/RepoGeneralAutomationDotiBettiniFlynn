var { After, AfterAll } = require('cucumber');
const { closeBrowser, resetBrowser, takeScreenshot } = require(`${process.cwd()}/app/driver`);
const asmtpages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;

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
  await asmtpages.assignmentTab.click('courseName');
  await asmtpages.assignmentTab.click('listAssessments', "QAAssessment");
  await asmtpages.assignmentTab.click('listAssessmentsDelete', "QAAssessment");
  await asmtpages.assignmentTab.click('SubmitYes');
});
