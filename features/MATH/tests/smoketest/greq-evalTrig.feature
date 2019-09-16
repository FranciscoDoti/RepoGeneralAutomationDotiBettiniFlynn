@math @smoke
Feature: Hyperbolic Trigonometric expression 

    Scenario: Verify an equivalent polar coordinate for Point eval type without transforming the angle by 2π

        Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp

        When I add Math equation module
        And I click on the Question tab, and add an Answer field
        And I set the grade as "Expression" type
        And I input author question "\sinh(x + y)"
        And I set Item Details name as "TrigExpression2"
        Then I save the question

        When I simulate student interface
        And I input the correct trigonometric expression "sinh, x, cosh, y, +, cosh, x, sinh, y"
        And I submit answer
        Then the answer is graded correct