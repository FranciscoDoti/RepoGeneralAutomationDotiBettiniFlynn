/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class Rubric extends Component {
  things() {
    return {
      dropdown: {
        desc: `Dropdown to select rubric`,
        locator: `[data-id='rubric-dropdown']`
      },
      dropdown_option: {
        desc: `Rubric options that are selectable`,
        locator: `[data-id='rubric-selection-content'] li`
      },
      preview: {
        desc: `Rubric that appears after selection from dropdown`,
        locator: `[data-id='rubric-preview']`
      },
      preview_name: {
        desc: `First cell with title of rubric that appears after selection from dropdown`,
        locator: `[data-id='rubric-preview'] div`
      }
    }; }
}

module.exports = Rubric;


