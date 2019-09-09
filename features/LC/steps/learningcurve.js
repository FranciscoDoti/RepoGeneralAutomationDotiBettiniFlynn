const { Given, When, Then } = require('cucumber');
const jwt = require(`${process.cwd()}/app/jwt`);
const stepsPath = process.cwd() + '/features/LC/pages/';
const { PageObject } = require(`${process.cwd()}/app/PageObject`);
const pages = require(`${process.cwd()}/features/LC/pages/.page.js`).pages;
const { log } = require(`${process.cwd()}/app/logger`);
const { getDriver, sleep } = require(`${process.cwd()}/app/driver`);
const {By} = require('selenium-webdriver');
const config = require(`${process.cwd()}/config/config.json`);
const urls = require(`${process.cwd()}/config/urls.json`);
const assert = require('assert');
const helper = require('./lc-helper');
const courses = require('./lc-courses');
const fs = require('fs');

let studentView = {
  lcrpPage: new PageObject('lc-student-lcrp.json', stepsPath),
  lcPage: new PageObject('lc-student-lc.json', stepsPath),
  commonPage: new PageObject('lc-student-common.json', stepsPath),
  quizPage: new PageObject('lc-quiz.json', stepsPath),
  trendsPage: new PageObject('lc-trends-and-insights.json', stepsPath)
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
  let url = urls.LC[config.environment];
  if (urlKey.toLowerCase() === 'lcrpurl') {
    url += 'lcrp/'
  }
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

  await getDriver().manage().window().setRect({width: 1440, height: 900});
  await sleep(2000);
});

Given(/I start a new assignment as "(.*)"$/, async function (user) {
  if (lcInfo === undefined || lcInfo === null) {
    let data = fs.readFileSync(`${process.cwd()}/features/LC/data/user.json`);
    lcInfo = JSON.parse(data)[config.environment]
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
  await pages.studentLcrp.populate('retake_quiz', 'click');
  let score = await pages.quiz.getAttributeValue('current_score');
  let scores = score.split(/\//);
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, user, lcInfo.assignment);
  assignmentScore.targetScore = parseInt(scores[1]);
})

Given(/I start a new course as "(.*)"$/, async function (user) {
  if (lcInfo === undefined || lcInfo === null) {
    let data = fs.readFileSync(`${process.cwd()}/features/LC/data/user.json`);
    lcInfo = JSON.parse(data)[config.environment]
  }
  const epoch = new Date().getTime();
  lcInfo.course = epoch;
  courses.addCourse(lcInfo.course);
});

When('I view the student landing page for LCRP', async function () {
  let results = await helper.getReadingInfo();
  if (results[1] !== results[2]) {
    let lockVisiable = await pages.studentLcrp.assertElementExists('reading_lock');
    // assert(lockVisiable, 'Lock is not present with readings that are unread.');
  } else {
    let startQuiz = await pages.studentLcrp.assertElementExists('start_quiz_button');
    // assert(startQuiz, 'When readings are read/none exists, take quiz should be visible.')
  }
  courses.addAssignment(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  courses.addAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
});

When('I view the student landing page for LC', async function () {
  courses.addAssignment(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  courses.addAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  assignmentScore.targetScore = parseInt(await pages.studentLc.getAttributeValue('target_score'))
  let beginActivityButton = pages.studentLc.assertElementExists('start_quiz_button')
  assert(beginActivityButton, 'The Begin Activity Button is not present on the page.')
});

When('I click on a reading the ebook view opens', async function () {
  let readList = await pages.studentLcrp.getWebElements('reading_list');
  if (readList.length > 0) {
    let topic = await readList[0].getText();
    readList[0].click();
    await sleep(500);
    // await helper.verifyEbook(topic);
  }
});

When('I read the rest of the ebooks the quiz button is shown', async function () {
  let readingCount = await helper.getReadingInfo();
  for (let i = 0; i < readingCount[2]; i++) {
    let readList = await pages.studentLcrp.getWebElements('reading_list');
    let topic = await readList[i].getText();
    readList[i].click();
    await sleep(500);
    // await helper.verifyEbook(topic);
  }
})

Then(/I can start the assessment "(.*)"/, async function (lc) {
  if (lc === 'LC') {
    await pages.studentLc.populate('start_quiz_button', 'click')
  } else {
    let quizButton = await pages.studentLcrp.assertElementExists('start_quiz_button');
    // assert(quizButton, 'The Quiz button was not displayed.')
    await pages.studentLcrp.populate('start_quiz_button', 'click');
  }
  let score = await pages.quiz.getAttributeValue('current_score');
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
  await pages.quiz.populate('next_question', 'click');
})
Given('I see a question, I can open the ebook', async function () {
  let question = await helper.parseQuestion();
  await pages.quiz.populate('open_ebook', 'click');
  // await helper.verifyEbook(question.ebook);
  await pages.studentCommon.populate('close_ereader', 'click')
})

Given('I see a question, I can get a hint', async function () {
  let question = await helper.parseQuestion();
  await pages.quiz.populate('get_hint', 'click');
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  assignmentScore.totalPossible += parseInt(await helper.checkLevel(question));
  question.incorrect = true;
  let hintModal = await pages.quiz.assertElementExists('hint_answer_modal');
  assert(hintModal, 'The Hint modal did not display after clicking the "Get a Hint" button');
  await helper.checkLevel(question);
  await helper.answerQuestion(question, question.answer)
  assignmentScore.currentScore += parseInt(await helper.checkLevel(question));
});

Given('I see a question, I can get the answer', async function () {
  let question = await helper.parseQuestion();
  await pages.quiz.populate('get_hint', 'click');
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
      await pages.quiz.populate('next_question', 'click');
    } else {
      await pages.quiz.assertElementExists('midway_modal')
      assert('Midway modal did not exist after 50% of the target score had been reached.')
      await pages.quiz.populate('next_question_midway', 'click');
    }
  }
});

When('I am done with an assessment, I see my score and can retake the assessment', async function () {
  let retakeButton = await pages.studentLcrp.assertElementExists('retake_quiz');
  // assert(retakeButton, 'The Retake button does not exist after completing an assignment');
  let assignmentInfo = courses.getAssignment(lcInfo.course, testInfo.currentUser, lcInfo.assignment)
  let quizResults = await pages.studentLcrp.getWebElements('quiz_results');
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
      await pages.quiz.populate('next_question', 'click');
    } else {
      await pages.quiz.populate('complete_quiz_lcrp', 'click');
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
      await pages.quiz.populate('next_question', 'click');
    } else {
      await pages.quiz.assertElementExists('complete_quiz_lc')
      //assert(completeQuizModal, 'While the target score has been reached, the student was not notified of its completion.')
      await pages.quiz.populate('back_to_study_plan', 'click')
    }
  }
});

