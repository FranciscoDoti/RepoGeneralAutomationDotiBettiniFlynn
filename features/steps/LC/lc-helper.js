const stepsPath = process.cwd() + '/features/pageDefs/LearningCurve/';
const { PageObject } = require('../../../app/pageObject');
const { sleep } = require('../../../app/driver');
const assert = require('assert');

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

// Returns array of 3 values, 2nd is number of read readings 3rd is total readings.
const getReadingInfo = async function () {
  let readings = await studentView.lcrpPage.getElementValue('total_readings');
  let regex = /(\d+) of (\d+)/;
  return readings.match(regex)
}

const verifyEbook = async function (topic) {
  // let ebookPanel = await studentView.commonPage.checkWebElementExists('ebook_pane');
  // assert(ebookPanel, 'Ebook panel did not open.')
  let ebookTitle = await studentView.commonPage.getElementValue('ebook_iframe', 'name');
  assert(topic.trim() === ebookTitle.trim(), 'The wrong ebook opened, actually: ' + ebookTitle + '\n expected: ' + topic);
}

const parseQuestion = async function () {
  let questionText = await studentView.quizPage.getElementValue('whole_question');
  let question = questionText.split(/\n/g)[0];
  question = question.replace(/:/g, '":"');
  question = question.replace(/, /g, '","');
  question = '{"' + question + '"}';
  let questionObj = JSON.parse(question);
  return questionObj;
}

const checkLevel = async function (question) {
  let points = 5;
  await sleep(500)
  switch (question.Type) {
    case 'FB':
      points = points + 5 + parseInt(question.Level) * 10;
      break;
    default:
      points = points + parseInt(question.Level) * 10;
  }
  // Need to keep state for 'rushing' to handle points later
  let pointsString = await studentView.quizPage.getElementValue('question_points')
  let regex = /Question Value: (\d+) points/;
  let pointList = pointsString.match(regex)
  if (question.incorrect) {
    assert(parseInt(pointList[1]) < points, 'Question level: ' + question.Level + '\nExpected ' + pointList[1] + ' to be less than ' + points)
  } else {
    assert(parseInt(pointList[1]) === points, 'Question level: ' + question.Level + '\nExpected ' + points + '\nActually: ' + pointList[1])
  }
  return pointList[1];
}

const answerQuestion = async function (question, answer) {
  if (answer !== 'Correct') {
    await sleep(5000)
  }
  switch (question.Type) {
    case 'FB':
      await studentView.quizPage.populate('fill_in_the_blank_answer', answer)
      await studentView.quizPage.populate('submit_answer', 'click');
      break;
    case 'SC':
      if (answer === 'Correct') {
        await studentView.quizPage.populate('correct_sentense_select', 'click')
      } else {
        await studentView.quizPage.populate('incorrect_sentense_select', 'click')
      }
      break;
    case 'MC':
      let ordered = question.Ordered;
      let answerList = await studentView.quizPage.getWebElements('mc_answers');
      for (let i = 0; i < answerList.length; i++) {
        let text = await answerList[i].getText();
        if (ordered) {
          assert(text.includes(i.toString()) > -1, 'The index was not correct. \n Expected: ' + i + '\nActually: ' + text.charAt(text.length - 1));
        }
        if (text.includes(answer)) {
          await answerList[i].click()
        }
      }
      await sleep(500)
      await studentView.quizPage.populate('submit_answer', 'click');
      break;
  }
}

const orderedQuestionCheck = async function () {

}

const collectStudentData = async function (studentData, student, assignment) {
  let score = student[assignment].scores[student[assignment].scores.length - 1]
  if (score.currentScore >= score.targetScore) {
    studentData.completed++;
  } else {
    studentData.started++
  }

  if (score.currentScore / score.totalPossible >= 0.9) {
    studentData.high++;
  } else if (score.currentScore / score.totalPossible >= 0.8) {
    studentData.medium++;
  } else {
    studentData.low++;
  }

  studentData.scores += score.currentScore;
  studentData.possible += score.totalPossible;
}

const validateStudentData = async function (studentData) {
  let started = parseInt((await instructorView.commonPage.getElementValue('assignments_started')).replace(/Started \(/, '').replace(/\)/, ''))
  assert(started === studentData.started, 'Expected: ' + studentData.started + '\nActually: ' + started)

  let completed = parseInt((await instructorView.commonPage.getElementValue('assignments_completed')).replace(/Completed \(/, '').replace(/\)/, ''))
  assert(completed === studentData.completed, 'Expected: ' + studentData.completed + '\n Actually: ' + completed)

  let low = parseInt((await instructorView.commonPage.getElementValue('accuracy_low')).replace(/Under 70% \(/, '').replace(/\)/, ''))
  assert(low === studentData.low, 'Expected: ' + studentData.low + '\n Actually: ' + low)

  let medium = parseInt((await instructorView.commonPage.getElementValue('accuracy_medium')).replace(/70-89% \(/, '').replace(/\)/, ''))
  assert(medium === studentData.medium, 'Expected: ' + studentData.medium + '\n Actually: ' + medium)

  let high = parseInt((await instructorView.commonPage.getElementValue('accuracy_high')).replace(/90% and up \(/, '').replace(/\)/, ''))
  assert(high === studentData.high, 'Expected: ' + studentData.high + '\n Actually: ' + high)
}

module.exports = {
  getReadingInfo,
  verifyEbook,
  parseQuestion,
  checkLevel,
  answerQuestion,
  orderedQuestionCheck,
  collectStudentData,
  validateStudentData
}
