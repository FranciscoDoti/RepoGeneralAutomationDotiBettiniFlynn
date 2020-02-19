@SAC @Assessment @Smoke @LeftNav @Regression
Feature: SAC UI left panel

  @QuestionList @QuestionTitles
  Scenario: Verify Dynamic label for the number of question
    Given I login to IBISCMS as "raptor-student"
    When I navigate to an assignment
      | Course                            | Assessment |
      | Raptor Automation - Do Not Delete | All Mods   |
    Then I verify the question numbers