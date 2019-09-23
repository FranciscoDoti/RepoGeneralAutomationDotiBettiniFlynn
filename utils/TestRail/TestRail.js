const testRailAPI = require('testrail-api');
const path = require('path');
const fs = require('fs');
const { log } =  require(`${process.cwd()}/app/logger`);
const argv = require('minimist')(process.argv.slice(2));

const sleep = async function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const config = {
  environment : argv.env
};

const conn = new testRailAPI({
  host: 'https://mnv.testrail.com/',
  user: 'thomas.dsilva.contractor@macmillan.com',
  password: 'TGGrc8fivHIXstF9IBEQ-PcBWUGffb6JLFPj9bbO1'
});

//Takes in a name of the project and returns the first instance of the project.
const getProjectByName = async function (projectName) {
  let projects = (await conn.getProjects()).body;
  let project = await projects.filter(project => project.name == projectName);
  if(project[0] === undefined)
  {
    log.info(`'${projectName}' project was not found.`);
  } else {
    log.info(`Retrieved project for '${projectName}'.`);
  }
  return project[0];
}


//Test Suites and Cases
//Takes in a project id and a name of the suite.  Returns the first instance of the suite.
const getSuiteByName = async function (projectId, suiteName) {
  let suites = (await conn.getSuites(projectId)).body;
  let suite = await suites.filter(suite => suite.name == suiteName);
  if(suite[0] === undefined)
  {
    log.info(`'${suiteName}' suite was not found.`);
  } else {
    log.info(`Retrieved suite for '${suiteName}'.`);
  }
  return suite[0];
};

//Takes in a project id, suite id, and a name of the section.  Returns the first instance of the section.
const getSectionByName = async function (projectId, suiteId, sectionName) {
  let filter = {suite_id: suiteId};
  let sections = (await conn.getSections(projectId, filter)).body;
  let section = await sections.filter(section => section.name == sectionName);
  if(section[0] === undefined)
  {
    log.info(`'${sectionName}' section was not found.`);
  } else {
    log.info(`Retrieved section for '${sectionName}'.`);
  }
  return section[0];
};

//Takes in a project id, suite id, section id, and the name of the case.  Returns the first instance of the case.
const getCaseByName = async function (projectId, suiteId, sectionId, caseName) {
  let filter = {suite_id: suiteId, section_id: sectionId};
  let cases = (await conn.getCases(projectId, filter)).body;
  let myCase = await cases.filter(myCase => myCase.title == caseName);
  if(myCase[0] === undefined)
  {
    log.info(`'${caseName}' testcase was not found.`);
  } else {
    log.info(`Retrieved testcase for '${caseName}'.`);
  }
  return myCase[0];
};


//Put Functions
//Takes in the project id and the suite name.  Checks to see if the suite exist. If not, adds the suite to the given project.
const addSuite = async function (projectId, suiteName) {
  let suite = await getSuiteByName(projectId, suiteName);
  if (suite == undefined) {
    await conn.addSuite(projectId, {name: suiteName});
    log.info(`Added suite for '${suiteName}'.`);
    await sleep(10000);
  }
  return (await getSuiteByName(projectId, suiteName));
}

//Takes in the project id, suite id, and the section name.  Adds the section to the given suite.  
const addSection = async function (projectId, suiteId, sectionName) {
  let section = await getSectionByName(projectId, suiteId, sectionName);
  if (section == undefined) {
    await conn.addSection(projectId, {suite_id: suiteId, name: sectionName});
    log.info(`Added section for '${sectionName}'.`);
    await sleep(10000);
  }
  return (await getSectionByName(projectId, suiteId, sectionName));
}

//Rakes in the section id and an object that contains the information for a case.  Adds the case to the given section.
const addCase = async function (projectId, suiteId, sectionId, content) {
  let Case = await getCaseByName(projectId, suiteId, sectionId, content.title);
  if (Case == undefined) {
      await conn.addCase(sectionId, content);
      log.info(`Added case for '${content.title}'.`);
  }
}
//End of Test Suites and Cases


// //Test Runs and Results
//Takes in a project id and a name of the run.  Returns the first instance of the run.
const getTestRunByName = async function (projectId, runName) {
  var testRuns = (await conn.getRuns(projectId)).body;
  var testRun = await testRuns.filter(run => run.name == runName);
  if(testRun[0] === undefined)
  {
    log.info(`'${runName}' test run was not found.`);
  } else {
    log.info(`Retrieved test run for '${runName}'.`);
  }
  return testRun[0];
}

//Takes in a plan id and the name of the case.  Returns the first instance of the test run.
const getTestByName = async function (runId, caseName) {
  var tests = (await conn.getTests(runId, {})).body;
  var test = await tests.filter(test => test.title == caseName);
  if(test[0] === undefined)
  {
    log.info(`'${caseName}' test log was not found.`);
  } else {
    log.info(`Retrieved test log for '${caseName}'.`);
  }
  return test[0];
}

