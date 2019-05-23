var { After, AfterAll } = require('cucumber');
const { closeBrowser, resetBrowser } = require(`${process.cwd()}/app/driver`);

// After(async function(scenario){
//   console.log(scenario.result.status);
//   await resetBrowser();
// });

// AfterAll(async function(){
//   await closeBrowser();
// });