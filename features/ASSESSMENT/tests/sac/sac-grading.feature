@SAC @Assessment @Regression @Score @HomeWork
Feature: Validate the functionality of SAC Grading

  Background: Reset Student's Attempts
    Given I login to IBISCMS as "raptor-instructor"
    When I navigate to "SAC Automation - Overall Score" assessment link in "Raptor Automation - Do Not Delete" course
    And I reset attempts for student "Raptor Student"
    And I logout IBISCMS

  @OverallAssessmentScore
  Scenario: Verify new assignment has a overall score of 0%
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "SAC Automation - Overall Score" assessment link in "Raptor Automation - Do Not Delete" course
    Then The overall assignment score should be "0%"

  @OverallAssessmentScore @Incorrect
  Scenario: Verify Overall Assignment score for one incorrect response in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "SAC Automation - Overall Score" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the following responses
      | Question   | Module Type     | Response | Check Answer |
      | 1 Question | Multiple Choice | Square   | Yes          |
      Then The overall assignment score should be "0%"
      And The questions should have the following grades
        | Question   | Grade |
        | 1 Question | 0%    |

  @OverallAssessmentScore @GiveUp
  Scenario: Verify Overall Assignment score for Giving Up on Question in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "SAC Automation - Overall Score" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the following responses
      | Question   | Module Type     | Response | Check Answer |
      | 1 Question | Multiple Choice | Square   | Yes          |
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
  Scenario: Verify Overall Assignment score is updated on reattempt incorrect to correct
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "SAC Automation - Overall Score" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the following responses
      | Question   | Module Type     | Response | Check Answer |
      | 1 Question | Multiple Choice | Square   | Yes          |
      Then The overall assignment score should be "0%"
      And The questions should have the following grades
        | Question   | Grade |
        | 1 Question | 0%    |
    When I provide the following responses
      | Question   | Module Type     | Response | Check Answer |
      | 1 Question | Multiple Choice | Round    | Yes          |
      Then The overall assignment score should be "19%"
      And The questions should have the following grades
        | Question   | Grade |
        | 1 Question | 95%   |

  @OverallAssessmentScore @Correct @Incorrect
  Scenario: Verify Overall Assignment score is updated on reattempt multple incorrect
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "SAC Automation - Overall Score" assessment link in "Raptor Automation - Do Not Delete" course
    When I provide the following responses
      | Question   | Module Type     | Response | Check Answer |
      | 1 Question | Multiple Choice | Square   | Yes          |
      | 2 Question | Multiple Choice | Round    | Yes          |
      | 3 Question | Multiple Choice | Square   | Yes          |
      | 4 Question | Multiple Choice | Round    | Yes          |
      Then The overall assignment score should be "40%"
      And The questions should have the following grades
        | Question   | Grade |
        | 1 Question | 0%    |
        | 2 Question | 100%  |
        | 3 Question | 0%    |
        | 4 Question | 100%  |
        | 5 Question | 0%    |
    When I provide the following responses
      | Question   | Module Type     | Response | Check Answer |
      | 1 Question | Multiple Choice | Round    | Yes          |
      | 3 Question | Multiple Choice | Triangle | Yes          |
      Then The overall assignment score should be "59%"
      And The questions should have the following grades
        | Question   | Grade |
        | 1 Question | 95%   |
        | 2 Question | 100%  |
        | 3 Question | 0%    |
        | 4 Question | 100%  |
        | 5 Question | 0%    |
