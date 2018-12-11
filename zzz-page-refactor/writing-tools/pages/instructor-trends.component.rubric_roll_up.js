/* eslint-disable camelcase */
const Page = require('marvin-js').Page;
const Component = require('marvin-js').Component

class RubricRollUp extends Component {
  things() {
    return {
      header: {
        desc: `Header for Rubric Report`,
        locator: `[class*='RubricRollUp__rubricRollUpHeader']`
      },
      criterion: {
        desc: `Individual rows of the Rubric report`,
        locator: `[class^='RubricRollUp__rowContent_']`
      },
      criterion_label: {
        desc: `Criterion labels`,
        locator: `[class^='RubricRollUp__criterionLabel'] a`
      },
      no_grade_message: {
        desc: `Empty grade graph`,
        locator: `[class^='RubricRollUp__notGradedContainer']`
      },
      criterion_average: {
        desc: `Average criterion grade`,
        locator: `[data-id='rubric-rollup-criterion-average-score']`
      },
      empty_criterion_average: {
        desc: `No criterion grade placeholder`,
        locator: `[class*='RubricRollUp__missingAverageContainer']`
      },
      graph_bar_average: {
        desc: `Colored grade average indicator`,
        locator: `[class*='recharts-bar'][class*='RubricRollUp__']`
      },
    }; }
}

module.exports = RubricRollUp;




