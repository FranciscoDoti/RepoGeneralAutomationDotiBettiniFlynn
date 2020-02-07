@Assessment @Raptor @Smoke
Feature: To create and configure a Chemical Equation raptor item

    @ChemicalEquation @CreateCEE
    Scenario: Admin creates and configures a Chemical Equation Raptor item and verifies in AMS

        Given I login to AMS as "all-permissions-author"
        When I create a non-performance module in AMS with the following details
            | Title                | Module Type       |
            | NGA QA Test CEE Item | Chemical Equation |
        And I add hints
            | Module Type   | Value |
            | Ungraded Text | Water |
        And I set the "Correct" Context for CEE and configure it with the text "H2O"
        And I add hints
            | Module Type   | Value   |
            | Ungraded Text | Correct |
        And I set the "Incorrect" Context for CEE and configure it with the text "2HO"
        And I add hints
            | Module Type   | Value     |
            | Ungraded Text | Incorrect |
        And I click on Default Context
        And I add hints
            | Module Type   | Value                     |
            | Ungraded Text | You must enter a response |
        And I Save the item
        Then I verify the details of the following items are displayed in the Item Details modal
            | Author Mode | Title                | Status      | Module Type |
            | author      | NGA QA Test CEE Item | in progress | CEE         |