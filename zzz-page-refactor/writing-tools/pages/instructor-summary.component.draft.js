/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class Draft extends Component {
  things() {
    return {
      title: {
        locator: `[data-id='draft-section'] span [class^='Heading__headingText__']`,
        desc: `Draft heading title`
      },
      reflection_question: {
        desc: `Reflection question list after instructor has added reflection questions`,
        locator: `[data-id="reflections-list"] li`
      },
      add_reflection_questions: {
        desc: `Link to display the modal that allows selection of reflection questions`,
        locator: `[data-id='add-reflections']`
      },
      edit_draft_goals: {
        desc: `pencil icon to edit the draft goals`,
        locator: `[data-id='draft-goal-edit']`
      },
      saved_draft_goal: {
        desc: `draft goals list after instructor has added draft goals`,
        locator: `ul[data-id='drafts-goal-list'] li[data-id='draft-goal-label']`
      },
      edit_reflections: {
        desc: `pencil icon to edit reflection questions`,
        locator: `[data-id='reflections-edit']`
      },
      add_draft_instructions: {
        desc: `Button that makes the draft instructions editable for the xth draft on the summary page`,
        locator: `//*[@data-id='add-instructions']`,
        type: 'xpath'
      },
      edit_draft_instructions: {
        desc: `Button that makes the draft instructions editable for the xth draft on the summary page`,
        locator: `//*[@data-id='draft-instructions-edit']`,
        type: 'xpath'
      },
      delete_button: {
        desc: `A button to display a modal prompting for confirmation to delete this draft from the assignment`,
        locator: `[data-id='draft-delete']`
      },
      draft_instructions: {
        desc: `Text of the Draft Instructions displayed (non-editable)`,
        locator: `[data-id='draft-instructions']`
      },
      save_draft_instructions: {
        desc: `Button to save Draft Instructions for the current draft.  Only visible when instructions are editable.`,
        locator: `[data-id='save-draft-instructions']`
      },
      draft_instructions_textarea: {
        desc: `The editable textarea where draft instructions for the current draft can be added and edited`,
        locator: `[data-id='textarea-draft-instructions']`
      },
      cancel_draft_instructions: {
        desc: `Button to discard unsaved changes made to a draft's instructions and sets the textarea back to uneditable`,
        locator: `[data-id='cancel-draft-instructions']`
      },
      draft_card_title: {
        desc: `The title (header area) of each draft on the assignment summary page`,
        // TODO: get dev to give this title a data-id.  with the svg and whatever in there,
        //  draft-section text itself is like `>Final Draft\n>`
        locator: `//*[@data-id="draft-section"]/span/span`,
        type: `xpath`
      },
      draft_add_instructions: {
        desc: `Link to make visible and editable the draft instructions control`,
        locator: `[data-id='add-instructions']`
      },
      draft_add_goal: {
        desc: `Link to display the modal to edit a draft's reflections`,
        locator: `[data-id='add-reflections']`
      },
      draft_review_dropdown: {
        desc: `Select to set the type of review for a draft`,
        locator: `[data-id='review-type-dropdown']`
      },
      draft_review_dropdown_items: {
        desc: `Select to set the type of review for a draft`,
        locator: `[data-id='review-type-selection-open'] ul li`
      },
      alert_delete_button: {
        desc: `The confirmation button in the alert dialog that is presented on attempting to delete a draft`,
        locator: `[data-id='dialog-delete']`
      },
      final_draft_delete_button_alert: {
        desc: `The confirmation button in the alert dialog that is presented on attempting to delete a draft`,
        locator: `[class^='MLDialog__alert'] [class^='MLDialog__content'] [class^='MLDialog__buttons'] [data-id='dialog-delete']`
      },
      draft_alert_cancel_button: {
        desc: `The cancellation button in the alert dialog that is presented on attempting to delete a draft`,
        locator: `[data-id='dialog-cancel']`
      },
      draft_note: {
        desc: `Text block per draft describing necessary preconditions to start work on this particular draft`,
        locator: `[class^='Draft__draftNote__']`
      },
      review_type_final_draft: {
        desc: `final draft review type`,
        locator: `[class^='DraftReviewTypeSelector__studentReviewType']`
      },
      revision_plan_dropdown: {
        desc: `Revision Plan dropdown`,
        locator: `[data-id='revision-plan-dropdown']`
      },
      revision_plan_dropdown_content: {
        desc: `Revision Plan dropdown options`,
        locator: `[data-id='revision-plan-selection-content'] li`
      },
      no_group_message: {
        desc: `peer review empty group message`,
        locator: `[data-id='message']`
      }
    };

  }
}

module.exports = Draft;
