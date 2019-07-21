@Assessment @AdvancedAuthoring @Smoke
Feature: To configure a complete authoring raptor item

  Scenario: User creates a new AMS raptor item and configures it

    Given I login to AMS as "all-permissions-author"
    When I add the "Multiple Select" module
    
    And I configure the following item details
    |Title                              |
    |NGA QA Test MS Item with Variables |

    And I add list variables with "2" rows and "2" columns
    |Type   |Description    |Name           |Value1   |Value2 |
    |Number |Number         |num1           |1        |2      |
    |String |String         |string1        |one      |two    |

    And I add the following range algos
    |Name   |Minimum |Maximum |Increment |
    |range1 |-1      |1       |1         |

    And I add the following calculated algos
    |Name   |Equation                |
    |calc1  |???range1???*???num1??? |

    And I add the following choices
    |Value         |
    |???num1???    |
    |???string1??? |
    |???range1???  |
    |???calc1???   |

    Then The rendered values of the variables are displayed as choices in the module