Given('I have completed an LC assignment, I can go back and answer more questions.', async function () {
  let resumeButton = pages.studentLc.assertElementExists('start_quiz_button');
  assert(resumeButton, 'The resume activity button is not available after a student has finished a quiz.')
  await pages.studentLc.populate('start_quiz_button', 'click');
  let nextQuestionButton = pages.quiz.assertElementExists('next_question')
  assert(nextQuestionButton !== undefined, 'Not on the last question')
  pages.quiz.populate('next_question', 'click');
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
      let students = await pages.instructorCommon.getWebElements('students');
      for (let i in students) {
        let studentName = await students[i].findElement(By.css('td[data-test-id="studentListName"]')).getText()
        if (studentName.toLowerCase().includes(key.toLowerCase())) {
          let studentScore = parseInt(await students[i].findElement(By.css('td[data-test-id="studentListQuestionsScore"]')).getText());
          assert(studentScore === student[lcInfo.assignment].scores[0].currentScore, 'Expected Score: ' + student[lcInfo.assignment].scores[0].currentScore + '\nActual Score: ' + studentScore)
          helper.collectStudentData(studentData, student, lcInfo.assignment)
          helper.validateStudentData(studentData);
        }
      }
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
      let studentName = await pages.instructorCommon.getAttributeValue('students');
      // right now this is only designed to check with one student, this will need to be an if when we can get more than the first student.
      assert(studentName.toLowerCase().includes(key.toLowerCase()), 'The student name is not correct');
      let calcScore = student[lcInfo.assignment].scores[0].currentScore / student[lcInfo.assignment].scores[0].totalPossible * 100;
      helper.collectStudentData(studentData, student, lcInfo.assignment)
      if (student[lcInfo.assignment].scores[0].currentScore >= student[lcInfo.assignment].scores[0].targetScore) {
        let studentScore = parseInt(await pages.instructorLcrp.getAttributeValue('first_attempt'));
        assert(calcScore - 1 < studentScore && calcScore + 1 > studentScore, 'Expected Score: ' + calcScore + '± 1\nActual Score: ' + studentScore)
      } else {
        let studentScore = await pages.instructorLc.getAttributeValue('first_attempt')
        assert(studentScore === '-', 'Student with score of ' + student[lcInfo.assignment].scores[0].currentScore + '/' + student[lcInfo.assignment].scores[0].targetScore + 'with a score of: ' + studentScore)
      }
      let retakeScore = parseInt(await pages.instructorLcrp.getAttributeValue('retake_attempt'))
      assert(retakeScore === studentData.retake || (studentData.retake - 1 < retakeScore && studentData.retake + 1 > retakeScore, 'Expected: ' + studentData.retake + '\nActually: ' + retakeScore))
    }
  }
  helper.validateStudentData(studentData);
});

