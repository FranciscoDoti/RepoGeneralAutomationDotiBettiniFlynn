@math @smoke
Feature: Trigger default tab with algebraic exponent expression

    Scenario: Verify default tab is triggered when incorrect algebraic exponent answer is input

        Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp

        When I add Math equation module
        And I click on the Question tab, and add an Answer field
        And I set the grade as "Expression" type
        And I input author question "b^{3}/b^{5}"
        And I set Item Details name as "IncorrectPower"
        Then I save the question

        When I simulate student interface
        And I input the answer "b^2"
        And I submit answer
        Then the answer is graded "wrong"