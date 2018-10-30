const { Given, When, Then, AfterAll } = require('cucumber');
const { loadConfig } = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
const config = loadConfig('config');
const lcInfo = loadConfig('lc/lc_info');
const assert = require('assert');
const helper = require('./lc-helper');

let studentView = {
  lcrpPage: new PageObject('lc-student-lcrp.json', stepsPath),
  lcPage: new PageObject('lc-student-lc.json', stepsPath),
  commonPage: new PageObject('lc-student-common.json', stepsPath),
  quizPage: new PageObject('lc-quiz.json', stepsPath)
};

var testInfo = {
  'currentUser': ''
}

Given(/^I log into an assignment in "(.*)" as "(.*)"$/, async function (urlKey, user) {
  let url = config[urlKey];
  testInfo.currentUser = user;
  url = url + '?user_id=' + lcInfo[user].user_id + '&file=music%2Ftest%2Fautomation_test_51F1C3&itemid=' + lcInfo.assignment + '&course_id=' + lcInfo.course + '&isfqtoolreferred=V7MkHewcPm5U4Cg4';
  if (user === 'instructor') {
    url += '&view=instructor'
  }
  console.log(`Loading URL ${url}`);
  await getDriver().get(url);
  await sleep(5000);
});

Given(/I start a new assignment as "(.*)"$/, async function (user) {
  const epoch = new Date().getTime();
  lcInfo.assignment = epoch;
  testInfo.currentUser = user;
  if (lcInfo.course === undefined) {
    console.log('HERE!')
    lcInfo.course = epoch;
  }
  testInfo[lcInfo.course] = {}
  testInfo[lcInfo.course][lcInfo.assignment] = {};
  testInfo[lcInfo.course][lcInfo.assignment][user] = {
    attempt: 0,
    scores: []
  };
  testInfo[lcInfo.course][lcInfo.assignment][user].scores.push({
    'currentScore': 0,
    'totalPossible': 0,
    'targetScore': 0
  })
})

Given(/I retake an assignment as "(.*)"$/, async function (user) {
  testInfo[lcInfo.course][lcInfo.assignment][user].attempt++;
  testInfo[lcInfo.course][lcInfo.assignment][user].scores.push({
    'currentScore': 0,
    'totalPossible': 0,
    'targetScore': 0
  })
})

Given(/I start a new course as "(.*)"$/, async function (user) {
  const epoch = new Date().getTime();
  lcInfo.course = epoch;
})

When('I view the student landing page for LCRP', async function () {
  let results = await helper.getReadingInfo();
  if (results[1] !== results[2]) {
    let lockVisiable = await studentView.lcrpPage.checkWebElementExists('reading_lock');
    assert(lockVisiable, 'Lock is not present with readings that are unread.');
  } else {
    let startQuiz = await studentView.lcrpPage.checkWebElementExists('start_quiz_button');
    assert(startQuiz, 'When readings are read/none exists, take quiz should be visible.')
  }
});

When('I view the student landing page for LC', async function () {
  let student = testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser];
  student.scores[student.attempt].targetScore = await studentView.lcPage.getElementValue('target_score')
  let beginActivityButton = studentView.lcPage.checkWebElementExists('start_quiz_button')
  assert(beginActivityButton, 'The Begin Activity Button is not present on the page.')
  testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser] = student;
});

When('I click on a reading the ebook view opens', async function () {
  let readList = await studentView.lcrpPage.getWebElements('reading_list');
  if (readList.length > 0) {
    let topic = await readList[0].getText();
    readList[0].click();
    await sleep(500);
    await helper.verifyEbook(topic);
  }
});

When('I read the rest of the ebooks the quiz button is shown', async function () {
  let readingCount = await helper.getReadingInfo();
  for (let i = 0; i < readingCount[2]; i++) {
    let readList = await studentView.lcrpPage.getWebElements('reading_list');
    let topic = await readList[i].getText();
    readList[i].click();
    await sleep(500);
    await helper.verifyEbook(topic);
  }
})

Then(/I can start the assessment "(.*)"/, async function (lc) {
  if (lc === 'LC') {
    await studentView.lcPage.populate('start_quiz_button', 'click')
  } else {
    let quizButton = await studentView.lcrpPage.checkWebElementExists('start_quiz_button');
    assert(quizButton, 'The Quiz button was not displayed.')
    await studentView.lcrpPage.populate('start_quiz_button', 'click');
  }
  let score = await studentView.quizPage.getElementValue('current_score');
  let scores = score.split(/\//)
  let student = testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser]
  if (student.scores[student.attempt].targetScore !== 0) {
    assert(student.scores[student.attempt].targetScore === scores[1], 'The target score does not match the score on the landing page.')
  } else {
    student.scores[student.attempt].targetScore = scores[1];
  }
  testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser] = student;
})

