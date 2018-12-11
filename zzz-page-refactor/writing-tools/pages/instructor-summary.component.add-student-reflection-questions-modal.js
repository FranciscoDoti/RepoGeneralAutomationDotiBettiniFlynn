/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class AddStudentReflectionQuestionsModal extends Component {
  things() {
    return {
      ref_question_modal: {
        desc: `popup for adding reflection questions`,
        locator: `[data-id='modal']`
      },
      close: {
        desc: `Close button on the modal`,
        locator: `[data-id='close-modal']`
      },
      question_title: {
        desc: `Reflection Question title`,
        locator: `[data-id='input-fields'] [data-id='question-title']`
      },
      question_type: {
        desc: `Genre the reflection question is`,
        locator: `[data-id='input-fields'] [data-id='question-type']`
      },
      save: {
        desc: `Button to save changes`,
        locator: `[data-id='save-button']`
      },
      cancel: {
        desc: `Cancel button on modal`,
        locator: `[data-id='cancel-button']`
      },
      // TODO: great place to use method_missing? or, what, es6 proxies?  also hover, other psuedo selectors.
      // maybe.  maybe wildly unnecessary.
      // You could also go the site_prism route and make checkbox a subclass of basePageObject or decorate it.
      check: {
        desc: `Checkbox toggling selection of nth reflection question`,
        locator: `[data-id='checkbox']`
      },
      check__checked: {
        desc: `Checkbox that is selected`,
        locator: `[data-id='modal'] [data-id='input-fields'] [data-id='checkbox']:checked`
      },
      check__unchecked: {
        desc: `Checkbox that is unselected`,
        locator: `[data-id='modal'] [data-id='input-fields'] [data-id='checkbox']:not(:checked)`
      },
      disabled_question: {
        desc: `Checkbox that is disabled`,
        locator: `[class^='CheckboxField__lockedLabel']`
      },

      // TODO: dev: data-ids for this and surrounding bits needs to be added / reevaluated
      // there's no good way to get just the desc text here, since it's just a text-node
      // with sibling element-nodes.  when done, change the following to actually just be
      // the description.
      desc: {
        desc: `reflection question description`,
        locator: `[data-id='field-title']>div`
      }
    }; }

}

module.exports = AddStudentReflectionQuestionsModal;
