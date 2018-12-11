/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class EditingMarksRollUp extends Component {
  things() {
    return {
      header: {
        desc: `Header for Editing Marks Report`,
        locator: `[class*='EditingMarksRollUp__editingMarkRollUpHeader']`
      },
      marks: {
        desc: `Individual rows of the Editing Marks report`,
        locator: `[class^='EditingMarksRollUp__rowContentContainer']`
      },
      editing_mark_label: {
        desc: `Editing mark labels`,
        locator: `[class^='EditingMarksRollUp__editingMarkLabel'] a`
      },
      editing_mark_count: {
        desc: `Editing mark counter`,
        locator: `[data-id='editing-mark-row-count']`
      }
    }; }
}

module.exports = EditingMarksRollUp;




