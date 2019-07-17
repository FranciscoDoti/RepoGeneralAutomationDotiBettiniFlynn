Feature: To configure a complete authoring raptor item

  Scenario: User creates a new AMS raptor item and configures it

    Given I login to AMS as "all-permissions-author"
    When I add the "Multiple Choice" module

    #And I configure the following item details
    #  | Title               |
    #  | NGA QA Test MC Item |

    And I add list variables
      | Type   | Description | Name      | Value1 | Value2     | Value3    |
      | String | String      | trees     | oak    | pine       | beech     |
      | String | String      | colors    | red    | green      | blue      |
      | String | String      | cars      | chevy  | jeep       | ferrari   |
      | String | String      | employees | jhon   | martin     | alex      |
      | String | String      | aminals   | duck   | dog        | cat       |
      | String | String      | countries | us     | argentina  | bolivia   |
      | String | String      | cities    | ny     | california | claromeco |
    #Actually I need only 1 variable, but it's just to generate a scroll down of the page

    #And I add the following choices
    # | Value       |
    # | ???trees??? |
    # | Trees       |

    And I set the number "1" as the correct answwer

#Then The variable values are displayed as choices
