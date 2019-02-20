const fs = require('fs');

let timestamp = Date.now()
let wsManuscript = fs.createWriteStream('./features/lc/_data/auto_manuscript_' + timestamp + '.txt')

function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let manuscriptJson = {
  'ebooks': {},
  'questions': {}
}

for (var topic = 1; topic < 5; topic++) {
  manuscriptJson['ebooks']['Topic_' + topic] = []
  wsManuscript.write('-------------------------------------------------------------\n')
  wsManuscript.write('TOPIC: Topic_' + topic + '\n')
  var books = getRndInteger(1, 5)
  for (let bookNumber = 0; bookNumber < books; bookNumber++) {
    let ebookTitle = 'Topic_' + topic + '_' + bookNumber
    wsManuscript.write('EBOOK: ' + ebookTitle + ' [[https://ebooks.macmillanhighered.com/9781319038144?cfi=6/378&begin=4/2/4/6&end=4/2/4/7]]\n')
    manuscriptJson['ebooks']['Topic_' + topic].push(ebookTitle)
  }
  wsManuscript.write('-------------------------------------------------------------\n')
  let questionCount = getRndInteger(25, 35)
  let qid = 1000 * (topic)
  for (let i = 0; i <= questionCount; i++) {
    let type = getRndInteger(0, 101)
    let ebook = getRndInteger(0, books - 1)
    let primary = getRndInteger(0, 101) > 90
    var cyu = false
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

    var ebookTitle = 'Topic_' + topic + '_' + ebook
    var ebookLink = '\n'
    if (getRndInteger(0, 101) < 90) {
      ebookLink = ' [[https://ebooks.macmillanhighered.com/9781319038144?cfi=6/378&begin=4/2/4/6&end=4/2/4/7]]\n'
    }
    let question = {
      'Id': qid,
      'Type': '',
      'Level': level,
      'ebook:': ebookTitle,
      'Answer': 'Correct',
      'Hint': '',
      'CYU': cyu,
      'Primary': primary,
      'EbookLink': ebookLink.length > 2,
      'Blooms': bloom
    }
    if (type < 70) {
      let ordered = getRndInteger(0, 101) > 80
      question['Ordered'] = ordered
      question['Type'] = 'MC'
      question['Hint'] = 'Hint for question ' + qid
      wsManuscript.write('MC: ' + JSON.stringify(question))
      wsManuscript.write('\n<br>')
      let letters = 'ABCD'
      let correct = letters[getRndInteger(0, 3)]
      let counter = 0;
      for (let i = 0; i < 4; i++) {
        if (letters[i] === correct) {
          wsManuscript.write('\n*' + letters[i] + '. Correct ' + counter++ + '[[The Answer is Correct]]')
        } else {
          wsManuscript.write('\n' + letters[i] + '. Wrong ' + counter + '[[The Answer is Wrong ' + counter++ + ']]')
        }
      }
      wsManuscript.write('\n_never_scramble: ' + question.Ordered.toString() + '\n')
    } else if (type < 90) {
      question['Type'] = 'FB'
      question['Hint'] = 'Hint for question ' + qid
      wsManuscript.write('FB: ' + JSON.stringify(question))
      wsManuscript.write('\n<br>')
      wsManuscript.write('\n*correct [[The Answer is Correct]\n')
    } else {
      question['Type'] = 'SC'
      question['Hint'] = 'Hint for question ' + qid
      wsManuscript.write('SC: ' + JSON.stringify(question))
      wsManuscript.write('\n<br>')
      let letters = 'ABCD'
      let correct = letters[getRndInteger(0, 3)]
      for (let i = 0; i < 4; i++) {
        if (letters[i] === correct) {
          wsManuscript.write('Text not part of the link! {{Correct Answer}} Text not part of the link!')
        } else {
          wsManuscript.write('Text not part of the link! {{Wrong Answer}} Text not part of the link!')
        }
      }
      for (let i = 0; i < 4; i++) {
        if (letters[i] === correct) {
          wsManuscript.write('\n*' + letters[i] + '. Correct [[The Answer is Correct]]')
        } else {
          wsManuscript.write('\n' + letters[i] + '. Wrong [[The Answer is Wrong ]]')
        }
      }
    }
    wsManuscript.write('MathJax: \\(\\frac{\\text{test}}{' + qid + '}\\)\n')
    manuscriptJson.questions[qid++] = question
    wsManuscript.write('_content_hint: ' + question.Hint + '\n')
    wsManuscript.write('_level: ' + question.Level + '\n')
    wsManuscript.write('_primary_question: ' + question.Primary.toString() + '\n')
    wsManuscript.write('_lcrp_cyu_question: ' + question.CYU.toString() + '\n')
    if (question.ebookLink) {
      wsManuscript.write('_ebook: ' + question.ebook + ' ' + ebookLink + '\n')
    }
    wsManuscript.write('_blooms: ' + question.Blooms + '\n')
    wsManuscript.write('_learning_objectives: {[{"objective":"ff47f90f-9bbe-4f5b-bbb5-c8fdf8212833"}]}\n')
    wsManuscript.write('\n\n')
  }
}

fs.writeFileSync('./features/lc/_data/auto_manuscript_' + timestamp + '.json', JSON.stringify(manuscriptJson))
