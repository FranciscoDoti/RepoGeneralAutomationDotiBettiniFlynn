/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class StudentReflectionQuestions extends Component {
  things() {
    return {
      student_reflection_answer: {
        desc: `Reflection Question area`,
        locator: `[class^='ReflectionQuestionsForm__reflection__']`
      },
      student_reflection_text: {
        desc: `Text area where student answers free response reflection questions`,
        locator: `[class^='ReflectionQuestionsForm__reflection__'] textarea`
      },
      reflection_button_submit_enabled: {
        desc: `Final submit button for reflection questions and draft submission with properly filled out reflection questions`,
        locator: `[data-id='submit-draft']:not([class*='MLButton__disabled'])`
      },
      reflection_button_submit_disabled: {
        desc: `Final submit button for reflection questions and draft submission when reflection questions not answered fully`,
        locator: `[data-id='submit-draft'][class*='MLButton__disabled']`
      },
      reflection_polls_radio_button: {
        desc: `Multiple choice reflection question answer choice`,
        locator: `[class^='ReflectionQuestionsForm__reflection'] form input[type='radio']`
      },
      leave_page_alert: {
        desc: `Popup as you try to leave reflection questions without saving`,
        locator: `[class*='MLDialog__alert']`
      },
      draft_submit: {
        desc: `Submit draft button`,
        locator: `[data-id='submit-draft']`
      },
      leave_reflection_page_button: {
        desc: `Button on alert that navigates student back to drafting page`,
        locator: `[data-id='reflection-questions-dialog-leave']`
      },
      stay_reflection_page_button: {
        desc: `Button on alert that keeps student on reflection page`,
        locator: `[data-id='reflection-questions-dialog-stay']`
      },
      draft_submit_confirm: {
        desc: `Confirmation button on modal`,
        locator: `[data-id='dialog-submit']`
      },
      draft_submit_cancel: {
        desc: `Cancel button on modal`,
        locator: `[data-id='dialog-cancel']`
      },
      save_button: {
        desc: `save reflection questions button`,
        locator: `[data-id='save-draft']`
      },
      view_draft_link: {
        desc: `link from reflection questions back to draft page`,
        locator: `[data-id='return-to-draft-from-reflection-questions']`
      },
      submission_alert: {
        desc: `Modal that pops up to student when submit paper`,
        locator: `[class^='MLDialog__dialog__'] [class^='MLDialog__message__']`
      }
    };
  }
}

module.exports = StudentReflectionQuestions;




