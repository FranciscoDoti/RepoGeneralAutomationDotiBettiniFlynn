/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class RubricDrillDown extends Component {
  things() {
    return {
      dropdown: {
        desc: `Dropdown for editing marks`,
        locator: `[class^='MLDropdown__dropdownTitle']`
      },
      dropdown_item: {
        desc: `Dropdown list items`,
        locator: `ul[class^='MLDropdown__dropdownContent'] li`
      },
      distribution: {
        desc: `Graph of student rubric performance distribution`,
        locator: `[class^='RubricScores__scoreGraph']`
      },
      levels: {
        desc: `List of criteria with student lists`,
        locator: `[class^='RubricScores__cardContainer']`
      },
      student_draft: {
        desc: `Link to student feedback`,
        locator: `[data-id='rubric-score-student-name']`
      },
    };
  }
}

module.exports = RubricDrillDown;




