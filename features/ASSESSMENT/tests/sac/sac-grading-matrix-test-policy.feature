@SAC @Assessment @Regression @Score @TestQuiz
Feature: Validate the functionality of SAC Grading Matrix using Test policy

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"
        And I logout IBISCMS

    @Attempts @NoAttempts @CheckAnswer @Hint
    Scenario: Verify attempts dropdown is not displayed for a new attempt
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I click on "1 Question" in the side nav
            Then The "Attempts Dropdown" should not be displayed
            And The "Action Button" named "Check Answer" should not be displayed
            And The "Action Button" named "Hint" should not be displayed
            And The "Action Button" named "Feedback" should not be displayed
            And The "Panel Container" named "feedback" should not be displayed

    @SingleModule
    Scenario: Single module question - Answers saved (Test policy)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
            Then The "Question Score" should not be displayed for "1 Question"
            And The "Action Button" named "Feedback" should not be displayed
            And The "Panel Container" named "feedback" should not be displayed

    @SingleModule
    Scenario: Single module question - All answers submitted (Test policy)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
        And I submit the test quiz
            Then The overall assignment score should be "20%"
            And The questions should have the following grades
                | Question   | Grade |
                | 1 Question | 100%  |
            And Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"

    @TryAgain @Hint
    Scenario: Verify Try Again button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Square   | Yes         |
            Then The "Action Button" named "Try Again" should not be displayed
            And The "Action Button" named "Hint" should not be displayed
            And The "Action Button" named "Feedback" should not be displayed
            And The "Panel Container" named "feedback" should not be displayed

    @SaveButton @GiveUp @RetainResponses @Attempts
    Scenario: Verify Save button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Action Button" named "Save Answer" should be displayed
            Then The "Action Button" named "Give Up?" should not be displayed
        When I click on "Action Button" "Save Answer"
            Then The "Action Button" named "Save Answer" should be displayed
            Then The "Action Button" named "Give Up?" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
            Then The "Action Button" named "Give Up?" should not be displayed
        And I click on "right" arrow in the nav question header
            Then The "Action Button" named "Give Up?" should not be displayed
        And I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 2 Question | Multiple Choice | Round    | Yes         |
            Then The "Action Button" named "Give Up?" should not be displayed
        And I click on "left" arrow in the nav question header
            Then I verify the following responses are retained
                | Question   | Module Type     | Response |
                | 1 Question | Multiple Choice | Round    |
                | 2 Question | Multiple Choice | Round    |

    @SubmitAllAnswers @SubmitExamModal @SubmitFinalAnswersModalButton
    Scenario: Verify Submit Exam Modal's Submit Final Answers Action Button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Action Button" named "Submit All Questions" should be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
            | 2 Question | Multiple Choice | Round    | Yes         |
            | 3 Question | Multiple Choice | Round    | Yes         |
        When I click on "Action Button" "Submit All Questions"
            Then The "Modal" named "Submit Exam?" should be displayed
            And The "Modal Button" named "submit final answers" should be displayed
            And The "Modal Button" named "revise answers" should be displayed
            And The "Modal Message" named "Submit Exam?" should be displayed
            And The "Modal Message" named "You have completed 3 of 5 questions." should be displayed
            And The "Modal Message" named "Once you submit, you will not be able to change your answers to the questions." should be displayed
            And The "Close Modal Button" should be displayed
        When I click on "Modal Button" "submit final answers"
            Then The questions should have the following grades
                | Question   | Grade | Status  |
                | 1 Question | 100%  | Correct |
                | 2 Question | 100%  | Correct |
                | 3 Question | 100%  | Correct |

    @SubmitAllAnswers @SubmitExamModal @ReviseAnswers
    Scenario: Verify Submit Exam Modal's Revise Action Button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
            | 2 Question | Multiple Choice | Round    | Yes         |
            | 3 Question | Multiple Choice | Round    | Yes         |
            | 4 Question | Multiple Choice | Round    | Yes         |
            | 5 Question | Multiple Choice | Round    | Yes         |
        When I click on "Action Button" "Submit All Questions"
            Then The "Modal" named "Submit Exam?" should be displayed
            And The "Modal Button" named "submit final answers" should be displayed
            And The "Modal Button" named "revise answers" should be displayed
            And The "Modal Message" named "Submit Exam?" should be displayed
            And The "Modal Message" named "You have completed 5 of 5 questions." should be displayed
            And The "Modal Message" named "Once you submit, you will not be able to change your answers to the questions." should be displayed
            And The "Close Modal Button" should be displayed
        When I click on "Modal Button" "revise answers"
            Then The "Action Button" named "Submit All Questions" should be displayed
            Then The "Modal" named "Submit Exam?" should not be displayed

    # @SubmitAllAnswers @NoResponses @FinalGradesOnSubmission @PersistingBug @NGA-8434
    # Scenario: Verify Submit Exam for Blank Response test features in SAC
    #     Given I login to IBISCMS as "raptor-student"
    #     When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
    #     When I click on "Action Button" "Submit All Questions"
    #     And I click on "Modal Button" "submit final answers"
    #         Then The questions should have the following grades
    #             | Question   | Grade | Status    |
    #             | 1 Question | 0%    | Incorrect |
    #             | 2 Question | 0%    | Incorrect |
    #             | 3 Question | 0%    | Incorrect |
    #             | 4 Question | 0%    | Incorrect |
    #             | 5 Question | 0%    | Incorrect |
    #         And The overall assignment score should be "0%"

    @SubmitAllAnswers @CorrectContext @IncorrectContext @RetainResponses @Attempts @Solution
    Scenario: Verify Submit Exam Correct and Incorrect context test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Action Button" named "Solution" should not be displayed
            And The "Panel Container" named "Solution" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
            | 2 Question | Multiple Choice | Square   | Yes         |
            | 3 Question | Multiple Choice | Round    | Yes         |
            | 4 Question | Multiple Choice | Triangle | Yes         |
            Then I verify the following responses are retained
                | Question   | Module Type     | Response |
                | 1 Question | Multiple Choice | Round    |
                | 2 Question | Multiple Choice | Square   |
                | 3 Question | Multiple Choice | Round    |
                | 4 Question | Multiple Choice | Triangle |
        And I click on "Action Button" "Submit All Questions"
        And I click on "Modal Button" "submit final answers"
            Then The questions should have the following grades
                | Question   | Grade | Status    |
                | 1 Question | 100%  | Correct   |
                | 2 Question | 0%    | Incorrect |
                | 3 Question | 100%  | Correct   |
                | 4 Question | 0%    | Incorrect |
                | 5 Question | 0%    | Incorrect |
            And I verify the following responses are retained
                | Question   | Module Type     | Response |
                | 1 Question | Multiple Choice | Round    |
                | 2 Question | Multiple Choice | Round    |
                | 3 Question | Multiple Choice | Round    |
                | 4 Question | Multiple Choice | Round    |
            And The "Action Button" named "Solution" should be displayed
            And Side panel for "3 Question" should display the "Solution" "Correct - Wheel is Round"
            And The "Action Button" named "Feedback" should not be displayed

    @Attempts @Grading @Solution
    Scenario: Single module question - All answers submitted (Test policy)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer |
            | 1 Question | Multiple Choice | Round    | Yes         |
        And I logout IBISCMS

        And I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Action Button" named "Solution" should not be displayed
            And The "Panel Container" named "Solution" should not be displayed
        And I submit the test quiz
            Then The overall assignment score should be "20%"
            And The questions should have the following grades
                | Question   | Grade | Status    |
                | 1 Question | 100%  | Correct   |
            And Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round" 

    @RetainResponses @NavigationArrows
    Scenario: Verify Feedback button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests Quiz" assessment link in "Raptor Automation - Do Not Delete" course
            Then I should see "Question 1 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Earth?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle | 
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer|
            | 1 Question | Multiple Choice | Square   | Yes        |
        When I click on "right" arrow in the nav question header
            Then I should see "Question 2 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Moon?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
        When I provide the following responses
            | Question   | Module Type     | Response | Save Answer|
            | 5 Question | Multiple Choice | Round    | Yes        |
        And I click on "left" arrow in the nav question header
            Then I should see "Question 4 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Globe?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
        When I click on "1 Question" in the side nav
        When I click on "right" arrow in the nav question header
        When I click on "right" arrow in the nav question header
        When I click on "right" arrow in the nav question header
        When I click on "right" arrow in the nav question header
            Then I should see "Question 5 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Ball?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
            And I verify the following responses are retained
                | Module Type     | Response |
                | Multiple Choice | Round    |           
        When I click on "left" arrow in the nav question header
        When I click on "left" arrow in the nav question header
        When I click on "left" arrow in the nav question header
        When I click on "left" arrow in the nav question header
            Then I should see "Question 1 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Earth?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
            And I verify the following responses are retained
                | Module Type     | Response |
                | Multiple Choice | Square   |
        And I submit the test quiz
        When I click on "left" arrow in the nav question header
        When I click on "left" arrow in the nav question header
        When I click on "left" arrow in the nav question header
        When I click on "left" arrow in the nav question header
            Then I should see "Question 2 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Moon?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
            And I verify the following responses are retained
                | Module Type     | Response |
                | Multiple Choice | Round    |
            And The questions should have the following grades
                | Question   | Grade | Status    |
                | 1 Question | 0%    | Incorrect |
        When I click on "right" arrow in the nav question header
        When I click on "right" arrow in the nav question header
        When I click on "right" arrow in the nav question header
        When I click on "right" arrow in the nav question header
            Then I should see "Question 1 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Earth?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
            And I verify the following responses are retained
                | Module Type     | Response |
                | Multiple Choice | Round    |
            And The questions should have the following grades
                | Question   | Grade | Status      |
                | 5 Question | 100%  | Correct     |  