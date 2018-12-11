/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class InstructorCommentModal extends Component {
  things() {
    return {
      add_comment_textarea: {
        desc: `Box to add text to a comment`,
        locator: `[class*='CommentModal__commentTextWrapper']`
      },
      feedback_preset_menu: {
        desc: `List of presets for instructor feedback`,
        locator: `ul[class^='MLMenuList__menulist']`
      },
      feedback_preset_menu_item: {
        desc: `Single presets for instructor feedback`,
        locator: `ul[class^='MLMenuList__menulist'] li`
      },
      feedback_preset_text_preview: {
        desc: `Default text defined by feedback preset`,
        locator: `[class^='CommentModal__commentDescription']`
      },
      comment_level_button: {
        desc: `Buttons to assign level to a comment`,
        locator: `[id='commentModal'] [class^='CommentModal__buttons'] button`
      },
      nice_job_comment_button: {
        desc: `Button to quickly add nice job comment`,
        locator: `[data-id='nice-job-comment-modal']`
      },
      needs_extensive_work_comment_button: {
        desc: `Button to quickly add need a lot of work comment`,
        locator: `[data-id='needs-extensive-work-comment-modal']`
      },
      needs_work_comment_button: {
        desc: `Button to quickly add need work comment`,
        locator: `[data-id='needs-work-comment-modal']`
      },
      save_comment: {
        desc: `Button to save instructor draft comment`,
        locator: `[data-id='save-comment-modal']`
      },
      save_comment_disabled: {
        desc: `Disabled button to save instructor comment`,
        locator: `[data-id='save-comment-modal'][class*='MLButton__disabled']`
      },
      draft_goal_list: {
        desc: `List of draft goals for instructor to comment on`,
        locator: `ul[class^='MLMenuList__menulist']`
      },
      draft_goal_selected: {
        desc: `The currently selected draft goal for instructor comment`,
        locator: `ul[class^='MLMenuList__menulist'] li[class^='MLMenuList__active']`
      },
      draft_goal: {
        desc: `The currently selected draft goal for instructor comment`,
        locator: `ul[class^='MLMenuList__menulist'] li`
      },
      related_resource_link: {
        desc: `The currently selected draft goal for instructor comment`,
        locator: `[class^='CommentModal__commentWrapper__2I8aK'] div:nth-child(4) a`
      },
      comment_description: {
        desc: `Default comment for comments`,
        locator: `[class^='CommentModal__commentDescription']`
      },
    };
  }
}

module.exports = InstructorCommentModal;
