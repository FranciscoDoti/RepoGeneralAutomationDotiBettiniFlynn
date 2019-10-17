@Assessment @Smoke
Feature: Create a NE Hatchling Item from AMS

    @CreateNEHatchling
    Scenario: Verify that user able to create NE Hatchling Item through AMS
        Given I login to AMS as "all-permissions-author"
        When I add "Numeric Entry" hatchling item with following details
            | QuestionTitle                      | QuestionPrompt             |
            | QA Hatchling NE Test Item from AMS | What is the speed of light |
        And I add the following values
            | Correct Target Value | Measurement | Acceptance Within |
            | 300000000            | m/s         | 0.5               |
        And I set the hint with following detail
            | Hint                  |
            | You Know the answers! |
        And I add the student feedback with the following details and save feedback and save the NE item
            | Solution Explained | General Incorrect Feedback     |
            | 300000000          | This is not the speed of light |
        Then I verify the details of the following items are displayed in AMS
            | Title                              | Status       | 
            | QA Hatchling NE Test Item from AMS | In Progress  |