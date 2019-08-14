Feature: As an author/ instructor, I should be able to set policies for the assessment

Background: Create an assessment with set of questions
    Given I login to IBISCMS as "all-permissions-author"
    And navigate to a course having course id "79848"
    And I create a new assessment with its necessary details
    | field           | value           |
    | Assessment Name | QAAssessment    |
    When I have created "2" random questions
    And added it to assessment
    And I select "Grading Settings" option for the assessment
    Then I navigate to "Grading Settings" page

@assessmentCreation
Scenario: Set Test policy
    When I select "Test/Quiz" policy for the assessment
    And save the changes
    Then I see the policy "Test/Quiz" mentioned with the assessment title