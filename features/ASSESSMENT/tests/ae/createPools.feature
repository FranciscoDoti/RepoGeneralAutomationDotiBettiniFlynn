@Assessment @Smoke
Feature: To verify Pool Items

    @CreatePool
    Scenario: Add multiple random items to a new assignment
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value        |
            | Assessment Name | QAAssessment |
        When I have selected "2" custom questions and created a pool
        Then I verify the created pool is displayed in the assessment
