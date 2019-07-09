Feature: Create a Hatchling Item from AE

    @assessmentCreation
    Scenario: Verify that user able to create Hatchling Item through Activity Editor
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value           |
            | Assessment Name | QAAssessment    |
        And I am creating hatchling item from "assessment" tab
        When I add hatchling item as numeric entry with following details
            | field                | value                                   |
            | NE Question Area | How many Hatchling NE items are enough? |
            | target Value         | 100000                                  |
            | Measurement          | questions                               |
            | Derivation Type      | Percent ∓                               |
            | Derivation Amount    | 5                                       |
        Then I verify NE hatchling item gets created