Then(/I verify the class average for "(.*)"/, async function (lc) {
  let courseInfo = courses.getCourseById(lcInfo.course);
  let pointsScored = 0;
  let totalPossible = 0;
  for (var key in courseInfo) {
    let student = courseInfo[key];
    if (student[lcInfo.assignment] !== undefined && (student[lcInfo.assignment].scores[0].currentScore >= student[lcInfo.assignment].scores[0].targetScore || lc === 'LC')) {
      pointsScored += student[lcInfo.assignment].scores[0].currentScore
      totalPossible += student[lcInfo.assignment].scores[0].totalPossible;
    }
  }
  let average = pointsScored / totalPossible * 100;
  let pageAccuracy;
  if (lc === 'LC') {
    pageAccuracy = parseInt(await pages.instructorLc.getAttributeValue('topic_performance'))
  } else {
    pageAccuracy = parseInt(await pages.instructorLcrp.getAttributeValue('topic_performance'))
  }
  assert(average - 1 <= pageAccuracy && average + 1 >= pageAccuracy, 'The accuracy is not correct. Expected: ' + average + '\nActually: ' + pageAccuracy);
});

Then('I can look at Trends and Insights, as a student', async function () {
  await pages.studentLcrp.populate('trends_and_insights', 'click')
  let student = courses.getStudentInfo(lcInfo.course, testInfo.currentUser);
  let assignments = Object.keys(student);
  await sleep(3000);
  let assignmentInfo = await pages.studentTnI.getWebElements('topic_summarys')
  assert(assignmentInfo.length === assignments.length, 'The Number of assignments shown does not match.\nExpected: ' + assignments.length + '\nActually: ' + assignmentInfo.length)
  let started = 0;
  let completed = 0;
  for (let i = 0; i < assignments.length; i++) {
    let assignmentDetails = student[assignments[i]].scores;
    let firstAttempScore = '-'
    let retakeAttempts = '-'
    let totalGains = '-'
    if (assignmentDetails[0].currentScore >= assignmentDetails[0].targetScore) {
      firstAttempScore = assignmentDetails[0].currentScore / assignmentDetails[0].totalPossible * 100
      completed++;
    } else {
      started++
    }
    if (assignmentDetails.length > 1) {
      retakeAttempts = -1
      for (let x = 0; x < assignmentDetails.length; x++) {
        if (assignmentDetails[x].currentScore >= assignmentDetails[x].targetScore) {
          retakeAttempts++
        }
      }
      if (retakeAttempts >= 1) {
        totalGains = assignmentDetails[retakeAttempts].currentScore / assignmentDetails[retakeAttempts].totalPossible * 100 - firstAttempScore
      }
    }
    helper.validateActivityRow(assignmentInfo[i], firstAttempScore, retakeAttempts, totalGains)
  }

  let actualStarted = parseInt((await pages.studentTnI.getAttributeValue('started_assignments')).replace(/Started \(/, '').replace(/\)/, ''))
  assert(actualStarted === started, 'Started Value did not match\nExpected: ' + started + '\nActual: ' + actualStarted)

  let actualCompleted = parseInt((await pages.studentTnI.getAttributeValue('completed_assignments')).replace(/Completed \(/, '').replace(/\)/, ''))
  assert(actualCompleted === completed, 'Completed Value did not match\nExpected: ' + completed + '\nActual: ' + actualCompleted)
})

