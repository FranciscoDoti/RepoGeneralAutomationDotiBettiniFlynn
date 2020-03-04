@SAC @Assessment @Smoke @Score @Regression
Feature: Validate the functionality of SAC Grading

  Background: Reset Student's Attempts
    Given I login to IBISCMS as "raptor-instructor"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    And I "Reset Attempts" for the "Raptor Student"

  # @OverallAssessmentScore
  # Scenario: Verify Overall Assignment score field in SAC
  #   Given I login to IBISCMS as "raptor-student"
  #   When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
  #   Then I verify that new assignment should have an overall assignment score of "0%"

  # @OverallAssessmentScore @IncorrectResponse
  # Scenario: Verify Overall Assignment score for incorrect response in SAC
  #   Given I login to IBISCMS as "raptor-student"
  #   When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
  #   When I provide the incorrect "2 · 3 · 5" response to the "1 Question"
  #   Then The Question grade should be "0%" and Assignment grade should be "0%"

  # @OverallAssessmentScore @GiveUp
  # Scenario: Verify Overall Assignment score for Giving Up on Question in SAC
  #   Given I login to IBISCMS as "raptor-student"
  #   When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
  #   When I provide the incorrect "2 · 3 · 5" response to the "1 Question"
  #   Then The Question grade should be "0%" and Assignment grade should be "0%"
  #   When I Give up on the Question 1
  #   Then The Question grade should be "0%" and Assignment grade should be "0%"

  @OverallAssessmentScore @Correct
  Scenario: Verify Overall Assignment score for Correct response in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the incorrect "2 · 3 · 5" response to the "1 Question"
    Then The Question grade should be "0%" and Assignment grade should be "0%"
    When I provide the correct response to the "1 Question"
    Then The Question grade should be "100%" and Assignment grade should be "7.1%"