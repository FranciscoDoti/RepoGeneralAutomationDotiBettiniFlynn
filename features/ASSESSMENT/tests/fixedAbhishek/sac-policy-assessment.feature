@Assessment @Smoke
Feature: To Verify assignment with grading policy

    # @setGradingPolicy
    # Scenario: Set Assessment grading policy
    #     Given I login to IBISCMS as "all-permissions-author"
    #     And navigate to a course having course id "79848"
    #     And I create a new assessment with its necessary details
    #         | field           | value        |
    #         | Assessment Name | QAAssessment |
    #     When I have added "2" custom questions to assessment
    #     And I navigate to "Grading Settings" page
    #     And I select "Test/Quiz" policy for the assessment and save
    #     Then I see the policy "Test/Quiz" mentioned with the assessment title

    @StudentAttempt
    Scenario: Attempt an assessment with policy as Student
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value        |
            | Assessment Name | QAAssessment |
        When I have added "2" custom questions to assessment
        And I navigate to "Grading Settings" page
        And I select "Test/Quiz" policy for the assessment and save
        And I logout IBISCMS
        And I login to IBISCMS as "raptor-student"
        And navigate to a course having course id "79848"
        And I select the created assessment
        When I submit all the questions after attempting
        Then I verify all the questions grades
            | Question | Grade     |
            | 1        | Incorrect |
            | 2        | Incorrect |