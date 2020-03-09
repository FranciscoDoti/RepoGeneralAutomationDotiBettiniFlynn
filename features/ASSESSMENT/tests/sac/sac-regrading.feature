@SAC @Assessment @Smoke @Score @Regression @WIP
Feature: Validate the SAC Regrading functionality

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"

    @RegradeAssessmentScore @AddQuestion @RemoveQuestion
    Scenario: Verify Regrade assignment when question removed or added to assignment in SAC
        Given I login to IBISCMS as "raptor-instructor"
        And I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        And I add the following questions to the assessment
            | Question |
            | Q5       |
        And I logout IBISCMS
        
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Round    | Yes          |
            | 2 Question | Multiple Choice | Round    | Yes          |
            | 3 Question | Multiple Choice | Round    | Yes          |
            | 4 Question | Multiple Choice | Round    | Yes          |
            Then The overall assignment score should be "80%"
            And The questions should have the following grades
                | Question   | Grade |
                | 1 Question | 100%  |
                | 2 Question | 100%  |
                | 3 Question | 100%  |
                | 4 Question | 100%  |
                | 5 Question | 0%    |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-instructor"
        And I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        And I remove the following questions from the assessment
            | Question |
            | Q5       |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
            Then The overall assignment score should be "100%"
            And The questions should have the following grades
                | Question   | Grade |
                | 1 Question | 100%  |
                | 2 Question | 100%  |
                | 3 Question | 100%  |
                | 4 Question | 100%  |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-instructor"
        And I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
        And I add the following questions to the assessment
            | Question |
            | Q5       |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation" assessment link in "Raptor Automation - Do Not Delete" course
            Then The overall assignment score should be "80%"
            And The questions should have the following grades
                | Question   | Grade |
                | 1 Question | 100%  |
                | 2 Question | 100%  |
                | 3 Question | 100%  |
                | 4 Question | 100%  |
                | 5 Question | 0%    |
