var { After, AfterAll } = require('cucumber');
const { takeScreenshot, closeBrowser, resetBrowser } = require(`${process.cwd()}/app/driver`);

After(async function(scenario){
  if (scenario.result.status == 'failed') {
    //console.log(scenario.result.status);
    var screenshot = await takeScreenshot();
    await this.attach(screenshot, 'image/png');
  }
  await resetBrowser();
});

AfterAll(async function(){
  await closeBrowser();
});

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