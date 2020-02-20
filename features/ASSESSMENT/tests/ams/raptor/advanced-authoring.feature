@Assessment @Smoke
Feature: To configure a complete authoring raptor item

  @AdvancedAuthoring
  Scenario: User creates a new AMS raptor item and configures it

    Given I login to AMS as "all-permissions-author"
    When I add the "Multiple Select" module

    And I configure the following item details
      | Title                              |
      | NGA QA Test MS Item with Variables |

    And I add list variables
      | Type   | Description | Name    | Value1 | Value2 |
      | Number | Number      | num1    | 1      | 2      |
      | String | String      | string1 | one    | two    |

    And I add the following range algos
      | Description | Variable Name | Minimum Value | Maxmimum Value | Increment Step |
      | Range 1     | token1        | 2             | 8              | 2              |
      | Range 2     | token2        | 1000          | 5555           | 0.01           |
      | Range 3     | token3        | -40           | 40             | 0.5            |

    And I add the following calculated algos
      | Name  | Equation                |
      | calc1 | ???range1???*???num1??? |

    And I add the following choices in "Multiple Select" module
      | Value         |
      | ???num1???    |
      | ???string1??? |
      | ???range1???  |
      | ???calc1???   |

    Then The rendered values of the variables are displayed as choices in the module
