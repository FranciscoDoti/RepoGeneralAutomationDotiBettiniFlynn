/* eslint-disable camelcase */

const Page = require('marvin-js').Page;
const rubricRollUpComponent = require('./instructor-trends.component.rubric_roll_up');
const rubricDrillDownComponent = require('./instructor-trends.component.rubric_drill_down');
const draftGoalsRollUpComponent = require('./instructor-trends.component.draft_goals_roll_up');
const draftGoalsDrillDownComponent = require('./instructor-trends.component.draft_goals_drill_down');
const editingMarksRollUpComponent = require('./instructor-trends.component.editing_marks_roll_up');
const editingMarksDrillDownComponent = require('./instructor-trends.component.editing_marks_drill_down');
const reflectionQuestionRollUpComponent = require('./instructor-trends.component.reflection_question_roll_up');
const reflectionQuestionDrillDownComponent = require('./instructor-trends.component.reflection_question_drill_down');

exports.InstructorTrendsPage = class extends Page {
  things() {
    return {
      dropdown_drafts: {
        desc: `Trends draft dropdown selection`,
        locator: `[data-id='draft-trends-dropdown']`
      },
      dropdown_drafts_content: {
        desc: `Available drafts in drop down on trends`,
        locator: `[data-id='draft-trends-selection-content'] li`
      },
      data_not_loaded_error: {
        desc: `error message in trends`,
        locator: `[class*='TrendsHeader__errorContainer']`
      },
      drafts_reviewed_header: {
        desc: `Draft Reviewed header`,
        locator: `[data-id='trends-header-total-student-count'] [data-id='numerical-figure']`
      },
      drafts_submitted_header: {
        desc: `Draft Submitted header`,
        locator: `[data-id='trends-header-drafts-submitted']`
      },
      student_in_progress_header: {
        desc: `Student in progress header`,
        locator: `[data-id='trends-header-students-in-progress']`
      },
      student_not_started_header: {
        desc: `Students Not Started header`,
        locator: `[data-id='trends-header-students-not-started']`
      },
      final_grade_average_header: {
        desc: `grade average header`,
        locator: `[data-id='trends-header-average-final-grade']`
      },
      drafts_reviewed_count: {
        desc: `Draft Reviewed count`,
        locator: `[data-id='trends-header-total-student-count'] div [data-id='numerical-figure']`
      },
      drafts_submitted_count: {
        desc: `Draft Submitted count`,
        locator: `[class*='trends-header-drafts-submitted'] div [data-id='numerical-figure']`
      },
      student_in_progress_count: {
        desc: `Student in progress count`,
        locator: `[class*='trends-header-students-in-progress'] div [data-id='numerical-figure']`
      },
      student_not_started_count: {
        desc: `Students Not Started count`,
        locator: `[class*='trends-header-students-not-started'] div [data-id='numerical-figure']`
      },
      final_grade_average_count: {
        desc: `grade average count`,
        locator: `[class*='TrendsHeader__averageGradeContainer']`
      },
      editing_mark_back_button: {
        desc: `back button on editing marks page`,
        locator: `[class^='EditingMarks__backButtonContainer'] a`
      },
      draft_goals_back_button: {
        desc: `back button on draft goals drilldown page`,
        locator: `[class^='DraftGoals__backButtonContainer'] a`
      },
      drill_down_report: {
        desc: `container for drilldown report`,
        locator: `[class*='__studentBreakdownCard__']`
      },
      drill_down_close: {
        desc: `Back button on drill down page`,
        locator: `[class*='__backButtonContainer'] a`
      },
    };
  }

  // TODO: reimplement
  //url: { value: '/' },

  rubric_roll_up(arg) {
    return rubricRollUpComponent.generate(arg, {
      locator: `[class*='RubricRollUp__rubricRollUpContainer']`});
  }
  rubric_drill_down(arg) {
    return rubricDrillDownComponent.generate(arg, {
      locator: `[class*='RubricScores__contentContainer']`});
  }

  draft_goals_roll_up(arg) {
    return draftGoalsRollUpComponent.generate(arg, {
      locator: `[class*='DraftGoalsRollUp__draftGoalsRollUpContainer']`});
  }

  draft_goals_drill_down(arg) {
    return draftGoalsDrillDownComponent.generate(arg, {
      locator: `[class*='DraftGoals__contentContainer']`});
  }

  editing_marks_roll_up(arg) {
    return editingMarksRollUpComponent.generate(arg, {
      locator: `[class*='EditingMarksRollUp__editingMarkRollUpContainer']`});
  }

  reflection_question_roll_up(arg) {
    return reflectionQuestionRollUpComponent.generate(arg, {
      locator: `[class*='ReflectionQuestionsRollUp__reflectionQuestionRollUpContainer']`});
  }
  reflection_question_drill_down(arg) {
    return reflectionQuestionDrillDownComponent.generate(arg, {
      locator: `[class*='ReflectionQuestions__contentContainer']`});
  }

  editing_marks_drill_down(arg) {
    return editingMarksDrillDownComponent.generate(arg, {
      locator: `[class*='EditingMarks__contentContainer']`});
  }
};
