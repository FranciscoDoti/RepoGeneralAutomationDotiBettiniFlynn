@Assessment @Smoke
Feature: CEE module type creation

  @ChemicalEquation
  Scenario: Verify that user can create CEE type of raptor item
    Given I login to AMS as "all-permissions-author"
    When I add the "Chemical Equation" module with following details
      | field           | value                          |
      | Equation Prefix | Photosynthesis                 |
      | Equation Answer | 6 CO2 + 6 H2O → C6H12O6 + 6 O2 |
    Then I verify item has been created with following details
      | field       | value       |
      | module type | CEE         |
      | status      | in progress |
