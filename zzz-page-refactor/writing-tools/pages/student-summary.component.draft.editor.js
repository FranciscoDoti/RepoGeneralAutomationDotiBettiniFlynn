/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class DraftEditor extends Component {
  things() {
    return {
      draft_area: {
        desc: `Main textarea in which students edit their draft.`,
        locator: `[class*='public-DraftEditor-content']`
      },
      view_activity_summary_link: {
        desc: `Link on Draft Details panel to return user to activity summary page`,
        locator: `[data-id='details-panel-activity-link-div']`
      },
      view_previous_draft_link: {
        desc: `Link on Draft Details panel to return user to previous draft feedback`,
        locator: `[data-id='details-panel-previous-draft-link-div']`
      },
      activity_draft_panel: {
        desc: `Link on Draft Details panel to expand or collapse draft info`,
        locator: `[data-id='draft-activity-detail-panel']`
      },
      activity_prompt_panel: {
        desc: `Link on Draft Details panel to expand or collapse activity prompt info`,
        locator: `[data-id='activity-prompt-detail-panel']`
      },
      activity_final_rubric_panel: {
        desc: `Link on Draft Details panel to expand or collapse final rubric info`,
        locator: `[data-id='final-rubric-detail-panel']`
      },
      activity_draft_goals_panel: {
        desc: `Subheader on Draft Activity panel that displays draft goals`,
        locator: `[data-id='drafts-goal-list']`
      },
      activity_draft_instructions_panel: {
        desc: `Subheader on Draft Activity panel that displays draft instructions`,
        locator: `[data-id='draft-instructions']`
      },
      activity_rubric_panel_preview: {
        desc: `Rubric panel that is previewed`,
        locator: `[data-id='rubric-preview']`
      },
      activity_reflection_questions_panel: {
        desc: `Subheader on Draft Activity panel that displays reflection questions`,
        locator: `[data-id='reflections-list']`
      },
      activity_prompt_description_panel: {
        desc: `Subheader on Activity Prompt panel that displays description content`,
        locator: `[data-id='activity-prompt-content-detail-panel']`
      },
      final_rubric_panel_column_4: {
        desc: `Rubric level 4 in final rubric panel`,
        locator: `[data-id='rubric-column-4']`
      },
      final_rubric_panel_column_3: {
        desc: `Rubric level 3 in final rubric panel`,
        locator: `[data-id='rubric-column-3']`
      },
      return_to_activity_page_link: {
        desc: `Link at header of read only student submission page to return user to activity summary page`,
        locator: `[data-id='header-activity-link']`
      },
      final_rubric_panel_column_2: {
        desc: `Rubric level 2 in final rubric panel`,
        locator: `[data-id='rubric-column-2']`
      },
      final_rubric_panel_column_1: {
        desc: `Rubric level 1 in final rubric panel`,
        locator: `[data-id='rubric-column-1']`
      },
      final_rubric_panel_right_arrow: {
        desc: `Scroll right arrow in final rubric panel`,
        locator: `[data-id='rubric-arrow-right']`
      },
      final_rubric_panel_left_arrow: {
        desc: `Scroll left arrow in final rubric panel`,
        locator: `[data-id='rubric-arrow-left']`
      },
      save_draft: {
        desc: `Save draft button`,
        locator: `[data-id='save-draft']`
      },
      submit_paper: {
        desc: `Submit draft when no reflection questions present`,
        locator: `[data-id='submit-paper']`
      },
      submit_paper_alert_button: {
        desc: `Finalize submission button on alert`,
        locator: `[data-id='dialog-submit']`
      },
      submit_paper_alert_cancel_button: {
        desc: `Cancel submission button on alert`,
        locator: `[data-id='dialog-cancel']`
      },
      start_reflection: {
        desc: `Done, Start Reflection button`,
        locator: `[data-id='start-reflection']`
      },
      flash_message: {
        desc: `Display for save + status type information`,
        locator: `[data-id='message']`
      },
      leave_page_alert: {
        desc: `Alert that appears when student tries to navigate away from page with unsaved work`,
        locator: `[class*='MLDialog__alert_container_show']`
      },
      leave_draft_page_button: {
        desc: `Button on alert that navigates student back to activity summary page`,
        locator: `[data-id='details-panel-activity-link-dialog-leave']`
      },
      stay_draft_page_button: {
        desc: `Button on alert that keeps student on drafting page`,
        locator: `[data-id='details-panel-activity-link-dialog-stay']`
      },
      view_draft_link: {
        desc: `Link on the reflection page that takes user back to drafting page`,
        locator: `[data-id='return-to-draft-from-reflection-questions']`
      },
      draft_save_button_disabled: {
        desc: `Button to save draft in editor when no text written`,
        locator: `[data-id='save-draft'][class*='MLButton__disabled_']`
      },
      draft_save_button_enabled: {
        desc: `Button to save draft in editor when text exists in editor`,
        locator: `[data-id='save-draft']:not([class*='MLButton__disabled_'])`
      },
      start_reflection_button_disabled: {
        desc: `Button to go to reflection questions when text doesn't exists in editor`,
        locator: `[data-id='start-reflection'][class*='MLButton__disabled_']`
      },
      start_reflection_button_enabled: {
        desc: `Button to save draft in editor when text exists in editor`,
        locator: `[data-id='start-reflection']:not([class*='MLButton__disabled_'])`
      },
      // Not sure if this one goes here (read only view of student draft?)
      reflection_question_submission_textarea: {
        desc: `Textarea of reflection questions on view of submitted draft`,
        locator: `[data-id='MLCard-Reflection'] div div p`
      },
      saved_draft_alert: {
        desc: `Textarea of reflection questions on view of submitted draft`,
        locator: `[data-id='saved-draft-alert']`
      },
      activity_details_link: {
        desc: `drafting tool link to activity summary`,
        locator: `[class^='CompositionDraftDetails__link__']`
      },
      writer_help_info_icon: {
        desc: `icon representing writer details`,
        locator: `[class^='CompositionDraftSideBarHeader__activityDetailsIcon__']`
      },
      writer_help_close: {
        desc: `icon for going back from help resource`,
        locator: `[class^='CompositionSearchContents__backButtonContainer']`
      },
      writer_help_search_icon: {
        desc: `icon representing writer help search`,
        locator: `[class*='__searchIcon__']`
      },
      writer_help_search_bar: {
        desc: `input for writer help search`,
        locator: `[class^='CompositionSearchContents__searchBoxWrapper'] input[type='search']`
      },
      writer_help_resource_link: {
        desc: `link to ereader resource`,
        locator: `[class^='CompositionSearchContents__searchResult__']`
      },
      previous_feedback_info_icon: {
        desc: `icon representing previous feedback for a draft`,
        locator: `[class^='CompositionDraftSideBarHeader__feedbackIcon__']`
      },
      previous_comment_panel: {
        desc: `panel showing a students previous feeback for a draft`,
        locator: `[class^='CompositionFeedback__compositionFeedback__']`
      },
      previous_feedback_link: {
        desc: `link to previous draft feedback`,
        locator: `[data-id='details-panel-previous-draft-link-div']`
      },
      revision_plan_panel: {
        desc: `Link on Revision Plan panel to expand or collapse revision plan`,
        locator: `[data-id='revision-plan-detail-panel']`
      },
      revision_plan_note: {
        desc: `Revision plan items to do on panel`,
        locator: `[class^='CompositionRevisionPlan__revisionPlanRow']`
      },
      revision_plan_note_checkbox: {
        desc: `Revision plan items to do on panel checkbox`,
        locator: `[data-id='revisionplan-list-checkbox']`
      },
      edit_revision_plan_link: {
        desc: `link to previous revision plan`,
        locator: `[data-id='details-panel-edit-revision-plan-link-div']`
      }
    };
  }
}

module.exports = DraftEditor;
