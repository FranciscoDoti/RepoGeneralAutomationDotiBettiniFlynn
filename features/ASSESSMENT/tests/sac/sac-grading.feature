@SAC @Assessment @Smoke @Score @Regression
Feature: Validate the functionality of SAC Grading

  @OverallAssessmentScore
  Scenario: Verify Overall Assignment score field in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
      Then I verify that new assignment should have an assignment score of 0.

  @OverallAssessmentScore @IncorrectResponse
  Scenario: Verify Overall Assignment score for incorrect response in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the incorrect response to the question
      Then The Question grade and Assignment grade should remain "0"

  @OverallAssessmentScore @GiveUp
  Scenario: Verify Overall Assignment score for Giving Up on Question in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the incorrect response to the question
      Then The Question grade and Assignment grade should remain "0"
    When I Give up on the same Question
      Then The Question grade and Assignment grade should remain "0"
  
  @OverallAssessmentScore @Correct
  Scenario: Verify Overall Assignment score for Correct response in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the incorrect response to the question
      Then The Question grade and Assignment grade should remain "0"
    When I provide the correct response to the same question
      Then The Question grade changes to "100" and Assignment grade changes to "10"