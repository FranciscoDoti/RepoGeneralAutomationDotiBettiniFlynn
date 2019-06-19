var { After, AfterAll } = require('cucumber');
const { closeBrowser, resetBrowser, takeScreenshot } = require(`${process.cwd()}/app/driver`);

// After(async function (scenario) {
//   console.log(scenario.result.status);
//   if (this.screenshots.toLowerCase().includes('onfail')
//     && scenario.result.status.toLowerCase().includes('fail')) {
//     await this.attach(await takeScreenshot(), 'image/png');
//   }
//   await resetBrowser();
// });

// AfterAll(async function () {
//   await closeBrowser();
// });
