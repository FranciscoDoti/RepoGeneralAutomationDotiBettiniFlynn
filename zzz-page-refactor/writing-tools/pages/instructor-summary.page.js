/* eslint-disable camelcase */

const Page = require('marvin-js').Page;
const draftComponent = require('./instructor-summary.component.draft');
const refQuestionModal = require('./instructor-summary.component.add-student-reflection-questions-modal');
const activityPromptComponent = require('./instructor-summary.component.activity-prompt');
const draftGoalsModal = require('./instructor-summary.component.draft-goals-modal');
const rubricComponent = require('./instructor-summary.component.rubric');
const studentSubmissionsComponent = require('./instructor-summary.component.student-submissions');
const cdl = require('./cdl.component');
const peerReviewComponent = require('./instructor-summary.component.peer-review');

exports.InstructorSummaryPage = class extends Page {
  things() {
    return {
      add_draft_button: {
        desc: `button to add additional drafts to the activity`,
        locator: `[data-id='add-draft']`
      },
      draft_card: {
        desc: `container for each individual draft`,
        locator: `[data-id='draft-section']`
      },
      draft_title: {
        desc: `Header where draft title lives`,
        //locator: `[class^='Heading__headingText']`
        locator: `[data-id='draft-section'] span span`
      },
      draft_count: {
        desc: `A link to show the drafts pane on the assignment summary page that should also display the current number of drafts associated with an assignemnt`, // eslint-disable-line
        locator: `[data-id='drafts']`
      },
      student_submissions: {
        desc: `tab that allows user to toggle to student submissions`,
        locator: `[data-id='student-submissions']`
      },
      activity_title: {
        desc: `div that contains the activity title`,
        locator: `[data-id='activity-title']`
      },
      activity_type: {
        desc: `line underneath the title that tells user what kind of writing activity assignment is`,
        locator: `[data-id='activity-type']`
      },
      edit_title: {
        desc: `Button to make the activity title an editable field`,
        locator: `[class^='ActivityTitle__editIcon__']`
      },
      edit_title_cancel: {
        desc: `Button to cancel any changes made while editing title`,
        locator: `[data-id='title-cancel']`
      },
      edit_title_save: {
        desc: `Button to save changes that were edited to title`,
        locator: `[data-id='title-save']`
      },
      edit_title_textarea: {
        desc: `editable text area that contains the activity title`,
        locator: `[class^='ActivityTitle__editField__']`
      },
      title_char_counter: {
        desc: `counter at end of activity title that tells user how many title characters they have left`,
        locator: `[data-id='char-limit-count']`
      },
      created_activity_alert: {
        desc: `Green alert banner upon creating activity`,
        locator: `[data-id='created-activity-alert']`
      },
      student_preview: {
        desc: `Button in header to switch instructor view to student view`,
        locator: `[data-id='student-preview']`
      },
      final_draft_delete_button_alert: {
        desc: `The confirmation button in the alert dialog that is presented on attempting to delete a draft`,
        locator: `[class^='MLDialog__alert'] [class^='MLDialog__content'] [class^='MLDialog__buttons'] [data-id='dialog-delete']`
      },
      activity_prompt_card: {
        desc: `Activity Prompt Card`,
        locator: `[data-id='prompt-section']`
      },
      final_rubric_card: {
        desc: `Rubric Card`,
        locator: `[data-id='rubric-section']`
      },
      reports_tab: {
        desc: `tab that allows user to toggle to student submissions trends`,
        locator: `[data-id='trends']`
      },
      drill_down_report: {
        desc: `instructor reports panel`,
        locator: `div[class^='Trends__trendArea']`
      }
    };
  }

  // TODO: reimplement
  //url: { value: '/' },

  draft(arg) {
    return draftComponent.generate(arg, {
      locator: `//*[@data-id='draft-section']/ancestor::div[contains(@data-id, 'MLCard')]`,
      type: `xpath`}); 
  }

  reflection_questions_modal(arg) {
    return refQuestionModal.generate(arg, {
      locator: `[data-id='modal'] [class^='MLModal__modalWrapper']`}); 
  }

  activity_prompt(arg) {
    return activityPromptComponent.generate(arg, {
      locator: `[data-id='MLCard-Assignment-Prompt'],[data-id='MLCard-Activity-Prompt']` }); 
  }

  rubric(arg) {
    return rubricComponent.generate(arg, {
      locator: `[data-id='MLCard-Final-Rubric']`}); 
  }

  submissions(arg) {
    return studentSubmissionsComponent.generate(arg, {
      locator: `[class^='SubmissionStatus__wrapper']`}); 
  }

  draft_goals_modal(arg) {
    return draftGoalsModal.generate(arg, {
      locator: `[data-id='modal']`}); 
  }

  cdl(arg) {
    return cdl.generate(arg, {
      locator: `div.app`});
  }

  reports(arg) {
    return submissionStatusReports.generate(arg, {
        locator: `[class*='Trends__trendsArea']`});
  }

  peer_review(arg) {
    return peerReviewComponent.generate(arg, {
      locator: `[data-id='MLCard-Peer-Review-Groups']`});
  }
};
