@Assessment @Smoke
Feature: Create a MC Hatchling Item from AMS

    @CreateMCHatchling
    Scenario: Verify that user able to create MC Hatchling Item through AMS
        Given I login to AMS as "all-permissions-author"
        When I add Multiple Choice hatchling item with following details
            | QuestionTitle                      | QuestionPrompt        |
            | QA Hatchling MC Test Item from AMS | Who won the CWC 2019? |  
        And I add the following correct answer and feedback
            | Answer  | Feedback |
            | England | Correct  |
        And I add the following incorrect answers and feedback
            | Answer      | Feedback  |
            | Australia   | Incorrect |
            | India       | Incorrect | 
            | NewZealandd | Incorrect |
        And I set hint and generic feedback with following details and save
            | Hint                  | GenericFeedback             |
            | You Know the answers! | You must provide a response |
<<<<<<< HEAD
        Then I verify the items were updated in AMS
=======
        Then I verify the details of the following items are displayed in AMS
>>>>>>> c8d17fd7f05b5fb7156d899d7b25d78afcf99e58
            | Title                              | Status       | 
            | QA Hatchling MC Test Item from AMS | In Progress  | 
        