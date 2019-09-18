@math @smoke
Feature: Realation List 

    Scenario: Verify an Relation list equation for Relation eval type

        Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp

        When I add Math equation module
        And I click on the Question tab, and add an Answer field
        And I set the grade as "Relation" type
        And I input author question "\theta=5,x>0>-3"
        And I select isList checkbox
        And I set Item Details name as "Relation-List"
        Then I save the question

        When I simulate student interface
        And I input the correct equation "θ = 5 , x > 0 > − 3"
        And I submit answer
        Then the answer is graded correct