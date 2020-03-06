@SAC @Assessment @Smoke @Score @Regression
Feature: Validate the SAC Regrading functionality

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        And I "Reset Attempts" for the "Raptor Student"

    @RegradeAssessmentScore @AddQuestion @RemoveQuestion
    Scenario: Verify Regrade assignment when question removed or added to assignment in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses to the following questions
            | Question   | Response |
            | 1 Question | Round    |
            | 2 Question | Round    |
            | 3 Question | Round    |
            | 4 Question | Round    |
        Then The Question grade should have the following grade and Assignment grade should be "80%"
            | Question 1 | Question 2 | Question 3 | Question 4 | Question 5 |
            | 100%       | 100%       | 100%       | 100%       | 0%         |
        And I logout IBISCMS
        When I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        And I "Remove" Question "Q5" from the assessment
        And I logout IBISCMS
        And I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        Then The Question grade should have the following grade and Assignment grade should be "100%"
            | Question 1 | Question 2 | Question 3 | Question 4 |
            | 100%       | 100%       | 100%       | 100%       |
        And I logout IBISCMS
        When I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        And I "Add" Question "Q5" from the assessment
        And I logout IBISCMS
        And I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        Then The Question grade should have the following grade and Assignment grade should be "80%"
            | Question 1 | Question 2 | Question 3 | Question 4 | Question 5 |
            | 100%       | 100%       | 100%       | 100%       | 0%         |
