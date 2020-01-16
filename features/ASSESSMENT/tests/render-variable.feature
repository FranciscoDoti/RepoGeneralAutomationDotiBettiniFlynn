@Assessment @MultipleChoice @CycleVariables @Smoke
Feature: Verify functionality of Multiple Choice raptor item

    Scenario: Verify the Cycle Variables functionality of a Multiple Choice Raptor item
        Given I login to AMS as "all-permissions-author"
        When I add the "Multiple Choice" module

        And I configure the following item details
            | Title                       |
            | MultipleChoice Test MC Item |

        And I add list variables
            | Type   | Description | Name  | Value1 | Value2 | Value3 |
            | String | String      | trees | oak    | pine   | beech  |

        And I add the following choices in Multiple Choice module
            | Value       |
            | ???trees??? |
            | Trees       |

        Then I verify whether clicking on Cycle Variables updates the choices
            | Choice |
            | beech  |
            | pine   |
            | oak    |