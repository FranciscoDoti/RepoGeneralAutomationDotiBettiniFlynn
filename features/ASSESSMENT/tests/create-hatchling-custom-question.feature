Feature: Create a Hatchling Item from custom question

    @assessmentCreation @Assessment @Smoke
    Scenario: Verify that user able to create Hatchling Item through Custom Question tab
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value           |
            | Assessment Name | QAAssessment    |
        And I am creating hatchling item from "custom question" tab
        When I add hatchling item as numeric entry with following details
            | field                | value                                |
            | NE Question Area | Creating Hatchling questions from AE is? |
            | target Value         | 50                                   |
            | Measurement          | time easier                          |
        Then I verify NE hatchling item gets created
