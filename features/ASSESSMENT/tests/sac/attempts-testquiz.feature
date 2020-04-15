@SAC @Assessment @Regression @Attempts @TestQuiz
Feature: Validate functionality of attempts in test/quiz in SAC

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"
        And I logout IBISCMS
    
    @Attempts @ReviseAnswers @RetainResponses
    Scenario: Attempt button shows as Solution for a missed or incorrect question (Test policy)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
            | 2 Question | Multiple Choice | Square   | Yes         |
        And I submit the test quiz
            Then I verify the following responses are retained
                | Question   | Module Type     | Response | Attempt    |
                | 2 Question | Multiple Choice | Square   | My Attempt |
        When I click on "1 Question" in the side nav
            Then The "Attempts Dropdown" should be displayed
            And The selected attempt should be "correct My Attempt"
            And The "Action Button" named "Solution" should be displayed
            And The "Disabled Action Button" named "Solved" should be displayed
        When I click on "2 Question" in the side nav
            Then The "Attempts Dropdown" should be displayed
            And The selected attempt should be "gave-up Answer"
            And The "Action Button" named "Solution" should be displayed
            And The "Disabled Action Button" named "Missed" should be displayed
        When I click on "3 Question" in the side nav
            Then The "Attempts Dropdown" should not be displayed
            And The "Action Button" named "Solution" should be displayed
            And The "Disabled Action Button" named "Missed" should be displayed

    @SavedAttempt
    Scenario: Verify attempts dropdown is not displayed for a new attempt
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Square   | Yes         |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Action Button" named "Submit All Questions" should be displayed
        When I click on "1 Question" in the side nav
            Then The "Attempts Dropdown" should not be displayed
            And The "Action Button" named "Solution" should not be displayed
        And I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 2 Question | Multiple Choice | Round    | Yes         |
        And I logout IBISCMS

        # check the answer retained