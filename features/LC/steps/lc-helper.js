const stepsPath = process.cwd() + '/features/LC/pages/';
const { PageObject } = require(`${process.cwd()}/app/PageObject`);
const { sleep } = require(`${process.cwd()}/app/driver`);
const assert = require('assert');
const {By} = require('selenium-webdriver');
const pages = require(`${process.cwd()}/features/LC/pages/.page.js`).pages;

let studentView = {
  lcrpPage: new PageObject('lc-student-lcrp.json', stepsPath),
  lcPage: new PageObject('lc-student-lc.json', stepsPath),
  commonPage: new PageObject('lc-student-common.json', stepsPath),
  quizPage: new PageObject('lc-quiz.json', stepsPath)
}

let instructorView = {
  commonPage: new PageObject('lc-instructor-common.json', stepsPath),
  lcrpPage: new PageObject('lc-instructor-lcrp.json', stepsPath),
  lcPage: new PageObject('lc-instructor-lc.json', stepsPath),
  trendsPage: new PageObject('lc-trends-and-insights.json', stepsPath)
}

// Returns array of 3 values, 2nd is number of read readings 3rd is total readings.
const getReadingInfo = async function () {
  await sleep(3000);
  let readings = await pages.studentLcrp.getAttributeValue('total_readings')
  let regex = /(\d+) of (\d+)/
  return readings.match(regex)
}

const verifyEbook = async function (topic) {
  // let ebookPanel = await pages.studentCommon.checkWebElementExists('ebook_pane')
  // assert(ebookPanel, 'Ebook panel did not open.')
  let ebookTitle = await pages.studentCommon.getAttributeValue('ebook_iframe', 'name')
  assert(topic.trim() === ebookTitle.trim(), 'The wrong ebook opened, actually: ' + ebookTitle + '\n expected: ' + topic)
}

const parseQuestion = async function () {
  let questionText = await pages.quiz.getAttributeValue('whole_question')
  let question = questionText.split(/\n/g)[0]
  question = question.replace(/:/g, '":"')
  question = question.replace(/, /g, '","')
  question = '{"' + question + '"}'
  let questionObj = JSON.parse(question)
  return questionObj
}

const checkLevel = async function (question) {
  let points = 5
  await sleep(500)
  switch (question.Type) {
    case 'FB':
      points = points + 5 + parseInt(question.Level) * 10
      break
    default:
      points = points + parseInt(question.Level) * 10
  }
  // Need to keep state for 'rushing' to handle points later
  let pointsString = await pages.quiz.getAttributeValue('question_points')
  let regex = /Question Value: (\d+) points/
  let pointList = pointsString.match(regex)
  if (question.incorrect) {
    assert(parseInt(pointList[1]) < points, 'Question level: ' + question.Level + '\nExpected ' + pointList[1] + ' to be less than ' + points)
  } else {
    assert(parseInt(pointList[1]) === points, 'Question level: ' + question.Level + '\nExpected ' + points + '\nActually: ' + pointList[1])
  }
  return pointList[1]
}

const answerQuestion = async function (question, answer) {
  if (answer !== 'Correct') {
    await sleep(5000)
  }
  switch (question.Type) {
    case 'FB':
      await pages.quiz.populate('fill_in_the_blank_answer', answer)
      await pages.quiz.populate('submit_answer', 'click')
      break
    case 'SC':
      let answerChoises = await pages.quiz.getWebElements('sentense_click')
      for (let i = 0; i < answerChoises.length; i++) {
        let text = await answerChoises[i].getText()
        if (text.includes(answer)) {
          await answerChoises[i].click()
          break
        }
      }
      await sleep(500)
      break
    case 'MC':
      let ordered = question.Ordered
      let answerList = await pages.quiz.getWebElements('mc_answers')
      for (let i = 0; i < answerList.length; i++) {
        let text = await answerList[i].getText()
        if (ordered) {
          assert(text.includes(i.toString()) > -1, 'The index was not correct. \n Expected: ' + i + '\nActually: ' + text.charAt(text.length - 1))
        }
        if (text.includes(answer)) {
          await answerList[i].click()
          break
        }
      }
      await sleep(500)
      await pages.quiz.populate('submit_answer', 'click')
      break
  }
}

