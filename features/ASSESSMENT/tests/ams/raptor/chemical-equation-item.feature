@Assessment @Raptor @Smoke @CEE
Feature: To create and configure a Chemical Equation raptor item

    @ChemicalEquation @CreateCEE
    Scenario: Admin creates and configures a Chemical Equation Raptor item and verifies in AMS

        Given I login to AMS as "all-permissions-author"
        When I add the "Chemical Equation" module
        And I add hints
            | Module Type   | Value |
            | Ungraded Text | Water |
        And I set the "Correct" Context
            | Text | Hint Type     | Value   |
            | H2O  | Ungraded Text | Correct |
        And I set the "Incorrect" Context
            | Text | Hint Type     | Value     |
            | 2HO  | Ungraded Text | Incorrect |
        And I set the "Default" Context
            | Hint Type     | Value                     |
            | Ungraded Text | You must enter a response |
        And I configure the following item details
            | Title                |
            | NGA QA Test CEE Item |
        Then I verify the details of the following items are displayed in the Item Details modal
            | Author Mode | Title                | Status      | Module Type |
            | author      | NGA QA Test CEE Item | in progress | CEE         |