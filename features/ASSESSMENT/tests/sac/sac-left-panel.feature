@SAC @Smoke @LeftNav @Regression
Feature: SAC UI left panel

  @QuestionList @QuestionTitles
  Scenario: Verify Dynamic label for the number of question
    Given I login to IBISCMS as "raptor-student"
    When I navigate to an assignment
    Then I verify the question numbers