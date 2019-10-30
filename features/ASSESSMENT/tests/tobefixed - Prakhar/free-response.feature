@Assessment @FreeResponse @Smoke
Feature: To configure a complete authoring raptor item

  Scenario: User creates a new AMS raptor item and configures it

    Given I login to AMS as "all-permissions-author"
    When I add the "Free Response" module

    And I configure FR module

    And I configure the following item details
      | Title                   |
      | FreeResponse Short Essay test |

    Then I check FR answers