/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class StudentReview extends Component {
  things() {
    return {
      instructor_end_comment: {
        desc: `Instructor end comment given to student`,
        locator: `[data-id='MLCard-Instructor-Comment'] [class^='FeedbackDisplay__endComment']`
      },
      submitted_draft_text: {
        desc: `Read only submitted draft`,
        locator: `[class*='public-DraftEditor-content']`
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
      }
    }; }
}

module.exports = StudentReview;
