var { After, AfterAll } = require('cucumber');
//var fs = require('fs');
const { getDriver, closeBrowser, resetBrowser } = require('../../app/driver');

After(async function(scenario){
  //if (scenario.result.status === Status.FAILED) {
    console.log(scenario.result.status);
    var screenshot = await getDriver().takeScreenshot();
    await this.attach(screenshot, 'image/png');
  //}
  await resetBrowser();
});

AfterAll(async function(){
  await closeBrowser();
});

// After(async function(scenarioResult) {
//   if (scenarioResult.result.status === 'failed') {
//     let image = await this.driver.takeScreenshot();
//     var title = scenarioResult.pickle.name.replace(/ /g, "_");
//     var path = "screenshots/" + title + ".png";
//     return fs.writeFileSync(path, image, 'base64');
//   }
// });


// // FIXME Refactor //
// // After Blocks //
// After('@admin', async function() {
//   await pages.navigation.populate('menu_system', 'click');
//   await pages.navigation.populate('logout', 'click');
// });

// After('@admin-save', async function() {
//   await pages.createAccount.populate('save_button', 'click');
//   await pages.navigation.populate('menu_system', 'click');
//   await pages.navigation.populate('logout', 'click');
// });

// After('@admin-cancel', async function() {
//   await pages.createAccount.populate('cancel_account', 'click');
//   await pages.navigation.populate('menu_system', 'click');
//   await pages.navigation.populate('logout', 'click');
// });