const fs = require('fs');
const axe = require('axe-webdriverjs');
const { Then } = require('cucumber');
const { getDriver } = require('../../../app/driver');
const config = require(`${process.cwd()}/config/config.json`);

let accessibilityFile = null;

Then(/I check accessibility on "(.+)" page/, async function (pageName) {
  if (config.accessible) {
    await analyzeAccessibility().then(results => {
      writeAccessibilitiesResults(pageName, results.violations);
    });
  }
});

const analyzeAccessibility = async function () {
  return new Promise(resolve => {
    axe(getDriver()).analyze(function (err, results) {
      if (err) {
        console.log('Everything is broken')
      }
      resolve(results)
    });
  })
};

const writeAccessibilitiesResults = async function (pageName, violations) {
  if (accessibilityFile === null) {
    let date = new Date();
    let header = 'Page Name,Violation Description,Impact lvl, Instances,Help url,Rule Name,Tags,Html'
    let dateStr = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '_' + date.getTime();
    accessibilityFile = 'accessibility_report-' + dateStr + '.csv';
    fs.writeFile(accessibilityFile, header, (err) => {
      if (err) throw err;
      console.log('File Created');
    });
  }
  violations.map(element => {
    let html = '';
    element.nodes.map(node => {
      html += ',' + node.html;
    })
    let result = '\n' + pageName + ',' + element.help + ',' + element.impact + ',' + element.nodes.length + ',' + element.helpUrl + ',' + element.id + ',"' + element.tags + '"' + html;
    fs.appendFile(accessibilityFile, result, (err) => {
      if (err) throw err;
    });
  });
}
