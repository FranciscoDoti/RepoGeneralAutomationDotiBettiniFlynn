/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class PeerReview extends Component {
  things() {
    return {
      no_group_message: {
        locator: `[class^='PeerReviewSubmissionStatusTable__noGroups']`,
        desc: `Message when no groups are created`
      },
      group_option: {
        locator: `[data-id='???']`,
        desc: `Edit button to make peer review groups`
      },
      add_people_set: {
        locator: `[data-id='???']`,
        desc: `Add people set to assignment`
      },
      people_set: {
        locator: `[class^='PeerReviewSubmissionStatusTable__group__']`,
        desc: `Display cluster of people in submission grid`
      },
      student_row: {
        locator: `[class^='PeerReviewSubmissionStatusItem__row__']`,
        desc: `Row of a particular student within a group`
      },
      paper_submitted: {
        locator: `[data-id='completion-date']`,
        desc: `Submission status for student paper`
      },
      student_review_completed: {
        locator: `[data-id='reviews-completed']`,
        desc: `Reviews completed`
      },
      student_review_not_completed_status: {
        locator: `[class^='PeerReviewSubmissionStatusItem__iconGray']`,
        desc: `Gray icon for number of reviews completed`
      },
      student_review_received: {
        locator: `[data-id='reviews-received']`,
        desc: `Reviews received`
      },
      student_draft: {
        locator: `[data-id='View-drafts']`,
        desc: `View draft links`
      }
    };
  }
}

module.exports = PeerReview;
