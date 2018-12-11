/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class ReflectionQuestionDrillDown extends Component {
  things() {
    return {
      dropdown: {
        desc: `Dropdown for reflection question`,
        locator: `[class*='reflectionQuestionDropdown'] [class^='MLDropdown__dropdownTitle']`
      },
      dropdown_item: {
        desc: `Dropdown list items for reflection questions`,
        locator: `[class*='reflectionQuestionDropdown'] ul[class^='MLDropdown__dropdownContent'] li`
      },
      dropdown_label: {
        desc: `Text of the selected reflection question`,
        locator: `[class^='ReflectionQuestions__dropdownLabel']`
      },
      poll_bar_graph: { 
        desc: `Poll response aggrigate bar graph`,
        locator: `svg.recharts-surface`
      },
      word_cloud: {
        desc: `The word cloud!!`,
        locator: `[class^='ReflectionQuestions__svgContainer']`
      },
      student_name: {
        desc: `Student breakdown student name`,
        locator: `[data-id='reflection-question-student-name']`
      },
      word_count: {
        desc: `Student breakdown student response`,
        locator: `[data-id='reflection-question-student-response']`
      }
    };
  }
}

module.exports = ReflectionQuestionDrillDown;




