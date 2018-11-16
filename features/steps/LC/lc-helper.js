const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { sleep } = require('../../../app/driver');
const assert = require('assert');

let studentView = {
  lcrpPage: new PageObject('lc-student-lcrp.json', stepsPath),
  lcPage: new PageObject('lc-student-lc.json', stepsPath),
  commonPage: new PageObject('lc-student-common.json', stepsPath),
  quizPage: new PageObject('lc-quiz.json', stepsPath)
};

// Returns array of 3 values, 2nd is number of read readings 3rd is total readings.
const getReadingInfo = async function () {
  let readings = await studentView.lcrpPage.getElementValue('total_readings');
  let regex = /(\d+) of (\d+)/;
  return readings.match(regex)
}

const verifyEbook = async function (topic) {
  //let ebookPanel = await studentView.commonPage.checkWebElementExists('ebook_pane');
  //assert(ebookPanel, 'Ebook panel did not open.')
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

module.exports = {
  getReadingInfo,
  verifyEbook,
  parseQuestion,
  checkLevel,
  answerQuestion,
  orderedQuestionCheck
}