const addTestRun = async function (projectId, suiteId, runName) {
  var run = await getTestRunByName(projectId, runName);
  if (run == undefined) {
    await conn.addRun(projectId, {suite_id: suiteId, name: runName, include_all: true});
    log.info(`Added test run for '${runName}'.`);
    await sleep(10000);
  }
}

const addResult = async (testId, content) => {
  await conn.addResult(testId, content);
  log.info(`Added test results for test '${testId}'.`);
}
//End of Test Runs and Results

const uploadCases = async function () {
  let results, resultFilePath = `${process.cwd()}/reports/cucumber_report.json`;
  try {
    results = await JSON.parse(fs.readFileSync(resultFilePath));
  } catch (ex) {
    log.error(`Error while parsing results JSON. Error - ${ex.message}. Cannot upload results to TestRail.`);
  }

  if (results != undefined) {
    for await (let feature of results) {
      let projectId = (await getProjectByName(feature.uri.split('/')[1])).id;
      let suiteId = (await addSuite(projectId, "UI - Automation")).id;
      let sectionId = (await addSection(projectId, suiteId, feature.name)).id;

      for await (let scenario of feature.elements) {
        let caseContent = {
          "title": "",
          "type_id": 1,
          "priority_id": 5,
          "estimate": "2m",
          "custom_steps_separated": []
        }
        caseContent["title"] = scenario.name;

        let steps = caseContent["custom_steps_separated"];
        let k = -1;
        for await (let stepDef of scenario.steps) {
          if (stepDef.keyword != 'After' && stepDef.keyword != 'Before') {
            steps[++k] = {};
            steps[k]["content"] = stepDef.keyword + stepDef.name.replace(/"/g, '');
            steps[k]["expected"] = "Expected Result to be updated.";
          }
        }

        await addCase(projectId, suiteId, sectionId, caseContent);
      }
    }
  }
  return 0;
}

const uploadResults = async function(){
  let results, resultFilePath = `${process.cwd()}/reports/cucumber_report.json`;
  try {
    results = await JSON.parse(fs.readFileSync(resultFilePath));
  } catch (ex) {
    log.error(`Error while parsing results JSON. Error - ${ex.message}. Cannot upload results to TestRail.`);
  }

  if(results != undefined){
    dt = new Date();
    let runName = "Results: UI - Automation on " + (dt.getMonth()+1) + '-' + dt.getDate()+ '-' + dt.getFullYear() + ", " + dt.toISOString().match(/(\d{2}:){2}\d{2}/)[0];
    if(config.environment !== '' ||  config.environment !== undefined){
      runName = `${runName} in environment '${config.environment}'`;
    }
    for await (let feature of results) {
      let projectId = (await getProjectByName(feature.uri.split('/')[1])).id;
      let suiteId = (await getSuiteByName(projectId, "UI - Automation")).id;
      await addTestRun(projectId, suiteId, runName);
      let sectionId = (await getSectionByName(projectId, suiteId, feature.name)).id;
      for (let scenario of feature.elements) {
        //add result def
        let resultContent = {
          "status_id": 12,
          "comment": "This test has not been tested",
          "elapsed": "",
          "custom_step_results": []
        }
        let steps = resultContent["custom_step_results"]; let k = -1;
        for (let stepDef of scenario.steps) {
          let statusId = 0;
          
          if (stepDef.keyword != 'After' && stepDef.keyword != 'Before') {
            stepResult = stepDef.result.status;
            if(stepResult === 'passed'){
              stepResult = 1
            }
            else if(stepResult === 'failed'){
              stepResult = 5
              statusId += 1
            }
            else if(stepResult === 'skipped' || stepResult === 'undefined'){//skipped = Unable To Test
              stepResult = 12
              statusId += 1
            }
            if(statusId > 0){
              resultContent.status_id = 5
              resultContent.comment = 'This test failed.'
            }
            if(statusId === 0){
              resultContent.status_id = 1
              resultContent.comment = 'This test passed.'
            }
            steps[++k] = {};
            steps[k]["content"] = stepDef.keyword + stepDef.name.replace(/"/g,'');
            steps[k]["expected"] = "Expected Result to be updated.";
            steps[k]["actual"] = "actual result";
            steps[k]["status_id"] = stepResult;

            let duration = stepDef.result.duration;
            if(duration !== undefined){
              resultContent.elapsed = 1;
            }
          } 
        }
        let Case = await getCaseByName(projectId, suiteId, sectionId, scenario.name);
        let run = await getTestRunByName(projectId, runName);
        let test = await getTestByName(run.id, Case.title);
        await addResult(test.id, resultContent);
      }
    }
  }
  return 0;
}

const testrail = async function(){
  await uploadCases();
  await uploadResults();
};

testrail();