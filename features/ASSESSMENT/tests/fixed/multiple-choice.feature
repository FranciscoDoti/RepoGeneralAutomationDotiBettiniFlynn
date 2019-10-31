@Assessment @MultipleChoice @Smoke
Feature: To configure a multiple choice raptor item

  Scenario: User creates a new AMS multiple choice raptor item and configures it

    Given I login to AMS as "all-permissions-author"
    When I add the "Multiple Choice" module

    And I configure the following item details
      | Title               |
      | NGA QA Test MC Item |

    And I add list variables
      | Type   | Description | Name  | Value1 | Value2 | Value3 |
      | String | String      | trees | oak    | pine   | beech  |

    And I add the following choices in "Multiple Choice" module
      | Value       |
      | ???trees??? |
      | Trees       |

    And I set the number "1" as the correct answwer

    Then The variable values are displayed as choices
