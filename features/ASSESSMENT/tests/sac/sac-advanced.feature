@Assessment @SAC @SacAdvanced @Smoke
Feature: To configure an advanced test in SAC

  Scenario: Instructor removes previous responses from an assessment

    Given I login to IBISCMS as "raptor-instructor"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    And I reset attempts for student "Raptor Student"

  Scenario: Student completes an assessment

    Given I login to IBISCMS as "raptor-student"
    When I navigate to assessment
    And I answer questions
      | Question | Type |
      | 1        | MC   |
      | 2        | DD   |

    Then I verify grades for answers
