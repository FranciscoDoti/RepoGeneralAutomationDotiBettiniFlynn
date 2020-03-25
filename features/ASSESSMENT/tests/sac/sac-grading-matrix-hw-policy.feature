@SAC @Assessment @Smoke @Score @Regression
Feature: Validate the functionality of SAC Grading Matrix using HW Policy

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SacAutomationHW" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"

    @HWPolicy @Incorrect
    Scenario: Single module question - Incorrect, 1st attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SacAutomationHW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | minutes  | Yes          |
        And The questions should have the following grades
            | Question   | Grade |
            | 1 Question | 0%    |

    @HWPolicy @Correct
    Scenario: Single module question - Correct, 1st attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SacAutomationHW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | seconds  | Yes          |
        And I click on View Solution
        And The questions should have the following grades
            | Question   | Grade |
            | 1 Question | 100%  |

    @HWPolicy @Correct
    Scenario: Single module question - Correct, 2nd attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SacAutomationHW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | minutes  | Yes          |
        And The questions should have the following grades
            | Question   | Grade |
            | 1 Question | 0%    |
        And I click on Try Again
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | seconds  | Yes          |
        And I click on View Solution
        And The questions should have the following grades
            | Question   | Grade |
            | 1 Question | 95%   |