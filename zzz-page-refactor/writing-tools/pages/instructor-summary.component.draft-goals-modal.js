/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class DraftGoalModal extends Component {
  things() {
    return {
      goal_popup: {
        desc: `modal that appears with the selectable draft goals`,
        locator: `[class^='MLModal__modalContent']`
      },
      goal_checkbox: {
        desc: `checkbox that allows user to select draft goals`,
        locator: `[data-id='modal'] [data-id='input-fields'] [data-id='checkbox']`
      },
      goal_summary_list: {
        desc: `list element that tracks which draft goals have been selected`,
        locator: `[data-id='selected-fields']`
      },
      goal_description: {
        desc: `description of the draft goal`,
        locator: `[data-id='modal'] [data-id='input-fields'] [data-id='field-content']`
      },
      goal: {
        desc: `expandable portion of the draft goal to show more detials`,
        locator: `[data-id='modal'] [class^='CheckboxField__container__']`
      },
      goal_save: {
        desc: `save button to add draft goals`,
        locator: `[data-id='save-button']`
      },
      goal_cancel: {
        desc: `cancel button to `,
        locator: `[data-id='cancel-button']`
      }
    }; }
}

module.exports = DraftGoalModal;




