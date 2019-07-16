Feature: To configure a basic test in SAC

  Scenario: Instructor removes previous responses from an assessment

    Given I login to IBISCMS as "raptor-instructor"
    When I reset attempts from student "student_2"
    Then I logout IBISCMS

  Scenario: Student completes an assessment

    Given I login to IBISCMS as "student_2"
    When I navigate to assessment
    And I answer questions
      | Question | Type |
      | 1        | MC   |
      | 2        | DD   |

    Then I verify grades for answers
