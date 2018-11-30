var { After } = require('cucumber');


After('@foo', function() {

  return this.driver.quit();
});
