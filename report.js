var reporter = require('cucumber-html-reporter');
const argv = require('minimist')(process.argv.slice(2));

const reportName = function(){
    var prefix = argv.JobName || "";
    prefix = (prefix !== "") ? prefix + " " : "";
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    return prefix + "Cucumber Report " + date;
};

var options = {
    theme: 'bootstrap',
    jsonFile: `${process.cwd()}/reports/cucumber_report.json`,
    output: `${process.cwd()}/reports/${reportName()}.html`,
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version": "0.3.2",
        "Test Environment": "STAGING",
        "Browser": "Chrome  54.0.2840.98",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    }
};

reporter.generate(options);
process.exit();