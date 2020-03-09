@SAC @Assessment @Smoke @Score @Regression
Feature: Validate the functionality of SAC Grading

  Background: Reset Student's Attempts
    Given I login to IBISCMS as "raptor-instructor"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    And I reset attempts for student "Raptor Student"

  @OverallAssessmentScore
  Scenario: Verify new assignment has a overall score of 0%
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
      Then The overall assignment score should be "0%"

  @OverallAssessmentScore @IncorrectResponse
  Scenario: Verify Overall Assignment score for incorrect response in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the following responses
      | Question   | Module Type     | Response  | Check Answer |
      | 1 Question | Multiple Choice | 2 · 3 · 5 | Yes          |
      Then The overall assignment score should be "0%"
      And The questions should have the following grades
        | Question   | Grade |
        | 1 Question | 0%    |

  @OverallAssessmentScore @GiveUp
  Scenario: Verify Overall Assignment score for Giving Up on Question in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the following responses
      | Question   | Module Type     | Response  | Check Answer |
      | 1 Question | Multiple Choice | 2 · 3 · 5 | Yes          |
      Then The overall assignment score should be "0%"
      And The questions should have the following grades
        | Question   | Grade |
        | 1 Question | 0%    |
    When I give up on "1 Question"
      Then The overall assignment score should be "0%"
      And The questions should have the following grades
        | Question   | Grade |
        | 1 Question | 0%    |

  @OverallAssessmentScore @Correct
  Scenario: Verify Overall Assignment score for Correct response in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the following responses
      | Question   | Module Type     | Response  | Check Answer |
      | 1 Question | Multiple Choice | 2 · 3 · 5 | Yes          |
      Then The overall assignment score should be "0%"
      And The questions should have the following grades
        | Question   | Grade |
        | 1 Question | 0%    |
    When I provide the correct response to the "1 Question"
      Then The overall assignment score should be "7.1%"
      And The questions should have the following grades
        | Question   | Grade |
        | 1 Question | 100%  |