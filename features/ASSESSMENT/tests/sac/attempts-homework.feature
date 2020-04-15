@SAC @Assessment @Regression @Attempts @HomeWork
Feature: Validate functionality of attempts dropdown in homework in SAC

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"
        And I logout IBISCMS

    @NoAttempts
    Scenario: Verify attempts dropdown is not displayed for a new attempt
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I click on "1 Question" in the side nav
            Then The "Attempts Dropdown" should not be displayed
            And The "Action Button" named "Solution" should not be displayed

    @MultipleAttempts @Incorrect @Solution
    Scenario: Verify attempts dropdown is displayed for two incorrect attempts
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Square   | Yes          |
            Then The "Attempts Dropdown" should be displayed
            And The selected attempt should be "incorrect Attempt 1"
            And The "Action Button" named "Solution" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Triangle | Yes          |
            Then The "Attempts Dropdown" should be displayed
            And The selected attempt should be "incorrect Attempt 2"
            And The "Action Button" named "Solution" should not be displayed

    @SingleAttempt @Correct
    Scenario: Verify attempts dropdown is displayed for one correct attempt
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Round    | Yes          |
            Then The "Attempts Dropdown" should be displayed
            And The selected attempt should be "correct My Attempt"
            And The "Action Button" named "Solution" should be displayed

    @MultipleAttempts @Correct
    Scenario: Verify attempts dropdown is displayed for multiple attempts with one correct attempt
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Square   | Yes          |
            | 1 Question | Multiple Choice | Round    | Yes          |
            Then The "Attempts Dropdown" should be displayed
            And The selected attempt should be "correct My Attempt"
            And The "Action Button" named "Solution" should be displayed

    @BlankAnswer
    Scenario: (single module 3 attempts)(no answer attempt) Verify attempts dropdown is displayed for a Blank Answer
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Check Answer |
            | 1 Question | Yes          |
            Then The "Attempts Dropdown" should be displayed
            And The selected attempt should be "incorrect Attempt 1"
            And The "Action Button" named "Solution" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Triangle | Yes          |
            Then The "Attempts Dropdown" should be displayed
            And The selected attempt should be "incorrect Attempt 2"
            And The "Action Button" named "Solution" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Round    | Yes          |
            Then The "Attempts Dropdown" should be displayed
            And The selected attempt should be "correct My Attempt"
            And The "Action Button" named "Solution" should be displayed