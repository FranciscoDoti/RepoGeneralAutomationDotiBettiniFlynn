const fs = require('fs');
const axe = require('axe-webdriverjs');
const { Then, BeforeAll } = require('cucumber');
const { getDriver } = require('../../../app/driver');

var accessibilityFile = '';
// BeforeAll({tags: '@Accessibility'}, function () {
//   let date = new Date();
//   let header = 'Page Name, Violation Description, Impact lvl, Instances, Help url, Rule Name, Tags, Html'
//   let dateStr = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '_' + date.getTime();
//   accessibilityFile = 'accessibility_report-' + dateStr + '.csv';
//   fs.writeFile(accessibilityFile, header, (err) => {
//     if (err) throw err;
//     console.log('File Created');
//   });
// });

Then(/I check accessibility on "(.+)" page/, async function (pageName) {
  await analyzeAccessibility().then(results => {
    writeAccessibilitiesResults(pageName, results.violations);
  });
});

const analyzeAccessibility = async function () {
  return new Promise(resolve => {
    axe(getDriver()).analyze(results => resolve(results));
  })
};

const writeAccessibilitiesResults = async function (pageName, violations) {
  violations.map(element => {
    var html = '';
    element.nodes.map(node => {
      html += ',' + node.html;
    })
    var result = '\n"' + pageName + '", "' + element.help + '", "' + element.impact + '", "' + element.nodes.length + '", "' + element.helpUrl + '", "' + element.id + '", "' + element.tags + '"' + html;
    fs.appendFile(accessibilityFile, result, (err) => {
      if (err) throw err;
    });
  });
}


