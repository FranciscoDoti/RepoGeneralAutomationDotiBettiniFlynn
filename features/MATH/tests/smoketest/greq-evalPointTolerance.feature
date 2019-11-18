@math @smoke @greq
Feature: Floating Point with tolerance 

    Scenario: Verify Point matches tolerance even when floating points are used

        Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp
        And I set Item Details name as "PointFloatTolerance"

        When I add Math equation module
        And I click on the Question tab, and add an Answer field
        And I set the grade as "Point" type
        And I input author answer "(1.2,2.0)"
        And I input upper numeric tolerance "0.1" and lower numeric tolerance "0.1"
        Then I save the question

        When I simulate student interface
        And I input the answer "(1.1,2.1)"
        And I submit answer
        Then the answer is graded correct