Given(/I see a question, I can answer it "(.*)"/, async function (answer) {
  let question = await helper.parseQuestion();
  let student = testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser];
  student.scores[student.attempt].totalPossible += parseInt(await helper.checkLevel(question));
  await helper.answerQuestion(question, answer);
  if (answer === 'Correct') {
    student.scores[student.attempt].currentScore += parseInt(await helper.checkLevel(question));
  } else {
    // evaluate incorrect answer page
    if (question.Type !== 'FB') {
      question.incorrect = true;
    }
    await helper.answerQuestion(question, 'Correct');
    student.scores[student.attempt].currentScore += parseInt(await helper.checkLevel(question));
  }
  // evalutate correct answer page
  await studentView.quizPage.populate('next_question', 'click');
  testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser] = student;
})
Given('I see a question, I can open the ebook', async function () {
  let question = await helper.parseQuestion();
  await studentView.quizPage.populate('open_ebook', 'click');
  await helper.verifyEbook(question.ebook);
  await studentView.commonPage.populate('close_ereader', 'click')
})

Then('I complete 50% of the assignment', async function () {
  let student = testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser]
  while (student.scores[student.attempt].currentScore / student.scores[student.attempt].targetScore < 0.5) {
    let question = await helper.parseQuestion();
    student.scores[student.attempt].totalPossible += parseInt(await helper.checkLevel(question));
    await helper.answerQuestion(question, 'Correct');
    student.scores[student.attempt].currentScore += parseInt(await helper.checkLevel(question));
    if (student.scores[student.attempt].currentScore / student.scores[student.attempt].targetScore < 0.5) {
      await studentView.quizPage.populate('next_question', 'click');
    } else {
      assert(await studentView.quizPage.checkWebElementExists('midway_modal'), 'Midway modal did not exist after 50% of the target score had been reached.')
      await studentView.quizPage.populate('next_question_midway', 'click');
    }
  }
})

When('I am done with an assessment, I see my score and can retake the assessment', async function () {
  let retakeButton = await studentView.lcrpPage.checkWebElementExists('retake_quiz');
  assert(retakeButton, 'The Retake button does not exist after completing an assignment');
  // Also Check Score
})

Then('I complete 100% of an LCRP assignment', async function () {
  let student = testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser]
  while (student.scores[student.attempt].currentScore / student.scores[student.attempt].targetScore < 1) {
    let question = await helper.parseQuestion();
    student.scores[student.attempt].totalPossible += parseInt(await helper.checkLevel(question));
    await helper.answerQuestion(question, 'Correct');
    student.scores[student.attempt].currentScore += parseInt(await helper.checkLevel(question));
    if (student.scores[student.attempt].currentScore / student.scores[student.attempt].targetScore < 1) {
      await studentView.quizPage.populate('next_question', 'click');
    } else {
      await studentView.quizPage.populate('complete_quiz_lcrp', 'click');
    }
  }
  testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser] = student;
})

Then('I complete 100% of an LC assignment', async function () {
  let student = testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser]
  while (student.scores[student.attempt].currentScore / student.scores[student.attempt].targetScore < 1) {
    let question = await helper.parseQuestion();
    student.scores[student.attempt].totalPossible += parseInt(await helper.checkLevel(question));
    await helper.answerQuestion(question, 'Correct');
    student.scores[student.attempt].currentScore += parseInt(await helper.checkLevel(question));
    if (student.scores[student.attempt].currentScore / student.scores[student.attempt].targetScore < 1) {
      await studentView.quizPage.populate('next_question', 'click');
    } else {
      let completeQuizModal = await studentView.quizPage.checkWebElementExists('complete_quiz_lc')
      assert(completeQuizModal, 'While the target score has been reached, the student was not notified of its completion.')
      await studentView.quizPage.populate('back_to_study_plan', 'click')
    }
  }
  testInfo[lcInfo.course][lcInfo.assignment][testInfo.currentUser] = student;
})

Given('A question I can get a hint', async function () {})
Given('A question I can get the answer', async function () {})

AfterAll(function () {
  console.log(JSON.stringify(testInfo));
  getDriver().quit();
  return Promise.resolve();
});
