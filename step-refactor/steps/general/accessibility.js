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

const writeNewJSON = async function (pageName, violations) {
  var resultObj = {};
  arr.forEach((ele, i, arr)=>{
    if(resultObj[ele["name"]]){
      console.log('Why is the a repeat?')
    } else {
      if(ele.byType === "xpath"){
        if(ele["definition"][1] !== "/"){
          resultObj[ele["name"]] = "/" + ele["definition"];
        } else {
          resultObj[ele["name"]] = ele["definition"];
        }
        
      } else if(ele.byType === "id"){
        resultObj[ele["name"]] = "#" + ele["definition"];
      } else if(ele.byType === "classname"){
        resultObj[ele["name"]] = "." + ele["definition"];
      }
    }
  })
  var result = {}
  result[pageName] = resultObj;
  pageDefFile = 'accessibility_report-' + dateStr + '.csv';
  fs.writeFile(pageDefFile, header, (err) => {
    if (err) throw err;
    console.log('File Created');
  });
  fs.appendFile(pageDefFile, result, (err) => {
    if (err) throw err;
  });
}
