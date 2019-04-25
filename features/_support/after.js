var { After, AfterAll } = require('cucumber');
var fs = require('fs');
const { getDriver, quit } = require('../../app/driver');

AfterAll(function () {
  await quit();
 });

After(function(){
    getDriver().getTitle().then(function(title){
    console.log(title);
  });
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