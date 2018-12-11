/* eslint-disable camelcase */

const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class cdl extends Component {
  things() {
    return {
      message_success: {
        desc: `An alert box with a success message`,
        locator: `div[class*='MLMessage__message_success']`
      },
      close_button_active: {
        desc: `Close button from courseware launch`,
        locator: `[data-id='activityCloseButton'][class*='MLButton__aqua']`
      },
      missing_requirements_message: {
        desc: `ready to publish prompt`,
        locator: `[data-id='modal-heading']`
      },
      missing_criteria: {
        desc: `what has not been added to the assignment`,
        locator: `[class^='ActivityHeader__missingRequirements'] span`
      }
    };
  }
}

module.exports = cdl;
