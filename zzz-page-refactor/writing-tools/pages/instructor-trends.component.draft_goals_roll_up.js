/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component;

class DraftGoalsRollUp extends Component {
  things() {
    return {
      header: {
        desc: `Header for Rubric Report`,
        locator: `[class^='DraftGoalsRollUp__draftGoalsRollUpHeader']`
      },
      goal: {
        desc: `Individual rows of the Draft Goals report`,
        locator: `[class^='DraftGoalsRollUp__rowContent']`
      },
      goal_label: {
        desc: `goal labels`,
        locator: `[class^='DraftGoalsRollUp__goalLabel'] a`
      },
      needs_extensive_revision_counter: {
        desc: `Number of needs extensive revision comments for a given goal`,
        locator: `[data-id='draft-goals-row-level-1-count']`
      },
      needs_work_counter: {
        desc: `Number of needs work comments for a given goal`,
        locator: `[data-id='draft-goals-row-level-2-count']`
      },
      nice_job_counter: {
        desc: `Number of nice job comments for a given goal`,
        locator: `[data-id='draft-goals-row-level-3-count']`
      },
      hover_flag: {
        desc: `Hover class to let you know what the dot means`,
        locator: `[class*='DraftGoalsRollUp__circleContainer'][class*='hovered']`
      },
      tooltip: {
        desc: `Tooltip for hover flags`,
        locator: `[class*='DraftGoalsRollUp__tooltip']`
      },
    }; }
}

module.exports = DraftGoalsRollUp;




