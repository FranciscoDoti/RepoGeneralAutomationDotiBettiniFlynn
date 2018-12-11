/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class ReflectionQuestionRollUp extends Component {
  things() {
    return {
      header: {
        desc: `Header for Reflection Question Report`,
        locator: `[class*='ReflectionQuestionsRollUp__reflectionQuestionRollUpHeader']`
      },
      questions: {
        desc: `Individual rows of the Reflection Question report`,
        locator: `[class^='ReflectionQuestionsRollUp__rowContent']`
      },
      average_response: {
        desc: `Metrics on student responses`,
        locator: `[class^='ReflectionQuestionsRollUp__questionMetricContainer']`
      },
      question_label: {
        desc: `Reflection question labels`,
        locator: `[class^='ReflectionQuestionsRollUp__reflectionQuestionLabel'] a`
      },
      free_response_average: {
        desc: `Average response`,
        locator: `[data-id='reflection-question-row-metric'] div`
      },
      poll_response_average: {
        desc: `Average response for radio button poll`,
        locator: `[data-id='reflection-question-row-metric'] div div`
      }
    }; }
}

module.exports = ReflectionQuestionRollUp;




