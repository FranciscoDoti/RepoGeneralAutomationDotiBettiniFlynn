@math @smoke @greq
Feature: Interval with tolerance and EndPoint not enforced

    Scenario:Interval item matches [5,6.5) to (5,6]  with tolerance +/- 0.5 when endpoints are not enforced

        Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp
        And I set Item Details name as "IntervalFloatTolerance"

        When I add Math equation module
        And I click on the Question tab, and add an Answer field
        And I set the grade as "Interval" type
        And I input author answer "(5,6]"
        And I unselect Enforce Endpoints checkbox
        And I input upper numeric tolerance "0.5" and lower numeric tolerance "0.5"
        Then I save the question

        When I simulate student interface
        And I input the answer "[5,6.5)"
        And I submit answer
        Then the answer is graded correct