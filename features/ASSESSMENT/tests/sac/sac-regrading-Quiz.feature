@SAC @Assessment @Regression @Score @TestQuiz
Feature: Validate the SAC Regrading functionality for Quiz Policy Assessments

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"
        And I logout IBISCMS

    @Regrade @Grading
    Scenario: Verify no assessment score and correct/incorrect indicator should be displayed in Quiz Polict Assessment in SAC
        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Square   | Yes         |
            | 1 Question | Multiple Choice | Round    | Yes         |
            Then The "Question Status" for "1 Question" should be "Complete"
            And The "Question Score" should not be displayed for "1 Question"
            And The "Question Attempts Indicator" should not be displayed for "1 Question"
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 2 Question | Multiple Choice | Round    | Yes         |
            Then The "Question Status" for "2 Question" should be "Complete"
            And The "Question Score" should not be displayed for "2 Question"
            And The "Question Attempts Indicator" should not be displayed for "2 Question"
        When I click on "right" arrow in the nav question header
            Then The "Question Status" for "3 Question" should be ""
            And The "Question Score" should not be displayed for "3 Question"
            And The "Question Attempts Indicator" should not be displayed for "3 Question"

    @Regrade @AddQuestion @RemoveQuestion
    Scenario: Verify no assessment score and correct/incorrect indicator should be displayed in Quiz Polict Assessment in SAC
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I remove the following questions from the assessment
            | Question |
            | Q5       |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Square   | Yes         |
            | 2 Question | Multiple Choice | Round    | Yes         |
            | 3 Question | Multiple Choice | Square   | Yes         |
            | 4 Question | Multiple Choice | Square   | Yes         |
        And I submit all the questions after attempting
            Then The overall assignment score should be "25%"
            And The questions should have the following grades
                | Question   | Grade | Status    |
                | 1 Question | 0%    | Incorrect |
                | 2 Question | 100%  | Correct   |
                | 3 Question | 0%    | Incorrect |
                | 4 Question | 0%    | Incorrect |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-instructor"
        And I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I add the following questions to the assessment
            | Question |
            | Q5       |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
            Then The overall assignment score should be "20%"
            And The questions should have the following grades
                | Question   | Grade | Status    |
                | 1 Question | 0%    | Incorrect |
                | 2 Question | 100%  | Correct   |
                | 3 Question | 0%    | Incorrect |
                | 4 Question | 0%    | Incorrect |
                | 5 Question | 0%    | Incorrect |
            And Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"
            And Side panel for "2 Question" should display the "Solution" "Correct - Moon is Round"

        When I login to IBISCMS as "raptor-instructor"
        And I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I remove the following questions from the assessment
            | Question |
            | Q5       |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
            Then The overall assignment score should be "25%"
            And The questions should have the following grades
                | Question   | Grade | Status    |
                | 1 Question | 0%    | Incorrect |
                | 2 Question | 100%  | Correct   |
                | 3 Question | 0%    | Incorrect |
                | 4 Question | 0%    | Incorrect |
