/* eslint-disable camelcase */

const Page = require('marvin-js').Page;
const draftEditor = require('./student-summary.component.draft.editor');
const refQuestions = require('./student-summary.component.reflection-questions');
const StudentReview = require('./student-summary.component.review-page');
const StudentReviewFeedback = require('./student-summary.component.review-feedback-page');
const previousCommentPanel = require('./student-summary.component.previous-comment-panel');
const revisionPlan = require('./student-summary.component.revision-plan');
const cdl = require('./cdl.component');

exports.StudentSummaryPage = class extends Page {
  things() {
    return {
      success_flash: {
        desc: `Confirmation message that appears upon successful submission and save`,
        locator: `[class*='MLMessage__message_success__'] span[class*='MLMessage__message__']`
      },
      feedback_waiting_message: {
        desc: `Message to notify user has feedback`,
        locator: `[data-id='message']`
      },
      feedback_message_link: {
        desc: `Link to instructor feedback`,
        locator: `[data-id='message-link']`
      },
      view_feedback_button: {
        desc: `Link to instructor feedback`,
        locator: `[class^='ActivityHeaderDisplay__rightContainer'] a`
      },
      view_summary_button: {
        desc: `Link to the activity summary`,
        locator: `[data-id='header-activity-link']`
      },
      return_to_draft: {
        desc: `Return to an unsubmitted draft`,
        locator: `[data-id='Return to Draft ']`
      },
      return_to_final_draft: {
        desc: `Return to unsibmitted final draft`,
        locator: `[data-id='Return to Final Paper']`
      },
      start_draft: {
        desc: `Start draft button for user to enter drafting tool`,
        locator: `[data-id^='Start Draft '],[data-id='Start Final Paper'],[data-id^='start-next-draft-button']`
      },
      start_draft_enabled: {
        desc: `Start draft button in clickable state`,
        locator: `[data-id^='Start Draft ']:not([class*='__disabled__']),[data-id='Start Final Paper']:not([class*='__disabled__'])`
      },
      start_draft_disabled: {
        desc: `Start draft button in grayed out state`,
        locator: `[data-id^='Start Draft '][class*='__disabled__'],[data-id='Start Final Paper'][class*='__disabled__']`
      },
      start_final_paper: {
        desc: `Start final paper button in enabled out state`,
        locator: `[data-id='Start Final Paper']`
      },
      start_final_paper_disabled: {
        desc: `Start final paper button in disabled state`,
        locator: `[data-id='Start Final Paper'][class*='__disabled__']`
      },
      start_final_paper_enabled: {
        desc: `Start final paper button in disabled state`,
        locator: `[data-id='Start Final Paper']:not([class*='__disabled__'])`
      },
      view_draft_button: {
        desc: `Button to view submitted draft`,
        locator: `[data-id^='View Draft ']`
      },
      view_final_draft_button: {
        desc: `Button to view submitted final draft`,
        locator: `[data-id='View Final Paper']`
      },
      view_final_draft_feedback_button: {
        desc: `Button to view final draft feedback`,
        locator: `[data-id='View Final Paper Feedback']`
      },
      student_draft_note: {
        desc: `Alert that draft is not startable yet`,
        locator: `[class*='DraftDisplay__studentNote']`
      },
      draft_submitted_date: {
        desc: `Date stamp of submitted draft`,
        locator: `[data-id='submitted-date']`
      },
      draft_type: {
        desc: `Type of draft from student view`,
        locator: `[class^='DraftDisplay__studentReviewType']`
      },
      draft_instructions: {
        desc: `Draft instructions from Instructor`,
        locator: `[class^='DraftInstructionsDisplay__instructions']`
      },
      student_reflection_question: {
        desc: `questions student must answer for draft`,
        locator: `[data-id='reflections-list'] li`
      },
      draft_goal_list: {
        desc: `draft goals for draft`,
        locator: `[data-id='drafts-goal-list']`
      },
      peer_review_group_row: {
        desc: `peer review group`,
        locator: `[data-id='peer-review-group-row']`
      },
      peer_review_group_student: {
        desc: `peer review group`,
        locator: `[data-id='peer-review-group-student-name']`
      },
      peer_review_group_review_status: {
        desc: `peer review group`,
        locator: `[data-id='peer-review-group-review-status']`
      },
      peer_review_group_feedback_status: {
        desc: `peer review group`,
        locator: `[data-id='peer-review-group-feedback-status']`
      },
      view_draft_feedback: {
        desc: `link to previous draft feedback from revision page`,
        locator: `[data-id='view-feedback-button']`
      },
      view_revision_plan: {
        desc: `Link to the revision plan for draft`,
        locator: `[data-id='revision-plan-link'],[data-id='View Revision Plan']`
      },
      required_revision_plan: {
        desc: `Revision plan required notice`,
        locator: `[class^='DraftDisplay__revisionPlanContainer']`
      }
    };
  }

  draft_editor(arg) {
    return draftEditor.generate(arg, {
      locator: `[class^='Composition__page']`}); }

  student_read_only(arg) {
    return StudentReview.generate(arg, {
      locator: `[class^='CompositionDisplay__page']`}); }

  student_read_only_feedback(arg) {
    return StudentReviewFeedback.generate(arg, {
      locator: `[class^='FeedbackDisplay__page']`}); }

  student_reflection_questions(arg) {
    return refQuestions.generate(arg, {
      locator: `[class^='ReflectionQuestionsForm__page']`}); }

  cdl(arg) {
    return cdl.generate(arg, {
      locator: `div.app`});
  }

  previous_comment_panel(arg) {
    return previousCommentPanel.generate(arg, {
      locator: `[class^='CompositionFeedback__compositionFeedback__']`});
  }

  revision_plan(arg) {
    return revisionPlan.generate(arg, {
      locator: `[data-id='MLCard-My-Revision-Plan']`});
  }
};
