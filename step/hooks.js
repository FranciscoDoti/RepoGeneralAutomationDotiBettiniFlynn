var { After } = require('cucumber');
var fs = require('fs');
var sanitize = require("sanitize-filename");


After('@quit-driver', function() {

  return this.driver.quit();
});

After(function(scenarioResult) {
  if (scenarioResult.result.status === 'failed') {
    this.driver.takeScreenshot()
      .then(function(data) {
        var title = scenarioResult.pickle.name.replace(/ /g, "_");
        var path = "screenshots/" + title + ".png";
        return fs.writeFile(path, data, 'base64', function(err) {
        if (err) console.log(err);
      });
    });
  }

});
