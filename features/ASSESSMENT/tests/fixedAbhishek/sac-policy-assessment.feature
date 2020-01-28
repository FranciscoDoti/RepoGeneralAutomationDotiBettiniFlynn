@Assessment @Smoke @GradingSetting
Feature: To Verify assignment with grading policy

    @SetGradingPolicy @TimedPolicy
    Scenario: Set Assessment with a new policy with time limit
        Given I login to IBISCMS as "raptor-instructor"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value             |
            | Assessment Name | QAAssessmentLateHW |
        When I add "2" random questions to the assessment
        And I create a new grading Setting
        And I set the grading setting name as "LateHW"
        And I click the Allow Late Submissions checkbox //TODO: Design this step
        And I select "10" % in Flat Penalty //TODO: Design this step
        And I click on save on grading settins page
        And I logout IBISCMS
        And I login to IBISCMS as "raptor-student"
        And navigate to an assessment created before
        Then I am shown the modal indicating this is a late assignment.//TODO: Design this step
        Then I see the items are yellow highlighted and indicate Late "-10%"" //TODO: Design this step

    @SetGradingPolicy @TimedPolicy
    Scenario: Set Assessment with a new policy with time limit
        Given I login to IBISCMS as "raptor-instructor"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value             |
            | Assessment Name | QAAssessmentTimed |
        When I add "2" random questions to the assessment
        And I create a new grading Setting
        And I set the grading setting name as "TimedPolicy" 
        And I set a time limit to the policy with hours "1" and minutes "5" 
        And I click on save on grading settins page
        And I logout IBISCMS
        And I login to IBISCMS as "raptor-student"
        And navigate to an assessment created before

        
    @setGradingPolicy
    Scenario: Set Assessment grading policy
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value        |
            | Assessment Name | QAAssessment |
        When I have added "2" custom questions to assessment
        And I navigate to "Grading Settings" page
        And I select "Test/Quiz" policy for the assessment and save
        Then I see the policy "Test/Quiz" mentioned with the assessment title

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

