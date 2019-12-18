@math @smoke @greq
Feature: List Points with reversed coordinates 

    Scenario: Verify list of two points should not match the same list with reversed coordinates.

        Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp
        And I set Item Details name as "PointListReversed"

        When I add Math equation module
        And I click on the Question tab, and add an Answer field
        And I set the grade as "Point" type
        And I input author answer "(2,1),(2,3)"
        And I select isList checkbox
        Then I save the question

        When I simulate student interface
        And I input the answer "(1,2),(2,3)"
        And I submit answer
        Then the answer is graded incorrect with "no-feedback" from author