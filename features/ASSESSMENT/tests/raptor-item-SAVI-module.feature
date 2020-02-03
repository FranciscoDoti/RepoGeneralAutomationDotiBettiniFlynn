@Assessment @SAVI
Feature: To add a SAVI module to a raptor item

  @Assessment @SAVI
  Scenario: User adds a SAVI module to a raptor item

    Given I login to AMS as "all-permissions-author"
    
    When I add the "SAVI" module
    And I select "Astronomy: Phases of the Moon" in the SAVI module edit window
    And I configure the following item details
      | Title                               | Item Type          |
      | NGA QA SAVI Participation Item      | Participation Item |

    Then I verify item has been created