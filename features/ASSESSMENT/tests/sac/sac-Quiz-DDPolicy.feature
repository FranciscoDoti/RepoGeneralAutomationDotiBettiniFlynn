@SAC @Assessment @Regression @TestQuiz @DueDate
Feature: Validate the functionality of SAC using Test policy - View Solution After DD

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - Quiz No Due Date" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"
        And I logout IBISCMS

    @SubmitAllAnswers @SolutionAfterDueDate
    Scenario: Verify Save button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Quiz No Due Date" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
            | 2 Question | Multiple Choice | Triangle | Yes         |
            | 3 Question | Multiple Choice | Round    | Yes         |
            | 4 Question | Multiple Choice | Square   | Yes         |
            | 5 Question | Multiple Choice | Round    | Yes         |
        And I submit the test quiz
        And I click on "1 Question" in the side nav
            Then The "Disabled Action Button" named "Submitted" should be displayed
        And I click on "2 Question" in the side nav
            Then The "Disabled Action Button" named "Submitted" should be displayed