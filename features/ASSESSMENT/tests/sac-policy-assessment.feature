Feature: As a student, I have to attempt an assignment with policy


Background: Create an assessment with set of questions
    Given I login to IBISCMS as "all-permissions-author"
    And navigate to a course having course id "79848"
    And I create a new assessment with its necessary details
    | field           | value           |
    | Assessment Name | QAAssessment    |
    And I have created "2" random questions
    And added it to assessment
    And I select "Grading Settings" option for the assessment
    And I navigate to "Grading Settings" page


Scenario: Student attempt an assessment with test/quiz policy
    Given I select "Test/Quiz" policy for the assessment
    And save the changes
    And I login to IBISCMS as "student_2"
    And I selected the assessment created for student
    When I answer my questions 
    |Question| Attempt|
    |1       | incorrect|
    |1       | correct|
    |2       | correct|
    And submitted all questions
    Then I see all the questions grades|
    |Question| Grades|
    |1       | correct|
    |2       | incorrect|
