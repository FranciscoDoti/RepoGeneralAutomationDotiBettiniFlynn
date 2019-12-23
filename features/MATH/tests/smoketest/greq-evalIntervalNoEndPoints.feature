@math @smoke @greq
Feature: Interval containing infinity with EndPoint not enforced

    Scenario:Interval item do not match [-infinity, 7] to (-infinity,7) when endpoints are not enforced

        Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp
        And I set Item Details name as "IntervalwithInfinity"

        When I add Math equation module
        And I click on the Question tab, and add an Answer field
        And I set the grade as "Interval" type
        And I input author answer "(-\infinity,7)"
        And I unselect Enforce Endpoints checkbox
        Then I save the question

        When I simulate student interface
        And I input the answer "[−∞,7]"
        And I submit answer
        Then the answer is graded incorrect with "no-feedback" from author