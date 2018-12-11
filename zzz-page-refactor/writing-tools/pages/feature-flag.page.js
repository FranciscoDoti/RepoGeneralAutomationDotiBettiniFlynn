/* eslint-disable camelcase */

const Page = require('marvin-js').Page;

exports.FeatureFlagPage = class extends Page {
  things() {
    return {
      related_content_slider: {
        desc: `Slider to turn on/off related resources`,
        locator: `[class^='MLToggle__switch'][data-id='related-content'] div`
      },
      writing_search_slider: {
        desc: `Slider to turn on/off writing help search`,
        locator: `[class^='MLToggle__switch'][data-id='writing-help-search'] div`
      },
      peer_review_slider: {
        desc: `Slider to turn on/off peer review`,
        locator: `[data-id='peer-review'] div`
      },
      previous_feedback_slider: {
        desc: `Slider to turn on/off previous feedback`,
        locator: `[class^='MLToggle__switch'][data-id='composition-previous-feedback'] div`
      },
      revision_plan_slider: {
        desc: `Slider to turn on/off revision plan`,
        locator: `[class^='MLToggle__switch'][data-id='revision-plan'] div`
      },
    };
  }
};
