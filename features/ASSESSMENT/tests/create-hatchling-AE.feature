Feature: Create a Hatchling Item from AE

    Scenario: Verify that user able to create Hatchling Item through Activity Editor
        Given I login to an existing course as "nga_instructor"
        And I create a new assessment with its necessary details
            | Assessment_Name | Assessment_Description            |
            | QAAssessment    | This is automated test assessment |
        When I add hatchling item as numeric_entry from activity editor with following details
            | field                | value                                   |
            | Question Prompt Area | How many Hatchling NE items are enough? |
            | target Value         | 100000                                  |
            | Measurement          | questions                               |
            | Derivation Type      | Percent ∓                               |
            | Derivation Amount    | 5                                       |
        Then I verify NE hatchling item gets created
