/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class EditingMarksDrillDown extends Component {
  things() {
    return {
      dropdown: {
        desc: `Dropdown for editing marks`,
        locator: `[class^='MLDropdown__dropdownTitle']`
      },
      editing_marks: {
        desc: `Dropdown contents for editing marks`,
        locator: `[data-id='editingmark-drilldown-selection-content'] li`
      },
      student_name: {
        desc: `Student breakdown row`,
        locator: `[data-id='editingmark-student-name']`
      },
      mark_count: {
        desc: `Editing mark counter per student`,
        locator: `[data-id='editingmark-student-count']`
      },
      active_dropdown: {
        desc: `Active dropdown`,
        locator: `[class^='MLDropdown__openContainer'] a`
      }
    };
  }
}

module.exports = EditingMarksDrillDown;




