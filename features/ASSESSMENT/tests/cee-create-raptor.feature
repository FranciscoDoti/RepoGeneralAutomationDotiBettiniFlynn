Feature: CEE module type creation
    Scenario: Verify that user can create CEE type of raptor item

      Given I login to AMS as "all-permissions-author"
      When I add the "Chemical Equation" module
      Then I verify item has been created with following details
      |field      |value      |
      |module_type|CEE        |
      |status     |in progress|
