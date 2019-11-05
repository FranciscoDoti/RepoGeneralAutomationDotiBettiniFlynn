@Assessment @Smoke
Feature: Create a NE Hatchling Item from AE

    @NEHatchlingItemOnAE @AssessmentTab
    Scenario: Verify that user able to create NE Hatchling Item through Assessment tab
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value           |
            | Assessment Name | QAAssessment    |
        And I am creating hatchling item from "assessment" tab
        When I add "numeric_entry" hatchling item with following details on "AE assessment tab"
            | Question Title                     | Question Prompt             |
            | QA Hatchling NE Test Item from AMS | What is the speed of light  |
        And I add the following values to Hatchling NE module on "AE"
            | Correct Target Value | Measurement | Derivation Type | Acceptance Within |
            | 300000000            | m/s         | Number ∓        | 0.5               |
        And I set the hint for Hatchling NE module with following detail on "AE"
            | Hint                  |
            | You Know the answers! |
        And I add the student feedback with the following details and save feedback and save the NE item on "AE"
            | Solution Explained | General Incorrect Feedback      |
            | 300000000          | This is not the speed of light  |
        And verify the created item is displayed in assessment
        
    @NEHatchlingItemOnAE @CustomQuestionTab
    Scenario: Verify that user able to create NE Hatchling Item through Custom Question tab
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value           |
            | Assessment Name | QAAssessment    |
        When I add "numeric_entry" hatchling item with following details on "AE"
            | Question Title                     | Question Prompt             |
            | QA Hatchling NE Test Item from AMS | What is the speed of light  |
        And I add the following values to Hatchling NE module on "AE"
            | Correct Target Value | Measurement | Derivation Type | Acceptance Within |
            | 300000000            | m/s         | Number ∓        | 0.5               |
        And I set the hint for Hatchling NE module with following detail on "AE"
            | Hint                  |
            | You Know the answers! |
        And I add the student feedback with the following details and save feedback and save the NE item on "AE"
            | Solution Explained | General Incorrect Feedback      |
            | 300000000          | This is not the speed of light  |
        Then Add the created custom question to assessment 
        And verify the created item is displayed in assessment