const { Given, When, Then } = require('cucumber');
const { loadConfig } = require('../../../app/util');
const jwt = require('../../../app/jwt');
const stepsPath = process.cwd() + '/features/pageDefs/LearningCurve/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
const {By} = require('selenium-webdriver');
const config = loadConfig('config');
const assert = require('assert');
const helper = require('./lc-helper');
const courses = require('./lc-courses');

let studentView = {
  lcrpPage: new PageObject('lc-student-lcrp.json', stepsPath),
  lcPage: new PageObject('lc-student-lc.json', stepsPath),
  commonPage: new PageObject('lc-student-common.json', stepsPath),
  quizPage: new PageObject('lc-quiz.json', stepsPath)
};

let instructorView = {
  commonPage: new PageObject('lc-instructor-common.json', stepsPath),
  lcrpPage: new PageObject('lc-instructor-lcrp.json', stepsPath),
  lcPage: new PageObject('lc-instructor-lc.json', stepsPath),
  trendsPage: new PageObject('lc-trends-and-insights.json', stepsPath)
}

let lcInfo;
let testInfo = {
  'currentUser': ''
}

Given(/^I log into an assignment in "(.*)" as "(.*)"$/, async function (urlKey, user) {
  let url = config[urlKey];
  testInfo.currentUser = user;
  url = url + '?user_id=' + lcInfo[user].userId + '&file=music%2Ftest%2Fautomation_test_51F1C3&itemid=' + lcInfo.assignment + '&course_id=' + lcInfo.course + '&isfqtoolreferred=V7MkHewcPm5U4Cg4';
  if (user === 'instructor') {
    url += '&view=instructor'
  }
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
  var token = jwt.generateJWT(lcInfo[user], [lcInfo.course]);
  await getDriver().manage().addCookie(
    {
      'name': 'id_token',
      'value': token,
      'path': '/',
      'domain': '.mldev.cloud'});

  await sleep(5000);
});

Given(/I start a new assignment as "(.*)"$/, async function (user) {
  if (lcInfo === undefined || lcInfo === null) {
    lcInfo = loadConfig('lc/lc_info');
  }
  const epoch = new Date().getTime();
  lcInfo.assignment = epoch;
  testInfo.currentUser = user;
  if (lcInfo.course === undefined) {
    lcInfo.course = epoch;
    courses.addCourse(epoch);
  }
})

Given(/I retake the assignment as "(.*)"$/, async function (user) {
  courses.addAttempt(lcInfo.course, user, lcInfo.assignment);
  await studentView.lcrpPage.populate('retake_quiz', 'click');
  let score = await studentView.quizPage.getElementValue('current_score');
  let scores = score.split(/\//);
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, user, lcInfo.assignment);
  assignmentScore.targetScore = parseInt(scores[1]);
})

Given(/I start a new course as "(.*)"$/, async function (user) {
  if (lcInfo === undefined || lcInfo === null) {
    lcInfo = loadConfig('lc/lc_info');
  }
  const epoch = new Date().getTime();
  lcInfo.course = epoch;
  courses.addCourse(lcInfo.course);
});

