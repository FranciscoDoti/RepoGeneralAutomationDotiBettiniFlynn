/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class RevisionPlan extends Component {
  things() {
    return {
      note: {
        desc: `List item in the revision plan`,
        locator: `[data-id='revisionplan-list-row']`
      },
      draft_goal_dropdown: {
        desc: `Dropdown to attach draft goal to end comment`,
        locator: `[data-id='revision-plan-item-goal-dropdown']`
      },
      draft_goal_dropdown_item: {
        desc: `Draft goal options`,
        locator: `[data-id='revision-plan-item-goal-content'] li`
      },
      draft_goal_dropdown_title: {
        locator: `[class^='MLDropdown__dropdownTitle']`
      },
      add_note_message: {
        desc: `Message to tell users they need to add a revision plan item`,
        locator: `[class^='RevisionPlan__instructionsContainer']`
      },
      edit_notes: {
        desc: `Edit revision plan button`,
        locator: `[class^='RevisionPlan__editModeLabel']`
      },
      up_arrow: {
        desc: `Reorder up`,
        locator: `[class^='RevisionPlan__upArrow']`
      },
      down_arrow: {
        desc: `Reorder down`,
        locator: `[class^='RevisionPlan__downArrow']`
      },
      done_button: {
        desc: `Closes edit mode`,
        locator: `[data-id='revision-plan-edit-done']`
      },
      start_draft: {
        desc: `Start draft button for user to enter drafting tool`,
        locator: `[data-id^='Start Draft '],[data-id='Start Final Paper'],[data-id^='start-next-draft-button']`
      },
      add_another_note: {
        desc: `Add another note button`,
        locator: `[data-id='revisionplan-add-another-note-button']`
      },
      add_note_textbox: {
        desc: `Textbox for the note`,
        locator: `[class*='RevisionPlan__addNotesTextbox__']`
      },
      revision_plan_item: {
        desc: `List item in the revision plan`,
        locator: `[data-id='revisionplan-list-description']`
      },
      delete_note: {
        desc: `Delete note button`,
        locator: `[class^='RevisionPlan__trashIcon']`
      }
    };
  }
}

module.exports = RevisionPlan;
