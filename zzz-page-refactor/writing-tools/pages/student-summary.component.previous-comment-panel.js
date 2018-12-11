/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class PreviousCommentPanel extends Component {
  things() {
    return {
      previous_feedback_item: {
        desc: `container holding information relating to a previous draft comment`,
        locator: `[class^='CompositionFeedback__feedbackItem__']`
      },
      previous_feedback_title: {
        desc: `title of the feedback item`,
        locator: `[class^='CompositionFeedback__feedbackTitle__']`
      },
      previous_feedback_quote: {
        desc: `quote container of the feedback item`,
        locator: `[class^='CompositionFeedback__feedbackQuote__']`
      },
      previous_feedback_quote_body: {
        desc: `quote text of the feedback item`,
        locator: `[class^='CompositionFeedback__feedbackQuoteBody__'] span`
      },
      previous_feedback_content: {
        desc: `content of the feedback item`,
        locator: `[class^='CompositionFeedback__feedbackContent__']`
      },
      previous_feedback_instructor: {
        desc: `instructor name who left the feedback item`,
        locator: `[class^='CompositionFeedback__feedbackContentFrom__']`
      },
      previous_related_resource_links: {
        desc: `related resources links for comments`,
        locator: `[class^='CompositionFeedback__relatedResources'] ul li`
      },
      resolve_comment_option: {
        desc: `Resolve button for comments comments`,
        locator: `[class^='CompositionFeedback__resolveLink']`
      },
      comment: {
        desc: `Comment list item`,
        locator: `[class^='CompositionFeedback__feedbackItem']`
      },
      open_comment_panel: {
        desc: `Open comment Panel`,
        locator: `[data-id='draft-feedback-open-panel']`
      },
      closed_comment_panel: {
        desc: `closed comment Panel`,
        locator: `[data-id='draft-feedback-closed-panel']`
      },
      revision_plan_note: {
        desc: `note attached to comments`,
        locator: `[class^='CompositionFeedback__feedbackRevisionPlanItemLabel__']`
      }
    };
  }
}

module.exports = PreviousCommentPanel;
