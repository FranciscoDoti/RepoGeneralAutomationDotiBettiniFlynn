const { AfterAll, After, Before } = require("cucumber");

// After(function (testCase) {
//   var world = this;
//   if (testCase.result.status === Status.FAILED) {
//     return webDriver.takeScreenshot().then(function(screenShot) {
//       // screenShot is a base-64 encoded PNG
//       this.attach(screenShot, 'image/png');
//     });
//   }
// });


AfterAll(async () => {
  console.log('THIS ', this.driver)
  await this.driver.quit();
});
