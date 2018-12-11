/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class StudentReviewFeedback extends Component {
  things() {
    return {
      draft_section: {
        desc: `MLCard heading for student draft`,
        locator: `[data-id='draft-section']`
      },
      instructor_end_comment: {
        desc: `Instructor end comment given to student`,
        locator: `[data-id='MLCard-Instructor-Comment'] [class^='FeedbackDisplay__endComment']`
      },
      final_grade_comment: {
        desc: `Final Grade: text in end comment`,
        locator: `[data-id='end-comment-section'] [class^='FeedbackDisplay__finalGradeLabel']`
      },
      final_grade_display: {
        desc: `Actual grade given to student`,
        locator: `[class^='FeedbackDisplay__finalGrade__']`
      },
      rubric_score_comment: {
        desc: `Rubric text if no rubric grade`,
        locator: `[data-id='rubric-section'] [class^='FeedbackDisplay__finalGradeLabel']`
      },
      rubric_row_1: {
        desc: `First row of the rubric table for grading`,
        locator: `[data-id= 'rubric-preview'] [class^='RubricDisplay__row'] div`
      },
      rubric_row_2: {
        desc: `Second row of the rubric table for grading`,
        locator: `[data-id= 'rubric-preview'] [class^='RubricDisplay__row']:nth-child(3) div`
      },
      rubric_row_3: {
        desc: `Third row of the rubric table for grading`,
        locator: `[data-id= 'rubric-preview'] [class^='RubricDisplay__row']:nth-child(4) div`
      },
      rubric_row_4: {
        desc: `Forth row of the rubric table for grading`,
        locator: `[data-id= 'rubric-preview'] [class^='RubricDisplay__row']:nth-child(5) div`
      },
      rubric_row_5: {
        desc: `Fifth row of the rubric table for grading`,
        locator: `[data-id= 'rubric-preview'] [class^='RubricDisplay__row']:nth-child(6) div`
      },
      submitted_draft_text: {
        desc: `Read only submitted draft`,
        locator: `[class*='public-DraftEditor-content']`
      },
      submitted_draft_paper: {
        desc: `Read only submitted draft`,
        locator: `[id='feedbackEditor']`
      },
      submitted_reflection_question_textarea: {
        desc: `Read only submitted reflection question answers`,
        locator: `[data-id='MLCard-Reflection'] div div p`
      },
      submitted_message: {
        desc: `Read only submitted green message`,
        locator: `[data-id='message']`
      },
      view_activity_summary_link: {
        desc: `link to go back to main activity page`,
        locator: `[data-id='header-activity-link']`
      },
      start_next_draft: {
        desc: `Button to start next draft in the header`,
        locator: `[class^='FeedbackDisplayHeader__rightContainer'] a[class*=MLButton__aqua]`
      },
      instructor_draft_comment: {
        desc: `Feedback flag in the margin`,
        locator: `[class^='FeedbackFlag__flagHeader']`
      },
      instructor_draft_highlight: {
        desc: `Feedback highlight in student essay`,
        locator: `[class^='FeedbackFlag__flag__']`
      },
      comment_flag_title: {
        desc: `Generic Comment Title`,
        locator: `[class^='FeedbackFlag__flagTitleText']`
      },
      comment_flag_feedback: {
        desc: `Tag line of comment`,
        locator: `[class^='FeedbackFlag__feedback__']`
      },
      comment_flag_feedback_typed: {
        desc: `Tag line of comment`,
        locator: `[class^='FeedbackFlag__feedback__']`
      },
      feedback_alert: {
          desc: `green feedback alert box`,
          locator: `[data-id= 'feedback-alert']`
      },
      feedback_alert_text: {
          desc: `green feedback alert text`,
          locator: `[data-id= 'message-text']`
      },
      feedback_flag: {
        desc: `Feedback flag in margin`,
        locator: `[class^='FeedbackFlag__flag__']`
      },
      previous_feedback_link: {
          desc: `button to go see feedback for draft 1`,
          locator: `[data-id= 'View Draft 1 Feedback']`
      },
      feedback_alert_link: {
          desc: `link to go to newest feedback`,
          locator: `[data-id= 'message-link']`
      },
      writer_help_sidebar: {
          desc: `Writer Help Sidepanel`,
          locator: `[class^='RelatedContent__sideBarHeader']`
      },
      writer_help_content: {
          desc: `Writer Help Resource`,
          locator: `[class^='RelatedContent__iframe']`
      },
      writer_help_resource_type: {
          desc: `Writer Help Resource Type`,
          locator: `[class^='RelatedContent__relatedContentTitle']`
      },
      writer_help_close: {
          desc: `Writer Help Resource Close Button`,
          locator: `[class^='RelatedContent__closeIcon']`
      },
      related_resource_link: {
          desc: `Writer Help Resource Link in feedback Flag`,
          locator: `[class^='FeedbackFlag__relatedContent'] li a`
      },
      //revision plan items
      add_note: {
        desc: `Button to add a note to the to do list`,
        locator: `[data-id='revisionplan-add-note-button']`
      },
      edit_revision_plan: {
        desc: `Button to change notes to the to do list`,
        locator: `[data-id='revisionplan-edit-list-button']`
      },
      add_another_note: {
        desc: `Button to add another note to the to do list`,
        locator: `[data-id='revisionplan-add-another-note-button']`
      },
      add_note_textbox: {
        desc: `Textbox for the note`,
        locator: `[class*='RevisionPlanList__revisionListTextbox'] input`
      },
      done_button: {
        desc: `Button to finish adding notes`,
        locator: `[data-id='revisionplan-done-button']`
      },
      delete_button: {
        desc: `Button to delete note`,
        locator: `[class^='RevisionPlanList__trashIcon']`
      },
      revision_plan_item: {
        desc: `List item in the revision plan`,
        locator: `[class^='RevisionPlanList__listEntry']`
      },
      feedback_flag_saved_note: {
        desc: `Checkmark on feedback flag for saved notes`,
        locator: `[class^='FeedbackFlag__flagCheckIcon']`
      },
      feedback_flag_revision_plan_item: {
        desc: `Feedback flag list item`,
        locator: `[data-id='revisionplan-list-label']`
      },
      feedback_flag_edit_revision_plan: {
        desc: `Button to change notes to the to do list`,
        locator: `[data-id='revisionplan-edit-note-button']`
      },
      review_revision_plan: {
        desc: `Button to move to Review Revision Plan page`,
        locator: `[data-id='review-revision-plan-button']`
      },
      revision_plan_comment_level: {
        desc: `Comment level`,
        locator: `[class^='FeedbackAddNotePopover__feedback__']`
      },
      revision_plan_comment_type: {
        desc: `Comment type`,
        locator: `[class^='FeedbackAddNotePopover__popoverTitleCont']`
      },
      revision_plan_additional_comment: {
        desc: `Additional comments`,
        locator: `[class^='FeedbackAddNotePopover__feedbackContent']`
      },
      revision_plan_predefined_comment: {
        desc: `Predefined comment`,
        locator: `[class^='FeedbackAddNotePopover__predefinedLabel']`
      },
      revision_plan_comment_level_dot: {
        desc: `Comment level dot`,
        locator: `[class^='FeedbackFlag__circleContainer']`
      },
      revision_plan_popover_related_resources: {
        desc: `related resources link in the revision plate notes`,
        locator: `[class^='FeedbackAddNotePopover__relatedContent'] li`
      },
      revision_plan_popover_related_resources_link: {
        desc: `related resources link in the revision plan notes`,
        locator: `[class^='FeedbackAddNotePopover__relatedContent'] li a`
      },
      revision_plan_popover_predefined_label: {
        desc: `revision plan popover predefined label`,
        locator: `[class^='FeedbackAddNotePopover__predefinedLabel']`
      },
      ignore_feedback_button: {
        desc: `ignore radio button`,
        locator: `[class^='RevisionPlanList__ignoreFeedback__'] input[type='radio']`
      },
      use_feedback_button: {
        desc: `use radio button`,
        locator: `[class^='RevisionPlanList__revisionPlanContainer'] div input[type='radio']`
      },
      ignore_feedback_dropdown: {
        desc: `reasons to ignore dropdown`,
        locator: `[data-id='revision-plan-dropdown']`
      },
      ignore_feedback_dropdown_option: {
        desc: `reasons to ignore`,
        locator: `[data-id='revision-plan-selection-content'] li`
      },
      revision_plan_other: {
        desc: `other textbox`,
        locator: `[class^='RevisionPlanList__otherOptionTextbox'] input`
      },
      revision_plan_other_item: {
        desc: `revision plan item for not using feedback`,
        locator: `[class^='RevisionPlanList__otherOptionTextboxContainer'] input`
      },
      revision_plan_feedback_flag_not_use: {
        desc: `not going to use wording`,
        locator: `[class^='FeedbackFlag__listTitle']`
      },
      revision_plan_feedback_flag_not_use_reason: {
        desc: `reason selected to not use`,
        locator: `[class^='FeedbackFlag__revisionPlanContainer'] div:nth-child(2)`
      },
      revision_plan_end_comment_not_use_reason: {
        desc: `reason selected to not use`,
        locator: `[class^='RevisionPlanList__revisionPlanContainer'] div:nth-child(2)`
      }
    };
  }
}

module.exports = StudentReviewFeedback;
