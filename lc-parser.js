const fs = require('fs');

// open url https://int-achieve-courseware-frontend.mldev.cloud/courses/77ax4w/overview
// login as student testachievestudent+02018073001@gmail.com
// with pass One2ka$4
// close the 'enroll in this course' popup if necessary
// * check for assignment ${name} exists
// - this is horrible, a pile of nested divs with NO distinguishing ids, and only dynamically generated classes.
// - selector will be something like '//a[text(${TestName})]'
// * check its label is 'LearningCurve'
// - which makes this thing something like '//a[text(${TestName})]/../../div/div[text("LearningCurve")]'
// * check 'assignment status', expect 'open' ?
// * check 'completion status', expect ??
// click 'READ & PRACTICE' for the appropriate course
// (note that almost none of these seem to have any sort of useful id, data-test-id, any appropriate selector,
//  so the order of the day is fie a bug with whoever and use some clunky-ass xpath until they have names.)
// find the 'Apostrophes' assignment (or whichever one you're using) link
// verify the completion status is correct ('In Progress' if reusing, probably rather have an unused assn)
// verify the due date is sane
// and click the assignment link to start the quiz
//
// now, on the resulting url (e.g.:
// https://int-achieve-learningcurve.mldev.cloud/?user_id=0050n000001gbIkAAI&file=english%2FHacker_Generic_ePub%2FHacker_Gen_ePub_Apostrophes&itemid=7302a3d5-edeb-49f0-8a68-840c8360d006&course_id=d254a831-b820-4bb6-a93c-6cd05eb3e9ad&return_url=https%253A%252F%252Fint-achieve-courseware-frontend.mldev.cloud%252Fcourses%252F77ax4w%252Foverview )
// take out the 'file' param (e.g.:)
// english%2FHacker_Generic_ePub%2FHacker_Gen_ePub_Apostrophes
// urldecode it
// english/Hacker_Generic_ePub/Hacker_Gen_ePub_Apostrophes
// append '.txt' to it
// prepend https://int-achieve-learningcurve.mldev.cloud/learningcurve_activity_config/ to it
// grab that url - it's the answer file for the quiz in question. super secure. :rolleyes:
// feed that file to the below parser to build a set of questions and answers.
// this should be exactly what the below parser uses as 'demo.lc.txt', which should work the same for any other quiz file.
//
// then click 'Begin Activity'
// * data-test-id="beginActivityBtn"
//
// now, the annoying part.
// then, because LC randomizes question order, for each question, youl'l have to get the ?text on the page
// and run it through your built bank to see which one it is (hopefully only 1 matches).
// you can find the question by looking for data-test-id="question"
// and you can tell what type it is by looking for the contained data-test-id="SentenceClick" for SC, etc.
//
// so, our question parser here will have all the questions available in `section[i].questions[j].data`
// this copy of the questions has things that will NOT be displayed directly in the browser:
// - [[foo]] is shown as tooltips or hints
// - {{bla}} has more rendering done, maybe containing <i> tags or similar
// so, unless you can think of a better way, i recommend:
// - take each local question, and split it into chunks, ignoring everything within [[]] or {{}}
// - check if the currently displayed question in the browser does a successful match to ALL of these chunks for any of our local questions.  once it does, you know what question the browser is currently looking at, and you should already have the correct answer available locally.




let lcfull = fs.readFileSync(`./demo.lc.txt`, `utf8`);

let lcsplit = lcfull.split(`-------------------------------------------------------------`);
let lcbars = lcsplit.length
let sectionCount = (lcbars - 1) / 2

let i = 1;
let s = 0;
let sections = []
while (i < lcbars) {
  sections[s] = {meta: lcsplit[i],
                 data: lcsplit[i + 1]}
  i = i + 2;
  s = s + 1;
}

function getTopic(section) {
  section.topic = section.meta.match(/TOPIC: (.*)/)[1]
  return section
}

function getQuestions(section) {
  let questions = [];
  let inquestion = false;
  let counter = 0
  let raw = section.data.split(/\r?\n/)

  let rgx = {scType: /^SC: (.*)/,
             mcType: /^MC: (.*)/,
             correctAnswer: /\*[ABCDEFG].*?]]/,
             question: /([MC]|[SC])(.|\n).*?([ABCDEFG]\.\s)/,
             uid: /^_fq_uid: (.*)/};

  raw.map(function(line, i, arr) {
    if (rgx.scType.test(line)) {
      if (!inquestion) { inquestion = true; }
      counter += 1;
      questions[counter] = {type: 'SC',
                            data: '',
                            question: ''}
      questions[counter].question += line + arr[i+1] + arr[i + 2] + arr[i + 3];
    }
    else if (rgx.mcType.test(line)) {
      if (!inquestion) { inquestion = true; }
      counter += 1;
      let prompt =
      questions[counter] = {type: 'MC',
                            data: '',
                            question: ''}
      questions[counter].question += line + arr[i+1] + arr[i + 2] + arr[i + 3];
      var mcQuestion =  questions[counter].question.match(rgx.question);
      questions[counter].question = mcQuestion !== null && mcQuestion.length ? mcQuestion[0].slice(0, -4) : '';
    } else {
      if (inquestion) {
        if (rgx.uid.test(line)) {
          questions[counter].fq_uid = line.match(rgx.uid)[1];
        } else {
          questions[counter].data += line
          questions[counter].data += '\n'
          if (rgx.correctAnswer.test(line)) {
            // this does assume there will only be one correct answer per question,
            // which might not always be true.
            questions[counter].correct = line.match(rgx.correctAnswer)[0].slice(4);
          }
        }
      }
    }
  });
  section.questions = questions;
  section.raw = raw
  return section;
}

sections.map(function(section) {
  section = getTopic(section);
  section = getQuestions(section);
  // QQQ continue on here, go through and pull out questions, correct answers, and unmustached question fragments to match against.
});

//console.log(getTopic(sections[0]));
//console.log(sections);
// console.log(sections[1].data);
//console.log(sections[0].questions[0]);
//console.log(`-------------`);
// console.log(sections[0].questions);
// console.log(`-------------`);
 console.log(sections[1].questions);
// console.log(`-------------`);
// console.log(sections[0].questions[2]);
// console.log(`-------------`);
// console.log(sections[0].questions[3]);
// console.log(`-------------`);
// console.log(`-------------`);
// console.log(`-------------`);
// console.log(sections[0].raw);
