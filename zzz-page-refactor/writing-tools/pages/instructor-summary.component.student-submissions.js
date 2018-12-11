/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class StudentSubmissions extends Component {
  things() {
    return {
      dropdown_drafts: {
        desc: `Available drafts in drop down on submission grid`,
        locator: `[data-id='submission-status-dropdown'] [data-id='submission-status-selection-content'] li`
      },
      draft_select_dropdown: {
        desc: `Drop Down to change drafts`,
        locator: `[data-id='submission-status-filter'] [data-id='submission-status-dropdown']`
      },
      dropdown_drafts_selected: {
        desc: `Available drafts in drop down on submission grid`,
        locator: `[data-id='submission-status-filter'] [data-id='submission-status-dropdown'] [class^='MLDropdown__dropdown'] [data-id='submission-status-selection-content'] li svg`
      },
      dropdown_drafts_title: {
        desc: `Available drafts in drop down on submission grid`,
        locator: `[data-id='submission-status-filter'] [data-id='submission-status-dropdown'] [class^='MLDropdown__dropdown'] [class^='MLDropdown__dropdownTitle']`
      },
      no_submissions_alert: {
        desc: `blank data for submitted student assignments`,
        locator: `[class^='SubmissionStatusTable__table'] [data-id='no-submissions-alert']`
      },
      row_name: {
        desc: `student name column`,
        locator: `[class^='SubmissionStatusItem__row__'] [data-id='name']`
      },
      row_date: {
        desc: `submission date column`,
        locator: `[class^='SubmissionStatusItem__row__'] [data-id='completion-date']`
      },
      row_status: {
        desc: `submission status column`,
        locator: `[class^='SubmissionStatusItem__row__'] [data-id='review-status']`
      },
      row_start: {
        desc: `start review link`,
        locator: `[class^='SubmissionStatusItem__row__'] [data-id='review-status'] a`
      },
      row_sent: {
        desc: `Text area cell of Send Status column`,
        locator: `[class^='SubmissionStatusItem__row__'] [data-id='send-status']`
      },
      send_review_link: {
        desc: `Send Review link that instructor hits on student submission grid to send student feedback`,
        locator: `[class^='SubmissionStatusItem__row__'] [data-id='send-status'] a`
      },
      start_review: {
        desc: `Link to launch feedback tool`,
        locator: `[data-id='review-status'] a`
      },
      draft_submission_date: {
        desc: `Green checkmark that appears after successful draft submission on draft card`,
        locator: `[data-id='submitted-date']`
      },
      group_edit_message: {
        desc: `Message to tell instructor where groups edited`,
        locator: `[class^='SubmissionStatus__groupEditMessageContainer']`
      },
      revision_plan_student_link: {
        desc: `link to send instructor directly to student revision plan`,
        locator: `[class^='SubmissionStatusItem__row__'] [data-id='revision-plan-status'] a`
      },
      revision_plan_message: {
        desc: `Message to tell instructor where groups edited`,
        locator: `[class^='SubmissionStatus__revisionPlanMessageContainer']`
      }
    };
  }
}

module.exports = StudentSubmissions;