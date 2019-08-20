@smoke @math
Feature: Verify page elements for different eval types

    Scenario: Verify default evaltype for MEE is Expression and  verify its elements

        Given I login to AMS as "all-permissions-author"
        When I navigate to AuthorApp clicking on Raptor item on AMS page
        And I select Math Equation module, click on Question tab

        Then I verify default evaltype for GradeAs dropdown is Expression
        And I verify corresponding page elements are displayed for "Expression" evaltype
        And I click on the Correct tab, verify corresponding page elements for "Expression" evaltype

        When I select GradeAs dropdown "Point" evaltype, click on Question tab
        Then I verify corresponding page elements are displayed for "Point" evaltype
        And I click on the Correct tab, verify corresponding page elements for "Point" evaltype

        When I select GradeAs dropdown "Vector" evaltype, click on Question tab
        Then I verify there are no elements present: check boxes or radio buttons
        And I click on the Correct tab, verify corresponding page elements for "Vector" evaltype

