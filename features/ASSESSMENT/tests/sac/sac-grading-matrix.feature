@SAC @Assessment @Smoke @Score @Regression
Feature: Validate the functionality of SAC Grading Matrix

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "Test mode" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"

    @TestPolicy
    Scenario: Single module question - Answers saved (Test policy)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "Test mode" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response          | Check Answer |
            | 1 Question | Multiple Choice | 2 · 2 · 3 · 3 · 5 | No           |
        And I click on Save Answer
        Then I verify that no score is displayed for the question

    @TestPolicy
    Scenario: Single module question - All answers submitted (Test policy)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "Test mode" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response          | Check Answer |
            | 1 Question | Multiple Choice | 2 · 2 · 3 · 3 · 5 | No           |
        And I click on Save Answer
        And I click Submit All and yes
        Then I verify that question score in direct navigation panel displays as "100"


    @HWPolicy @Incorrect
    Scenario: Single module question - Incorrect, 1st attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response  | Check Answer |
            | 1 Question | Multiple Choice | 2 · 3 · 5 | Yes          |
        Then I verify that question score in direct navigation panel displays as "0"

    @HWPolicy @Correct
    Scenario: Single module question - Correct, 1st attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response              | Check Answer |
            | 1 Question | Multiple Choice | 2 · 2 · 2 · 2 · 3 · 5 | Yes          |
        Then I verify that question score in direct navigation panel displays as "100"

    @HWPolicy @Correct
    Scenario: Single module question - Correct, 2nd attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response  | Check Answer |
            | 1 Question | Multiple Choice | 2 · 3 · 5 | Yes          |
        Then I verify that question score in direct navigation panel displays as "0"
        And I click on Try Again
        When I provide the following responses
            | Question   | Module Type     | Response              | Check Answer |
            | 1 Question | Multiple Choice | 2 · 2 · 2 · 2 · 3 · 5 | Yes          |
        Then I verify that question score in direct navigation panel displays as "95"


