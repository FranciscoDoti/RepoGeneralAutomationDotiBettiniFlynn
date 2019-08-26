const testRailAPI = require('testrail-api');
const fs = require('fs');

const conn = new testRailAPI({
  host: 'https://mnv.testrail.com/',
  user: 'thomas.dsilva.contractor@macmillan.com',
  password: 'TGGrc8fivHIXstF9IBEQ-PcBWUGffb6JLFPj9bbO1'
});

//Takes in a name of the project and returns the first instance of the project.
const getProjectByName = async function (projectName) {
  let projects = (await conn.getProjects()).body;
  let project = projects.filter(project => project.name == projectName);
  return project[0];
}


//Test Suites and Cases
//Takes in a project id and a name of the suite.  Returns the first instance of the suite.
const getSuiteByName = async function (projectId, suiteName) {
  let suites = (await conn.getSuites(projectId)).body;
  let suite = suites.filter(suite => suite.name == suiteName);
  return suite[0];
};

//Takes in a project id, suite id, and a name of the section.  Returns the first instance of the section.
const getSectionByName = async function (projectId, suiteId, sectionName) {
  let filter = {suite_id: suiteId};
  let sections = (await conn.getSections(projectId, filter)).body;
  let section = sections.filter(section => section.name == sectionName);
  return section[0];
}

//Takes in a project id, suite id, section id, and the name of the case.  Returns the first instance of the case.
const getCaseByName = async function (projectId, suiteId, sectionId, caseName) {
  let filter = {suite_id: suiteId, section_id: sectionId};
  let cases = (await conn.getCases(projectId, filter)).body;
  let myCase = cases.filter(myCase => myCase.title == caseName);
  return myCase[0];
}


//Put Functions
//Takes in the project id and the suite name.  Checks to see if the suite exist. If not, adds the suite to the given project.
const addSuite = async function (projectId, suiteName) {
  let suite = await getSuiteByName(projectId, suiteName);
  if (suite == undefined) {
    await conn.addSuite(projectId, {name: suiteName});
  }
  return (await getSuiteByName(projectId, suiteName));
}

//Takes in the project id, suite id, and the section name.  Adds the section to the given suite.  
const addSection = async function (projectId, suiteId, sectionName) {
  let section = await getSectionByName(projectId, suiteId, sectionName);
  if (section == undefined) {
    await conn.addSection(projectId, {suite_id: suiteId, name: sectionName});
  }
  return (await getSectionByName(projectId, suiteId, sectionName));
}

//Rakes in the section id and an object that contains the information for a case.  Adds the case to the given section.
const addCase = async function (projectId, suiteId, sectionId, content) {
  let Case = await getCaseByName(projectId, suiteId, sectionId, content.title);
  if (Case == undefined) {
      await conn.addCase(sectionId, content);
  }
}
//End of Test Suites and Cases


//Test Runs and Results
const getTestPlanByName = async (projectId, planName) => {
  let testPlans = (await conn.getPlans(projectId)).body;
  let testPlan = testPlans.filter(plan => plan.name == planName);
  return testPlan[0];
}

//Takes in a project id and a name of the run.  Returns the first instance of the run.
const getTestRunByName = async function (projectId, runName) {
  var testRuns = (await conn.getRuns(projectId)).body;
  var testRun = testRuns.filter(run => run.name == runName);
  return testRun[0];
}

//Takes in a plan id and the name of the case.  Returns the first instance of the test run.
const getTestByName = async function (runId, caseName) {
  var tests = (await conn.getTests(runId, {})).body;
  var test = tests.filter(test => test.title == caseName);
  return test[0];
}

//Takes in a plan id and case id.  Returns the first instance of the results log.
const getLogForRun = async function (runId, caseId) {
  return (await conn.getResultsForCase(runId, caseId)).body[0];
}

const addTestRun = async function (projectId, suiteId, runName) {
  var run = await getTestRunByName(projectId, runName);
  if (run == undefined) {
    await conn.addRun(projectId, {suite_id: suiteId, name: runName, include_all: true})
  }
}

const addTestPlan = async function (projectId, content) {
  let plan = await getTestPlanByName(projectId, content.name)
  if (plan) {
    return;
  }
  return new Promise((resolve, reject) => {
    conn.addPlan(projectId, content, function (err, response, result) {
      results = result;
      if (err) {
        reject(err, 'err');
      } else {
        resolve(results)
      }
    });
  })
}

const addResult = async (testId, content) => {
  await conn.addResult(testId, content);
}
//End of Test Runs and Results

