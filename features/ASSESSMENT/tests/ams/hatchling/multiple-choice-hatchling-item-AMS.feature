@Assessment @Smoke
Feature: Create a MC Hatchling Item from AMS

    @CreateMCHatchling @IncompleteTest
    Scenario: Verify that user able to create MC Hatchling Item through AMS
        Given I login to AMS as "all-permissions-author"
        When I add "Multiple Choice" hatchling item with following details on "AMS"
            | Question Title                      | Question Prompt        |
            | QA Hatchling MC Test Item from AMS  | Who won the CWC 2019? |  
        And I add the following correct answer and feedback on "AMS"
            | Answer  | Feedback |
            | England | Correct  |
        And I add the following incorrect answers and feedback on "AMS"
            | Answer      | Feedback  |
            | Australia   | Incorrect |
            | India       | Incorrect | 
            | NewZealandd | Incorrect |
        And I set hint and generic feedback with following details and save on "AMS"
            | Hint                  | Generic Feedback             |
            | You Know the answers! | You must provide a response  |
        # Then I verify the details of the following items are displayed in AMS
        #     | Title                              | Status       | 
        #     | QA Hatchling MC Test Item from AMS | In Progress  | 
        