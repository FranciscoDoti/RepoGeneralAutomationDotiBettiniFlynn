@Assessment @MolDraw @Smoke
Feature: To grade CORRECT, INCORRECT and DEFAULT a simple MolDraw structure

  Scenario: User creates a new AMS raptor item with a MD element, draws a simple structure as Correct and grades it successfully

    Given I login to AMS as "all-permissions-author"
    When I add the "Molecular Drawing" module
    Then I grade Correct tab

  Scenario: User creates a new AMS raptor item with a MD element, draws a simple structure as Correct and grades it to hit Default

    Given I login to AMS as "all-permissions-author"
    When I add the "Molecular Drawing" module
    Then I grade Default tab

  Scenario: User creates a new AMS raptor item with a MD element, draws a simple structure as Incorrect and grades it successfully

    Given I login to AMS as "all-permissions-author"
    When I add the "Molecular Drawing" module
    Then I grade Incorrect tab