const uploadCases = async function(){
  let results, resultFilePath = `${process.cwd()}/reports/cucumber_report.json`;
  try {
    results = await JSON.parse(fs.readFileSync(resultFilePath));
  } catch (ex) {
    console.log(`Error while parsing results JSON. Error - ${ex.message}. Cannot upload results to TestRail.`);
  }

  if (results != undefined) {
    for (let i = 0; i < results.length; i++) {
      let feature = results[i];
      let projectId = (await getProjectByName(feature.uri.split('/')[1])).id;
      let suiteId = (await addSuite(projectId, "UI - Automation")).id;
      let sectionId = (await addSection(projectId, suiteId, feature.name)).id;

      for (let j = 0; j < feature.elements.length; j++) {
        let scenario = feature.elements[j];
        let caseContent = {
          "title": "",
          "type_id": 1,
          "priority_id": 1,
          "estimate": "2m",
          "refs": "RF-1, RF-2",
          "custom_steps_separated": []
        }
        caseContent["title"] = scenario.name;

        let steps = caseContent["custom_steps_separated"];
        for (let k = 0; k < scenario.steps.length; k++) {
          let stepDef = scenario.steps[k];
          if (stepDef.keyword != 'After' && stepDef.keyword != 'Before') {
            steps[k] = {};
            steps[k]["content"] = stepDef.keyword + stepDef.name.replace(/"/g,'');
            steps[k]["expected"] = "Expected Result to be updated.";
          }
        }

        await addCase(projectId, suiteId, sectionId, caseContent);
      }
    }
  }
}

let resultContent = {
  "status_id": 12,
  "comment": "This test has not been tested",
  "elapsed": "15s",
  "defects": "TR-7",
  "version": "1.0 RC1 build 3724",
  "custom_step_results": [{
      "content": "Step 1",
      "expected": "Expected Result 1",
      "actual": "Actual Result 1",
      "status_id": 1
    },
    {
      "content": "Step 2",
      "expected": "Expected Result 2",
      "actual": "Actual Result 2",
      "status_id": 2
    }
  ]
}

const uploadResults = async function(){
  let results, resultFilePath = `${process.cwd()}/reports/cucumber_report.json`;
  try {
    results = await JSON.parse(fs.readFileSync(resultFilePath));
  } catch (ex) {
    console.log(`Error while parsing results JSON. Error - ${ex.message}. Cannot upload results to TestRail.`);
  }

  if(results != undefined){
    dt = new Date()
    let runName = "Results for UI - Automation on " + (dt.getMonth()+1) + '-' + dt.getDate()+ '-' + dt.getFullYear() + ", " + dt.toISOString().match(/(\d{2}:){2}\d{2}/)[0];
    for (let i = 0; i < results.length; i++) {
      let feature = results[i];
      let projectId = (await getProjectByName(feature.uri.split('/')[1])).id;
      let suiteId = (await getSuiteByName(projectId, "UI - Automation")).id;
      let sectionId = (await getSectionByName(projectId, suiteId, feature.name)).id;
      for (let j = 0; j < feature.elements.length; j++) {
        let scenario = feature.elements[j];
        //add result def
        let resultContent = {
          "status_id": 12,
          "comment": "This test has not been tested",
          "elapsed": "15s",
          "defects": "TR-7",
          "version": "1.0 RC1 build 3724",
          "custom_step_results": []
        }
        let steps = resultContent["custom_step_results"];
        for (let k = 0; k < scenario.steps.length; k++) {
          let stepDef = scenario.steps[k];
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
            let step = {};
            step["content"] = stepDef.keyword + stepDef.name.replace(/"/g,'');
            step["expected"] = "Expected Result to be updated.";
            step["actual"] = "actual result";
            step["status_id"] = stepResult;

            let duration = stepDef.result.duration;
            if(isNaN(duration)){
              resultContent.elapsed = '15s';
            }else{
              resultContent.elapsed = await getTimespan(duration);
            }
            
            steps[k] = step;
          } 
        }
        let Case = await getCaseByName(projectId, suiteId, sectionId, feature.elements[j].name);
        //console.log(Case)    
        await addTestRun(projectId, suiteId, runName);
        let run = await getTestRunByName(projectId, runName);
        //log.debug(`Have recieved run id: ${run.id}`);
        let test = await getTestByName(run.id, Case.title);
        //console.log(resultContent)
        //log.debug(`Have recieved test id: ${test.id}`);
        await addResult(test.id, resultContent);
        //log.debug(`Have added results to ${case.title} in ${runName}`);
        //let result = await getLogForRun(run.id, Case.id);
        //log.debug(`Have recieved result id: ${result.id}`)
      }
    }
  }
}

let planContent = {
  "name": "Plan"
}

//uploadCases();
//uploadResults();