@smoke @math
Feature: Verify page elements for different eval types

    Scenario: Verify Expression is default evaltype and verify page elements for each of the evaltype

        Given I login to AMS as "all-permissions-author"
        When I navigate to AuthorApp clicking on Raptor item on AMS page
        And I select Math Equation module, click on Question tab

        Then I verify default evaltype for GradeAs dropdown is Expression
        And I verify "one or more" dropdown(s) or radio button(s): "gradeAsListC" on "question" tab
        And I verify "one or more" dropdown(s) or radio button(s): "gradeAsListC, gradeFormType, mathNumericTolerance, exactTolerance" on "correct" tab

        When I click on Question tab, select GradeAs dropdown "Point" evaltype
        Then I verify "one or more" dropdown(s) or radio button(s): "isList" on "question" tab
        And I verify "one or more" dropdown(s) or radio button(s): "isList, mathPolarCoordinate, mathNumericTolerance, exactTolerance" on "correct" tab

        When I click on Question tab, select GradeAs dropdown "Vector" evaltype
        Then I verify "there are no" dropdown(s) or radio button(s): "vectorEnforceForm, mathNumericTolerance, exactTolerance" on "question" tab
        And I verify "one or more" dropdown(s) or radio button(s): "vectorEnforceForm, mathNumericTolerance, exactTolerance" on "correct" tab