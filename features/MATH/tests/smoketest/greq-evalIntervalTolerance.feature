@math @smoke
Feature: Interval with tolerance and no EndPoint enforced

    Scenario:Interval item matches [5,4) to (5,4.5]  with tolerance +/- 0.5 when endpoints not enforced

        Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp

        When I add Math equation module
        And I click on the Question tab, and add an Answer field
        And I set the grade as "Interval" type
        And I input author answer "(5,4]"
        And I unselect Enforce Endpoints checkbox
        And I input upper numeric tolerance "0.5" and lower numeric tolerance "0.5"
        And I set Item Details name as "PointFloatTolerance"
        Then I save the question

        When I simulate student interface
        And I input the answer "[5,4.5)"
        And I submit answer
        Then the answer is graded correct