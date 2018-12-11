/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class ActivityPrompt extends Component {
  things() {
    return {
      edit: {
        desc: `Button to edit the assignment prompt`,
        locator: `[data-id='prompt-edit']`
      },
      delete: {
        desc: `Button to delete the assignment prompt`,
        locator: `[data-id='prompt-delete']`
      },
      description: {
        desc: `Text area for prompt description`,
        locator: `[data-id='prompt-description']`
      },
      save: {
        desc: `Button to save prompt description`,
        locator: `[data-id='prompt-save']`
      },
      cancel: {
        desc: `Button to cancel changes to prompt description`,
        locator: `[data-id='prompt-cancel']`
      },
      edit_area: {
        desc: `Activity prompt editable space`,
        locator: `[class*='public-DraftEditor-content']`
      },
    }; }
}

module.exports = ActivityPrompt;




