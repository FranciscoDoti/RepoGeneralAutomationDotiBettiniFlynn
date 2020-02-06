@Assessment @Smoke
Feature: Tests inside assessment from instructor side

    Scenario: Preview Assignment
        Given I login to IBISCMS as "raptor-instructor"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value        |
            | Assessment Name | QAAssessment |
        When I add "2" random questions to the assessment
        And I open the Student Preview Menu

    Scenario: Create a Raptor item and add it to an Assessment
        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title         | Module Type |
            | SmokeTestItem | Labeling    |
        Given I login to IBISCMS as "raptor-instructor"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value        |
            | Assessment Name | QAAssessment |
        Then I add the raptor item created before