When('I view the student landing page for LCRP', async function () {
  let results = await helper.getReadingInfo();
  if (results[1] !== results[2]) {
    let lockVisiable = await studentView.lcrpPage.checkWebElementExists('reading_lock');
    assert(lockVisiable, 'Lock is not present with readings that are unread.');
  } else {
    let startQuiz = await studentView.lcrpPage.checkWebElementExists('start_quiz_button');
    assert(startQuiz, 'When readings are read/none exists, take quiz should be visible.')
  }
  courses.addAssignment(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  courses.addAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
});

When('I view the student landing page for LC', async function () {
  courses.addAssignment(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  courses.addAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  assignmentScore.targetScore = parseInt(await studentView.lcPage.getElementValue('target_score'))
  let beginActivityButton = studentView.lcPage.checkWebElementExists('start_quiz_button')
  assert(beginActivityButton, 'The Begin Activity Button is not present on the page.')
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
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  if (assignmentScore.targetScore !== 0) {
    assert(assignmentScore.targetScore === parseInt(scores[1]), 'The target score does not match the score on the landing page.')
  } else {
    assignmentScore.targetScore = parseInt(scores[1]);
  }
})

Given(/I see a question, I can answer it "(.*)"/, async function (answer) {
  let question = await helper.parseQuestion();
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  assignmentScore.totalPossible += parseInt(await helper.checkLevel(question));
  await helper.answerQuestion(question, answer);
  if (answer === 'Correct') {
    assignmentScore.currentScore += parseInt(await helper.checkLevel(question));
  } else {
    // evaluate incorrect answer page
    if (question.Type !== 'FB') {
      question.incorrect = true;
    }
    await helper.answerQuestion(question, 'Correct');
    assignmentScore.currentScore += parseInt(await helper.checkLevel(question));
  }
  // evalutate correct answer page
  await studentView.quizPage.populate('next_question', 'click');
})
Given('I see a question, I can open the ebook', async function () {
  let question = await helper.parseQuestion();
  await studentView.quizPage.populate('open_ebook', 'click');
  await helper.verifyEbook(question.ebook);
  await studentView.commonPage.populate('close_ereader', 'click')
})

Given('I see a question, I can get a hint', async function () {
  let question = await helper.parseQuestion();
  await studentView.quizPage.populate('get_hint', 'click');
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  assignmentScore.totalPossible += parseInt(await helper.checkLevel(question));
  question.incorrect = true;
  let hintModal = await studentView.quizPage.checkWebElementExists('hint_answer_modal');
  assert(hintModal, 'The Hint modal did not display after clicking the "Get a Hint" button');
  await helper.checkLevel(question);
  await helper.answerQuestion(question, question.answer)
  assignmentScore.currentScore += parseInt(await helper.checkLevel(question));
});

Given('I see a question, I can get the answer', async function () {
  let question = await helper.parseQuestion();
  await studentView.quizPage.populate('get_hint', 'click');
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  assignmentScore.totalPossible += parseInt(await helper.checkLevel(question));
});

Then('I complete 50% of the assignment', async function () {
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  while (assignmentScore.currentScore / assignmentScore.targetScore < 0.5) {
    let question = await helper.parseQuestion();
    assignmentScore.totalPossible += parseInt(await helper.checkLevel(question));
    await helper.answerQuestion(question, 'Correct');
    assignmentScore.currentScore += parseInt(await helper.checkLevel(question));
    if (assignmentScore.currentScore / assignmentScore.targetScore < 0.5) {
      await studentView.quizPage.populate('next_question', 'click');
    } else {
      assert(await studentView.quizPage.checkWebElementExists('midway_modal'), 'Midway modal did not exist after 50% of the target score had been reached.')
      await studentView.quizPage.populate('next_question_midway', 'click');
    }
  }
});

When('I am done with an assessment, I see my score and can retake the assessment', async function () {
  let retakeButton = await studentView.lcrpPage.checkWebElementExists('retake_quiz');
  assert(retakeButton, 'The Retake button does not exist after completing an assignment');
  let assignmentInfo = courses.getAssignment(lcInfo.course, testInfo.currentUser, lcInfo.assignment)
  let quizResults = await studentView.lcrpPage.getWebElements('quiz_results');
  assert(assignmentInfo.scores.length === quizResults.length, 'Number of results does not match\nExpected: ' + assignmentInfo.scores.length + '\nActual Results: ' + quizResults.length);

  for (let x = 0; x < quizResults.length; x++) {
    let accuracy = parseInt(await quizResults[x].findElement(By.xpath('//span[@data-test-id="quizResultsAccuracy"]')).getText());
    let assignment = assignmentInfo.scores[x];
    let calcAccuracy = assignment.currentScore / assignment.totalPossible * 100;
    assert(calcAccuracy - 1 <= accuracy && calcAccuracy + 1 >= accuracy, 'Score does not match: \nExpected: ' + calcAccuracy + '\nActually: ' + accuracy)
  }
});

Then('I complete 100% of an LCRP assignment', async function () {
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  while (assignmentScore.currentScore / assignmentScore.targetScore < 1) {
    let question = await helper.parseQuestion();
    assignmentScore.totalPossible += parseInt(await helper.checkLevel(question));
    await helper.answerQuestion(question, 'Correct');
    assignmentScore.currentScore += parseInt(await helper.checkLevel(question));
    if (assignmentScore.currentScore / assignmentScore.targetScore < 1) {
      await studentView.quizPage.populate('next_question', 'click');
    } else {
      await studentView.quizPage.populate('complete_quiz_lcrp', 'click');
    }
  }
});

Then('I complete 100% of an LC assignment', async function () {
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  while (assignmentScore.currentScore / assignmentScore.targetScore < 1) {
    let question = await helper.parseQuestion();
    assignmentScore.totalPossible += parseInt(await helper.checkLevel(question));
    await helper.answerQuestion(question, 'Correct');
    assignmentScore.currentScore += parseInt(await helper.checkLevel(question));
    if (assignmentScore.currentScore / assignmentScore.targetScore < 1) {
      await studentView.quizPage.populate('next_question', 'click');
    } else {
      let completeQuizModal = await studentView.quizPage.checkWebElementExists('complete_quiz_lc')
      assert(completeQuizModal, 'While the target score has been reached, the student was not notified of its completion.')
      await studentView.quizPage.populate('back_to_study_plan', 'click')
    }
  }
});

Given('I have completed an LC assignment, I can go back and answer more questions.', async function () {
  let resumeButton = studentView.lcPage.checkWebElementExists('start_quiz_button');
  assert(resumeButton, 'The resume activity button is not available after a student has finished a quiz.')
  await studentView.lcPage.populate('start_quiz_button', 'click');
  let nextQuestionButton = studentView.quizPage.checkWebElementExists('next_question')
  assert(nextQuestionButton !== undefined, 'Not on the last question')
  studentView.quizPage.populate('next_question', 'click');
  await sleep(5000)
});

// this should be updated to cound the number of students in the list as well.
Then(/I verify that there are "(.*)" students/, async function (students) {
  let courseInfo = courses.getCourseById(lcInfo.course);
  let studentCount = 0;
  for (var key in courseInfo) {
    let student = courseInfo[key];
    if (student[lcInfo.assignment] !== undefined) {
      studentCount++;
    }
  };
  assert(studentCount == students, 'The student count did not match: Expected: ' + students + '\nActually: ' + studentCount)
});

// This will need to be updated to support multiple students once the student list is fixed.
Then('I verify the students info is correct for LC', async function () {
  let courseInfo = courses.getCourseById(lcInfo.course);
  let studentData = {
    'started': 0,
    'completed': 0,
    'possible': 0,
    'scores': 0,
    'low': 0,
    'medium': 0,
    'high': 0
  };
  for (var key in courseInfo) {
    let student = courseInfo[key];
    if (student[lcInfo.assignment] !== undefined) {
      let studentName = await instructorView.commonPage.getElementValue('students');
      // right now this is only designed to check with one student, this will need to be an if when we can get more than the first student.
      assert(studentName.toLowerCase().includes(key.toLowerCase()), 'The student name is not correct');
      let studentScoreEle = await instructorView.lcPage.getWebElements('completion_points');
      let studentScore = parseInt(await studentScoreEle[1].getText());
      assert(studentScore === student[lcInfo.assignment].scores[0].currentScore, 'Expected Score: ' + student[lcInfo.assignment].scores[0].currentScore + '\nActual Score: ' + studentScore)
      helper.collectStudentData(studentData, student, lcInfo.assignment)
      helper.validateStudentData(studentData);
    }
  }
});

Then('I verify the students info is correct for LCRP', async function () {
  let courseInfo = courses.getCourseById(lcInfo.course);
  let studentData = {
    'started': 0,
    'completed': 0,
    'possible': 0,
    'scores': 0,
    'low': 0,
    'medium': 0,
    'high': 0,
    'retake': '-'
  };
  for (var key in courseInfo) {
    let student = courseInfo[key];
    if (student[lcInfo.assignment] !== undefined) {
      let studentName = await instructorView.commonPage.getElementValue('students');
      // right now this is only designed to check with one student, this will need to be an if when we can get more than the first student.
      assert(studentName.toLowerCase().includes(key.toLowerCase()), 'The student name is not correct');
      let calcScore = student[lcInfo.assignment].scores[0].currentScore / student[lcInfo.assignment].scores[0].totalPossible * 100;
      helper.collectStudentData(studentData, student, lcInfo.assignment)
      if (student[lcInfo.assignment].scores[0].currentScore >= student[lcInfo.assignment].scores[0].targetScore) {
        let studentScore = parseInt(await instructorView.lcrpPage.getElementValue('first_attempt'));
        assert(calcScore - 1 < studentScore && calcScore + 1 > studentScore, 'Expected Score: ' + calcScore + '± 1\nActual Score: ' + studentScore)
      } else {
        let studentScore = await instructorView.lcPage.getElementValue('first_attempt')
        assert(studentScore === '-', 'Student with score of ' + student[lcInfo.assignment].scores[0].currentScore + '/' + student[lcInfo.assignment].scores[0].targetScore + 'with a score of: ' + studentScore)
      }
      let retakeScore = parseInt(await instructorView.lcrpPage.getElementValue('retake_attempt'))
      assert(retakeScore === studentData.retake || (studentData.retake - 1 < retakeScore && studentData.retake + 1 > retakeScore, 'Expected: ' + studentData.retake + '\nActually: ' + retakeScore))
    }
  }
  helper.validateStudentData(studentData);
});

Then(/I verify the class average for "(.*)"/, async function (lc) {
  let courseInfo = courses.getCourseById(lcInfo.course);
  let averages = [];
  for (var key in courseInfo) {
    let student = courseInfo[key];
    if (student[lcInfo.assignment] !== undefined) {
      averages.push(student[lcInfo.assignment].scores[0].currentScore / student[lcInfo.assignment].scores[0].totalPossible * 100);
    }
  }
  let sum = 0;
  for (let i = 0; i < averages.length; i++) {
    sum += averages[i];
  }
  let average = sum / averages.length
  let pageAccuracy;
  if (lc === 'LC') {
    pageAccuracy = parseInt(await instructorView.lcPage.getElementValue('topic_performance'))
  } else {
    pageAccuracy = parseInt(await instructorView.lcrpPage.getElementValue('topic_performance'))
  }
  assert(average - 1 < pageAccuracy && average + 1 > pageAccuracy, 'The accuracy is not correct. Expected: ' + average + '\nActually: ' + pageAccuracy);
});

// AfterAll(function () {
//   console.log(JSON.stringify(courses.getCourses()));
//   getDriver().quit();
//   return Promise.resolve();
// });
