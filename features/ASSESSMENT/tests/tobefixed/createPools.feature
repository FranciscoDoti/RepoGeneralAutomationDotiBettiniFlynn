@Assessment @Smoke
Feature: As an instructor/ admin, i should be able to create pools of questions

    @CreatePool
    Scenario: Add multiple random items to a new assignment
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value        |
            | Assessment Name | QAAssessment |
        When I have selected "2" custom questions
        Then I verify the created pool is displayed in the assessment
