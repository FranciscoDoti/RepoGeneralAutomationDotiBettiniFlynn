@smoke @math
Feature: Verify page elements for different eval types

    Scenario: Verify default evaltype for MEE is Expression

        Given I login to AMS as "all-permissions-author"
        When I navigate to AuthorApp clicking on Raptor item on AMS page
        And I select Math Equation module, click on Question tab
        Then I verify default evaltype for GradeAs dropdown is Expression
        And I verify corresponding check boxes are displayed for Expression evaltype question