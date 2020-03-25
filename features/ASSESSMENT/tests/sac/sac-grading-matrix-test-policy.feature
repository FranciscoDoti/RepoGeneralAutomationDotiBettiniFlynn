@SAC @Assessment @Smoke @Score @Regression
Feature: Validate the functionality of SAC Grading Matrix using Test policy

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SacAutomationTest" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"


    @TestPolicy
    Scenario: Single module question - Answers saved (Test policy)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SacAutomationTest" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | seconds  | No           |
        And I click on Save Answer
        Then I verify that no score is displayed for the question number "1"

    @TestPolicy
    Scenario: Single module question - All answers submitted (Test policy)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SacAutomationTest" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | seconds  | No           |
        And I click on Save Answer
        And I Submit All Questions
        And The questions should have the following grades
            | Question   | Grade |
            | 1 Question | 100%  |
#TODO: CHECK AS WELL THE OVERALL SCORE


