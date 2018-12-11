/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class DraftGoalsDrillDown extends Component {
  things() {
    return {
      dropdown: {
        desc: `Dropdown for editing marks`,
        locator: `[class^='MLDropdown__dropdownTitle']`
      },
      draft_goals: {
        desc: `Dropdown contents for editing marks`,
        locator: `[data-id='draft-goals-drilldown-selection-content'] li`
      },
      student_name: {
        desc: `Student breakdown row`,
        locator: `[data-id='draft-goal-student-name']`
      },
      needs_extensive_revision_counter: {
        desc: `Needs Extensive Revisions Mark Counter`,
        locator: `[data-id='draft-goal-student-count-level1']`
      },
      needs_work_counter: {
        desc: `Needs Work Mark Counter`,
        locator: `[data-id='draft-goal-student-count-level2']`
      },
      good_job_counter: {
        desc: `Good Job Mark Counter`,
        locator: `[data-id='draft-goal-student-count-level3']`
      },
      active_dropdown: {
        desc: `Active dropdown`,
        locator: `[class^='MLDropdown__openContainer'] a`
      }
    };
  }
}

module.exports = DraftGoalsDrillDown;