const orderedQuestionCheck = async function () {

}

const collectStudentData = async function (studentData, student, assignment) {
  let score = student[assignment].scores[0]
  if (score.currentScore >= score.targetScore) {
    studentData.completed++
  } else {
    studentData.started++
  }

  if (score.currentScore / score.totalPossible >= 0.9) {
    studentData.high++
  } else if (score.currentScore / score.totalPossible >= 0.8) {
    studentData.medium++
  } else {
    studentData.low++
  }

  studentData.scores += score.currentScore
  studentData.possible += score.totalPossible

  if (student[assignment].scores.length > 1) {
    for (let score in student[assignment].scores) {
      if (score.targetScore < score.currentScore) {
        studentData.retake = score.currentScore / score.totalPossible
      } else {
        studentData.retake = ''
      }
    }
  }
}

const validateStudentData = async function (studentData) {
  let started = parseInt((await pages.instructorCommon.getAttributeValue('assignments_started')).replace(/Started \(/, '').replace(/\)/, ''))
  assert(started === studentData.started, 'Expected: ' + studentData.started + '\nActually: ' + started)

  let completed = parseInt((await pages.instructorCommon.getAttributeValue('assignments_completed')).replace(/Completed \(/, '').replace(/\)/, ''))
  assert(completed === studentData.completed, 'Expected: ' + studentData.completed + '\n Actually: ' + completed)

  let low = parseInt((await pages.instructorCommon.getAttributeValue('accuracy_low')).replace(/Under 70% \(/, '').replace(/\)/, ''))
  assert(low === studentData.low, 'Expected: ' + studentData.low + '\n Actually: ' + low)

  let medium = parseInt((await pages.instructorCommon.getAttributeValue('accuracy_medium')).replace(/70-89% \(/, '').replace(/\)/, ''))
  assert(medium === studentData.medium, 'Expected: ' + studentData.medium + '\n Actually: ' + medium)

  let high = parseInt((await pages.instructorCommon.getAttributeValue('accuracy_high')).replace(/90% and up \(/, '').replace(/\)/, ''))
  assert(high === studentData.high, 'Expected: ' + studentData.high + '\n Actually: ' + high)
}

const validateActivityRow = async function (rowElement, firstAttempScore, retakeAttempts, totalGains) {
  let actualFirstAttempt = await rowElement.findElement(By.xpath('./td[@data-test-id="firstAttemptAccuracy"]')).getText()
  if (firstAttempScore === '-') {
    assert(firstAttempScore === actualFirstAttempt, 'First Attempts did not match\nExpected: ' + firstAttempScore + '\nActual: ' + actualFirstAttempt)
  } else {
    actualFirstAttempt = parseInt(actualFirstAttempt)
    assert(firstAttempScore - 1 <= actualFirstAttempt && firstAttempScore + 1 >= actualFirstAttempt, 'First Attempts did not match on assignment: \nExpected: ' + firstAttempScore + '\nActual: ' + actualFirstAttempt)
  }

  let actualRetakeCount = await rowElement.findElement(By.xpath('./td[@data-test-id="retakeNumber"]')).getText()
  assert(actualRetakeCount == retakeAttempts, 'Retake Attempts did not match\nExpected: ' + retakeAttempts + '\nActual: ' + actualRetakeCount)

  let actualRetakeGains = await rowElement.findElement(By.xpath('./td[@data-test-id="moreRecentRetakeGains"]')).getText()
  if (totalGains === '-') {
    assert(totalGains === actualRetakeGains, 'Retake Attempts did not match\nExpected: ' + retakeAttempts + '\nActual: ' + actualRetakeCount)
  } else {
    actualRetakeGains = parseInt(actualRetakeGains)
    assert((totalGains - 2) <= actualRetakeGains && actualRetakeGains <= (totalGains + 2), 'Retake Gains did not match on assignment:.\nExpected: ' + (totalGains - 2) + ' < ' + actualRetakeGains + ' < ' + (totalGains + 2))
  }
}

module.exports = {
  getReadingInfo,
  verifyEbook,
  parseQuestion,
  checkLevel,
  answerQuestion,
  orderedQuestionCheck,
  collectStudentData,
  validateStudentData,
  validateActivityRow

}