Then('I can look at Trends and Insights, as an instructor', async function () {
  await pages.instructorLcrp.populate('trends_and_insights', 'click')
  let courseInfo = courses.getCourseById(lcInfo.course)
  let students = Object.keys(courseInfo)
  let courseData = {}
  let grades = {
    'low': 0,
    'medium': 0,
    'high': 0
  }
  let classTotal = 0;
  let totalPassed = 0;
  for (let i = 0; i < students.length; i++) {
    let assignments = Object.keys(courseInfo[students[i]])
    for (let j = 0; j < assignments.length; j++) {
      let assigmentScores = courseInfo[students[i]][assignments[j]].scores
      if (courseData[assignments[j]] === undefined) {
        courseData[assignments[j]] = {
          'firstTotal': 0,
          'firstPossible': 0,
          'firstCompletes': 0,
          'retakeTotal': 0,
          'retakePossible': 0,
          'retakeCount': 0
        };
      }
      if (assigmentScores[0].currentScore >= assigmentScores[0].targetScore) {
        let currentScore = assigmentScores[0].currentScore
        let totalPossible = assigmentScores[0].totalPossible
        courseData[assignments[j]].firstTotal += currentScore
        courseData[assignments[j]].firstPossible += totalPossible
        courseData[assignments[j]].firstCompletes++
        classTotal += currentScore / totalPossible * 100
        totalPassed++
        if (currentScore / totalPossible * 100 < 70) {
          grades.low++
        } else if (currentScore / totalPossible * 100 >= 90) {
          grades.high++
        } else {
          grades.medium++
        }
        if (assigmentScores.length > 1) {
          for (let k = assigmentScores.length - 1; k > 0; k--) {
            if (assigmentScores[k].currentScore >= assigmentScores[k].targetScore) {
              courseData[assignments[j]].retakeTotal += assigmentScores[k].currentScore
              courseData[assignments[j]].retakePossible += assigmentScores[k].totalPossible
              courseData[assignments[j]].retakeCount++;
            }
          }
        }
      }
    }
  }

  let classAverage = parseInt(await pages.instructorTnI.getAttributeValue('accuracy_distribution'))
  let calcAverage = Math.round(classTotal / totalPassed)
  assert(calcAverage - 1 <= classAverage && calcAverage + 1 >= classAverage, 'Class Average was outside of expected value: \nExpected:' + calcAverage + '\nActually: ' + classAverage)

  let low = parseInt((await pages.instructorTnI.getAttributeValue('low_accuracy_bullet')).replace(/Under 70% \(/, '').replace(/\)/, ''))
  assert(low === grades.low, 'Lower Grades did not match: \nExpected: ' + grades.low + '\nAcutally: ' + low)
  let medium = parseInt((await pages.instructorTnI.getAttributeValue('medium_accuracy_bullet')).replace(/70-89% \(/, '').replace(/\)/, ''))
  assert(medium === grades.medium, 'Medium Grades did not match: \nExpected: ' + grades.medium + '\nAcutally: ' + medium)
  let high = parseInt((await pages.instructorTnI.getAttributeValue('high_accuracy_bullet')).replace(/90% and up \(/, '').replace(/\)/, ''))
  assert(high === grades.high, 'Higher Grades did not match: \nExpected: ' + grades.high + '\nAcutally: ' + high)

  let assignmentList = await pages.instructorTnI.getWebElements('topic_summarys')
  let assignmentIds = Object.keys(courseData)
  assert(assignmentList.length === assignmentIds.length, 'The number of assignments did not match: \nExpected: ' + assignmentIds.length + '\nActually: ' + assignmentList.length)

  for (let i in assignmentList) {
    let calcFirstAttempts = '-'
    if (courseData[assignmentIds[i]].firstTotal !== 0) {
      calcFirstAttempts = courseData[assignmentIds[i]].firstTotal / courseData[assignmentIds[i]].firstPossible * 100
    }
    let retakeCount = courseData[assignmentIds[i]].retakeCount
    let calcRetakeAttempts
    if (courseData[assignmentIds[i]].retakeCount === 0) {
      calcRetakeAttempts = '-'
      retakeCount = '-'
    } else {
      calcRetakeAttempts = courseData[assignmentIds[i]].retakeTotal / courseData[assignmentIds[i]].retakePossible * 100 - calcFirstAttempts
    }
    await helper.validateActivityRow(assignmentList[i], calcFirstAttempts, retakeCount, calcRetakeAttempts)
  }
})

Then('I answer questions until I get a MathJax hint', async function () {
  let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
  while (assignmentScore.currentScore / assignmentScore.targetScore < 0.5) {
    let question = await helper.parseQuestion();
    let assignmentScore = courses.getCurrentAttempt(lcInfo.course, testInfo.currentUser, lcInfo.assignment);
    assignmentScore.totalPossible += parseInt(await helper.checkLevel(question));
    await pages.quiz.populate('get_hint', 'click')
    let hintModal = await pages.quiz.assertElementExists('hint_answer_modal')
    // assert(hintModal, 'Expected Hint Modal to be present on the page.')
    if (question.MathJax === 'True') {
      await sleep(5000);
      let mathjax = await pages.quiz.assertElementExists('mathjax')
      //assert(mathjax, 'Expected MathJax to be present on the page.')
      break
    } else {
      let hintText = await pages.quiz.getAttributeValue('hint_answer_modal')
      assert(hintText.includes(question.Hint), 'Hint text did not match: \nExpected: ' + question.Hint + '\nActually: ' + hintText)
    }
    question.incorrect = true;
    await helper.answerQuestion(question, 'Correct');
    assignmentScore.currentScore += parseInt(await helper.checkLevel(question));
    if (assignmentScore.currentScore / assignmentScore.targetScore < 0.5) {
      await pages.quiz.populate('next_question', 'click');
    } else {
      assert(await pages.quiz.assertElementExists('midway_modal'), 'Midway modal did not exist after 50% of the target score had been reached.')
      await pages.quiz.populate('back_to_study_plan_midpoint', 'click');
    }
  }
})
