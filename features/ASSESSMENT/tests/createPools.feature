@Assessment @Smoke
Feature: As an instructor/ admin, i should be able to create pools of questions

    Background: Navigate to Activity Editor

        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
        | field           | value           |
        | Assessment Name | QAAssessment    |

    @assessmentCreation 
    Scenario: Create pools in Question Bank and add it to assessmnet
        When I have created "2" random questions
        And added it to new assessment as pool
        Then I see a pool of questions is created in the assessment
