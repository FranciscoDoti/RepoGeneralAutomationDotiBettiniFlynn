@SAC @Assessment @Regression @Score @HomeWork
Feature: Validate the functionality of SAC Grading Matrix using HW Policy

    Background: Reset Student's Attempts
        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I reset attempts for student "Raptor Student"
        And I logout IBISCMS

    @Incorrect
    Scenario: Single module question - Incorrect, 1st attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Square   | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status      |
                | 1 Question | 0%    | In Progress |
            And Side panel for "1 Question" should display the "Feedback" "Incorrect - Earth is not Square"

    @Correct
    Scenario: Single module question - Correct, 1st attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Round    | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status  |
                | 1 Question | 100%  | Correct |
            And Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"

    @Correct @TryAgain @Attempts @Solution
    Scenario: Single module question - Correct, 2nd attempt (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then Side panel for "1 Question" should display the "Hint" "You know its Round"
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Square   | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status      |
                | 1 Question | 0%    | In Progress |
            And Side panel for "1 Question" should display the "Feedback" "Incorrect - Earth is not Square"
        When I click on "Action Button" "Try Again"
            Then The "Attempts Dropdown" should be displayed
            And The selected attempt should be "in-progress Attempt 2"
            And The "Action Button" named "Solution" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Round    | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status  |
                | 1 Question | 95%   | Correct |
            And Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"

    @Correct @TryAgain @Attempts
    Scenario: Single module question - Correct, 20 attempts (HW)
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response  | Check Answer |
            | 1 Question | Multiple Choice | Square    | Yes          |
            | 1 Question | Multiple Choice | Triangle  | Yes          |
            | 1 Question | Multiple Choice | Rectangle | Yes          |
            | 1 Question | Multiple Choice | Square    | Yes          |
            | 1 Question | Multiple Choice | Triangle  | Yes          |
            | 1 Question | Multiple Choice | Rectangle | Yes          |
            | 1 Question | Multiple Choice | Square    | Yes          |
            | 1 Question | Multiple Choice | Triangle  | Yes          |
            | 1 Question | Multiple Choice | Square    | Yes          |
            | 1 Question | Multiple Choice | Rectangle | Yes          |
            | 1 Question | Multiple Choice | Triangle  | Yes          |
            | 1 Question | Multiple Choice | Square    | Yes          |
            | 1 Question | Multiple Choice | Rectangle | Yes          |
            | 1 Question | Multiple Choice | Triangle  | Yes          |
            | 1 Question | Multiple Choice | Square    | Yes          |
            | 1 Question | Multiple Choice | Rectangle | Yes          |
            | 1 Question | Multiple Choice | Triangle  | Yes          |
            | 1 Question | Multiple Choice | Square    | Yes          |
            | 1 Question | Multiple Choice | Rectangle | Yes          |
            | 1 Question | Multiple Choice | Triangle  | Yes          |
            Then The overall assignment score should be "0%"
            And The questions should have the following grades
                | Question   | Grade | Status      |
                | 1 Question | 0%    | In Progress |
            And Side panel for "1 Question" should display the "Feedback" "Incorrect - Earth is not Triangular"

    @CheckAnswer @TryAgain @PerformanceCardScore @GiveUp
    Scenario: Verify Check Answer button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Action Button" named "Check Answer" should be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Square   | Yes          |
            Then The "Action Button" named "Check Answer" should not be displayed
            And The "Action Button" named "Try Again" should be displayed
        When I click on "Action Button" "Try Again"
            Then The "Action Button" named "Try Again" should not be displayed
            And The "Action Button" named "Check Answer" should be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Round    | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status  |
                | 1 Question | 95%   | Correct |
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 2 Question | Multiple Choice | Round    | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status  |
                | 2 Question | 100%  | Correct |
        When I provide the following responses
            | Question   | Module Type     | Response  | Check Answer |
            | 4 Question | Multiple Choice | Square    | Yes          |
            | 4 Question | Multiple Choice | Triangle  | Yes          |
            | 4 Question | Multiple Choice | Rectangle | Yes          |
            | 4 Question | Multiple Choice | Square    | Yes          |
            | 4 Question | Multiple Choice | Triangle  | Yes          |
            | 4 Question | Multiple Choice | Rectangle | Yes          |
            | 4 Question | Multiple Choice | Round     | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status  |
                | 4 Question | 70%   | Correct |
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 5 Question | Multiple Choice | Square   | Yes          |
        And I give up on "5 Question"
            Then Side panel for "5 Question" should display the "Solution" "Correct - Ball is Round"
        And I logout IBISCMS

        Given I login to IBISCMS as "raptor-instructor"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Total" score for "Raptor Student" in the Responses tab should be "53.0%"

    @SolutionModal @Solution @Attempts
    Scenario: Verify View Solution tests in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Round    | No           |
        And I click on "Action Button" "Check Answer"
            Then The "Modal" named "Solved!" should be displayed
            And The "Modal Button" named "View Solution" should be displayed
            And The "Modal Button" named "Next Question" should be displayed
            And The "Modal Message" named "You solved it  in 1 attempt." should be displayed
            And The "Close Modal Button" should be displayed
        When I click on "Modal Button" "View Solution"
            Then Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"
            And The "Attempts Dropdown" should be displayed

    @TryAgain @ReLogin @GiveUp
    Scenario: Verify Try Again button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Round    | Yes          |
            Then The "Action Button" named "Try Again" should not be displayed
        When I click on "right" arrow in the nav question header
            Then The "Action Button" named "Try Again" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Square   | Yes          |
        And I give up on "3 Question"
            Then The "Action Button" named "Try Again" should not be displayed
        When I logout IBISCMS

        When I login to IBISCMS as "raptor-student"
        And I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I click on "1 Question" in the side nav
            Then The "Action Button" named "Try Again" should not be displayed
        When I click on "right" arrow in the nav question header
            Then The "Action Button" named "Try Again" should not be displayed
        And I click on "3 Question" in the side nav
            Then The "Action Button" named "Try Again" should not be displayed

    @GiveUp @CancelGiveUp
    Scenario: Verify GiveUp button cancel test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Square   | Yes          |
        When I click on "Action Button" "Give Up?"
            Then The "Modal" named "Have you hit a wall?" should be displayed
            And The "Modal Button" named "give up and view solution" should be displayed
            And The "Modal Button" named "try again" should be displayed
            And The "Modal Message" named "You have made 1 attempt." should be displayed
            And The "Modal Message" named "If you give up now, your score on this question will be locked at 0%." should be displayed
            And The "Close Modal Button" should be displayed
        When I click on "Modal Button" "try again"
            Then The "Modal" named "Have you hit a wall?" should not be displayed
            And The questions should have the following grades
                | Question   | Grade | Status      |
                | 1 Question | 0%    | In Progress |
            And I verify the following responses are retained
                | Question   | Module Type     | Response |
                | 1 Question | Multiple Choice | Square   |

    @GiveUp @ConfirmGiveUp
    Scenario: Verify GiveUp button confirm test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Disabled Action Button" named "Give Up?" should be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 1 Question | Multiple Choice | Square   | Yes          |
        And I click on "Action Button" "Give Up?"
        And I click on "Modal Button" "give up and view solution"
            Then The "Modal" named "Have you hit a wall?" should not be displayed
        And The questions should have the following grades
            | Question   | Grade | Status  |
            | 1 Question | 0%    | Gave Up |
            Then Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"
            And The "Disabled Action Button" named "Give Up?" should be displayed
        When I click on "Action Button" "Give Up?"
            Then The "Modal" named "Have you hit a wall?" should not be displayed
            
    @Hint
    Scenario: Verify Hint button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Panel Container" named "hint" should not be displayed
            And The "Action Button" named "Hint" should be displayed
        When I click on "Action Button" "Hint"  
            Then Side panel for "1 Question" should display the "Hint" "You know its Round"
            Then The "Panel Toggle Button" named "hint" should be displayed
        When I click on "Close Panel Container" "hint"
            Then The "Panel Container" named "hint" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 1 Question | Multiple Choice | Square   | Yes         |
        And I click on "right" arrow in the nav question header
            Then The "Action Button" named "Hint" should be displayed
        When I click on "Action Button" "Hint"  
            Then Side panel for "2 Question" should display the "Hint" "You need to look into the sky"
        When I click on "Close Panel Container" "hint"
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 2 Question | Multiple Choice | Round    | Yes         |
            Then The "Panel Container" named "hint" should not be displayed
            And The "Action Button" named "Hint" should not be displayed

    @Feedback @Hint
    Scenario: Verify Feedback button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Action Button" named "Feedback" should not be displayed
            And The "Panel Container" named "feedback" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 1 Question | Multiple Choice | Round    | Yes         |
            Then The "Action Button" named "Feedback" should not be displayed
            And The "Panel Container" named "feedback" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 2 Question | Multiple Choice | Square   | Yes         |
            Then Side panel for "2 Question" should display the "Feedback" "Incorrect - Moon is not Square"
            Then The "Panel Toggle Button" named "feedback" should be displayed
            And The "Action Button" named "Hint" should not be displayed
        When I click on "Panel Toggle Button" "feedback"
            Then The "Expanded Panel Container" named "feedback" should be displayed
        When I click on "Panel Toggle Button" "feedback"
            Then The "Panel Container" named "feedback" should be displayed
            And The "Expanded Panel Container" named "feedback" should not be displayed
        When I click on "Close Panel Container" "feedback"
        And I click on "Action Button" "Feedback"
            Then Side panel for "2 Question" should display the "Feedback" "Incorrect - Moon is not Square"
        When I click on "3 Question" in the side nav
            Then The "Action Button" named "Hint" should be displayed
        When I click on "Action Button" "Hint"  
            Then Side panel for "3 Question" should display the "Hint" "You need to see a Wheel"
        When I click on "Panel Toggle Button" "hint"
            Then The "Expanded Panel Container" named "hint" should be displayed
        When I click on "Panel Toggle Button" "hint"
            Then The "Panel Container" named "hint" should be displayed
            And The "Expanded Panel Container" named "hint" should not be displayed
        When I click on "2 Question" in the side nav
            Then The "Action Button" named "Feedback" should be displayed
            And The "Panel Container" named "feedback" should not be displayed
                
    @Feedback @GiveUp @Hint @Solution
    Scenario: Verify Feedback button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then The "Action Button" named "Solution" should not be displayed
            And The "Panel Container" named "solution" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 1 Question | Multiple Choice | Square   | Yes         |
        And I click on "Action Button" "Give Up?"
        And I click on "Modal Button" "give up and view solution"
            Then The "Action Button" named "Solution" should be displayed
            And Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"
            And The "Action Button" named "Feedback" should not be displayed     
            And The "Disabled Action Button" named "Give Up?" should be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 2 Question | Multiple Choice | Square   | Yes         |
        When I click on "Action Button" "Try Again"
            Then The "Action Button" named "Feedback" should not be displayed
            And The "Panel Container" named "feedback" should not be displayed
            And The "Action Button" named "Hint" should be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 2 Question | Multiple Choice | Square   | Yes         |
        And I click on "Close Panel Container" "feedback"
        And I click on "Action Button" "Feedback"
            Then Side panel for "2 Question" should display the "Feedback" "Incorrect - Moon is not Square"

    @RetainResponses @NavigationArrows
    Scenario: Verify Feedback button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then I should see "Question 1 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Earth?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle | 
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 1 Question | Multiple Choice | Square   | Yes         |
        When I click on "right" arrow in the nav question header
            Then I should see "Question 2 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Moon?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 5 Question | Multiple Choice | Round    | Yes         |
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
                | Multiple Choice | Round   |
            And The questions should have the following grades
                | Question   | Grade | Status  |
                | 5 Question | 100%  | Correct |            
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
            And The questions should have the following grades
                | Question   | Grade | Status      |
                | 1 Question | 0%    | In Progress |
    
    @Hint @Solution
    Scenario: Verify Solution button test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 1 Question | Multiple Choice | Round    | Yes         |
            Then The "Action Button" named "Solution" should be displayed
        When I click on "Action Button" "Solution"
            Then The "Panel Container" named "solution" should be displayed
            And Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"
            And The "Action Button" named "Hint" should not be displayed
        When I click on "2 Question" in the side nav
            Then The "Panel Container" named "solution" should not be displayed
        When I click on "1 Question" in the side nav
            Then The "Panel Container" named "solution" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer|
            | 2 Question | Multiple Choice | Square   | Yes         |
            Then The "Action Button" named "Solution" should not be displayed
            And The "Panel Container" named "solution" should not be displayed
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Round    | No           |
        And I click on "Action Button" "Check Answer"
        And I click on "Modal Button" "View Solution"
            Then Side panel for "3 Question" should display the "Solution" "Correct - Wheel is Round"
        When I click on "Close Panel Container" "solution"
        And I click on "Action Button" "Solution"
            Then Side panel for "3 Question" should display the "Solution" "Correct - Wheel is Round"
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 4 Question | Multiple Choice | Square   | Yes          |
        And I click on "Action Button" "Give Up?"
        And I click on "Modal Button" "give up and view solution"
            Then The "Action Button" named "Solution" should be displayed
            Then Side panel for "4 Question" should display the "Solution" "Correct - Globe is Round"
        When I click on "1 Question" in the side nav
        When I click on "Action Button" "Solution"
            Then Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"
        When I click on "3 Question" in the side nav
        When I click on "Action Button" "Solution"
            Then Side panel for "3 Question" should display the "Solution" "Correct - Wheel is Round"
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 5 Question | Multiple Choice | Round    | No           |
        And I click on "Action Button" "Check Answer"
        And I click on "Modal Button" "View Solution"
        And I click on "Action Button" "Solution"
            And The "Panel Container" named "solution" should not be displayed
    
    @RetainResponses @DirectNavigation
    Scenario: Verify Direct Navigation test features in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
            Then I should see "Question 1 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Earth?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
        When I click on "5 Question" in the side nav
            Then I should see "Question 5 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Ball?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
        When I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 3 Question | Multiple Choice | Square   | Yes          |
            | 5 Question | Multiple Choice | Round    | Yes          |
        When I click on "1 Question" in the side nav
        When I click on "4 Question" in the side nav
        When I click on "2 Question" in the side nav
        When I click on "3 Question" in the side nav
        When I click on "4 Question" in the side nav
        When I click on "5 Question" in the side nav
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
            And The questions should have the following grades
                | Question   | Grade   | Status  |
                | 5 Question | 100/100 | Correct |
        When I click on "5 Question" in the side nav
        When I click on "2 Question" in the side nav
        When I click on "3 Question" in the side nav
        When I click on "1 Question" in the side nav
        When I click on "4 Question" in the side nav
        When I click on "3 Question" in the side nav
            Then I should see "Question 3 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Wheel?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
            And I verify the following responses are retained
                | Module Type     | Response |
                | Multiple Choice | Square   |
            And The questions should have the following grades
                | Question   | Grade  | Status      |
                | 3 Question | 0/100  | In Progress |
        When I click on "5 Question" in the side nav
        When I click on "2 Question" in the side nav
        When I click on "3 Question" in the side nav
        When I click on "1 Question" in the side nav
        When I click on "4 Question" in the side nav
        When I click on "2 Question" in the side nav
            Then I should see "Question 2 of 5" as the nav question header
            And The Multiple Choice question "Shape of the Moon?" should be displayed with
                | Response  |
                | Square    |
                | Round     |
                | Triangle  |
                | Rectangle |
            And The questions should have the following grades
                | Question   | Grade | Status      |
                | 2 Question | 0/100 |             |

    @Grading @Regrade @AnsweringSomeQuestion @BackArrowNavigation @ForwardArrowNavigation
    Scenario: Verify Regrade assignment when student answers the Question by navigating through back and forward arrow in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 2 Question | Multiple Choice | Square   | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status      |
                | 2 Question | 0%    | In Progress |
            And Side panel for "2 Question" should display the "Feedback" "Incorrect - Moon is not Square"

    @Grading @Regrade @AnsweringSomeQuestion @BackArrowNavigation @ForwardArrowNavigation
    Scenario: Verify Regrade assignment when student answers the Question by navigating through back and forward arrow in SAC
        Given I login to IBISCMS as "raptor-student"
        When I navigate to "SAC Automation - Validation Tests HW" assessment link in "Raptor Automation - Do Not Delete" course
        And I provide the following responses
            | Question   | Module Type     | Response | Check Answer |
            | 2 Question | Multiple Choice | Square   | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status      |
                | 2 Question | 0%    | In Progress |
            And Side panel for "2 Question" should display the "Feedback" "Incorrect - Moon is not Square"

        When I click on "left" arrow in the nav question header
        And I provide the following responses
            | Module Type     | Response | Check Answer |
            | Multiple Choice | Round    | Yes          |
            Then The questions should have the following grades
                | Question   | Grade | Status  |
                | 1 Question | 100%  | Correct |
            And Side panel for "1 Question" should display the "Solution" "Correct - Earth is Round"

        When I click on "right" arrow in the nav question header
        And I provide the following responses
            | Module Type     | Response | Check Answer |
            | Multiple Choice | Round    | Yes          |
            Then The overall assignment score should be "59%"
            And The questions should have the following grades
                | Question   | Grade | Status  |
                | 2 Question | 95%   | Correct |
            And Side panel for "2 Question" should display the "Solution" "Correct - Moon is Round"