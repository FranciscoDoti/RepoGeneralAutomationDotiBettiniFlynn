@SAC @Assessment @Regression @Score @HomeWork
Feature: Validate the SAC Regrading functionality for HW Policy Assessments

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"
        And I logout IBISCMS

    @RegradeAssessmentScore @AddQuestion @RemoveQuestion
    Scenario: Verify Regrade assignment when question removed or added to assignment in SAC
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I remove the following questions from the assessment
            | Question |
            | Q5       |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Round    | Yes          |
            | 2 Question | Multiple Choice | Round    | Yes          |
            | 3 Question | Multiple Choice | Round    | Yes          |
            | 4 Question | Multiple Choice | Round    | Yes          |
            Then The overall assignment score should be "100%"
            And The questions should have the following grades
                | Question   | Grade | Status  |
                | 1 Question | 100%  | Correct |
                | 2 Question | 100%  | Correct |
                | 3 Question | 100%  | Correct |
                | 4 Question | 100%  | Correct |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-instructor"
        And I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I add the following questions to the assessment
            | Question |
            | Q5       |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then The overall assignment score should be "80%"
            And The questions should have the following grades
                | Question   | Grade | Status    |
                | 1 Question | 100%  | Correct   |
                | 2 Question | 100%  | Correct   |
                | 3 Question | 100%  | Correct   |
                | 4 Question | 100%  | Correct   |
                | 5 Question | 0%    | Incorrect |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-instructor"
        And I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I remove the following questions from the assessment
            | Question |
            | Q5       |
        And I logout IBISCMS

        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then The overall assignment score should be "100%"
            And The questions should have the following grades
                | Question   | Grade | Status  |
                | 1 Question | 100%  | Correct |
                | 2 Question | 100%  | Correct |
                | 3 Question | 100%  | Correct |
                | 4 Question | 100%  | Correct |

    @RegradeAssessmentScore @AnsweringSomeQuestion @BackArrowNavigation @ForwardArrowNavigation
    Scenario: Verify Regrade assignment when student answers the Question by navigating through back and forward arrow in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 2 Question | Multiple Choice | Square   | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status      |
                | 2 Question | 0%    | In Progress |
            And Side panel for "2 Question" should display the "Feedback" "Incorrect - Moon is not Square"

        When I click on "left" arrow in the nav question header
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Round    | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status  |
                | 1 Question | 100%  | Correct |
            And Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"

        When I click on "right" arrow in the nav question header
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 2 Question | Multiple Choice | Round    | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status  |
                | 2 Question | 95%   | Correct |
            And Side panel for "2 Question" should display the "Solution" "Correct - Moon is Round"
            Then The overall assignment score should be "59%"