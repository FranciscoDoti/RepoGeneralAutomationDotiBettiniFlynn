@Assessment @RenderVariable @Smoke
Feature: Render variable values while preview an item

    Scenario Outline: Render variable
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

        And I set the number "1" as the correct answer

        And The variable values are displayed as choices
        Then I preview the item created with rendered variable values