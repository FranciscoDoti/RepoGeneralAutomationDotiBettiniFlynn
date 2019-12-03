@math @smoke @greq
Feature: Polar Coordinates for Point eval type

    Scenario: Verify an equivalent polar coordinate for Point eval type without transforming the angle by 2π

        Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp
        And I set Item Details name as "PointPolarCoord"

        When I add Math equation module
        And I click on the Question tab, and add an Answer field
        And I set the grade as "Point" type
        And I input author answer "(4, \pi/3)"
        And I select Polar Coordinate checkbox
        Then I save the question

        When I simulate student interface
        And I input the answer "(−4,4π/3)"
        And I submit answer
        Then the answer is graded correct