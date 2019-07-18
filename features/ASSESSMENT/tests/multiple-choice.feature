Feature: To configure a complete authoring raptor item

  Scenario: User creates a new AMS raptor item and configures it

    Given I login to AMS as "all-permissions-author"
    When I add the "Multiple Choice" module

    And I configure the following item details
      | Title               |
      | NGA QA Test MC Item |

    And I add list variables
      | Type   | Description | Name  | Value1 | Value2 | Value3 |
      | String | String      | trees | oak    | pine   | beech  |

    And I add the following choices
      | Value       |
      | ???trees??? |
      | Trees       |

    And I set the number "1" as the correct answwer

    Then The variable values are displayed as choices
