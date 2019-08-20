@smoke @math
Feature: Verify page elementsfor different eval types

    Scenario: Verify Expression is default evaltype and verify page elements for each of the evaltype

        Given I login to AMS as "all-permissions-author"
        When I navigate to AuthorApp clicking on Raptor item on AMS page
        And I select Math Equation module, click on Question tab

        Then I verify default evaltype for GradeAs dropdown is Expression
        And I verify the checkboxes: IsList, GradeToConstant are displayed for Expression evaltype
        And I click on the Correct tab, verify checkboxes and radio buttons: IsList, GradeToConstant, Numeric and Exact Tolerance for Expression evaltype

        When I click on Question tab, select GradeAs dropdown "Point" evaltype
        Then I verify the check box: IsList is displayed for Point evaltype
        And I click on the Correct tab, verify checkboxes and radio buttons: IsList, PolarCoordinate, Numeric and Exact Tolerance for Point evaltype

        When I click on Question tab, select GradeAs dropdown "Vector" evaltype
        Then I verify there are no elements present: checkboxes or radio buttons for Vector evaltype
        And I click on the Correct tab, verify checkboxes and radio buttons: Enforce Form, Numeric and Exact Tolerance for Vector evaltype