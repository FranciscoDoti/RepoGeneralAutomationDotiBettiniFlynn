const fs = require('fs');

const timestamp = Date.now()

// Selects a random number between range given, Max exclusive.
function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const lcFileHeader = `ACTIVITY_TITLE: LC${timestamp}\n\n`
const lcrpFileHeader = `ACTIVITY_TITLE: LCRP${timestamp}\nLCRP_ACTIVITY: true\nLCRP_HEADINGS: true\n\n`

// json for framework version of the test.
let manuscriptJson = {
  'ebooks': {},
  'questions': {}
}

let content = ''

// Creates 4 topics
for (let topic = 1; topic < 5; topic++) {
  let topicName = 'Topic_' + topic
  manuscriptJson['ebooks'][topicName] = []
  content += '-------------------------------------------------------------\n'
  content += 'TOPIC: ' + topicName + '\n'

  // Random generates between 1 and 4 books in topic
  var books = getRndInteger(1, 5)
  for (let bookNumber = 0; bookNumber < books; bookNumber++) {
    let ebookTitle = topicName + '_' + bookNumber
    content += 'EBOOK: ' + ebookTitle + ' [[https://ebooks.macmillanhighered.com/9781319038144?cfi=6/378&begin=4/2/4/6&end=4/2/4/7]]\n'
    manuscriptJson['ebooks'][topicName].push(ebookTitle)
  }
  content += '-------------------------------------------------------------\n'

  // Randomly generates questions between 25 and 34. LC requires 100 questions for algorithm to work properly.
  let questionCount = getRndInteger(25, 35)
  let qid = 1000 * (topic)
  for (let i = 0; i <= questionCount; i++) {
    // Each of these randomly determine different aspects of a question
    let type = getRndInteger(0, 101)
    let ebook = getRndInteger(0, books - 1)
    let primary = getRndInteger(0, 101) > 90
    let cyu = false
    if (type < 70) {
      cyu = getRndInteger(0, 101) > 75
    }
    let blooms = ['Remembering', 'Understanding', 'Applying', 'Analyzing', 'Evaluated', 'Creating']
    let bloom = blooms[getRndInteger(0, 5)]
    let level = getRndInteger(0, 101)
    if (level > 80) {
      level = 3
    } else if (level > 50) {
      level = 2
    } else {
      level = 1
    }

    let ebookTitle = topicName + '_' + ebook
    let ebookLink = '\n'

    // There is a popup that appears when a question is not associated with a book link, it is rare
    if (getRndInteger(0, 101) < 90) {
      ebookLink = ' [[https://ebooks.macmillanhighered.com/9781319038144?cfi=6/378&begin=4/2/4/6&end=4/2/4/7]]\n'
    }

    // Create the question to go into the json file for the framework
    let question = {
      'Id': qid,
      'Type': '',
      'Level': level,
      'Topic': topicName,
      'ebook': ebookTitle,
      'Answer': 'Correct',
      'Hint': '',
      'CYU': cyu,
      'Primary': primary,
      'ebookLink': ebookLink.length > 2,
      'Blooms': bloom
    }

    // 3 Question types and all of the details required for each type
    // MC question
    if (type < 70) {
      let ordered = getRndInteger(0, 101) > 80
      question['Ordered'] = ordered
      question['Type'] = 'MC'
      question['Hint'] = 'Hint for question ' + qid
      content += 'MC: ' + JSON.stringify(question)
      content += '\n<br>'
      let letters = 'ABCD'

      // Randomly selects a letter to be correct
      let correct = letters[getRndInteger(0, 3)]
      let counter = 0;

      // Marks the correct letter as correct
      for (let i = 0; i < 4; i++) {
        if (letters[i] === correct) {
          content += '\n*' + letters[i] + '. Correct ' + counter++ + '[[The Answer is Correct]]'
        } else {
          content += '\n' + letters[i] + '. Wrong ' + counter + '[[The Answer is Wrong ' + counter++ + ']]'
        }
      }
      content += '\n_never_scramble: ' + question.Ordered.toString() + '\n'

    // FitB question
    } else if (type < 90) {
      question['Type'] = 'FB'
      question['Hint'] = 'Hint for question ' + qid
      content += 'FB: ' + JSON.stringify(question)
      content += '\n<br>'
      content += '\n*correct [[The Answer is Correct]\n'

    // SC Question
    } else {
      question['Type'] = 'SC'
      question['Hint'] = 'Hint for question ' + qid
      content += 'SC: ' + JSON.stringify(question)
      content += '\n<br>'
      let letters = 'ABCD'

      // Randomly chooses a letter
      let correct = letters[getRndInteger(0, 3)]

      // Fills out sentence click area
      for (let i = 0; i < 4; i++) {
        if (letters[i] === correct) {
          content += 'Text not part of the link! {{Correct Answer}} Text not part of the link!'
        } else {
          content += 'Text not part of the link! {{Wrong Answer}} Text not part of the link!'
        }
      }

      // Marks the correct sentense as correct
      for (let i = 0; i < 4; i++) {
        if (letters[i] === correct) {
          content += '\n*' + letters[i] + '. Correct [[The Answer is Correct]]'
        } else {
          content += '\n' + letters[i] + '. Wrong [[The Answer is Wrong ]]'
        }
      }
    }

    // Forces mathjax on to each question
    content += 'MathJax: \\(\\frac{\\text{test}}{' + qid + '}\\)\n'

    // Stores question by ID into the Json
    manuscriptJson.questions[qid++] = question

    // Outputs question details to the manuscript
    content += '_content_hint: ' + question.Hint + '\n'
    content += '_level: ' + question.Level + '\n'
    content += '_primary_question: ' + question.Primary.toString() + '\n'
    content += '_lcrp_cyu_question: ' + question.CYU.toString() + '\n'
    if (question.ebookLink) {
      content += '_ebook: ' + question.ebook + ' ' + ebookLink + '\n'
    } else {
      content += '_ebook: ' + question.ebook + '\n'
    }
    content += '_blooms: ' + question.Blooms + '\n'
    content += '_learning_objectives: {[{"objective":"ff47f90f-9bbe-4f5b-bbb5-c8fdf8212833"}]}\n'
    content += '\n\n'
  }
}

// Write both the LC and LCRP files to be uploaded to FQ Tool
// ******** These files must be put in the LC S3 bucket and published to Algolia to be available in the CW environment ******
fs.writeFileSync('./features/lc/_data/auto_manuscript_lc_' + timestamp + '.txt', lcFileHeader + content)
fs.writeFileSync('./features/lc/_data/auto_manuscript_lcrp_' + timestamp + '.txt', lcrpFileHeader + content)

// Prints Json to file
fs.writeFileSync('./features/lc/_data/auto_manuscript_' + timestamp + '.json', JSON.stringify(manuscriptJson, null, 2))

// Reads in Activities
let activities = JSON.parse(fs.readFileSync('./features/lc/_data/activities.json', 'utf-8'))
// Adds newly created activity file to list
let newActivity = {
  'lc': {
    'fq': 'music/automation/auto_manuscript_lc_' + timestamp,
    'achieve': 'LC' + timestamp
  },
  'lcrp': {
    'fq': 'music/automation/auto_manuscript_lcrp_' + timestamp,
    'achieve': 'LCRP' + timestamp
  },
  'key': './features/LC/_data/auto_manuscript_' + timestamp + '.json'
}
activities.default[timestamp] = newActivity
activities.prod[timestamp] = newActivity
// Adds new files to activities.json for use by tests
fs.writeFileSync('./features/lc/_data/activities.json', JSON.stringify(activities, null, 2))
