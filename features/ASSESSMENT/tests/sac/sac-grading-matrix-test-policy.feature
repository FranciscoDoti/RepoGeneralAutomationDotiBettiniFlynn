@SAC @Assessment @Smoke @Score @Regression
Feature: Validate the functionality of SAC Grading Matrix using Test policy

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"

    @TestPolicy @SingleModule
    Scenario: Single module question - Answers saved (Test policy)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
        Then The Grade for "1 Question" should not be displayed

    @TestPolicy @SingleModule
    Scenario: Single module question - All answers submitted (Test policy)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
        And I submit the test quiz
        Then The overall assignment score should be "20%"
        And The questions should have the following grades
            | Question   | Grade |
            | 1 Question | 100%    |