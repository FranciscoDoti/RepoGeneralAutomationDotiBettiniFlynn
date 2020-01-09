@Assessment @RenderVariable @Smoke
Feature: Render variable values while preview an item

    Scenario: Render variable
        Given I login to AMS as "all-permissions-author"
        When I add the "Multiple Choice" module

        And I configure the following item details
            | Title                       |
            | MultipleChoice Test MC Item |

        And I add list variables
            | Type   | Description | Name  | Value1 | Value2 | Value3 |
            | String | String      | trees | oak    | pine   | beech  |

        And I add the following choices in "Multiple Choice" module
            | Value       |
            | ???trees??? |
            | Trees       |
        Then I preview the item created with rendered variable values