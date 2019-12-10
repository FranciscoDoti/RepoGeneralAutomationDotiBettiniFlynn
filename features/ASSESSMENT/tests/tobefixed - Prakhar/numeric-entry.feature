@Assessment @NumericEntry @Smoke
Feature: To configure a complete authoring raptor item

  Scenario: User creates a new AMS raptor item and configures it

    Given I login to AMS as "all-permissions-author"
    When I add the "Numeric Entry" module "2" times

    And I set correct answer "0.0258" for NE "1"
    And I set correct answer "-.0258" for NE "2"

    And I configure the following item details
      | Title                       |
      | Numeric Entry test   |

    Then I check NE answers
