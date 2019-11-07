@Assessment @Smoke
Feature: Create an MC Hatchling Item on AE and add it to the new Assessment

    @MCHatchlingItemOnAE @CustomQuestionTab
    Scenario: Verify that user able to create MC Hatchling Item through Custom Question tab
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value        |
            | Assessment Name | QAAssessment |
        When I add "multiple_choice" hatchling item with following details on "AE"
            | Question Title                    | Question Prompt       |
            | QA Hatchling MC Test Item from AE | Who won the CWC 2019? |
        And I add the following correct answer and feedback on "AE"
            | Answer  | Feedback |
            | England | Correct  |
        And I add the following incorrect answers and feedback on "AE"
            | Answer      | Feedback  |
            | Australia   | Incorrect |
            | India       | Incorrect |
            | NewZealandd | Incorrect |
        And I set hint and generic feedback with following details and save on "AE"
            | Hint                  | Generic Feedback            |
            | You Know the answers! | You must provide a response |
        Then Add the created custom question to assessment
        And verify the created item is displayed in assessment

    @AddMultipleItem
    Scenario: Add multiple random items to a new assignment
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value        |
            | Assessment Name | QAAssessment |
        When I have added "2" custom questions to assessment
        Then I see the item present in the assessment

    @MCHatchlingItemOnAE @AssessmentTab
    Scenario: Verify that user able to create MC Hatchling Item through Assessment tab
        Given I login to IBISCMS as "all-permissions-author"
        And navigate to a course having course id "79848"
        And I create a new assessment with its necessary details
            | field           | value        |
            | Assessment Name | QAAssessment |
        And I am creating hatchling item from "assessment" tab
        When I add "multiple_choice" hatchling item with following details on "AE assessment tab"
            | Question Title                    | Question Prompt       |
            | QA Hatchling MC Test Item from AE | Who won the CWC 2019? |
        And I add the following correct answer and feedback on "AE"
            | Answer  | Feedback |
            | England | Correct  |
        And I add the following incorrect answers and feedback on "AE"
            | Answer      | Feedback  |
            | Australia   | Incorrect |
            | India       | Incorrect |
            | NewZealandd | Incorrect |
        And I set hint and generic feedback with following details and save on "AE"
            | Hint                  | Generic Feedback            |
            | You Know the answers! | You must provide a response |
        Then verify the created item is displayed in assessment